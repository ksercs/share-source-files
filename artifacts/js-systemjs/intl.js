!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["node_modules/intl/index.js"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function r(e,r){for(var n=e.split(".");n.length;)r=r[n.shift()];return r}function n(n){if("string"==typeof n)return r(n,e);if(!(n instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},o=!0,f=0;f<n.length;f++){var i=r(n[f],e);o&&(t["default"]=i,o=!1),t[n[f].split(".").pop()]=i}return t}function t(r){if(Object.keys)Object.keys(e).forEach(r);else for(var n in e)a.call(e,n)&&r(n)}function o(r){t(function(n){if(-1==l.call(s,n)){try{var t=e[n]}catch(o){s.push(n)}r(n,t)}})}var f,i=$__System,a=Object.prototype.hasOwnProperty,l=Array.prototype.indexOf||function(e){for(var r=0,n=this.length;n>r;r++)if(this[r]===e)return r;return-1},s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];i.set("@@global-helpers",i.newModule({prepareGlobal:function(r,t,i){var a=e.define;e.define=void 0;var l;if(i){l={};for(var s in i)l[s]=e[s],e[s]=i[s]}return t||(f={},o(function(e,r){f[e]=r})),function(){var r;if(t)r=n(t);else{r={};var i,s;o(function(e,n){f[e]!==n&&"undefined"!=typeof n&&(r[e]=n,"undefined"!=typeof i?s||i===n||(s=!0):i=n)}),r=s?r:i}if(l)for(var u in l)e[u]=l[u];return e.define=a,r}}}))}("undefined"!=typeof self?self:global);
$__System.registerDynamic("node_modules/intl/lib/core.js", [], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

    var jsx = function () {
        var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;
        return function createRawReactElement(type, props, key, children) {
            var defaultProps = type && type.defaultProps;
            var childrenLength = arguments.length - 3;

            if (!props && childrenLength !== 0) {
                props = {};
            }

            if (props && defaultProps) {
                for (var propName in defaultProps) {
                    if (props[propName] === void 0) {
                        props[propName] = defaultProps[propName];
                    }
                }
            } else if (!props) {
                props = defaultProps || {};
            }

            if (childrenLength === 1) {
                props.children = children;
            } else if (childrenLength > 1) {
                var childArray = Array(childrenLength);

                for (var i = 0; i < childrenLength; i++) {
                    childArray[i] = arguments[i + 3];
                }

                props.children = childArray;
            }

            return {
                $$typeof: REACT_ELEMENT_TYPE,
                type: type,
                key: key === undefined ? null : '' + key,
                ref: null,
                props: props,
                _owner: null
            };
        };
    }();

    var asyncToGenerator = function (fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            return step("next", value);
                        }, function (err) {
                            return step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    };

    var classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };

    var createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var defineEnumerableProperties = function (obj, descs) {
        for (var key in descs) {
            var desc = descs[key];
            desc.configurable = desc.enumerable = true;
            if ("value" in desc) desc.writable = true;
            Object.defineProperty(obj, key, desc);
        }

        return obj;
    };

    var defaults = function (obj, defaults) {
        var keys = Object.getOwnPropertyNames(defaults);

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = Object.getOwnPropertyDescriptor(defaults, key);

            if (value && value.configurable && obj[key] === undefined) {
                Object.defineProperty(obj, key, value);
            }
        }

        return obj;
    };

    var defineProperty$1 = function (obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    };

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    var get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent === null) {
                return undefined;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;

            if (getter === undefined) {
                return undefined;
            }

            return getter.call(receiver);
        }
    };

    var inherits = function (subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    var _instanceof = function (left, right) {
        if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
            return right[Symbol.hasInstance](left);
        } else {
            return left instanceof right;
        }
    };

    var interopRequireDefault = function (obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    };

    var interopRequireWildcard = function (obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    };

    var newArrowCheck = function (innerThis, boundThis) {
        if (innerThis !== boundThis) {
            throw new TypeError("Cannot instantiate an arrow function");
        }
    };

    var objectDestructuringEmpty = function (obj) {
        if (obj == null) throw new TypeError("Cannot destructure undefined");
    };

    var objectWithoutProperties = function (obj, keys) {
        var target = {};

        for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
            target[i] = obj[i];
        }

        return target;
    };

    var possibleConstructorReturn = function (self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    var selfGlobal = typeof global === "undefined" ? self : global;

    var set = function set(object, property, value, receiver) {
        var desc = Object.getOwnPropertyDescriptor(object, property);

        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);

            if (parent !== null) {
                set(parent, property, value, receiver);
            }
        } else if ("value" in desc && desc.writable) {
            desc.value = value;
        } else {
            var setter = desc.set;

            if (setter !== undefined) {
                setter.call(receiver, value);
            }
        }

        return value;
    };

    var slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    var slicedToArrayLoose = function (arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            var _arr = [];

            for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
                _arr.push(_step.value);

                if (i && _arr.length === i) break;
            }

            return _arr;
        } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
    };

    var taggedTemplateLiteral = function (strings, raw) {
        return Object.freeze(Object.defineProperties(strings, {
            raw: {
                value: Object.freeze(raw)
            }
        }));
    };

    var taggedTemplateLiteralLoose = function (strings, raw) {
        strings.raw = raw;
        return strings;
    };

    var temporalRef = function (val, name, undef) {
        if (val === undef) {
            throw new ReferenceError(name + " is not defined - temporal dead zone");
        } else {
            return val;
        }
    };

    var temporalUndefined = {};

    var toArray = function (arr) {
        return Array.isArray(arr) ? arr : Array.from(arr);
    };

    var toConsumableArray = function (arr) {
        if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

            return arr2;
        } else {
            return Array.from(arr);
        }
    };

    var babelHelpers$1 = Object.freeze({
        jsx: jsx,
        asyncToGenerator: asyncToGenerator,
        classCallCheck: classCallCheck,
        createClass: createClass,
        defineEnumerableProperties: defineEnumerableProperties,
        defaults: defaults,
        defineProperty: defineProperty$1,
        get: get,
        inherits: inherits,
        interopRequireDefault: interopRequireDefault,
        interopRequireWildcard: interopRequireWildcard,
        newArrowCheck: newArrowCheck,
        objectDestructuringEmpty: objectDestructuringEmpty,
        objectWithoutProperties: objectWithoutProperties,
        possibleConstructorReturn: possibleConstructorReturn,
        selfGlobal: selfGlobal,
        set: set,
        slicedToArray: slicedToArray,
        slicedToArrayLoose: slicedToArrayLoose,
        taggedTemplateLiteral: taggedTemplateLiteral,
        taggedTemplateLiteralLoose: taggedTemplateLiteralLoose,
        temporalRef: temporalRef,
        temporalUndefined: temporalUndefined,
        toArray: toArray,
        toConsumableArray: toConsumableArray,
        typeof: _typeof,
        extends: _extends,
        instanceof: _instanceof
    });

    var realDefineProp = function () {
        var sentinel = function sentinel() {};
        try {
            Object.defineProperty(sentinel, 'a', {
                get: function get() {
                    return 1;
                }
            });
            Object.defineProperty(sentinel, 'prototype', { writable: false });
            return sentinel.a === 1 && sentinel.prototype instanceof Object;
        } catch (e) {
            return false;
        }
    }();

    // Need a workaround for getters in ES3
    var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

    // We use this a lot (and need it for proto-less objects)
    var hop = Object.prototype.hasOwnProperty;

    // Naive defineProperty for compatibility
    var defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
        if ('get' in desc && obj.__defineGetter__) obj.__defineGetter__(name, desc.get);else if (!hop.call(obj, name) || 'value' in desc) obj[name] = desc.value;
    };

    // Array.prototype.indexOf, as good as we need it to be
    var arrIndexOf = Array.prototype.indexOf || function (search) {
        /*jshint validthis:true */
        var t = this;
        if (!t.length) return -1;

        for (var i = arguments[1] || 0, max = t.length; i < max; i++) {
            if (t[i] === search) return i;
        }

        return -1;
    };

    // Create an object with the specified prototype (2nd arg required for Record)
    var objCreate = Object.create || function (proto, props) {
        var obj = void 0;

        function F() {}
        F.prototype = proto;
        obj = new F();

        for (var k in props) {
            if (hop.call(props, k)) defineProperty(obj, k, props[k]);
        }

        return obj;
    };

    // Snapshot some (hopefully still) native built-ins
    var arrSlice = Array.prototype.slice;
    var arrConcat = Array.prototype.concat;
    var arrPush = Array.prototype.push;
    var arrJoin = Array.prototype.join;
    var arrShift = Array.prototype.shift;

    // Naive Function.prototype.bind for compatibility
    var fnBind = Function.prototype.bind || function (thisObj) {
        var fn = this,
            args = arrSlice.call(arguments, 1);

        // All our (presently) bound functions have either 1 or 0 arguments. By returning
        // different function signatures, we can pass some tests in ES3 environments
        if (fn.length === 1) {
            return function () {
                return fn.apply(thisObj, arrConcat.call(args, arrSlice.call(arguments)));
            };
        }
        return function () {
            return fn.apply(thisObj, arrConcat.call(args, arrSlice.call(arguments)));
        };
    };

    // Object housing internal properties for constructors
    var internals = objCreate(null);

    // Keep internal properties internal
    var secret = Math.random();

    // Helper functions
    // ================

    /**
     * A function to deal with the inaccuracy of calculating log10 in pre-ES6
     * JavaScript environments. Math.log(num) / Math.LN10 was responsible for
     * causing issue #62.
     */
    function log10Floor(n) {
        // ES6 provides the more accurate Math.log10
        if (typeof Math.log10 === 'function') return Math.floor(Math.log10(n));

        var x = Math.round(Math.log(n) * Math.LOG10E);
        return x - (Number('1e' + x) > n);
    }

    /**
     * A map that doesn't contain Object in its prototype chain
     */
    function Record(obj) {
        // Copy only own properties over unless this object is already a Record instance
        for (var k in obj) {
            if (obj instanceof Record || hop.call(obj, k)) defineProperty(this, k, { value: obj[k], enumerable: true, writable: true, configurable: true });
        }
    }
    Record.prototype = objCreate(null);

    /**
     * An ordered list
     */
    function List() {
        defineProperty(this, 'length', { writable: true, value: 0 });

        if (arguments.length) arrPush.apply(this, arrSlice.call(arguments));
    }
    List.prototype = objCreate(null);

    /**
     * Constructs a regular expression to restore tainted RegExp properties
     */
    function createRegExpRestore() {
        if (internals.disableRegExpRestore) {
            return function () {/* no-op */};
        }

        var regExpCache = {
            lastMatch: RegExp.lastMatch || '',
            leftContext: RegExp.leftContext,
            multiline: RegExp.multiline,
            input: RegExp.input
        },
            has = false;

        // Create a snapshot of all the 'captured' properties
        for (var i = 1; i <= 9; i++) {
            has = (regExpCache['$' + i] = RegExp['$' + i]) || has;
        }return function () {
            // Now we've snapshotted some properties, escape the lastMatch string
            var esc = /[.?*+^$[\]\\(){}|-]/g,
                lm = regExpCache.lastMatch.replace(esc, '\\$&'),
                reg = new List();

            // If any of the captured strings were non-empty, iterate over them all
            if (has) {
                for (var _i = 1; _i <= 9; _i++) {
                    var m = regExpCache['$' + _i];

                    // If it's empty, add an empty capturing group
                    if (!m) lm = '()' + lm;

                    // Else find the string in lm and escape & wrap it to capture it
                    else {
                            m = m.replace(esc, '\\$&');
                            lm = lm.replace(m, '(' + m + ')');
                        }

                    // Push it to the reg and chop lm to make sure further groups come after
                    arrPush.call(reg, lm.slice(0, lm.indexOf('(') + 1));
                    lm = lm.slice(lm.indexOf('(') + 1);
                }
            }

            var exprStr = arrJoin.call(reg, '') + lm;

            // Shorten the regex by replacing each part of the expression with a match
            // for a string of that exact length.  This is safe for the type of
            // expressions generated above, because the expression matches the whole
            // match string, so we know each group and each segment between capturing
            // groups can be matched by its length alone.
            exprStr = exprStr.replace(/(\\\(|\\\)|[^()])+/g, function (match) {
                return '[\\s\\S]{' + match.replace('\\', '').length + '}';
            });

            // Create the regular expression that will reconstruct the RegExp properties
            var expr = new RegExp(exprStr, regExpCache.multiline ? 'gm' : 'g');

            // Set the lastIndex of the generated expression to ensure that the match
            // is found in the correct index.
            expr.lastIndex = regExpCache.leftContext.length;

            expr.exec(regExpCache.input);
        };
    }

    /**
     * Mimics ES5's abstract ToObject() function
     */
    function toObject(arg) {
        if (arg === null) throw new TypeError('Cannot convert null or undefined to object');

        if ((typeof arg === 'undefined' ? 'undefined' : babelHelpers$1['typeof'](arg)) === 'object') return arg;
        return Object(arg);
    }

    function toNumber(arg) {
        if (typeof arg === 'number') return arg;
        return Number(arg);
    }

    function toInteger(arg) {
        var number = toNumber(arg);
        if (isNaN(number)) return 0;
        if (number === +0 || number === -0 || number === +Infinity || number === -Infinity) return number;
        if (number < 0) return Math.floor(Math.abs(number)) * -1;
        return Math.floor(Math.abs(number));
    }

    function toLength(arg) {
        var len = toInteger(arg);
        if (len <= 0) return 0;
        if (len === Infinity) return Math.pow(2, 53) - 1;
        return Math.min(len, Math.pow(2, 53) - 1);
    }

    /**
     * Returns "internal" properties for an object
     */
    function getInternalProperties(obj) {
        if (hop.call(obj, '__getInternalProperties')) return obj.__getInternalProperties(secret);

        return objCreate(null);
    }

    /**
    * Defines regular expressions for various operations related to the BCP 47 syntax,
    * as defined at http://tools.ietf.org/html/bcp47#section-2.1
    */

    // extlang       = 3ALPHA              ; selected ISO 639 codes
    //                 *2("-" 3ALPHA)      ; permanently reserved
    var extlang = '[a-z]{3}(?:-[a-z]{3}){0,2}';

    // language      = 2*3ALPHA            ; shortest ISO 639 code
    //                 ["-" extlang]       ; sometimes followed by
    //                                     ; extended language subtags
    //               / 4ALPHA              ; or reserved for future use
    //               / 5*8ALPHA            ; or registered language subtag
    var language = '(?:[a-z]{2,3}(?:-' + extlang + ')?|[a-z]{4}|[a-z]{5,8})';

    // script        = 4ALPHA              ; ISO 15924 code
    var script = '[a-z]{4}';

    // region        = 2ALPHA              ; ISO 3166-1 code
    //               / 3DIGIT              ; UN M.49 code
    var region = '(?:[a-z]{2}|\\d{3})';

    // variant       = 5*8alphanum         ; registered variants
    //               / (DIGIT 3alphanum)
    var variant = '(?:[a-z0-9]{5,8}|\\d[a-z0-9]{3})';

    //                                     ; Single alphanumerics
    //                                     ; "x" reserved for private use
    // singleton     = DIGIT               ; 0 - 9
    //               / %x41-57             ; A - W
    //               / %x59-5A             ; Y - Z
    //               / %x61-77             ; a - w
    //               / %x79-7A             ; y - z
    var singleton = '[0-9a-wy-z]';

    // extension     = singleton 1*("-" (2*8alphanum))
    var extension = singleton + '(?:-[a-z0-9]{2,8})+';

    // privateuse    = "x" 1*("-" (1*8alphanum))
    var privateuse = 'x(?:-[a-z0-9]{1,8})+';

    // irregular     = "en-GB-oed"         ; irregular tags do not match
    //               / "i-ami"             ; the 'langtag' production and
    //               / "i-bnn"             ; would not otherwise be
    //               / "i-default"         ; considered 'well-formed'
    //               / "i-enochian"        ; These tags are all valid,
    //               / "i-hak"             ; but most are deprecated
    //               / "i-klingon"         ; in favor of more modern
    //               / "i-lux"             ; subtags or subtag
    //               / "i-mingo"           ; combination
    //               / "i-navajo"
    //               / "i-pwn"
    //               / "i-tao"
    //               / "i-tay"
    //               / "i-tsu"
    //               / "sgn-BE-FR"
    //               / "sgn-BE-NL"
    //               / "sgn-CH-DE"
    var irregular = '(?:en-GB-oed' + '|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|tao|tay|tsu)' + '|sgn-(?:BE-FR|BE-NL|CH-DE))';

    // regular       = "art-lojban"        ; these tags match the 'langtag'
    //               / "cel-gaulish"       ; production, but their subtags
    //               / "no-bok"            ; are not extended language
    //               / "no-nyn"            ; or variant subtags: their meaning
    //               / "zh-guoyu"          ; is defined by their registration
    //               / "zh-hakka"          ; and all of these are deprecated
    //               / "zh-min"            ; in favor of a more modern
    //               / "zh-min-nan"        ; subtag or sequence of subtags
    //               / "zh-xiang"
    var regular = '(?:art-lojban|cel-gaulish|no-bok|no-nyn' + '|zh-(?:guoyu|hakka|min|min-nan|xiang))';

    // grandfathered = irregular           ; non-redundant tags registered
    //               / regular             ; during the RFC 3066 era
    var grandfathered = '(?:' + irregular + '|' + regular + ')';

    // langtag       = language
    //                 ["-" script]
    //                 ["-" region]
    //                 *("-" variant)
    //                 *("-" extension)
    //                 ["-" privateuse]
    var langtag = language + '(?:-' + script + ')?(?:-' + region + ')?(?:-' + variant + ')*(?:-' + extension + ')*(?:-' + privateuse + ')?';

    // Language-Tag  = langtag             ; normal language tags
    //               / privateuse          ; private use tag
    //               / grandfathered       ; grandfathered tags
    var expBCP47Syntax = RegExp('^(?:' + langtag + '|' + privateuse + '|' + grandfathered + ')$', 'i');

    // Match duplicate variants in a language tag
    var expVariantDupes = RegExp('^(?!x).*?-(' + variant + ')-(?:\\w{4,8}-(?!x-))*\\1\\b', 'i');

    // Match duplicate singletons in a language tag (except in private use)
    var expSingletonDupes = RegExp('^(?!x).*?-(' + singleton + ')-(?:\\w+-(?!x-))*\\1\\b', 'i');

    // Match all extension sequences
    var expExtSequences = RegExp('-' + extension, 'ig');

    // Default locale is the first-added locale data for us
    var defaultLocale = void 0;
    function setDefaultLocale(locale) {
        defaultLocale = locale;
    }

    // IANA Subtag Registry redundant tag and subtag maps
    var redundantTags = {
        tags: {
            "art-lojban": "jbo",
            "i-ami": "ami",
            "i-bnn": "bnn",
            "i-hak": "hak",
            "i-klingon": "tlh",
            "i-lux": "lb",
            "i-navajo": "nv",
            "i-pwn": "pwn",
            "i-tao": "tao",
            "i-tay": "tay",
            "i-tsu": "tsu",
            "no-bok": "nb",
            "no-nyn": "nn",
            "sgn-BE-FR": "sfb",
            "sgn-BE-NL": "vgt",
            "sgn-CH-DE": "sgg",
            "zh-guoyu": "cmn",
            "zh-hakka": "hak",
            "zh-min-nan": "nan",
            "zh-xiang": "hsn",
            "sgn-BR": "bzs",
            "sgn-CO": "csn",
            "sgn-DE": "gsg",
            "sgn-DK": "dsl",
            "sgn-ES": "ssp",
            "sgn-FR": "fsl",
            "sgn-GB": "bfi",
            "sgn-GR": "gss",
            "sgn-IE": "isg",
            "sgn-IT": "ise",
            "sgn-JP": "jsl",
            "sgn-MX": "mfs",
            "sgn-NI": "ncs",
            "sgn-NL": "dse",
            "sgn-NO": "nsl",
            "sgn-PT": "psr",
            "sgn-SE": "swl",
            "sgn-US": "ase",
            "sgn-ZA": "sfs",
            "zh-cmn": "cmn",
            "zh-cmn-Hans": "cmn-Hans",
            "zh-cmn-Hant": "cmn-Hant",
            "zh-gan": "gan",
            "zh-wuu": "wuu",
            "zh-yue": "yue"
        },
        subtags: {
            BU: "MM",
            DD: "DE",
            FX: "FR",
            TP: "TL",
            YD: "YE",
            ZR: "CD",
            heploc: "alalc97",
            'in': "id",
            iw: "he",
            ji: "yi",
            jw: "jv",
            mo: "ro",
            ayx: "nun",
            bjd: "drl",
            ccq: "rki",
            cjr: "mom",
            cka: "cmr",
            cmk: "xch",
            drh: "khk",
            drw: "prs",
            gav: "dev",
            hrr: "jal",
            ibi: "opa",
            kgh: "kml",
            lcq: "ppr",
            mst: "mry",
            myt: "mry",
            sca: "hle",
            tie: "ras",
            tkk: "twm",
            tlw: "weo",
            tnf: "prs",
            ybd: "rki",
            yma: "lrr"
        },
        extLang: {
            aao: ["aao", "ar"],
            abh: ["abh", "ar"],
            abv: ["abv", "ar"],
            acm: ["acm", "ar"],
            acq: ["acq", "ar"],
            acw: ["acw", "ar"],
            acx: ["acx", "ar"],
            acy: ["acy", "ar"],
            adf: ["adf", "ar"],
            ads: ["ads", "sgn"],
            aeb: ["aeb", "ar"],
            aec: ["aec", "ar"],
            aed: ["aed", "sgn"],
            aen: ["aen", "sgn"],
            afb: ["afb", "ar"],
            afg: ["afg", "sgn"],
            ajp: ["ajp", "ar"],
            apc: ["apc", "ar"],
            apd: ["apd", "ar"],
            arb: ["arb", "ar"],
            arq: ["arq", "ar"],
            ars: ["ars", "ar"],
            ary: ["ary", "ar"],
            arz: ["arz", "ar"],
            ase: ["ase", "sgn"],
            asf: ["asf", "sgn"],
            asp: ["asp", "sgn"],
            asq: ["asq", "sgn"],
            asw: ["asw", "sgn"],
            auz: ["auz", "ar"],
            avl: ["avl", "ar"],
            ayh: ["ayh", "ar"],
            ayl: ["ayl", "ar"],
            ayn: ["ayn", "ar"],
            ayp: ["ayp", "ar"],
            bbz: ["bbz", "ar"],
            bfi: ["bfi", "sgn"],
            bfk: ["bfk", "sgn"],
            bjn: ["bjn", "ms"],
            bog: ["bog", "sgn"],
            bqn: ["bqn", "sgn"],
            bqy: ["bqy", "sgn"],
            btj: ["btj", "ms"],
            bve: ["bve", "ms"],
            bvl: ["bvl", "sgn"],
            bvu: ["bvu", "ms"],
            bzs: ["bzs", "sgn"],
            cdo: ["cdo", "zh"],
            cds: ["cds", "sgn"],
            cjy: ["cjy", "zh"],
            cmn: ["cmn", "zh"],
            coa: ["coa", "ms"],
            cpx: ["cpx", "zh"],
            csc: ["csc", "sgn"],
            csd: ["csd", "sgn"],
            cse: ["cse", "sgn"],
            csf: ["csf", "sgn"],
            csg: ["csg", "sgn"],
            csl: ["csl", "sgn"],
            csn: ["csn", "sgn"],
            csq: ["csq", "sgn"],
            csr: ["csr", "sgn"],
            czh: ["czh", "zh"],
            czo: ["czo", "zh"],
            doq: ["doq", "sgn"],
            dse: ["dse", "sgn"],
            dsl: ["dsl", "sgn"],
            dup: ["dup", "ms"],
            ecs: ["ecs", "sgn"],
            esl: ["esl", "sgn"],
            esn: ["esn", "sgn"],
            eso: ["eso", "sgn"],
            eth: ["eth", "sgn"],
            fcs: ["fcs", "sgn"],
            fse: ["fse", "sgn"],
            fsl: ["fsl", "sgn"],
            fss: ["fss", "sgn"],
            gan: ["gan", "zh"],
            gds: ["gds", "sgn"],
            gom: ["gom", "kok"],
            gse: ["gse", "sgn"],
            gsg: ["gsg", "sgn"],
            gsm: ["gsm", "sgn"],
            gss: ["gss", "sgn"],
            gus: ["gus", "sgn"],
            hab: ["hab", "sgn"],
            haf: ["haf", "sgn"],
            hak: ["hak", "zh"],
            hds: ["hds", "sgn"],
            hji: ["hji", "ms"],
            hks: ["hks", "sgn"],
            hos: ["hos", "sgn"],
            hps: ["hps", "sgn"],
            hsh: ["hsh", "sgn"],
            hsl: ["hsl", "sgn"],
            hsn: ["hsn", "zh"],
            icl: ["icl", "sgn"],
            ils: ["ils", "sgn"],
            inl: ["inl", "sgn"],
            ins: ["ins", "sgn"],
            ise: ["ise", "sgn"],
            isg: ["isg", "sgn"],
            isr: ["isr", "sgn"],
            jak: ["jak", "ms"],
            jax: ["jax", "ms"],
            jcs: ["jcs", "sgn"],
            jhs: ["jhs", "sgn"],
            jls: ["jls", "sgn"],
            jos: ["jos", "sgn"],
            jsl: ["jsl", "sgn"],
            jus: ["jus", "sgn"],
            kgi: ["kgi", "sgn"],
            knn: ["knn", "kok"],
            kvb: ["kvb", "ms"],
            kvk: ["kvk", "sgn"],
            kvr: ["kvr", "ms"],
            kxd: ["kxd", "ms"],
            lbs: ["lbs", "sgn"],
            lce: ["lce", "ms"],
            lcf: ["lcf", "ms"],
            liw: ["liw", "ms"],
            lls: ["lls", "sgn"],
            lsg: ["lsg", "sgn"],
            lsl: ["lsl", "sgn"],
            lso: ["lso", "sgn"],
            lsp: ["lsp", "sgn"],
            lst: ["lst", "sgn"],
            lsy: ["lsy", "sgn"],
            ltg: ["ltg", "lv"],
            lvs: ["lvs", "lv"],
            lzh: ["lzh", "zh"],
            max: ["max", "ms"],
            mdl: ["mdl", "sgn"],
            meo: ["meo", "ms"],
            mfa: ["mfa", "ms"],
            mfb: ["mfb", "ms"],
            mfs: ["mfs", "sgn"],
            min: ["min", "ms"],
            mnp: ["mnp", "zh"],
            mqg: ["mqg", "ms"],
            mre: ["mre", "sgn"],
            msd: ["msd", "sgn"],
            msi: ["msi", "ms"],
            msr: ["msr", "sgn"],
            mui: ["mui", "ms"],
            mzc: ["mzc", "sgn"],
            mzg: ["mzg", "sgn"],
            mzy: ["mzy", "sgn"],
            nan: ["nan", "zh"],
            nbs: ["nbs", "sgn"],
            ncs: ["ncs", "sgn"],
            nsi: ["nsi", "sgn"],
            nsl: ["nsl", "sgn"],
            nsp: ["nsp", "sgn"],
            nsr: ["nsr", "sgn"],
            nzs: ["nzs", "sgn"],
            okl: ["okl", "sgn"],
            orn: ["orn", "ms"],
            ors: ["ors", "ms"],
            pel: ["pel", "ms"],
            pga: ["pga", "ar"],
            pks: ["pks", "sgn"],
            prl: ["prl", "sgn"],
            prz: ["prz", "sgn"],
            psc: ["psc", "sgn"],
            psd: ["psd", "sgn"],
            pse: ["pse", "ms"],
            psg: ["psg", "sgn"],
            psl: ["psl", "sgn"],
            pso: ["pso", "sgn"],
            psp: ["psp", "sgn"],
            psr: ["psr", "sgn"],
            pys: ["pys", "sgn"],
            rms: ["rms", "sgn"],
            rsi: ["rsi", "sgn"],
            rsl: ["rsl", "sgn"],
            sdl: ["sdl", "sgn"],
            sfb: ["sfb", "sgn"],
            sfs: ["sfs", "sgn"],
            sgg: ["sgg", "sgn"],
            sgx: ["sgx", "sgn"],
            shu: ["shu", "ar"],
            slf: ["slf", "sgn"],
            sls: ["sls", "sgn"],
            sqk: ["sqk", "sgn"],
            sqs: ["sqs", "sgn"],
            ssh: ["ssh", "ar"],
            ssp: ["ssp", "sgn"],
            ssr: ["ssr", "sgn"],
            svk: ["svk", "sgn"],
            swc: ["swc", "sw"],
            swh: ["swh", "sw"],
            swl: ["swl", "sgn"],
            syy: ["syy", "sgn"],
            tmw: ["tmw", "ms"],
            tse: ["tse", "sgn"],
            tsm: ["tsm", "sgn"],
            tsq: ["tsq", "sgn"],
            tss: ["tss", "sgn"],
            tsy: ["tsy", "sgn"],
            tza: ["tza", "sgn"],
            ugn: ["ugn", "sgn"],
            ugy: ["ugy", "sgn"],
            ukl: ["ukl", "sgn"],
            uks: ["uks", "sgn"],
            urk: ["urk", "ms"],
            uzn: ["uzn", "uz"],
            uzs: ["uzs", "uz"],
            vgt: ["vgt", "sgn"],
            vkk: ["vkk", "ms"],
            vkt: ["vkt", "ms"],
            vsi: ["vsi", "sgn"],
            vsl: ["vsl", "sgn"],
            vsv: ["vsv", "sgn"],
            wuu: ["wuu", "zh"],
            xki: ["xki", "sgn"],
            xml: ["xml", "sgn"],
            xmm: ["xmm", "ms"],
            xms: ["xms", "sgn"],
            yds: ["yds", "sgn"],
            ysl: ["ysl", "sgn"],
            yue: ["yue", "zh"],
            zib: ["zib", "sgn"],
            zlm: ["zlm", "ms"],
            zmi: ["zmi", "ms"],
            zsl: ["zsl", "sgn"],
            zsm: ["zsm", "ms"]
        }
    };

    /**
     * Convert only a-z to uppercase as per section 6.1 of the spec
     */
    function toLatinUpperCase(str) {
        var i = str.length;

        while (i--) {
            var ch = str.charAt(i);

            if (ch >= "a" && ch <= "z") str = str.slice(0, i) + ch.toUpperCase() + str.slice(i + 1);
        }

        return str;
    }

    /**
     * The IsStructurallyValidLanguageTag abstract operation verifies that the locale
     * argument (which must be a String value)
     *
     * - represents a well-formed BCP 47 language tag as specified in RFC 5646 section
     *   2.1, or successor,
     * - does not include duplicate variant subtags, and
     * - does not include duplicate singleton subtags.
     *
     * The abstract operation returns true if locale can be generated from the ABNF
     * grammar in section 2.1 of the RFC, starting with Language-Tag, and does not
     * contain duplicate variant or singleton subtags (other than as a private use
     * subtag). It returns false otherwise. Terminal value characters in the grammar are
     * interpreted as the Unicode equivalents of the ASCII octet values given.
     */
    function /* 6.2.2 */IsStructurallyValidLanguageTag(locale) {
        // represents a well-formed BCP 47 language tag as specified in RFC 5646
        if (!expBCP47Syntax.test(locale)) return false;

        // does not include duplicate variant subtags, and
        if (expVariantDupes.test(locale)) return false;

        // does not include duplicate singleton subtags.
        if (expSingletonDupes.test(locale)) return false;

        return true;
    }

    /**
     * The CanonicalizeLanguageTag abstract operation returns the canonical and case-
     * regularized form of the locale argument (which must be a String value that is
     * a structurally valid BCP 47 language tag as verified by the
     * IsStructurallyValidLanguageTag abstract operation). It takes the steps
     * specified in RFC 5646 section 4.5, or successor, to bring the language tag
     * into canonical form, and to regularize the case of the subtags, but does not
     * take the steps to bring a language tag into “extlang form” and to reorder
     * variant subtags.
    
     * The specifications for extensions to BCP 47 language tags, such as RFC 6067,
     * may include canonicalization rules for the extension subtag sequences they
     * define that go beyond the canonicalization rules of RFC 5646 section 4.5.
     * Implementations are allowed, but not required, to apply these additional rules.
     */
    function /* 6.2.3 */CanonicalizeLanguageTag(locale) {
        var match = void 0,
            parts = void 0;

        // A language tag is in 'canonical form' when the tag is well-formed
        // according to the rules in Sections 2.1 and 2.2

        // Section 2.1 says all subtags use lowercase...
        locale = locale.toLowerCase();

        // ...with 2 exceptions: 'two-letter and four-letter subtags that neither
        // appear at the start of the tag nor occur after singletons.  Such two-letter
        // subtags are all uppercase (as in the tags "en-CA-x-ca" or "sgn-BE-FR") and
        // four-letter subtags are titlecase (as in the tag "az-Latn-x-latn").
        parts = locale.split('-');
        for (var i = 1, max = parts.length; i < max; i++) {
            // Two-letter subtags are all uppercase
            if (parts[i].length === 2) parts[i] = parts[i].toUpperCase();

            // Four-letter subtags are titlecase
            else if (parts[i].length === 4) parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);

                // Is it a singleton?
                else if (parts[i].length === 1 && parts[i] !== 'x') break;
        }
        locale = arrJoin.call(parts, '-');

        // The steps laid out in RFC 5646 section 4.5 are as follows:

        // 1.  Extension sequences are ordered into case-insensitive ASCII order
        //     by singleton subtag.
        if ((match = locale.match(expExtSequences)) && match.length > 1) {
            // The built-in sort() sorts by ASCII order, so use that
            match.sort();

            // Replace all extensions with the joined, sorted array
            locale = locale.replace(RegExp('(?:' + expExtSequences.source + ')+', 'i'), arrJoin.call(match, ''));
        }

        // 2.  Redundant or grandfathered tags are replaced by their 'Preferred-
        //     Value', if there is one.
        if (hop.call(redundantTags.tags, locale)) locale = redundantTags.tags[locale];

        // 3.  Subtags are replaced by their 'Preferred-Value', if there is one.
        //     For extlangs, the original primary language subtag is also
        //     replaced if there is a primary language subtag in the 'Preferred-
        //     Value'.
        parts = locale.split('-');

        for (var _i = 1, _max = parts.length; _i < _max; _i++) {
            if (hop.call(redundantTags.subtags, parts[_i])) parts[_i] = redundantTags.subtags[parts[_i]];else if (hop.call(redundantTags.extLang, parts[_i])) {
                parts[_i] = redundantTags.extLang[parts[_i]][0];

                // For extlang tags, the prefix needs to be removed if it is redundant
                if (_i === 1 && redundantTags.extLang[parts[1]][1] === parts[0]) {
                    parts = arrSlice.call(parts, _i++);
                    _max -= 1;
                }
            }
        }

        return arrJoin.call(parts, '-');
    }

    /**
     * The DefaultLocale abstract operation returns a String value representing the
     * structurally valid (6.2.2) and canonicalized (6.2.3) BCP 47 language tag for the
     * host environment’s current locale.
     */
    function /* 6.2.4 */DefaultLocale() {
        return defaultLocale;
    }

    // Sect 6.3 Currency Codes
    // =======================

    var expCurrencyCode = /^[A-Z]{3}$/;

    /**
     * The IsWellFormedCurrencyCode abstract operation verifies that the currency argument
     * (after conversion to a String value) represents a well-formed 3-letter ISO currency
     * code. The following steps are taken:
     */
    function /* 6.3.1 */IsWellFormedCurrencyCode(currency) {
        // 1. Let `c` be ToString(currency)
        var c = String(currency);

        // 2. Let `normalized` be the result of mapping c to upper case as described
        //    in 6.1.
        var normalized = toLatinUpperCase(c);

        // 3. If the string length of normalized is not 3, return false.
        // 4. If normalized contains any character that is not in the range "A" to "Z"
        //    (U+0041 to U+005A), return false.
        if (expCurrencyCode.test(normalized) === false) return false;

        // 5. Return true
        return true;
    }

    var expUnicodeExSeq = /-u(?:-[0-9a-z]{2,8})+/gi; // See `extension` below

    function /* 9.2.1 */CanonicalizeLocaleList(locales) {
        // The abstract operation CanonicalizeLocaleList takes the following steps:

        // 1. If locales is undefined, then a. Return a new empty List
        if (locales === undefined) return new List();

        // 2. Let seen be a new empty List.
        var seen = new List();

        // 3. If locales is a String value, then
        //    a. Let locales be a new array created as if by the expression new
        //    Array(locales) where Array is the standard built-in constructor with
        //    that name and locales is the value of locales.
        locales = typeof locales === 'string' ? [locales] : locales;

        // 4. Let O be ToObject(locales).
        var O = toObject(locales);

        // 5. Let lenValue be the result of calling the [[Get]] internal method of
        //    O with the argument "length".
        // 6. Let len be ToUint32(lenValue).
        var len = toLength(O.length);

        // 7. Let k be 0.
        var k = 0;

        // 8. Repeat, while k < len
        while (k < len) {
            // a. Let Pk be ToString(k).
            var Pk = String(k);

            // b. Let kPresent be the result of calling the [[HasProperty]] internal
            //    method of O with argument Pk.
            var kPresent = Pk in O;

            // c. If kPresent is true, then
            if (kPresent) {
                // i. Let kValue be the result of calling the [[Get]] internal
                //     method of O with argument Pk.
                var kValue = O[Pk];

                // ii. If the type of kValue is not String or Object, then throw a
                //     TypeError exception.
                if (kValue === null || typeof kValue !== 'string' && (typeof kValue === "undefined" ? "undefined" : babelHelpers$1["typeof"](kValue)) !== 'object') throw new TypeError('String or Object type expected');

                // iii. Let tag be ToString(kValue).
                var tag = String(kValue);

                // iv. If the result of calling the abstract operation
                //     IsStructurallyValidLanguageTag (defined in 6.2.2), passing tag as
                //     the argument, is false, then throw a RangeError exception.
                if (!IsStructurallyValidLanguageTag(tag)) throw new RangeError("'" + tag + "' is not a structurally valid language tag");

                // v. Let tag be the result of calling the abstract operation
                //    CanonicalizeLanguageTag (defined in 6.2.3), passing tag as the
                //    argument.
                tag = CanonicalizeLanguageTag(tag);

                // vi. If tag is not an element of seen, then append tag as the last
                //     element of seen.
                if (arrIndexOf.call(seen, tag) === -1) arrPush.call(seen, tag);
            }

            // d. Increase k by 1.
            k++;
        }

        // 9. Return seen.
        return seen;
    }

    /**
     * The BestAvailableLocale abstract operation compares the provided argument
     * locale, which must be a String value with a structurally valid and
     * canonicalized BCP 47 language tag, against the locales in availableLocales and
     * returns either the longest non-empty prefix of locale that is an element of
     * availableLocales, or undefined if there is no such element. It uses the
     * fallback mechanism of RFC 4647, section 3.4. The following steps are taken:
     */
    function /* 9.2.2 */BestAvailableLocale(availableLocales, locale) {
        // 1. Let candidate be locale
        var candidate = locale;

        // 2. Repeat
        while (candidate) {
            // a. If availableLocales contains an element equal to candidate, then return
            // candidate.
            if (arrIndexOf.call(availableLocales, candidate) > -1) return candidate;

            // b. Let pos be the character index of the last occurrence of "-"
            // (U+002D) within candidate. If that character does not occur, return
            // undefined.
            var pos = candidate.lastIndexOf('-');

            if (pos < 0) return;

            // c. If pos ≥ 2 and the character "-" occurs at index pos-2 of candidate,
            //    then decrease pos by 2.
            if (pos >= 2 && candidate.charAt(pos - 2) === '-') pos -= 2;

            // d. Let candidate be the substring of candidate from position 0, inclusive,
            //    to position pos, exclusive.
            candidate = candidate.substring(0, pos);
        }
    }

    /**
     * The LookupMatcher abstract operation compares requestedLocales, which must be
     * a List as returned by CanonicalizeLocaleList, against the locales in
     * availableLocales and determines the best available language to meet the
     * request. The following steps are taken:
     */
    function /* 9.2.3 */LookupMatcher(availableLocales, requestedLocales) {
        // 1. Let i be 0.
        var i = 0;

        // 2. Let len be the number of elements in requestedLocales.
        var len = requestedLocales.length;

        // 3. Let availableLocale be undefined.
        var availableLocale = void 0;

        var locale = void 0,
            noExtensionsLocale = void 0;

        // 4. Repeat while i < len and availableLocale is undefined:
        while (i < len && !availableLocale) {
            // a. Let locale be the element of requestedLocales at 0-origined list
            //    position i.
            locale = requestedLocales[i];

            // b. Let noExtensionsLocale be the String value that is locale with all
            //    Unicode locale extension sequences removed.
            noExtensionsLocale = String(locale).replace(expUnicodeExSeq, '');

            // c. Let availableLocale be the result of calling the
            //    BestAvailableLocale abstract operation (defined in 9.2.2) with
            //    arguments availableLocales and noExtensionsLocale.
            availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);

            // d. Increase i by 1.
            i++;
        }

        // 5. Let result be a new Record.
        var result = new Record();

        // 6. If availableLocale is not undefined, then
        if (availableLocale !== undefined) {
            // a. Set result.[[locale]] to availableLocale.
            result['[[locale]]'] = availableLocale;

            // b. If locale and noExtensionsLocale are not the same String value, then
            if (String(locale) !== String(noExtensionsLocale)) {
                // i. Let extension be the String value consisting of the first
                //    substring of locale that is a Unicode locale extension sequence.
                var extension = locale.match(expUnicodeExSeq)[0];

                // ii. Let extensionIndex be the character position of the initial
                //     "-" of the first Unicode locale extension sequence within locale.
                var extensionIndex = locale.indexOf('-u-');

                // iii. Set result.[[extension]] to extension.
                result['[[extension]]'] = extension;

                // iv. Set result.[[extensionIndex]] to extensionIndex.
                result['[[extensionIndex]]'] = extensionIndex;
            }
        }
        // 7. Else
        else
            // a. Set result.[[locale]] to the value returned by the DefaultLocale abstract
            //    operation (defined in 6.2.4).
            result['[[locale]]'] = DefaultLocale();

        // 8. Return result
        return result;
    }

    /**
     * The BestFitMatcher abstract operation compares requestedLocales, which must be
     * a List as returned by CanonicalizeLocaleList, against the locales in
     * availableLocales and determines the best available language to meet the
     * request. The algorithm is implementation dependent, but should produce results
     * that a typical user of the requested locales would perceive as at least as
     * good as those produced by the LookupMatcher abstract operation. Options
     * specified through Unicode locale extension sequences must be ignored by the
     * algorithm. Information about such subsequences is returned separately.
     * The abstract operation returns a record with a [[locale]] field, whose value
     * is the language tag of the selected locale, which must be an element of
     * availableLocales. If the language tag of the request locale that led to the
     * selected locale contained a Unicode locale extension sequence, then the
     * returned record also contains an [[extension]] field whose value is the first
     * Unicode locale extension sequence, and an [[extensionIndex]] field whose value
     * is the index of the first Unicode locale extension sequence within the request
     * locale language tag.
     */
    function /* 9.2.4 */BestFitMatcher(availableLocales, requestedLocales) {
        return LookupMatcher(availableLocales, requestedLocales);
    }

    /**
     * The ResolveLocale abstract operation compares a BCP 47 language priority list
     * requestedLocales against the locales in availableLocales and determines the
     * best available language to meet the request. availableLocales and
     * requestedLocales must be provided as List values, options as a Record.
     */
    function /* 9.2.5 */ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData) {
        if (availableLocales.length === 0) {
            throw new ReferenceError('No locale data has been provided for this object yet.');
        }

        // The following steps are taken:
        // 1. Let matcher be the value of options.[[localeMatcher]].
        var matcher = options['[[localeMatcher]]'];

        var r = void 0;

        // 2. If matcher is "lookup", then
        if (matcher === 'lookup')
            // a. Let r be the result of calling the LookupMatcher abstract operation
            //    (defined in 9.2.3) with arguments availableLocales and
            //    requestedLocales.
            r = LookupMatcher(availableLocales, requestedLocales);

            // 3. Else
        else
            // a. Let r be the result of calling the BestFitMatcher abstract
            //    operation (defined in 9.2.4) with arguments availableLocales and
            //    requestedLocales.
            r = BestFitMatcher(availableLocales, requestedLocales);

        // 4. Let foundLocale be the value of r.[[locale]].
        var foundLocale = r['[[locale]]'];

        var extensionSubtags = void 0,
            extensionSubtagsLength = void 0;

        // 5. If r has an [[extension]] field, then
        if (hop.call(r, '[[extension]]')) {
            // a. Let extension be the value of r.[[extension]].
            var extension = r['[[extension]]'];
            // b. Let split be the standard built-in function object defined in ES5,
            //    15.5.4.14.
            var split = String.prototype.split;
            // c. Let extensionSubtags be the result of calling the [[Call]] internal
            //    method of split with extension as the this value and an argument
            //    list containing the single item "-".
            extensionSubtags = split.call(extension, '-');
            // d. Let extensionSubtagsLength be the result of calling the [[Get]]
            //    internal method of extensionSubtags with argument "length".
            extensionSubtagsLength = extensionSubtags.length;
        }

        // 6. Let result be a new Record.
        var result = new Record();

        // 7. Set result.[[dataLocale]] to foundLocale.
        result['[[dataLocale]]'] = foundLocale;

        // 8. Let supportedExtension be "-u".
        var supportedExtension = '-u';
        // 9. Let i be 0.
        var i = 0;
        // 10. Let len be the result of calling the [[Get]] internal method of
        //     relevantExtensionKeys with argument "length".
        var len = relevantExtensionKeys.length;

        // 11 Repeat while i < len:
        while (i < len) {
            // a. Let key be the result of calling the [[Get]] internal method of
            //    relevantExtensionKeys with argument ToString(i).
            var key = relevantExtensionKeys[i];
            // b. Let foundLocaleData be the result of calling the [[Get]] internal
            //    method of localeData with the argument foundLocale.
            var foundLocaleData = localeData[foundLocale];
            // c. Let keyLocaleData be the result of calling the [[Get]] internal
            //    method of foundLocaleData with the argument key.
            var keyLocaleData = foundLocaleData[key];
            // d. Let value be the result of calling the [[Get]] internal method of
            //    keyLocaleData with argument "0".
            var value = keyLocaleData['0'];
            // e. Let supportedExtensionAddition be "".
            var supportedExtensionAddition = '';
            // f. Let indexOf be the standard built-in function object defined in
            //    ES5, 15.4.4.14.
            var indexOf = arrIndexOf;

            // g. If extensionSubtags is not undefined, then
            if (extensionSubtags !== undefined) {
                // i. Let keyPos be the result of calling the [[Call]] internal
                //    method of indexOf with extensionSubtags as the this value and
                // an argument list containing the single item key.
                var keyPos = indexOf.call(extensionSubtags, key);

                // ii. If keyPos ≠ -1, then
                if (keyPos !== -1) {
                    // 1. If keyPos + 1 < extensionSubtagsLength and the length of the
                    //    result of calling the [[Get]] internal method of
                    //    extensionSubtags with argument ToString(keyPos +1) is greater
                    //    than 2, then
                    if (keyPos + 1 < extensionSubtagsLength && extensionSubtags[keyPos + 1].length > 2) {
                        // a. Let requestedValue be the result of calling the [[Get]]
                        //    internal method of extensionSubtags with argument
                        //    ToString(keyPos + 1).
                        var requestedValue = extensionSubtags[keyPos + 1];
                        // b. Let valuePos be the result of calling the [[Call]]
                        //    internal method of indexOf with keyLocaleData as the
                        //    this value and an argument list containing the single
                        //    item requestedValue.
                        var valuePos = indexOf.call(keyLocaleData, requestedValue);

                        // c. If valuePos ≠ -1, then
                        if (valuePos !== -1) {
                            // i. Let value be requestedValue.
                            value = requestedValue,
                            // ii. Let supportedExtensionAddition be the
                            //     concatenation of "-", key, "-", and value.
                            supportedExtensionAddition = '-' + key + '-' + value;
                        }
                    }
                    // 2. Else
                    else {
                            // a. Let valuePos be the result of calling the [[Call]]
                            // internal method of indexOf with keyLocaleData as the this
                            // value and an argument list containing the single item
                            // "true".
                            var _valuePos = indexOf(keyLocaleData, 'true');

                            // b. If valuePos ≠ -1, then
                            if (_valuePos !== -1)
                                // i. Let value be "true".
                                value = 'true';
                        }
                }
            }
            // h. If options has a field [[<key>]], then
            if (hop.call(options, '[[' + key + ']]')) {
                // i. Let optionsValue be the value of options.[[<key>]].
                var optionsValue = options['[[' + key + ']]'];

                // ii. If the result of calling the [[Call]] internal method of indexOf
                //     with keyLocaleData as the this value and an argument list
                //     containing the single item optionsValue is not -1, then
                if (indexOf.call(keyLocaleData, optionsValue) !== -1) {
                    // 1. If optionsValue is not equal to value, then
                    if (optionsValue !== value) {
                        // a. Let value be optionsValue.
                        value = optionsValue;
                        // b. Let supportedExtensionAddition be "".
                        supportedExtensionAddition = '';
                    }
                }
            }
            // i. Set result.[[<key>]] to value.
            result['[[' + key + ']]'] = value;

            // j. Append supportedExtensionAddition to supportedExtension.
            supportedExtension += supportedExtensionAddition;

            // k. Increase i by 1.
            i++;
        }
        // 12. If the length of supportedExtension is greater than 2, then
        if (supportedExtension.length > 2) {
            // a.
            var privateIndex = foundLocale.indexOf("-x-");
            // b.
            if (privateIndex === -1) {
                // i.
                foundLocale = foundLocale + supportedExtension;
            }
            // c.
            else {
                    // i.
                    var preExtension = foundLocale.substring(0, privateIndex);
                    // ii.
                    var postExtension = foundLocale.substring(privateIndex);
                    // iii.
                    foundLocale = preExtension + supportedExtension + postExtension;
                }
            // d. asserting - skipping
            // e.
            foundLocale = CanonicalizeLanguageTag(foundLocale);
        }
        // 13. Set result.[[locale]] to foundLocale.
        result['[[locale]]'] = foundLocale;

        // 14. Return result.
        return result;
    }

    /**
     * The LookupSupportedLocales abstract operation returns the subset of the
     * provided BCP 47 language priority list requestedLocales for which
     * availableLocales has a matching locale when using the BCP 47 Lookup algorithm.
     * Locales appear in the same order in the returned list as in requestedLocales.
     * The following steps are taken:
     */
    function /* 9.2.6 */LookupSupportedLocales(availableLocales, requestedLocales) {
        // 1. Let len be the number of elements in requestedLocales.
        var len = requestedLocales.length;
        // 2. Let subset be a new empty List.
        var subset = new List();
        // 3. Let k be 0.
        var k = 0;

        // 4. Repeat while k < len
        while (k < len) {
            // a. Let locale be the element of requestedLocales at 0-origined list
            //    position k.
            var locale = requestedLocales[k];
            // b. Let noExtensionsLocale be the String value that is locale with all
            //    Unicode locale extension sequences removed.
            var noExtensionsLocale = String(locale).replace(expUnicodeExSeq, '');
            // c. Let availableLocale be the result of calling the
            //    BestAvailableLocale abstract operation (defined in 9.2.2) with
            //    arguments availableLocales and noExtensionsLocale.
            var availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);

            // d. If availableLocale is not undefined, then append locale to the end of
            //    subset.
            if (availableLocale !== undefined) arrPush.call(subset, locale);

            // e. Increment k by 1.
            k++;
        }

        // 5. Let subsetArray be a new Array object whose elements are the same
        //    values in the same order as the elements of subset.
        var subsetArray = arrSlice.call(subset);

        // 6. Return subsetArray.
        return subsetArray;
    }

    /**
     * The BestFitSupportedLocales abstract operation returns the subset of the
     * provided BCP 47 language priority list requestedLocales for which
     * availableLocales has a matching locale when using the Best Fit Matcher
     * algorithm. Locales appear in the same order in the returned list as in
     * requestedLocales. The steps taken are implementation dependent.
     */
    function /*9.2.7 */BestFitSupportedLocales(availableLocales, requestedLocales) {
        // ###TODO: implement this function as described by the specification###
        return LookupSupportedLocales(availableLocales, requestedLocales);
    }

    /**
     * The SupportedLocales abstract operation returns the subset of the provided BCP
     * 47 language priority list requestedLocales for which availableLocales has a
     * matching locale. Two algorithms are available to match the locales: the Lookup
     * algorithm described in RFC 4647 section 3.4, and an implementation dependent
     * best-fit algorithm. Locales appear in the same order in the returned list as
     * in requestedLocales. The following steps are taken:
     */
    function /*9.2.8 */SupportedLocales(availableLocales, requestedLocales, options) {
        var matcher = void 0,
            subset = void 0;

        // 1. If options is not undefined, then
        if (options !== undefined) {
            // a. Let options be ToObject(options).
            options = new Record(toObject(options));
            // b. Let matcher be the result of calling the [[Get]] internal method of
            //    options with argument "localeMatcher".
            matcher = options.localeMatcher;

            // c. If matcher is not undefined, then
            if (matcher !== undefined) {
                // i. Let matcher be ToString(matcher).
                matcher = String(matcher);

                // ii. If matcher is not "lookup" or "best fit", then throw a RangeError
                //     exception.
                if (matcher !== 'lookup' && matcher !== 'best fit') throw new RangeError('matcher should be "lookup" or "best fit"');
            }
        }
        // 2. If matcher is undefined or "best fit", then
        if (matcher === undefined || matcher === 'best fit')
            // a. Let subset be the result of calling the BestFitSupportedLocales
            //    abstract operation (defined in 9.2.7) with arguments
            //    availableLocales and requestedLocales.
            subset = BestFitSupportedLocales(availableLocales, requestedLocales);
            // 3. Else
        else
            // a. Let subset be the result of calling the LookupSupportedLocales
            //    abstract operation (defined in 9.2.6) with arguments
            //    availableLocales and requestedLocales.
            subset = LookupSupportedLocales(availableLocales, requestedLocales);

        // 4. For each named own property name P of subset,
        for (var P in subset) {
            if (!hop.call(subset, P)) continue;

            // a. Let desc be the result of calling the [[GetOwnProperty]] internal
            //    method of subset with P.
            // b. Set desc.[[Writable]] to false.
            // c. Set desc.[[Configurable]] to false.
            // d. Call the [[DefineOwnProperty]] internal method of subset with P, desc,
            //    and true as arguments.
            defineProperty(subset, P, {
                writable: false, configurable: false, value: subset[P]
            });
        }
        // "Freeze" the array so no new elements can be added
        defineProperty(subset, 'length', { writable: false });

        // 5. Return subset
        return subset;
    }

    /**
     * The GetOption abstract operation extracts the value of the property named
     * property from the provided options object, converts it to the required type,
     * checks whether it is one of a List of allowed values, and fills in a fallback
     * value if necessary.
     */
    function /*9.2.9 */GetOption(options, property, type, values, fallback) {
        // 1. Let value be the result of calling the [[Get]] internal method of
        //    options with argument property.
        var value = options[property];

        // 2. If value is not undefined, then
        if (value !== undefined) {
            // a. Assert: type is "boolean" or "string".
            // b. If type is "boolean", then let value be ToBoolean(value).
            // c. If type is "string", then let value be ToString(value).
            value = type === 'boolean' ? Boolean(value) : type === 'string' ? String(value) : value;

            // d. If values is not undefined, then
            if (values !== undefined) {
                // i. If values does not contain an element equal to value, then throw a
                //    RangeError exception.
                if (arrIndexOf.call(values, value) === -1) throw new RangeError("'" + value + "' is not an allowed value for `" + property + '`');
            }

            // e. Return value.
            return value;
        }
        // Else return fallback.
        return fallback;
    }

    /**
     * The GetNumberOption abstract operation extracts a property value from the
     * provided options object, converts it to a Number value, checks whether it is
     * in the allowed range, and fills in a fallback value if necessary.
     */
    function /* 9.2.10 */GetNumberOption(options, property, minimum, maximum, fallback) {
        // 1. Let value be the result of calling the [[Get]] internal method of
        //    options with argument property.
        var value = options[property];

        // 2. If value is not undefined, then
        if (value !== undefined) {
            // a. Let value be ToNumber(value).
            value = Number(value);

            // b. If value is NaN or less than minimum or greater than maximum, throw a
            //    RangeError exception.
            if (isNaN(value) || value < minimum || value > maximum) throw new RangeError('Value is not a number or outside accepted range');

            // c. Return floor(value).
            return Math.floor(value);
        }
        // 3. Else return fallback.
        return fallback;
    }

    // 8 The Intl Object
    var Intl = {};

    // 8.2 Function Properties of the Intl Object

    // 8.2.1
    // @spec[tc39/ecma402/master/spec/intl.html]
    // @clause[sec-intl.getcanonicallocales]
    function getCanonicalLocales(locales) {
        // 1. Let ll be ? CanonicalizeLocaleList(locales).
        var ll = CanonicalizeLocaleList(locales);
        // 2. Return CreateArrayFromList(ll).
        {
            var result = [];

            var len = ll.length;
            var k = 0;

            while (k < len) {
                result[k] = ll[k];
                k++;
            }
            return result;
        }
    }

    Object.defineProperty(Intl, 'getCanonicalLocales', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: getCanonicalLocales
    });

    // Currency minor units output from get-4217 grunt task, formatted
    var currencyMinorUnits = {
        BHD: 3, BYR: 0, XOF: 0, BIF: 0, XAF: 0, CLF: 4, CLP: 0, KMF: 0, DJF: 0,
        XPF: 0, GNF: 0, ISK: 0, IQD: 3, JPY: 0, JOD: 3, KRW: 0, KWD: 3, LYD: 3,
        OMR: 3, PYG: 0, RWF: 0, TND: 3, UGX: 0, UYI: 0, VUV: 0, VND: 0
    };

    // Define the NumberFormat constructor internally so it cannot be tainted
    function NumberFormatConstructor() {
        var locales = arguments[0];
        var options = arguments[1];

        if (!this || this === Intl) {
            return new Intl.NumberFormat(locales, options);
        }

        return InitializeNumberFormat(toObject(this), locales, options);
    }

    defineProperty(Intl, 'NumberFormat', {
        configurable: true,
        writable: true,
        value: NumberFormatConstructor
    });

    // Must explicitly set prototypes as unwritable
    defineProperty(Intl.NumberFormat, 'prototype', {
        writable: false
    });

    /**
     * The abstract operation InitializeNumberFormat accepts the arguments
     * numberFormat (which must be an object), locales, and options. It initializes
     * numberFormat as a NumberFormat object.
     */
    function /*11.1.1.1 */InitializeNumberFormat(numberFormat, locales, options) {
        // This will be a internal properties object if we're not already initialized
        var internal = getInternalProperties(numberFormat);

        // Create an object whose props can be used to restore the values of RegExp props
        var regexpRestore = createRegExpRestore();

        // 1. If numberFormat has an [[initializedIntlObject]] internal property with
        // value true, throw a TypeError exception.
        if (internal['[[initializedIntlObject]]'] === true) throw new TypeError('`this` object has already been initialized as an Intl object');

        // Need this to access the `internal` object
        defineProperty(numberFormat, '__getInternalProperties', {
            value: function value() {
                // NOTE: Non-standard, for internal use only
                if (arguments[0] === secret) return internal;
            }
        });

        // 2. Set the [[initializedIntlObject]] internal property of numberFormat to true.
        internal['[[initializedIntlObject]]'] = true;

        // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
        //    abstract operation (defined in 9.2.1) with argument locales.
        var requestedLocales = CanonicalizeLocaleList(locales);

        // 4. If options is undefined, then
        if (options === undefined)
            // a. Let options be the result of creating a new object as if by the
            // expression new Object() where Object is the standard built-in constructor
            // with that name.
            options = {};

            // 5. Else
        else
            // a. Let options be ToObject(options).
            options = toObject(options);

        // 6. Let opt be a new Record.
        var opt = new Record(),


        // 7. Let matcher be the result of calling the GetOption abstract operation
        //    (defined in 9.2.9) with the arguments options, "localeMatcher", "string",
        //    a List containing the two String values "lookup" and "best fit", and
        //    "best fit".
        matcher = GetOption(options, 'localeMatcher', 'string', new List('lookup', 'best fit'), 'best fit');

        // 8. Set opt.[[localeMatcher]] to matcher.
        opt['[[localeMatcher]]'] = matcher;

        // 9. Let NumberFormat be the standard built-in object that is the initial value
        //    of Intl.NumberFormat.
        // 10. Let localeData be the value of the [[localeData]] internal property of
        //     NumberFormat.
        var localeData = internals.NumberFormat['[[localeData]]'];

        // 11. Let r be the result of calling the ResolveLocale abstract operation
        //     (defined in 9.2.5) with the [[availableLocales]] internal property of
        //     NumberFormat, requestedLocales, opt, the [[relevantExtensionKeys]]
        //     internal property of NumberFormat, and localeData.
        var r = ResolveLocale(internals.NumberFormat['[[availableLocales]]'], requestedLocales, opt, internals.NumberFormat['[[relevantExtensionKeys]]'], localeData);

        // 12. Set the [[locale]] internal property of numberFormat to the value of
        //     r.[[locale]].
        internal['[[locale]]'] = r['[[locale]]'];

        // 13. Set the [[numberingSystem]] internal property of numberFormat to the value
        //     of r.[[nu]].
        internal['[[numberingSystem]]'] = r['[[nu]]'];

        // The specification doesn't tell us to do this, but it's helpful later on
        internal['[[dataLocale]]'] = r['[[dataLocale]]'];

        // 14. Let dataLocale be the value of r.[[dataLocale]].
        var dataLocale = r['[[dataLocale]]'];

        // 15. Let s be the result of calling the GetOption abstract operation with the
        //     arguments options, "style", "string", a List containing the three String
        //     values "decimal", "percent", and "currency", and "decimal".
        var s = GetOption(options, 'style', 'string', new List('decimal', 'percent', 'currency'), 'decimal');

        // 16. Set the [[style]] internal property of numberFormat to s.
        internal['[[style]]'] = s;

        // 17. Let c be the result of calling the GetOption abstract operation with the
        //     arguments options, "currency", "string", undefined, and undefined.
        var c = GetOption(options, 'currency', 'string');

        // 18. If c is not undefined and the result of calling the
        //     IsWellFormedCurrencyCode abstract operation (defined in 6.3.1) with
        //     argument c is false, then throw a RangeError exception.
        if (c !== undefined && !IsWellFormedCurrencyCode(c)) throw new RangeError("'" + c + "' is not a valid currency code");

        // 19. If s is "currency" and c is undefined, throw a TypeError exception.
        if (s === 'currency' && c === undefined) throw new TypeError('Currency code is required when style is currency');

        var cDigits = void 0;

        // 20. If s is "currency", then
        if (s === 'currency') {
            // a. Let c be the result of converting c to upper case as specified in 6.1.
            c = c.toUpperCase();

            // b. Set the [[currency]] internal property of numberFormat to c.
            internal['[[currency]]'] = c;

            // c. Let cDigits be the result of calling the CurrencyDigits abstract
            //    operation (defined below) with argument c.
            cDigits = CurrencyDigits(c);
        }

        // 21. Let cd be the result of calling the GetOption abstract operation with the
        //     arguments options, "currencyDisplay", "string", a List containing the
        //     three String values "code", "symbol", and "name", and "symbol".
        var cd = GetOption(options, 'currencyDisplay', 'string', new List('code', 'symbol', 'name'), 'symbol');

        // 22. If s is "currency", then set the [[currencyDisplay]] internal property of
        //     numberFormat to cd.
        if (s === 'currency') internal['[[currencyDisplay]]'] = cd;

        // 23. Let mnid be the result of calling the GetNumberOption abstract operation
        //     (defined in 9.2.10) with arguments options, "minimumIntegerDigits", 1, 21,
        //     and 1.
        var mnid = GetNumberOption(options, 'minimumIntegerDigits', 1, 21, 1);

        // 24. Set the [[minimumIntegerDigits]] internal property of numberFormat to mnid.
        internal['[[minimumIntegerDigits]]'] = mnid;

        // 25. If s is "currency", then let mnfdDefault be cDigits; else let mnfdDefault
        //     be 0.
        var mnfdDefault = s === 'currency' ? cDigits : 0;

        // 26. Let mnfd be the result of calling the GetNumberOption abstract operation
        //     with arguments options, "minimumFractionDigits", 0, 20, and mnfdDefault.
        var mnfd = GetNumberOption(options, 'minimumFractionDigits', 0, 20, mnfdDefault);

        // 27. Set the [[minimumFractionDigits]] internal property of numberFormat to mnfd.
        internal['[[minimumFractionDigits]]'] = mnfd;

        // 28. If s is "currency", then let mxfdDefault be max(mnfd, cDigits); else if s
        //     is "percent", then let mxfdDefault be max(mnfd, 0); else let mxfdDefault
        //     be max(mnfd, 3).
        var mxfdDefault = s === 'currency' ? Math.max(mnfd, cDigits) : s === 'percent' ? Math.max(mnfd, 0) : Math.max(mnfd, 3);

        // 29. Let mxfd be the result of calling the GetNumberOption abstract operation
        //     with arguments options, "maximumFractionDigits", mnfd, 20, and mxfdDefault.
        var mxfd = GetNumberOption(options, 'maximumFractionDigits', mnfd, 20, mxfdDefault);

        // 30. Set the [[maximumFractionDigits]] internal property of numberFormat to mxfd.
        internal['[[maximumFractionDigits]]'] = mxfd;

        // 31. Let mnsd be the result of calling the [[Get]] internal method of options
        //     with argument "minimumSignificantDigits".
        var mnsd = options.minimumSignificantDigits;

        // 32. Let mxsd be the result of calling the [[Get]] internal method of options
        //     with argument "maximumSignificantDigits".
        var mxsd = options.maximumSignificantDigits;

        // 33. If mnsd is not undefined or mxsd is not undefined, then:
        if (mnsd !== undefined || mxsd !== undefined) {
            // a. Let mnsd be the result of calling the GetNumberOption abstract
            //    operation with arguments options, "minimumSignificantDigits", 1, 21,
            //    and 1.
            mnsd = GetNumberOption(options, 'minimumSignificantDigits', 1, 21, 1);

            // b. Let mxsd be the result of calling the GetNumberOption abstract
            //     operation with arguments options, "maximumSignificantDigits", mnsd,
            //     21, and 21.
            mxsd = GetNumberOption(options, 'maximumSignificantDigits', mnsd, 21, 21);

            // c. Set the [[minimumSignificantDigits]] internal property of numberFormat
            //    to mnsd, and the [[maximumSignificantDigits]] internal property of
            //    numberFormat to mxsd.
            internal['[[minimumSignificantDigits]]'] = mnsd;
            internal['[[maximumSignificantDigits]]'] = mxsd;
        }
        // 34. Let g be the result of calling the GetOption abstract operation with the
        //     arguments options, "useGrouping", "boolean", undefined, and true.
        var g = GetOption(options, 'useGrouping', 'boolean', undefined, true);

        // 35. Set the [[useGrouping]] internal property of numberFormat to g.
        internal['[[useGrouping]]'] = g;

        // 36. Let dataLocaleData be the result of calling the [[Get]] internal method of
        //     localeData with argument dataLocale.
        var dataLocaleData = localeData[dataLocale];

        // 37. Let patterns be the result of calling the [[Get]] internal method of
        //     dataLocaleData with argument "patterns".
        var patterns = dataLocaleData.patterns;

        // 38. Assert: patterns is an object (see 11.2.3)

        // 39. Let stylePatterns be the result of calling the [[Get]] internal method of
        //     patterns with argument s.
        var stylePatterns = patterns[s];

        // 40. Set the [[positivePattern]] internal property of numberFormat to the
        //     result of calling the [[Get]] internal method of stylePatterns with the
        //     argument "positivePattern".
        internal['[[positivePattern]]'] = stylePatterns.positivePattern;

        // 41. Set the [[negativePattern]] internal property of numberFormat to the
        //     result of calling the [[Get]] internal method of stylePatterns with the
        //     argument "negativePattern".
        internal['[[negativePattern]]'] = stylePatterns.negativePattern;

        // 42. Set the [[boundFormat]] internal property of numberFormat to undefined.
        internal['[[boundFormat]]'] = undefined;

        // 43. Set the [[initializedNumberFormat]] internal property of numberFormat to
        //     true.
        internal['[[initializedNumberFormat]]'] = true;

        // In ES3, we need to pre-bind the format() function
        if (es3) numberFormat.format = GetFormatNumber.call(numberFormat);

        // Restore the RegExp properties
        regexpRestore();

        // Return the newly initialised object
        return numberFormat;
    }

    function CurrencyDigits(currency) {
        // When the CurrencyDigits abstract operation is called with an argument currency
        // (which must be an upper case String value), the following steps are taken:

        // 1. If the ISO 4217 currency and funds code list contains currency as an
        // alphabetic code, then return the minor unit value corresponding to the
        // currency from the list; else return 2.
        return currencyMinorUnits[currency] !== undefined ? currencyMinorUnits[currency] : 2;
    }

    /* 11.2.3 */internals.NumberFormat = {
        '[[availableLocales]]': [],
        '[[relevantExtensionKeys]]': ['nu'],
        '[[localeData]]': {}
    };

    /**
     * When the supportedLocalesOf method of Intl.NumberFormat is called, the
     * following steps are taken:
     */
    /* 11.2.2 */
    defineProperty(Intl.NumberFormat, 'supportedLocalesOf', {
        configurable: true,
        writable: true,
        value: fnBind.call(function (locales) {
            // Bound functions only have the `this` value altered if being used as a constructor,
            // this lets us imitate a native function that has no constructor
            if (!hop.call(this, '[[availableLocales]]')) throw new TypeError('supportedLocalesOf() is not a constructor');

            // Create an object whose props can be used to restore the values of RegExp props
            var regexpRestore = createRegExpRestore(),


            // 1. If options is not provided, then let options be undefined.
            options = arguments[1],


            // 2. Let availableLocales be the value of the [[availableLocales]] internal
            //    property of the standard built-in object that is the initial value of
            //    Intl.NumberFormat.

            availableLocales = this['[[availableLocales]]'],


            // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
            //    abstract operation (defined in 9.2.1) with argument locales.
            requestedLocales = CanonicalizeLocaleList(locales);

            // Restore the RegExp properties
            regexpRestore();

            // 4. Return the result of calling the SupportedLocales abstract operation
            //    (defined in 9.2.8) with arguments availableLocales, requestedLocales,
            //    and options.
            return SupportedLocales(availableLocales, requestedLocales, options);
        }, internals.NumberFormat)
    });

    /**
     * This named accessor property returns a function that formats a number
     * according to the effective locale and the formatting options of this
     * NumberFormat object.
     */
    /* 11.3.2 */defineProperty(Intl.NumberFormat.prototype, 'format', {
        configurable: true,
        get: GetFormatNumber
    });

    function GetFormatNumber() {
        var internal = this !== null && babelHelpers$1["typeof"](this) === 'object' && getInternalProperties(this);

        // Satisfy test 11.3_b
        if (!internal || !internal['[[initializedNumberFormat]]']) throw new TypeError('`this` value for format() is not an initialized Intl.NumberFormat object.');

        // The value of the [[Get]] attribute is a function that takes the following
        // steps:

        // 1. If the [[boundFormat]] internal property of this NumberFormat object
        //    is undefined, then:
        if (internal['[[boundFormat]]'] === undefined) {
            // a. Let F be a Function object, with internal properties set as
            //    specified for built-in functions in ES5, 15, or successor, and the
            //    length property set to 1, that takes the argument value and
            //    performs the following steps:
            var F = function F(value) {
                // i. If value is not provided, then let value be undefined.
                // ii. Let x be ToNumber(value).
                // iii. Return the result of calling the FormatNumber abstract
                //      operation (defined below) with arguments this and x.
                return FormatNumber(this, /* x = */Number(value));
            };

            // b. Let bind be the standard built-in function object defined in ES5,
            //    15.3.4.5.
            // c. Let bf be the result of calling the [[Call]] internal method of
            //    bind with F as the this value and an argument list containing
            //    the single item this.
            var bf = fnBind.call(F, this);

            // d. Set the [[boundFormat]] internal property of this NumberFormat
            //    object to bf.
            internal['[[boundFormat]]'] = bf;
        }
        // Return the value of the [[boundFormat]] internal property of this
        // NumberFormat object.
        return internal['[[boundFormat]]'];
    }

    function formatToParts() {
        var value = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

        var internal = this !== null && babelHelpers$1["typeof"](this) === 'object' && getInternalProperties(this);
        if (!internal || !internal['[[initializedNumberFormat]]']) throw new TypeError('`this` value for formatToParts() is not an initialized Intl.NumberFormat object.');

        var x = Number(value);
        return FormatNumberToParts(this, x);
    }

    Object.defineProperty(Intl.NumberFormat.prototype, 'formatToParts', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: formatToParts
    });

    /*
     * @spec[stasm/ecma402/number-format-to-parts/spec/numberformat.html]
     * @clause[sec-formatnumbertoparts]
     */
    function FormatNumberToParts(numberFormat, x) {
        // 1. Let parts be ? PartitionNumberPattern(numberFormat, x).
        var parts = PartitionNumberPattern(numberFormat, x);
        // 2. Let result be ArrayCreate(0).
        var result = [];
        // 3. Let n be 0.
        var n = 0;
        // 4. For each part in parts, do:
        for (var i = 0; parts.length > i; i++) {
            var part = parts[i];
            // a. Let O be ObjectCreate(%ObjectPrototype%).
            var O = {};
            // a. Perform ? CreateDataPropertyOrThrow(O, "type", part.[[type]]).
            O.type = part['[[type]]'];
            // a. Perform ? CreateDataPropertyOrThrow(O, "value", part.[[value]]).
            O.value = part['[[value]]'];
            // a. Perform ? CreateDataPropertyOrThrow(result, ? ToString(n), O).
            result[n] = O;
            // a. Increment n by 1.
            n += 1;
        }
        // 5. Return result.
        return result;
    }

    /*
     * @spec[stasm/ecma402/number-format-to-parts/spec/numberformat.html]
     * @clause[sec-partitionnumberpattern]
     */
    function PartitionNumberPattern(numberFormat, x) {

        var internal = getInternalProperties(numberFormat),
            locale = internal['[[dataLocale]]'],
            nums = internal['[[numberingSystem]]'],
            data = internals.NumberFormat['[[localeData]]'][locale],
            ild = data.symbols[nums] || data.symbols.latn,
            pattern = void 0;

        // 1. If x is not NaN and x < 0, then:
        if (!isNaN(x) && x < 0) {
            // a. Let x be -x.
            x = -x;
            // a. Let pattern be the value of numberFormat.[[negativePattern]].
            pattern = internal['[[negativePattern]]'];
        }
        // 2. Else,
        else {
                // a. Let pattern be the value of numberFormat.[[positivePattern]].
                pattern = internal['[[positivePattern]]'];
            }
        // 3. Let result be a new empty List.
        var result = new List();
        // 4. Let beginIndex be Call(%StringProto_indexOf%, pattern, "{", 0).
        var beginIndex = pattern.indexOf('{', 0);
        // 5. Let endIndex be 0.
        var endIndex = 0;
        // 6. Let nextIndex be 0.
        var nextIndex = 0;
        // 7. Let length be the number of code units in pattern.
        var length = pattern.length;
        // 8. Repeat while beginIndex is an integer index into pattern:
        while (beginIndex > -1 && beginIndex < length) {
            // a. Set endIndex to Call(%StringProto_indexOf%, pattern, "}", beginIndex)
            endIndex = pattern.indexOf('}', beginIndex);
            // a. If endIndex = -1, throw new Error exception.
            if (endIndex === -1) throw new Error();
            // a. If beginIndex is greater than nextIndex, then:
            if (beginIndex > nextIndex) {
                // i. Let literal be a substring of pattern from position nextIndex, inclusive, to position beginIndex, exclusive.
                var literal = pattern.substring(nextIndex, beginIndex);
                // ii. Add new part record { [[type]]: "literal", [[value]]: literal } as a new element of the list result.
                arrPush.call(result, { '[[type]]': 'literal', '[[value]]': literal });
            }
            // a. Let p be the substring of pattern from position beginIndex, exclusive, to position endIndex, exclusive.
            var p = pattern.substring(beginIndex + 1, endIndex);
            // a. If p is equal "number", then:
            if (p === "number") {
                // i. If x is NaN,
                if (isNaN(x)) {
                    // 1. Let n be an ILD String value indicating the NaN value.
                    var n = ild.nan;
                    // 2. Add new part record { [[type]]: "nan", [[value]]: n } as a new element of the list result.
                    arrPush.call(result, { '[[type]]': 'nan', '[[value]]': n });
                }
                // ii. Else if isFinite(x) is false,
                else if (!isFinite(x)) {
                        // 1. Let n be an ILD String value indicating infinity.
                        var _n = ild.infinity;
                        // 2. Add new part record { [[type]]: "infinity", [[value]]: n } as a new element of the list result.
                        arrPush.call(result, { '[[type]]': 'infinity', '[[value]]': _n });
                    }
                    // iii. Else,
                    else {
                            // 1. If the value of numberFormat.[[style]] is "percent" and isFinite(x), let x be 100 × x.
                            if (internal['[[style]]'] === 'percent' && isFinite(x)) x *= 100;

                            var _n2 = void 0;
                            // 2. If the numberFormat.[[minimumSignificantDigits]] and numberFormat.[[maximumSignificantDigits]] are present, then
                            if (hop.call(internal, '[[minimumSignificantDigits]]') && hop.call(internal, '[[maximumSignificantDigits]]')) {
                                // a. Let n be ToRawPrecision(x, numberFormat.[[minimumSignificantDigits]], numberFormat.[[maximumSignificantDigits]]).
                                _n2 = ToRawPrecision(x, internal['[[minimumSignificantDigits]]'], internal['[[maximumSignificantDigits]]']);
                            }
                            // 3. Else,
                            else {
                                    // a. Let n be ToRawFixed(x, numberFormat.[[minimumIntegerDigits]], numberFormat.[[minimumFractionDigits]], numberFormat.[[maximumFractionDigits]]).
                                    _n2 = ToRawFixed(x, internal['[[minimumIntegerDigits]]'], internal['[[minimumFractionDigits]]'], internal['[[maximumFractionDigits]]']);
                                }
                            // 4. If the value of the numberFormat.[[numberingSystem]] matches one of the values in the "Numbering System" column of Table 2 below, then
                            if (numSys[nums]) {
                                (function () {
                                    // a. Let digits be an array whose 10 String valued elements are the UTF-16 string representations of the 10 digits specified in the "Digits" column of the matching row in Table 2.
                                    var digits = numSys[nums];
                                    // a. Replace each digit in n with the value of digits[digit].
                                    _n2 = String(_n2).replace(/\d/g, function (digit) {
                                        return digits[digit];
                                    });
                                })();
                            }
                            // 5. Else use an implementation dependent algorithm to map n to the appropriate representation of n in the given numbering system.
                            else _n2 = String(_n2); // ###TODO###

                            var integer = void 0;
                            var fraction = void 0;
                            // 6. Let decimalSepIndex be Call(%StringProto_indexOf%, n, ".", 0).
                            var decimalSepIndex = _n2.indexOf('.', 0);
                            // 7. If decimalSepIndex > 0, then:
                            if (decimalSepIndex > 0) {
                                // a. Let integer be the substring of n from position 0, inclusive, to position decimalSepIndex, exclusive.
                                integer = _n2.substring(0, decimalSepIndex);
                                // a. Let fraction be the substring of n from position decimalSepIndex, exclusive, to the end of n.
                                fraction = _n2.substring(decimalSepIndex + 1, decimalSepIndex.length);
                            }
                            // 8. Else:
                            else {
                                    // a. Let integer be n.
                                    integer = _n2;
                                    // a. Let fraction be undefined.
                                    fraction = undefined;
                                }
                            // 9. If the value of the numberFormat.[[useGrouping]] is true,
                            if (internal['[[useGrouping]]'] === true) {
                                // a. Let groupSepSymbol be the ILND String representing the grouping separator.
                                var groupSepSymbol = ild.group;
                                // a. Let groups be a List whose elements are, in left to right order, the substrings defined by ILND set of locations within the integer.
                                var groups = [];
                                // ----> implementation:
                                // Primary group represents the group closest to the decimal
                                var pgSize = data.patterns.primaryGroupSize || 3;
                                // Secondary group is every other group
                                var sgSize = data.patterns.secondaryGroupSize || pgSize;
                                // Group only if necessary
                                if (integer.length > pgSize) {
                                    // Index of the primary grouping separator
                                    var end = integer.length - pgSize;
                                    // Starting index for our loop
                                    var idx = end % sgSize;
                                    var start = integer.slice(0, idx);
                                    if (start.length) arrPush.call(groups, start);
                                    // Loop to separate into secondary grouping digits
                                    while (idx < end) {
                                        arrPush.call(groups, integer.slice(idx, idx + sgSize));
                                        idx += sgSize;
                                    }
                                    // Add the primary grouping digits
                                    arrPush.call(groups, integer.slice(end));
                                } else {
                                    arrPush.call(groups, integer);
                                }
                                // a. Assert: The number of elements in groups List is greater than 0.
                                if (groups.length === 0) throw new Error();
                                // a. Repeat, while groups List is not empty:
                                while (groups.length) {
                                    // i. Remove the first element from groups and let integerGroup be the value of that element.
                                    var integerGroup = arrShift.call(groups);
                                    // ii. Add new part record { [[type]]: "integer", [[value]]: integerGroup } as a new element of the list result.
                                    arrPush.call(result, { '[[type]]': 'integer', '[[value]]': integerGroup });
                                    // iii. If groups List is not empty, then:
                                    if (groups.length) {
                                        // 1. Add new part record { [[type]]: "group", [[value]]: groupSepSymbol } as a new element of the list result.
                                        arrPush.call(result, { '[[type]]': 'group', '[[value]]': groupSepSymbol });
                                    }
                                }
                            }
                            // 10. Else,
                            else {
                                    // a. Add new part record { [[type]]: "integer", [[value]]: integer } as a new element of the list result.
                                    arrPush.call(result, { '[[type]]': 'integer', '[[value]]': integer });
                                }
                            // 11. If fraction is not undefined, then:
                            if (fraction !== undefined) {
                                // a. Let decimalSepSymbol be the ILND String representing the decimal separator.
                                var decimalSepSymbol = ild.decimal;
                                // a. Add new part record { [[type]]: "decimal", [[value]]: decimalSepSymbol } as a new element of the list result.
                                arrPush.call(result, { '[[type]]': 'decimal', '[[value]]': decimalSepSymbol });
                                // a. Add new part record { [[type]]: "fraction", [[value]]: fraction } as a new element of the list result.
                                arrPush.call(result, { '[[type]]': 'fraction', '[[value]]': fraction });
                            }
                        }
            }
            // a. Else if p is equal "plusSign", then:
            else if (p === "plusSign") {
                    // i. Let plusSignSymbol be the ILND String representing the plus sign.
                    var plusSignSymbol = ild.plusSign;
                    // ii. Add new part record { [[type]]: "plusSign", [[value]]: plusSignSymbol } as a new element of the list result.
                    arrPush.call(result, { '[[type]]': 'plusSign', '[[value]]': plusSignSymbol });
                }
                // a. Else if p is equal "minusSign", then:
                else if (p === "minusSign") {
                        // i. Let minusSignSymbol be the ILND String representing the minus sign.
                        var minusSignSymbol = ild.minusSign;
                        // ii. Add new part record { [[type]]: "minusSign", [[value]]: minusSignSymbol } as a new element of the list result.
                        arrPush.call(result, { '[[type]]': 'minusSign', '[[value]]': minusSignSymbol });
                    }
                    // a. Else if p is equal "percentSign" and numberFormat.[[style]] is "percent", then:
                    else if (p === "percentSign" && internal['[[style]]'] === "percent") {
                            // i. Let percentSignSymbol be the ILND String representing the percent sign.
                            var percentSignSymbol = ild.percentSign;
                            // ii. Add new part record { [[type]]: "percentSign", [[value]]: percentSignSymbol } as a new element of the list result.
                            arrPush.call(result, { '[[type]]': 'literal', '[[value]]': percentSignSymbol });
                        }
                        // a. Else if p is equal "currency" and numberFormat.[[style]] is "currency", then:
                        else if (p === "currency" && internal['[[style]]'] === "currency") {
                                // i. Let currency be the value of numberFormat.[[currency]].
                                var currency = internal['[[currency]]'];

                                var cd = void 0;

                                // ii. If numberFormat.[[currencyDisplay]] is "code", then
                                if (internal['[[currencyDisplay]]'] === "code") {
                                    // 1. Let cd be currency.
                                    cd = currency;
                                }
                                // iii. Else if numberFormat.[[currencyDisplay]] is "symbol", then
                                else if (internal['[[currencyDisplay]]'] === "symbol") {
                                        // 1. Let cd be an ILD string representing currency in short form. If the implementation does not have such a representation of currency, use currency itself.
                                        cd = data.currencies[currency] || currency;
                                    }
                                    // iv. Else if numberFormat.[[currencyDisplay]] is "name", then
                                    else if (internal['[[currencyDisplay]]'] === "name") {
                                            // 1. Let cd be an ILD string representing currency in long form. If the implementation does not have such a representation of currency, then use currency itself.
                                            cd = currency;
                                        }
                                // v. Add new part record { [[type]]: "currency", [[value]]: cd } as a new element of the list result.
                                arrPush.call(result, { '[[type]]': 'currency', '[[value]]': cd });
                            }
                            // a. Else,
                            else {
                                    // i. Let literal be the substring of pattern from position beginIndex, inclusive, to position endIndex, inclusive.
                                    var _literal = pattern.substring(beginIndex, endIndex);
                                    // ii. Add new part record { [[type]]: "literal", [[value]]: literal } as a new element of the list result.
                                    arrPush.call(result, { '[[type]]': 'literal', '[[value]]': _literal });
                                }
            // a. Set nextIndex to endIndex + 1.
            nextIndex = endIndex + 1;
            // a. Set beginIndex to Call(%StringProto_indexOf%, pattern, "{", nextIndex)
            beginIndex = pattern.indexOf('{', nextIndex);
        }
        // 9. If nextIndex is less than length, then:
        if (nextIndex < length) {
            // a. Let literal be the substring of pattern from position nextIndex, inclusive, to position length, exclusive.
            var _literal2 = pattern.substring(nextIndex, length);
            // a. Add new part record { [[type]]: "literal", [[value]]: literal } as a new element of the list result.
            arrPush.call(result, { '[[type]]': 'literal', '[[value]]': _literal2 });
        }
        // 10. Return result.
        return result;
    }

    /*
     * @spec[stasm/ecma402/number-format-to-parts/spec/numberformat.html]
     * @clause[sec-formatnumber]
     */
    function FormatNumber(numberFormat, x) {
        // 1. Let parts be ? PartitionNumberPattern(numberFormat, x).
        var parts = PartitionNumberPattern(numberFormat, x);
        // 2. Let result be an empty String.
        var result = '';
        // 3. For each part in parts, do:
        for (var i = 0; parts.length > i; i++) {
            var part = parts[i];
            // a. Set result to a String value produced by concatenating result and part.[[value]].
            result += part['[[value]]'];
        }
        // 4. Return result.
        return result;
    }

    /**
     * When the ToRawPrecision abstract operation is called with arguments x (which
     * must be a finite non-negative number), minPrecision, and maxPrecision (both
     * must be integers between 1 and 21) the following steps are taken:
     */
    function ToRawPrecision(x, minPrecision, maxPrecision) {
        // 1. Let p be maxPrecision.
        var p = maxPrecision;

        var m = void 0,
            e = void 0;

        // 2. If x = 0, then
        if (x === 0) {
            // a. Let m be the String consisting of p occurrences of the character "0".
            m = arrJoin.call(Array(p + 1), '0');
            // b. Let e be 0.
            e = 0;
        }
        // 3. Else
        else {
                // a. Let e and n be integers such that 10ᵖ⁻¹ ≤ n < 10ᵖ and for which the
                //    exact mathematical value of n × 10ᵉ⁻ᵖ⁺¹ – x is as close to zero as
                //    possible. If there are two such sets of e and n, pick the e and n for
                //    which n × 10ᵉ⁻ᵖ⁺¹ is larger.
                e = log10Floor(Math.abs(x));

                // Easier to get to m from here
                var f = Math.round(Math.exp(Math.abs(e - p + 1) * Math.LN10));

                // b. Let m be the String consisting of the digits of the decimal
                //    representation of n (in order, with no leading zeroes)
                m = String(Math.round(e - p + 1 < 0 ? x * f : x / f));
            }

        // 4. If e ≥ p, then
        if (e >= p)
            // a. Return the concatenation of m and e-p+1 occurrences of the character "0".
            return m + arrJoin.call(Array(e - p + 1 + 1), '0');

            // 5. If e = p-1, then
        else if (e === p - 1)
                // a. Return m.
                return m;

                // 6. If e ≥ 0, then
            else if (e >= 0)
                    // a. Let m be the concatenation of the first e+1 characters of m, the character
                    //    ".", and the remaining p–(e+1) characters of m.
                    m = m.slice(0, e + 1) + '.' + m.slice(e + 1);

                    // 7. If e < 0, then
                else if (e < 0)
                        // a. Let m be the concatenation of the String "0.", –(e+1) occurrences of the
                        //    character "0", and the string m.
                        m = '0.' + arrJoin.call(Array(-(e + 1) + 1), '0') + m;

        // 8. If m contains the character ".", and maxPrecision > minPrecision, then
        if (m.indexOf(".") >= 0 && maxPrecision > minPrecision) {
            // a. Let cut be maxPrecision – minPrecision.
            var cut = maxPrecision - minPrecision;

            // b. Repeat while cut > 0 and the last character of m is "0":
            while (cut > 0 && m.charAt(m.length - 1) === '0') {
                //  i. Remove the last character from m.
                m = m.slice(0, -1);

                //  ii. Decrease cut by 1.
                cut--;
            }

            // c. If the last character of m is ".", then
            if (m.charAt(m.length - 1) === '.')
                //    i. Remove the last character from m.
                m = m.slice(0, -1);
        }
        // 9. Return m.
        return m;
    }

    /**
     * @spec[tc39/ecma402/master/spec/numberformat.html]
     * @clause[sec-torawfixed]
     * When the ToRawFixed abstract operation is called with arguments x (which must
     * be a finite non-negative number), minInteger (which must be an integer between
     * 1 and 21), minFraction, and maxFraction (which must be integers between 0 and
     * 20) the following steps are taken:
     */
    function ToRawFixed(x, minInteger, minFraction, maxFraction) {
        // 1. Let f be maxFraction.
        var f = maxFraction;
        // 2. Let n be an integer for which the exact mathematical value of n ÷ 10f – x is as close to zero as possible. If there are two such n, pick the larger n.
        var n = Math.pow(10, f) * x; // diverging...
        // 3. If n = 0, let m be the String "0". Otherwise, let m be the String consisting of the digits of the decimal representation of n (in order, with no leading zeroes).
        var m = n === 0 ? "0" : n.toFixed(0); // divering...

        {
            // this diversion is needed to take into consideration big numbers, e.g.:
            // 1.2344501e+37 -> 12344501000000000000000000000000000000
            var idx = void 0;
            var exp = (idx = m.indexOf('e')) > -1 ? m.slice(idx + 1) : 0;
            if (exp) {
                m = m.slice(0, idx).replace('.', '');
                m += arrJoin.call(Array(exp - (m.length - 1) + 1), '0');
            }
        }

        var int = void 0;
        // 4. If f ≠ 0, then
        if (f !== 0) {
            // a. Let k be the number of characters in m.
            var k = m.length;
            // a. If k ≤ f, then
            if (k <= f) {
                // i. Let z be the String consisting of f+1–k occurrences of the character "0".
                var z = arrJoin.call(Array(f + 1 - k + 1), '0');
                // ii. Let m be the concatenation of Strings z and m.
                m = z + m;
                // iii. Let k be f+1.
                k = f + 1;
            }
            // a. Let a be the first k–f characters of m, and let b be the remaining f characters of m.
            var a = m.substring(0, k - f),
                b = m.substring(k - f, m.length);
            // a. Let m be the concatenation of the three Strings a, ".", and b.
            m = a + "." + b;
            // a. Let int be the number of characters in a.
            int = a.length;
        }
        // 5. Else, let int be the number of characters in m.
        else int = m.length;
        // 6. Let cut be maxFraction – minFraction.
        var cut = maxFraction - minFraction;
        // 7. Repeat while cut > 0 and the last character of m is "0":
        while (cut > 0 && m.slice(-1) === "0") {
            // a. Remove the last character from m.
            m = m.slice(0, -1);
            // a. Decrease cut by 1.
            cut--;
        }
        // 8. If the last character of m is ".", then
        if (m.slice(-1) === ".") {
            // a. Remove the last character from m.
            m = m.slice(0, -1);
        }
        // 9. If int < minInteger, then
        if (int < minInteger) {
            // a. Let z be the String consisting of minInteger–int occurrences of the character "0".
            var _z = arrJoin.call(Array(minInteger - int + 1), '0');
            // a. Let m be the concatenation of Strings z and m.
            m = _z + m;
        }
        // 10. Return m.
        return m;
    }

    // Sect 11.3.2 Table 2, Numbering systems
    // ======================================
    var numSys = {
        arab: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"],
        arabext: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"],
        bali: ["᭐", "᭑", "᭒", "᭓", "᭔", "᭕", "᭖", "᭗", "᭘", "᭙"],
        beng: ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"],
        deva: ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"],
        fullwide: ["０", "１", "２", "３", "４", "５", "６", "７", "８", "９"],
        gujr: ["૦", "૧", "૨", "૩", "૪", "૫", "૬", "૭", "૮", "૯"],
        guru: ["੦", "੧", "੨", "੩", "੪", "੫", "੬", "੭", "੮", "੯"],
        hanidec: ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
        khmr: ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"],
        knda: ["೦", "೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯"],
        laoo: ["໐", "໑", "໒", "໓", "໔", "໕", "໖", "໗", "໘", "໙"],
        latn: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        limb: ["᥆", "᥇", "᥈", "᥉", "᥊", "᥋", "᥌", "᥍", "᥎", "᥏"],
        mlym: ["൦", "൧", "൨", "൩", "൪", "൫", "൬", "൭", "൮", "൯"],
        mong: ["᠐", "᠑", "᠒", "᠓", "᠔", "᠕", "᠖", "᠗", "᠘", "᠙"],
        mymr: ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"],
        orya: ["୦", "୧", "୨", "୩", "୪", "୫", "୬", "୭", "୮", "୯"],
        tamldec: ["௦", "௧", "௨", "௩", "௪", "௫", "௬", "௭", "௮", "௯"],
        telu: ["౦", "౧", "౨", "౩", "౪", "౫", "౬", "౭", "౮", "౯"],
        thai: ["๐", "๑", "๒", "๓", "๔", "๕", "๖", "๗", "๘", "๙"],
        tibt: ["༠", "༡", "༢", "༣", "༤", "༥", "༦", "༧", "༨", "༩"]
    };

    /**
     * This function provides access to the locale and formatting options computed
     * during initialization of the object.
     *
     * The function returns a new object whose properties and attributes are set as
     * if constructed by an object literal assigning to each of the following
     * properties the value of the corresponding internal property of this
     * NumberFormat object (see 11.4): locale, numberingSystem, style, currency,
     * currencyDisplay, minimumIntegerDigits, minimumFractionDigits,
     * maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits, and
     * useGrouping. Properties whose corresponding internal properties are not present
     * are not assigned.
     */
    /* 11.3.3 */defineProperty(Intl.NumberFormat.prototype, 'resolvedOptions', {
        configurable: true,
        writable: true,
        value: function value() {
            var prop = void 0,
                descs = new Record(),
                props = ['locale', 'numberingSystem', 'style', 'currency', 'currencyDisplay', 'minimumIntegerDigits', 'minimumFractionDigits', 'maximumFractionDigits', 'minimumSignificantDigits', 'maximumSignificantDigits', 'useGrouping'],
                internal = this !== null && babelHelpers$1["typeof"](this) === 'object' && getInternalProperties(this);

            // Satisfy test 11.3_b
            if (!internal || !internal['[[initializedNumberFormat]]']) throw new TypeError('`this` value for resolvedOptions() is not an initialized Intl.NumberFormat object.');

            for (var i = 0, max = props.length; i < max; i++) {
                if (hop.call(internal, prop = '[[' + props[i] + ']]')) descs[props[i]] = { value: internal[prop], writable: true, configurable: true, enumerable: true };
            }

            return objCreate({}, descs);
        }
    });

    /* jslint esnext: true */

    // Match these datetime components in a CLDR pattern, except those in single quotes
    var expDTComponents = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
    // trim patterns after transformations
    var expPatternTrimmer = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    // Skip over patterns with these datetime components because we don't have data
    // to back them up:
    // timezone, weekday, amoung others
    var unwantedDTCs = /[rqQASjJgwWIQq]/; // xXVO were removed from this list in favor of computing matches with timeZoneName values but printing as empty string

    var dtKeys = ["era", "year", "month", "day", "weekday", "quarter"];
    var tmKeys = ["hour", "minute", "second", "hour12", "timeZoneName"];

    function isDateFormatOnly(obj) {
        for (var i = 0; i < tmKeys.length; i += 1) {
            if (obj.hasOwnProperty(tmKeys[i])) {
                return false;
            }
        }
        return true;
    }

    function isTimeFormatOnly(obj) {
        for (var i = 0; i < dtKeys.length; i += 1) {
            if (obj.hasOwnProperty(dtKeys[i])) {
                return false;
            }
        }
        return true;
    }

    function joinDateAndTimeFormats(dateFormatObj, timeFormatObj) {
        var o = { _: {} };
        for (var i = 0; i < dtKeys.length; i += 1) {
            if (dateFormatObj[dtKeys[i]]) {
                o[dtKeys[i]] = dateFormatObj[dtKeys[i]];
            }
            if (dateFormatObj._[dtKeys[i]]) {
                o._[dtKeys[i]] = dateFormatObj._[dtKeys[i]];
            }
        }
        for (var j = 0; j < tmKeys.length; j += 1) {
            if (timeFormatObj[tmKeys[j]]) {
                o[tmKeys[j]] = timeFormatObj[tmKeys[j]];
            }
            if (timeFormatObj._[tmKeys[j]]) {
                o._[tmKeys[j]] = timeFormatObj._[tmKeys[j]];
            }
        }
        return o;
    }

    function computeFinalPatterns(formatObj) {
        // From http://www.unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns:
        //  'In patterns, two single quotes represents a literal single quote, either
        //   inside or outside single quotes. Text within single quotes is not
        //   interpreted in any way (except for two adjacent single quotes).'
        formatObj.pattern12 = formatObj.extendedPattern.replace(/'([^']*)'/g, function ($0, literal) {
            return literal ? literal : "'";
        });

        // pattern 12 is always the default. we can produce the 24 by removing {ampm}
        formatObj.pattern = formatObj.pattern12.replace('{ampm}', '').replace(expPatternTrimmer, '');
        return formatObj;
    }

    function expDTComponentsMeta($0, formatObj) {
        switch ($0.charAt(0)) {
            // --- Era
            case 'G':
                formatObj.era = ['short', 'short', 'short', 'long', 'narrow'][$0.length - 1];
                return '{era}';

            // --- Year
            case 'y':
            case 'Y':
            case 'u':
            case 'U':
            case 'r':
                formatObj.year = $0.length === 2 ? '2-digit' : 'numeric';
                return '{year}';

            // --- Quarter (not supported in this polyfill)
            case 'Q':
            case 'q':
                formatObj.quarter = ['numeric', '2-digit', 'short', 'long', 'narrow'][$0.length - 1];
                return '{quarter}';

            // --- Month
            case 'M':
            case 'L':
                formatObj.month = ['numeric', '2-digit', 'short', 'long', 'narrow'][$0.length - 1];
                return '{month}';

            // --- Week (not supported in this polyfill)
            case 'w':
                // week of the year
                formatObj.week = $0.length === 2 ? '2-digit' : 'numeric';
                return '{weekday}';
            case 'W':
                // week of the month
                formatObj.week = 'numeric';
                return '{weekday}';

            // --- Day
            case 'd':
                // day of the month
                formatObj.day = $0.length === 2 ? '2-digit' : 'numeric';
                return '{day}';
            case 'D': // day of the year
            case 'F': // day of the week
            case 'g':
                // 1..n: Modified Julian day
                formatObj.day = 'numeric';
                return '{day}';

            // --- Week Day
            case 'E':
                // day of the week
                formatObj.weekday = ['short', 'short', 'short', 'long', 'narrow', 'short'][$0.length - 1];
                return '{weekday}';
            case 'e':
                // local day of the week
                formatObj.weekday = ['numeric', '2-digit', 'short', 'long', 'narrow', 'short'][$0.length - 1];
                return '{weekday}';
            case 'c':
                // stand alone local day of the week
                formatObj.weekday = ['numeric', undefined, 'short', 'long', 'narrow', 'short'][$0.length - 1];
                return '{weekday}';

            // --- Period
            case 'a': // AM, PM
            case 'b': // am, pm, noon, midnight
            case 'B':
                // flexible day periods
                formatObj.hour12 = true;
                return '{ampm}';

            // --- Hour
            case 'h':
            case 'H':
                formatObj.hour = $0.length === 2 ? '2-digit' : 'numeric';
                return '{hour}';
            case 'k':
            case 'K':
                formatObj.hour12 = true; // 12-hour-cycle time formats (using h or K)
                formatObj.hour = $0.length === 2 ? '2-digit' : 'numeric';
                return '{hour}';

            // --- Minute
            case 'm':
                formatObj.minute = $0.length === 2 ? '2-digit' : 'numeric';
                return '{minute}';

            // --- Second
            case 's':
                formatObj.second = $0.length === 2 ? '2-digit' : 'numeric';
                return '{second}';
            case 'S':
            case 'A':
                formatObj.second = 'numeric';
                return '{second}';

            // --- Timezone
            case 'z': // 1..3, 4: specific non-location format
            case 'Z': // 1..3, 4, 5: The ISO8601 varios formats
            case 'O': // 1, 4: miliseconds in day short, long
            case 'v': // 1, 4: generic non-location format
            case 'V': // 1, 2, 3, 4: time zone ID or city
            case 'X': // 1, 2, 3, 4: The ISO8601 varios formats
            case 'x':
                // 1, 2, 3, 4: The ISO8601 varios formats
                // this polyfill only supports much, for now, we are just doing something dummy
                formatObj.timeZoneName = $0.length < 4 ? 'short' : 'long';
                return '{timeZoneName}';
        }
    }

    /**
     * Converts the CLDR availableFormats into the objects and patterns required by
     * the ECMAScript Internationalization API specification.
     */
    function createDateTimeFormat(skeleton, pattern) {
        // we ignore certain patterns that are unsupported to avoid this expensive op.
        if (unwantedDTCs.test(pattern)) return undefined;

        var formatObj = {
            originalPattern: pattern,
            _: {}
        };

        // Replace the pattern string with the one required by the specification, whilst
        // at the same time evaluating it for the subsets and formats
        formatObj.extendedPattern = pattern.replace(expDTComponents, function ($0) {
            // See which symbol we're dealing with
            return expDTComponentsMeta($0, formatObj._);
        });

        // Match the skeleton string with the one required by the specification
        // this implementation is based on the Date Field Symbol Table:
        // http://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
        // Note: we are adding extra data to the formatObject even though this polyfill
        //       might not support it.
        skeleton.replace(expDTComponents, function ($0) {
            // See which symbol we're dealing with
            return expDTComponentsMeta($0, formatObj);
        });

        return computeFinalPatterns(formatObj);
    }

    /**
     * Processes DateTime formats from CLDR to an easier-to-parse format.
     * the result of this operation should be cached the first time a particular
     * calendar is analyzed.
     *
     * The specification requires we support at least the following subsets of
     * date/time components:
     *
     *   - 'weekday', 'year', 'month', 'day', 'hour', 'minute', 'second'
     *   - 'weekday', 'year', 'month', 'day'
     *   - 'year', 'month', 'day'
     *   - 'year', 'month'
     *   - 'month', 'day'
     *   - 'hour', 'minute', 'second'
     *   - 'hour', 'minute'
     *
     * We need to cherry pick at least these subsets from the CLDR data and convert
     * them into the pattern objects used in the ECMA-402 API.
     */
    function createDateTimeFormats(formats) {
        var availableFormats = formats.availableFormats;
        var timeFormats = formats.timeFormats;
        var dateFormats = formats.dateFormats;
        var result = [];
        var skeleton = void 0,
            pattern = void 0,
            computed = void 0,
            i = void 0,
            j = void 0;
        var timeRelatedFormats = [];
        var dateRelatedFormats = [];

        // Map available (custom) formats into a pattern for createDateTimeFormats
        for (skeleton in availableFormats) {
            if (availableFormats.hasOwnProperty(skeleton)) {
                pattern = availableFormats[skeleton];
                computed = createDateTimeFormat(skeleton, pattern);
                if (computed) {
                    result.push(computed);
                    // in some cases, the format is only displaying date specific props
                    // or time specific props, in which case we need to also produce the
                    // combined formats.
                    if (isDateFormatOnly(computed)) {
                        dateRelatedFormats.push(computed);
                    } else if (isTimeFormatOnly(computed)) {
                        timeRelatedFormats.push(computed);
                    }
                }
            }
        }

        // Map time formats into a pattern for createDateTimeFormats
        for (skeleton in timeFormats) {
            if (timeFormats.hasOwnProperty(skeleton)) {
                pattern = timeFormats[skeleton];
                computed = createDateTimeFormat(skeleton, pattern);
                if (computed) {
                    result.push(computed);
                    timeRelatedFormats.push(computed);
                }
            }
        }

        // Map date formats into a pattern for createDateTimeFormats
        for (skeleton in dateFormats) {
            if (dateFormats.hasOwnProperty(skeleton)) {
                pattern = dateFormats[skeleton];
                computed = createDateTimeFormat(skeleton, pattern);
                if (computed) {
                    result.push(computed);
                    dateRelatedFormats.push(computed);
                }
            }
        }

        // combine custom time and custom date formats when they are orthogonals to complete the
        // formats supported by CLDR.
        // This Algo is based on section "Missing Skeleton Fields" from:
        // http://unicode.org/reports/tr35/tr35-dates.html#availableFormats_appendItems
        for (i = 0; i < timeRelatedFormats.length; i += 1) {
            for (j = 0; j < dateRelatedFormats.length; j += 1) {
                if (dateRelatedFormats[j].month === 'long') {
                    pattern = dateRelatedFormats[j].weekday ? formats.full : formats.long;
                } else if (dateRelatedFormats[j].month === 'short') {
                    pattern = formats.medium;
                } else {
                    pattern = formats.short;
                }
                computed = joinDateAndTimeFormats(dateRelatedFormats[j], timeRelatedFormats[i]);
                computed.originalPattern = pattern;
                computed.extendedPattern = pattern.replace('{0}', timeRelatedFormats[i].extendedPattern).replace('{1}', dateRelatedFormats[j].extendedPattern).replace(/^[,\s]+|[,\s]+$/gi, '');
                result.push(computeFinalPatterns(computed));
            }
        }

        return result;
    }

    // this represents the exceptions of the rule that are not covered by CLDR availableFormats
    // for single property configurations, they play no role when using multiple properties, and
    // those that are not in this table, are not exceptions or are not covered by the data we
    // provide.
    var validSyntheticProps = {
        second: {
            numeric: 's',
            '2-digit': 'ss'
        },
        minute: {
            numeric: 'm',
            '2-digit': 'mm'
        },
        year: {
            numeric: 'y',
            '2-digit': 'yy'
        },
        day: {
            numeric: 'd',
            '2-digit': 'dd'
        },
        month: {
            numeric: 'L',
            '2-digit': 'LL',
            narrow: 'LLLLL',
            short: 'LLL',
            long: 'LLLL'
        },
        weekday: {
            narrow: 'ccccc',
            short: 'ccc',
            long: 'cccc'
        }
    };

    function generateSyntheticFormat(propName, propValue) {
        if (validSyntheticProps[propName] && validSyntheticProps[propName][propValue]) {
            var _ref2;

            return _ref2 = {
                originalPattern: validSyntheticProps[propName][propValue],
                _: defineProperty$1({}, propName, propValue),
                extendedPattern: "{" + propName + "}"
            }, defineProperty$1(_ref2, propName, propValue), defineProperty$1(_ref2, "pattern12", "{" + propName + "}"), defineProperty$1(_ref2, "pattern", "{" + propName + "}"), _ref2;
        }
    }

    // An object map of date component keys, saves using a regex later
    var dateWidths = objCreate(null, { narrow: {}, short: {}, long: {} });

    /**
     * Returns a string for a date component, resolved using multiple inheritance as specified
     * as specified in the Unicode Technical Standard 35.
     */
    function resolveDateString(data, ca, component, width, key) {
        // From http://www.unicode.org/reports/tr35/tr35.html#Multiple_Inheritance:
        // 'In clearly specified instances, resources may inherit from within the same locale.
        //  For example, ... the Buddhist calendar inherits from the Gregorian calendar.'
        var obj = data[ca] && data[ca][component] ? data[ca][component] : data.gregory[component],


        // "sideways" inheritance resolves strings when a key doesn't exist
        alts = {
            narrow: ['short', 'long'],
            short: ['long', 'narrow'],
            long: ['short', 'narrow']
        },


        //
        resolved = hop.call(obj, width) ? obj[width] : hop.call(obj, alts[width][0]) ? obj[alts[width][0]] : obj[alts[width][1]];

        // `key` wouldn't be specified for components 'dayPeriods'
        return key !== null ? resolved[key] : resolved;
    }

    // Define the DateTimeFormat constructor internally so it cannot be tainted
    function DateTimeFormatConstructor() {
        var locales = arguments[0];
        var options = arguments[1];

        if (!this || this === Intl) {
            return new Intl.DateTimeFormat(locales, options);
        }
        return InitializeDateTimeFormat(toObject(this), locales, options);
    }

    defineProperty(Intl, 'DateTimeFormat', {
        configurable: true,
        writable: true,
        value: DateTimeFormatConstructor
    });

    // Must explicitly set prototypes as unwritable
    defineProperty(DateTimeFormatConstructor, 'prototype', {
        writable: false
    });

    /**
     * The abstract operation InitializeDateTimeFormat accepts the arguments dateTimeFormat
     * (which must be an object), locales, and options. It initializes dateTimeFormat as a
     * DateTimeFormat object.
     */
    function /* 12.1.1.1 */InitializeDateTimeFormat(dateTimeFormat, locales, options) {
        // This will be a internal properties object if we're not already initialized
        var internal = getInternalProperties(dateTimeFormat);

        // Create an object whose props can be used to restore the values of RegExp props
        var regexpRestore = createRegExpRestore();

        // 1. If dateTimeFormat has an [[initializedIntlObject]] internal property with
        //    value true, throw a TypeError exception.
        if (internal['[[initializedIntlObject]]'] === true) throw new TypeError('`this` object has already been initialized as an Intl object');

        // Need this to access the `internal` object
        defineProperty(dateTimeFormat, '__getInternalProperties', {
            value: function value() {
                // NOTE: Non-standard, for internal use only
                if (arguments[0] === secret) return internal;
            }
        });

        // 2. Set the [[initializedIntlObject]] internal property of numberFormat to true.
        internal['[[initializedIntlObject]]'] = true;

        // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
        //    abstract operation (defined in 9.2.1) with argument locales.
        var requestedLocales = CanonicalizeLocaleList(locales);

        // 4. Let options be the result of calling the ToDateTimeOptions abstract
        //    operation (defined below) with arguments options, "any", and "date".
        options = ToDateTimeOptions(options, 'any', 'date');

        // 5. Let opt be a new Record.
        var opt = new Record();

        // 6. Let matcher be the result of calling the GetOption abstract operation
        //    (defined in 9.2.9) with arguments options, "localeMatcher", "string", a List
        //    containing the two String values "lookup" and "best fit", and "best fit".
        var matcher = GetOption(options, 'localeMatcher', 'string', new List('lookup', 'best fit'), 'best fit');

        // 7. Set opt.[[localeMatcher]] to matcher.
        opt['[[localeMatcher]]'] = matcher;

        // 8. Let DateTimeFormat be the standard built-in object that is the initial
        //    value of Intl.DateTimeFormat.
        var DateTimeFormat = internals.DateTimeFormat; // This is what we *really* need

        // 9. Let localeData be the value of the [[localeData]] internal property of
        //    DateTimeFormat.
        var localeData = DateTimeFormat['[[localeData]]'];

        // 10. Let r be the result of calling the ResolveLocale abstract operation
        //     (defined in 9.2.5) with the [[availableLocales]] internal property of
        //      DateTimeFormat, requestedLocales, opt, the [[relevantExtensionKeys]]
        //      internal property of DateTimeFormat, and localeData.
        var r = ResolveLocale(DateTimeFormat['[[availableLocales]]'], requestedLocales, opt, DateTimeFormat['[[relevantExtensionKeys]]'], localeData);

        // 11. Set the [[locale]] internal property of dateTimeFormat to the value of
        //     r.[[locale]].
        internal['[[locale]]'] = r['[[locale]]'];

        // 12. Set the [[calendar]] internal property of dateTimeFormat to the value of
        //     r.[[ca]].
        internal['[[calendar]]'] = r['[[ca]]'];

        // 13. Set the [[numberingSystem]] internal property of dateTimeFormat to the value of
        //     r.[[nu]].
        internal['[[numberingSystem]]'] = r['[[nu]]'];

        // The specification doesn't tell us to do this, but it's helpful later on
        internal['[[dataLocale]]'] = r['[[dataLocale]]'];

        // 14. Let dataLocale be the value of r.[[dataLocale]].
        var dataLocale = r['[[dataLocale]]'];

        // 15. Let tz be the result of calling the [[Get]] internal method of options with
        //     argument "timeZone".
        var tz = options.timeZone;

        // 16. If tz is not undefined, then
        if (tz !== undefined) {
            // a. Let tz be ToString(tz).
            // b. Convert tz to upper case as described in 6.1.
            //    NOTE: If an implementation accepts additional time zone values, as permitted
            //          under certain conditions by the Conformance clause, different casing
            //          rules apply.
            tz = toLatinUpperCase(tz);

            // c. If tz is not "UTC", then throw a RangeError exception.
            // ###TODO: accept more time zones###
            if (tz !== 'UTC') throw new RangeError('timeZone is not supported.');
        }

        // 17. Set the [[timeZone]] internal property of dateTimeFormat to tz.
        internal['[[timeZone]]'] = tz;

        // 18. Let opt be a new Record.
        opt = new Record();

        // 19. For each row of Table 3, except the header row, do:
        for (var prop in dateTimeComponents) {
            if (!hop.call(dateTimeComponents, prop)) continue;

            // 20. Let prop be the name given in the Property column of the row.
            // 21. Let value be the result of calling the GetOption abstract operation,
            //     passing as argument options, the name given in the Property column of the
            //     row, "string", a List containing the strings given in the Values column of
            //     the row, and undefined.
            var value = GetOption(options, prop, 'string', dateTimeComponents[prop]);

            // 22. Set opt.[[<prop>]] to value.
            opt['[[' + prop + ']]'] = value;
        }

        // Assigned a value below
        var bestFormat = void 0;

        // 23. Let dataLocaleData be the result of calling the [[Get]] internal method of
        //     localeData with argument dataLocale.
        var dataLocaleData = localeData[dataLocale];

        // 24. Let formats be the result of calling the [[Get]] internal method of
        //     dataLocaleData with argument "formats".
        //     Note: we process the CLDR formats into the spec'd structure
        var formats = ToDateTimeFormats(dataLocaleData.formats);

        // 25. Let matcher be the result of calling the GetOption abstract operation with
        //     arguments options, "formatMatcher", "string", a List containing the two String
        //     values "basic" and "best fit", and "best fit".
        matcher = GetOption(options, 'formatMatcher', 'string', new List('basic', 'best fit'), 'best fit');

        // Optimization: caching the processed formats as a one time operation by
        // replacing the initial structure from localeData
        dataLocaleData.formats = formats;

        // 26. If matcher is "basic", then
        if (matcher === 'basic') {
            // 27. Let bestFormat be the result of calling the BasicFormatMatcher abstract
            //     operation (defined below) with opt and formats.
            bestFormat = BasicFormatMatcher(opt, formats);

            // 28. Else
        } else {
            {
                // diverging
                var _hr = GetOption(options, 'hour12', 'boolean' /*, undefined, undefined*/);
                opt.hour12 = _hr === undefined ? dataLocaleData.hour12 : _hr;
            }
            // 29. Let bestFormat be the result of calling the BestFitFormatMatcher
            //     abstract operation (defined below) with opt and formats.
            bestFormat = BestFitFormatMatcher(opt, formats);
        }

        // 30. For each row in Table 3, except the header row, do
        for (var _prop in dateTimeComponents) {
            if (!hop.call(dateTimeComponents, _prop)) continue;

            // a. Let prop be the name given in the Property column of the row.
            // b. Let pDesc be the result of calling the [[GetOwnProperty]] internal method of
            //    bestFormat with argument prop.
            // c. If pDesc is not undefined, then
            if (hop.call(bestFormat, _prop)) {
                // i. Let p be the result of calling the [[Get]] internal method of bestFormat
                //    with argument prop.
                var p = bestFormat[_prop];
                {
                    // diverging
                    p = bestFormat._ && hop.call(bestFormat._, _prop) ? bestFormat._[_prop] : p;
                }

                // ii. Set the [[<prop>]] internal property of dateTimeFormat to p.
                internal['[[' + _prop + ']]'] = p;
            }
        }

        var pattern = void 0; // Assigned a value below

        // 31. Let hr12 be the result of calling the GetOption abstract operation with
        //     arguments options, "hour12", "boolean", undefined, and undefined.
        var hr12 = GetOption(options, 'hour12', 'boolean' /*, undefined, undefined*/);

        // 32. If dateTimeFormat has an internal property [[hour]], then
        if (internal['[[hour]]']) {
            // a. If hr12 is undefined, then let hr12 be the result of calling the [[Get]]
            //    internal method of dataLocaleData with argument "hour12".
            hr12 = hr12 === undefined ? dataLocaleData.hour12 : hr12;

            // b. Set the [[hour12]] internal property of dateTimeFormat to hr12.
            internal['[[hour12]]'] = hr12;

            // c. If hr12 is true, then
            if (hr12 === true) {
                // i. Let hourNo0 be the result of calling the [[Get]] internal method of
                //    dataLocaleData with argument "hourNo0".
                var hourNo0 = dataLocaleData.hourNo0;

                // ii. Set the [[hourNo0]] internal property of dateTimeFormat to hourNo0.
                internal['[[hourNo0]]'] = hourNo0;

                // iii. Let pattern be the result of calling the [[Get]] internal method of
                //      bestFormat with argument "pattern12".
                pattern = bestFormat.pattern12;
            }

            // d. Else
            else
                // i. Let pattern be the result of calling the [[Get]] internal method of
                //    bestFormat with argument "pattern".
                pattern = bestFormat.pattern;
        }

        // 33. Else
        else
            // a. Let pattern be the result of calling the [[Get]] internal method of
            //    bestFormat with argument "pattern".
            pattern = bestFormat.pattern;

        // 34. Set the [[pattern]] internal property of dateTimeFormat to pattern.
        internal['[[pattern]]'] = pattern;

        // 35. Set the [[boundFormat]] internal property of dateTimeFormat to undefined.
        internal['[[boundFormat]]'] = undefined;

        // 36. Set the [[initializedDateTimeFormat]] internal property of dateTimeFormat to
        //     true.
        internal['[[initializedDateTimeFormat]]'] = true;

        // In ES3, we need to pre-bind the format() function
        if (es3) dateTimeFormat.format = GetFormatDateTime.call(dateTimeFormat);

        // Restore the RegExp properties
        regexpRestore();

        // Return the newly initialised object
        return dateTimeFormat;
    }

    /**
     * Several DateTimeFormat algorithms use values from the following table, which provides
     * property names and allowable values for the components of date and time formats:
     */
    var dateTimeComponents = {
        weekday: ["narrow", "short", "long"],
        era: ["narrow", "short", "long"],
        year: ["2-digit", "numeric"],
        month: ["2-digit", "numeric", "narrow", "short", "long"],
        day: ["2-digit", "numeric"],
        hour: ["2-digit", "numeric"],
        minute: ["2-digit", "numeric"],
        second: ["2-digit", "numeric"],
        timeZoneName: ["short", "long"]
    };

    /**
     * When the ToDateTimeOptions abstract operation is called with arguments options,
     * required, and defaults, the following steps are taken:
     */
    function ToDateTimeFormats(formats) {
        if (Object.prototype.toString.call(formats) === '[object Array]') {
            return formats;
        }
        return createDateTimeFormats(formats);
    }

    /**
     * When the ToDateTimeOptions abstract operation is called with arguments options,
     * required, and defaults, the following steps are taken:
     */
    function ToDateTimeOptions(options, required, defaults) {
        // 1. If options is undefined, then let options be null, else let options be
        //    ToObject(options).
        if (options === undefined) options = null;else {
            // (#12) options needs to be a Record, but it also needs to inherit properties
            var opt2 = toObject(options);
            options = new Record();

            for (var k in opt2) {
                options[k] = opt2[k];
            }
        }

        // 2. Let create be the standard built-in function object defined in ES5, 15.2.3.5.
        var create = objCreate;

        // 3. Let options be the result of calling the [[Call]] internal method of create with
        //    undefined as the this value and an argument list containing the single item
        //    options.
        options = create(options);

        // 4. Let needDefaults be true.
        var needDefaults = true;

        // 5. If required is "date" or "any", then
        if (required === 'date' || required === 'any') {
            // a. For each of the property names "weekday", "year", "month", "day":
            // i. If the result of calling the [[Get]] internal method of options with the
            //    property name is not undefined, then let needDefaults be false.
            if (options.weekday !== undefined || options.year !== undefined || options.month !== undefined || options.day !== undefined) needDefaults = false;
        }

        // 6. If required is "time" or "any", then
        if (required === 'time' || required === 'any') {
            // a. For each of the property names "hour", "minute", "second":
            // i. If the result of calling the [[Get]] internal method of options with the
            //    property name is not undefined, then let needDefaults be false.
            if (options.hour !== undefined || options.minute !== undefined || options.second !== undefined) needDefaults = false;
        }

        // 7. If needDefaults is true and defaults is either "date" or "all", then
        if (needDefaults && (defaults === 'date' || defaults === 'all'))
            // a. For each of the property names "year", "month", "day":
            // i. Call the [[DefineOwnProperty]] internal method of options with the
            //    property name, Property Descriptor {[[Value]]: "numeric", [[Writable]]:
            //    true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
            options.year = options.month = options.day = 'numeric';

        // 8. If needDefaults is true and defaults is either "time" or "all", then
        if (needDefaults && (defaults === 'time' || defaults === 'all'))
            // a. For each of the property names "hour", "minute", "second":
            // i. Call the [[DefineOwnProperty]] internal method of options with the
            //    property name, Property Descriptor {[[Value]]: "numeric", [[Writable]]:
            //    true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
            options.hour = options.minute = options.second = 'numeric';

        // 9. Return options.
        return options;
    }

    /**
     * When the BasicFormatMatcher abstract operation is called with two arguments options and
     * formats, the following steps are taken:
     */
    function BasicFormatMatcher(options, formats) {
        // 1. Let removalPenalty be 120.
        var removalPenalty = 120;

        // 2. Let additionPenalty be 20.
        var additionPenalty = 20;

        // 3. Let longLessPenalty be 8.
        var longLessPenalty = 8;

        // 4. Let longMorePenalty be 6.
        var longMorePenalty = 6;

        // 5. Let shortLessPenalty be 6.
        var shortLessPenalty = 6;

        // 6. Let shortMorePenalty be 3.
        var shortMorePenalty = 3;

        // 7. Let bestScore be -Infinity.
        var bestScore = -Infinity;

        // 8. Let bestFormat be undefined.
        var bestFormat = void 0;

        // 9. Let i be 0.
        var i = 0;

        // 10. Assert: formats is an Array object.

        // 11. Let len be the result of calling the [[Get]] internal method of formats with argument "length".
        var len = formats.length;

        // 12. Repeat while i < len:
        while (i < len) {
            // a. Let format be the result of calling the [[Get]] internal method of formats with argument ToString(i).
            var format = formats[i];

            // b. Let score be 0.
            var score = 0;

            // c. For each property shown in Table 3:
            for (var property in dateTimeComponents) {
                if (!hop.call(dateTimeComponents, property)) continue;

                // i. Let optionsProp be options.[[<property>]].
                var optionsProp = options['[[' + property + ']]'];

                // ii. Let formatPropDesc be the result of calling the [[GetOwnProperty]] internal method of format
                //     with argument property.
                // iii. If formatPropDesc is not undefined, then
                //     1. Let formatProp be the result of calling the [[Get]] internal method of format with argument property.
                var formatProp = hop.call(format, property) ? format[property] : undefined;

                // iv. If optionsProp is undefined and formatProp is not undefined, then decrease score by
                //     additionPenalty.
                if (optionsProp === undefined && formatProp !== undefined) score -= additionPenalty;

                // v. Else if optionsProp is not undefined and formatProp is undefined, then decrease score by
                //    removalPenalty.
                else if (optionsProp !== undefined && formatProp === undefined) score -= removalPenalty;

                    // vi. Else
                    else {
                            // 1. Let values be the array ["2-digit", "numeric", "narrow", "short",
                            //    "long"].
                            var values = ['2-digit', 'numeric', 'narrow', 'short', 'long'];

                            // 2. Let optionsPropIndex be the index of optionsProp within values.
                            var optionsPropIndex = arrIndexOf.call(values, optionsProp);

                            // 3. Let formatPropIndex be the index of formatProp within values.
                            var formatPropIndex = arrIndexOf.call(values, formatProp);

                            // 4. Let delta be max(min(formatPropIndex - optionsPropIndex, 2), -2).
                            var delta = Math.max(Math.min(formatPropIndex - optionsPropIndex, 2), -2);

                            // 5. If delta = 2, decrease score by longMorePenalty.
                            if (delta === 2) score -= longMorePenalty;

                            // 6. Else if delta = 1, decrease score by shortMorePenalty.
                            else if (delta === 1) score -= shortMorePenalty;

                                // 7. Else if delta = -1, decrease score by shortLessPenalty.
                                else if (delta === -1) score -= shortLessPenalty;

                                    // 8. Else if delta = -2, decrease score by longLessPenalty.
                                    else if (delta === -2) score -= longLessPenalty;
                        }
            }

            // d. If score > bestScore, then
            if (score > bestScore) {
                // i. Let bestScore be score.
                bestScore = score;

                // ii. Let bestFormat be format.
                bestFormat = format;
            }

            // e. Increase i by 1.
            i++;
        }

        // 13. Return bestFormat.
        return bestFormat;
    }

    /**
     * When the BestFitFormatMatcher abstract operation is called with two arguments options
     * and formats, it performs implementation dependent steps, which should return a set of
     * component representations that a typical user of the selected locale would perceive as
     * at least as good as the one returned by BasicFormatMatcher.
     *
     * This polyfill defines the algorithm to be the same as BasicFormatMatcher,
     * with the addition of bonus points awarded where the requested format is of
     * the same data type as the potentially matching format.
     *
     * This algo relies on the concept of closest distance matching described here:
     * http://unicode.org/reports/tr35/tr35-dates.html#Matching_Skeletons
     * Typically a “best match” is found using a closest distance match, such as:
     *
     * Symbols requesting a best choice for the locale are replaced.
     *      j → one of {H, k, h, K}; C → one of {a, b, B}
     * -> Covered by cldr.js matching process
     *
     * For fields with symbols representing the same type (year, month, day, etc):
     *     Most symbols have a small distance from each other.
     *         M ≅ L; E ≅ c; a ≅ b ≅ B; H ≅ k ≅ h ≅ K; ...
     *     -> Covered by cldr.js matching process
     *
     *     Width differences among fields, other than those marking text vs numeric, are given small distance from each other.
     *         MMM ≅ MMMM
     *         MM ≅ M
     *     Numeric and text fields are given a larger distance from each other.
     *         MMM ≈ MM
     *     Symbols representing substantial differences (week of year vs week of month) are given much larger a distances from each other.
     *         d ≋ D; ...
     *     Missing or extra fields cause a match to fail. (But see Missing Skeleton Fields).
     *
     *
     * For example,
     *
     *     { month: 'numeric', day: 'numeric' }
     *
     * should match
     *
     *     { month: '2-digit', day: '2-digit' }
     *
     * rather than
     *
     *     { month: 'short', day: 'numeric' }
     *
     * This makes sense because a user requesting a formatted date with numeric parts would
     * not expect to see the returned format containing narrow, short or long part names
     */
    function BestFitFormatMatcher(options, formats) {
        /** Diverging: this block implements the hack for single property configuration, eg.:
         *
         *      `new Intl.DateTimeFormat('en', {day: 'numeric'})`
         *
         * should produce a single digit with the day of the month. This is needed because
         * CLDR `availableFormats` data structure doesn't cover these cases.
         */
        {
            var optionsPropNames = [];
            for (var property in dateTimeComponents) {
                if (!hop.call(dateTimeComponents, property)) continue;

                if (options['[[' + property + ']]'] !== undefined) {
                    optionsPropNames.push(property);
                }
            }
            if (optionsPropNames.length === 1) {
                var _bestFormat = generateSyntheticFormat(optionsPropNames[0], options['[[' + optionsPropNames[0] + ']]']);
                if (_bestFormat) {
                    return _bestFormat;
                }
            }
        }

        // 1. Let removalPenalty be 120.
        var removalPenalty = 120;

        // 2. Let additionPenalty be 20.
        var additionPenalty = 20;

        // 3. Let longLessPenalty be 8.
        var longLessPenalty = 8;

        // 4. Let longMorePenalty be 6.
        var longMorePenalty = 6;

        // 5. Let shortLessPenalty be 6.
        var shortLessPenalty = 6;

        // 6. Let shortMorePenalty be 3.
        var shortMorePenalty = 3;

        var patternPenalty = 2;

        var hour12Penalty = 1;

        // 7. Let bestScore be -Infinity.
        var bestScore = -Infinity;

        // 8. Let bestFormat be undefined.
        var bestFormat = void 0;

        // 9. Let i be 0.
        var i = 0;

        // 10. Assert: formats is an Array object.

        // 11. Let len be the result of calling the [[Get]] internal method of formats with argument "length".
        var len = formats.length;

        // 12. Repeat while i < len:
        while (i < len) {
            // a. Let format be the result of calling the [[Get]] internal method of formats with argument ToString(i).
            var format = formats[i];

            // b. Let score be 0.
            var score = 0;

            // c. For each property shown in Table 3:
            for (var _property in dateTimeComponents) {
                if (!hop.call(dateTimeComponents, _property)) continue;

                // i. Let optionsProp be options.[[<property>]].
                var optionsProp = options['[[' + _property + ']]'];

                // ii. Let formatPropDesc be the result of calling the [[GetOwnProperty]] internal method of format
                //     with argument property.
                // iii. If formatPropDesc is not undefined, then
                //     1. Let formatProp be the result of calling the [[Get]] internal method of format with argument property.
                var formatProp = hop.call(format, _property) ? format[_property] : undefined;

                // Diverging: using the default properties produced by the pattern/skeleton
                // to match it with user options, and apply a penalty
                var patternProp = hop.call(format._, _property) ? format._[_property] : undefined;
                if (optionsProp !== patternProp) {
                    score -= patternPenalty;
                }

                // iv. If optionsProp is undefined and formatProp is not undefined, then decrease score by
                //     additionPenalty.
                if (optionsProp === undefined && formatProp !== undefined) score -= additionPenalty;

                // v. Else if optionsProp is not undefined and formatProp is undefined, then decrease score by
                //    removalPenalty.
                else if (optionsProp !== undefined && formatProp === undefined) score -= removalPenalty;

                    // vi. Else
                    else {
                            // 1. Let values be the array ["2-digit", "numeric", "narrow", "short",
                            //    "long"].
                            var values = ['2-digit', 'numeric', 'narrow', 'short', 'long'];

                            // 2. Let optionsPropIndex be the index of optionsProp within values.
                            var optionsPropIndex = arrIndexOf.call(values, optionsProp);

                            // 3. Let formatPropIndex be the index of formatProp within values.
                            var formatPropIndex = arrIndexOf.call(values, formatProp);

                            // 4. Let delta be max(min(formatPropIndex - optionsPropIndex, 2), -2).
                            var delta = Math.max(Math.min(formatPropIndex - optionsPropIndex, 2), -2);

                            {
                                // diverging from spec
                                // When the bestFit argument is true, subtract additional penalty where data types are not the same
                                if (formatPropIndex <= 1 && optionsPropIndex >= 2 || formatPropIndex >= 2 && optionsPropIndex <= 1) {
                                    // 5. If delta = 2, decrease score by longMorePenalty.
                                    if (delta > 0) score -= longMorePenalty;else if (delta < 0) score -= longLessPenalty;
                                } else {
                                    // 5. If delta = 2, decrease score by longMorePenalty.
                                    if (delta > 1) score -= shortMorePenalty;else if (delta < -1) score -= shortLessPenalty;
                                }
                            }
                        }
            }

            {
                // diverging to also take into consideration differences between 12 or 24 hours
                // which is special for the best fit only.
                if (format._.hour12 !== options.hour12) {
                    score -= hour12Penalty;
                }
            }

            // d. If score > bestScore, then
            if (score > bestScore) {
                // i. Let bestScore be score.
                bestScore = score;
                // ii. Let bestFormat be format.
                bestFormat = format;
            }

            // e. Increase i by 1.
            i++;
        }

        // 13. Return bestFormat.
        return bestFormat;
    }

    /* 12.2.3 */internals.DateTimeFormat = {
        '[[availableLocales]]': [],
        '[[relevantExtensionKeys]]': ['ca', 'nu'],
        '[[localeData]]': {}
    };

    /**
     * When the supportedLocalesOf method of Intl.DateTimeFormat is called, the
     * following steps are taken:
     */
    /* 12.2.2 */
    defineProperty(Intl.DateTimeFormat, 'supportedLocalesOf', {
        configurable: true,
        writable: true,
        value: fnBind.call(function (locales) {
            // Bound functions only have the `this` value altered if being used as a constructor,
            // this lets us imitate a native function that has no constructor
            if (!hop.call(this, '[[availableLocales]]')) throw new TypeError('supportedLocalesOf() is not a constructor');

            // Create an object whose props can be used to restore the values of RegExp props
            var regexpRestore = createRegExpRestore(),


            // 1. If options is not provided, then let options be undefined.
            options = arguments[1],


            // 2. Let availableLocales be the value of the [[availableLocales]] internal
            //    property of the standard built-in object that is the initial value of
            //    Intl.NumberFormat.

            availableLocales = this['[[availableLocales]]'],


            // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
            //    abstract operation (defined in 9.2.1) with argument locales.
            requestedLocales = CanonicalizeLocaleList(locales);

            // Restore the RegExp properties
            regexpRestore();

            // 4. Return the result of calling the SupportedLocales abstract operation
            //    (defined in 9.2.8) with arguments availableLocales, requestedLocales,
            //    and options.
            return SupportedLocales(availableLocales, requestedLocales, options);
        }, internals.NumberFormat)
    });

    /**
     * This named accessor property returns a function that formats a number
     * according to the effective locale and the formatting options of this
     * DateTimeFormat object.
     */
    /* 12.3.2 */defineProperty(Intl.DateTimeFormat.prototype, 'format', {
        configurable: true,
        get: GetFormatDateTime
    });

    function GetFormatDateTime() {
        var internal = this !== null && babelHelpers$1["typeof"](this) === 'object' && getInternalProperties(this);

        // Satisfy test 12.3_b
        if (!internal || !internal['[[initializedDateTimeFormat]]']) throw new TypeError('`this` value for format() is not an initialized Intl.DateTimeFormat object.');

        // The value of the [[Get]] attribute is a function that takes the following
        // steps:

        // 1. If the [[boundFormat]] internal property of this DateTimeFormat object
        //    is undefined, then:
        if (internal['[[boundFormat]]'] === undefined) {
            // a. Let F be a Function object, with internal properties set as
            //    specified for built-in functions in ES5, 15, or successor, and the
            //    length property set to 0, that takes the argument date and
            //    performs the following steps:
            var F = function F() {
                var date = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

                //   i. If date is not provided or is undefined, then let x be the
                //      result as if by the expression Date.now() where Date.now is
                //      the standard built-in function defined in ES5, 15.9.4.4.
                //  ii. Else let x be ToNumber(date).
                // iii. Return the result of calling the FormatDateTime abstract
                //      operation (defined below) with arguments this and x.
                var x = date === undefined ? Date.now() : toNumber(date);
                return FormatDateTime(this, x);
            };
            // b. Let bind be the standard built-in function object defined in ES5,
            //    15.3.4.5.
            // c. Let bf be the result of calling the [[Call]] internal method of
            //    bind with F as the this value and an argument list containing
            //    the single item this.
            var bf = fnBind.call(F, this);
            // d. Set the [[boundFormat]] internal property of this NumberFormat
            //    object to bf.
            internal['[[boundFormat]]'] = bf;
        }
        // Return the value of the [[boundFormat]] internal property of this
        // NumberFormat object.
        return internal['[[boundFormat]]'];
    }

    function formatToParts$1() {
        var date = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

        var internal = this !== null && babelHelpers$1["typeof"](this) === 'object' && getInternalProperties(this);

        if (!internal || !internal['[[initializedDateTimeFormat]]']) throw new TypeError('`this` value for formatToParts() is not an initialized Intl.DateTimeFormat object.');

        var x = date === undefined ? Date.now() : toNumber(date);
        return FormatToPartsDateTime(this, x);
    }

    Object.defineProperty(Intl.DateTimeFormat.prototype, 'formatToParts', {
        enumerable: false,
        writable: true,
        configurable: true,
        value: formatToParts$1
    });

    function CreateDateTimeParts(dateTimeFormat, x) {
        // 1. If x is not a finite Number, then throw a RangeError exception.
        if (!isFinite(x)) throw new RangeError('Invalid valid date passed to format');

        var internal = dateTimeFormat.__getInternalProperties(secret);

        // Creating restore point for properties on the RegExp object... please wait
        /* let regexpRestore = */createRegExpRestore(); // ###TODO: review this

        // 2. Let locale be the value of the [[locale]] internal property of dateTimeFormat.
        var locale = internal['[[locale]]'];

        // 3. Let nf be the result of creating a new NumberFormat object as if by the
        // expression new Intl.NumberFormat([locale], {useGrouping: false}) where
        // Intl.NumberFormat is the standard built-in constructor defined in 11.1.3.
        var nf = new Intl.NumberFormat([locale], { useGrouping: false });

        // 4. Let nf2 be the result of creating a new NumberFormat object as if by the
        // expression new Intl.NumberFormat([locale], {minimumIntegerDigits: 2, useGrouping:
        // false}) where Intl.NumberFormat is the standard built-in constructor defined in
        // 11.1.3.
        var nf2 = new Intl.NumberFormat([locale], { minimumIntegerDigits: 2, useGrouping: false });

        // 5. Let tm be the result of calling the ToLocalTime abstract operation (defined
        // below) with x, the value of the [[calendar]] internal property of dateTimeFormat,
        // and the value of the [[timeZone]] internal property of dateTimeFormat.
        var tm = ToLocalTime(x, internal['[[calendar]]'], internal['[[timeZone]]']);

        // 6. Let result be the value of the [[pattern]] internal property of dateTimeFormat.
        var pattern = internal['[[pattern]]'];

        // 7.
        var result = new List();

        // 8.
        var index = 0;

        // 9.
        var beginIndex = pattern.indexOf('{');

        // 10.
        var endIndex = 0;

        // Need the locale minus any extensions
        var dataLocale = internal['[[dataLocale]]'];

        // Need the calendar data from CLDR
        var localeData = internals.DateTimeFormat['[[localeData]]'][dataLocale].calendars;
        var ca = internal['[[calendar]]'];

        // 11.
        while (beginIndex !== -1) {
            var fv = void 0;
            // a.
            endIndex = pattern.indexOf('}', beginIndex);
            // b.
            if (endIndex === -1) {
                throw new Error('Unclosed pattern');
            }
            // c.
            if (beginIndex > index) {
                arrPush.call(result, {
                    type: 'literal',
                    value: pattern.substring(index, beginIndex)
                });
            }
            // d.
            var p = pattern.substring(beginIndex + 1, endIndex);
            // e.
            if (dateTimeComponents.hasOwnProperty(p)) {
                //   i. Let f be the value of the [[<p>]] internal property of dateTimeFormat.
                var f = internal['[[' + p + ']]'];
                //  ii. Let v be the value of tm.[[<p>]].
                var v = tm['[[' + p + ']]'];
                // iii. If p is "year" and v ≤ 0, then let v be 1 - v.
                if (p === 'year' && v <= 0) {
                    v = 1 - v;
                }
                //  iv. If p is "month", then increase v by 1.
                else if (p === 'month') {
                        v++;
                    }
                    //   v. If p is "hour" and the value of the [[hour12]] internal property of
                    //      dateTimeFormat is true, then
                    else if (p === 'hour' && internal['[[hour12]]'] === true) {
                            // 1. Let v be v modulo 12.
                            v = v % 12;
                            // 2. If v is 0 and the value of the [[hourNo0]] internal property of
                            //    dateTimeFormat is true, then let v be 12.
                            if (v === 0 && internal['[[hourNo0]]'] === true) {
                                v = 12;
                            }
                        }

                //  vi. If f is "numeric", then
                if (f === 'numeric') {
                    // 1. Let fv be the result of calling the FormatNumber abstract operation
                    //    (defined in 11.3.2) with arguments nf and v.
                    fv = FormatNumber(nf, v);
                }
                // vii. Else if f is "2-digit", then
                else if (f === '2-digit') {
                        // 1. Let fv be the result of calling the FormatNumber abstract operation
                        //    with arguments nf2 and v.
                        fv = FormatNumber(nf2, v);
                        // 2. If the length of fv is greater than 2, let fv be the substring of fv
                        //    containing the last two characters.
                        if (fv.length > 2) {
                            fv = fv.slice(-2);
                        }
                    }
                    // viii. Else if f is "narrow", "short", or "long", then let fv be a String
                    //     value representing f in the desired form; the String value depends upon
                    //     the implementation and the effective locale and calendar of
                    //     dateTimeFormat. If p is "month", then the String value may also depend
                    //     on whether dateTimeFormat has a [[day]] internal property. If p is
                    //     "timeZoneName", then the String value may also depend on the value of
                    //     the [[inDST]] field of tm.
                    else if (f in dateWidths) {
                            switch (p) {
                                case 'month':
                                    fv = resolveDateString(localeData, ca, 'months', f, tm['[[' + p + ']]']);
                                    break;

                                case 'weekday':
                                    try {
                                        fv = resolveDateString(localeData, ca, 'days', f, tm['[[' + p + ']]']);
                                        // fv = resolveDateString(ca.days, f)[tm['[['+ p +']]']];
                                    } catch (e) {
                                        throw new Error('Could not find weekday data for locale ' + locale);
                                    }
                                    break;

                                case 'timeZoneName':
                                    fv = ''; // ###TODO
                                    break;

                                case 'era':
                                    try {
                                        fv = resolveDateString(localeData, ca, 'eras', f, tm['[[' + p + ']]']);
                                    } catch (e) {
                                        throw new Error('Could not find era data for locale ' + locale);
                                    }
                                    break;

                                default:
                                    fv = tm['[[' + p + ']]'];
                            }
                        }
                // ix
                arrPush.call(result, {
                    type: p,
                    value: fv
                });
                // f.
            } else if (p === 'ampm') {
                // i.
                var _v = tm['[[hour]]'];
                // ii./iii.
                fv = resolveDateString(localeData, ca, 'dayPeriods', _v > 11 ? 'pm' : 'am', null);
                // iv.
                arrPush.call(result, {
                    type: 'dayPeriod',
                    value: fv
                });
                // g.
            } else {
                arrPush.call(result, {
                    type: 'literal',
                    value: pattern.substring(beginIndex, endIndex + 1)
                });
            }
            // h.
            index = endIndex + 1;
            // i.
            beginIndex = pattern.indexOf('{', index);
        }
        // 12.
        if (endIndex < pattern.length - 1) {
            arrPush.call(result, {
                type: 'literal',
                value: pattern.substr(endIndex + 1)
            });
        }
        // 13.
        return result;
    }

    /**
     * When the FormatDateTime abstract operation is called with arguments dateTimeFormat
     * (which must be an object initialized as a DateTimeFormat) and x (which must be a Number
     * value), it returns a String value representing x (interpreted as a time value as
     * specified in ES5, 15.9.1.1) according to the effective locale and the formatting
     * options of dateTimeFormat.
     */
    function FormatDateTime(dateTimeFormat, x) {
        var parts = CreateDateTimeParts(dateTimeFormat, x);
        var result = '';

        for (var i = 0; parts.length > i; i++) {
            var part = parts[i];
            result += part.value;
        }
        return result;
    }

    function FormatToPartsDateTime(dateTimeFormat, x) {
        var parts = CreateDateTimeParts(dateTimeFormat, x);
        var result = [];
        for (var i = 0; parts.length > i; i++) {
            var part = parts[i];
            result.push({
                type: part.type,
                value: part.value
            });
        }
        return result;
    }

    /**
     * When the ToLocalTime abstract operation is called with arguments date, calendar, and
     * timeZone, the following steps are taken:
     */
    function ToLocalTime(date, calendar, timeZone) {
        // 1. Apply calendrical calculations on date for the given calendar and time zone to
        //    produce weekday, era, year, month, day, hour, minute, second, and inDST values.
        //    The calculations should use best available information about the specified
        //    calendar and time zone. If the calendar is "gregory", then the calculations must
        //    match the algorithms specified in ES5, 15.9.1, except that calculations are not
        //    bound by the restrictions on the use of best available information on time zones
        //    for local time zone adjustment and daylight saving time adjustment imposed by
        //    ES5, 15.9.1.7 and 15.9.1.8.
        // ###TODO###
        var d = new Date(date),
            m = 'get' + (timeZone || '');

        // 2. Return a Record with fields [[weekday]], [[era]], [[year]], [[month]], [[day]],
        //    [[hour]], [[minute]], [[second]], and [[inDST]], each with the corresponding
        //    calculated value.
        return new Record({
            '[[weekday]]': d[m + 'Day'](),
            '[[era]]': +(d[m + 'FullYear']() >= 0),
            '[[year]]': d[m + 'FullYear'](),
            '[[month]]': d[m + 'Month'](),
            '[[day]]': d[m + 'Date'](),
            '[[hour]]': d[m + 'Hours'](),
            '[[minute]]': d[m + 'Minutes'](),
            '[[second]]': d[m + 'Seconds'](),
            '[[inDST]]': false // ###TODO###
        });
    }

    /**
     * The function returns a new object whose properties and attributes are set as if
     * constructed by an object literal assigning to each of the following properties the
     * value of the corresponding internal property of this DateTimeFormat object (see 12.4):
     * locale, calendar, numberingSystem, timeZone, hour12, weekday, era, year, month, day,
     * hour, minute, second, and timeZoneName. Properties whose corresponding internal
     * properties are not present are not assigned.
     */
    /* 12.3.3 */defineProperty(Intl.DateTimeFormat.prototype, 'resolvedOptions', {
        writable: true,
        configurable: true,
        value: function value() {
            var prop = void 0,
                descs = new Record(),
                props = ['locale', 'calendar', 'numberingSystem', 'timeZone', 'hour12', 'weekday', 'era', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timeZoneName'],
                internal = this !== null && babelHelpers$1["typeof"](this) === 'object' && getInternalProperties(this);

            // Satisfy test 12.3_b
            if (!internal || !internal['[[initializedDateTimeFormat]]']) throw new TypeError('`this` value for resolvedOptions() is not an initialized Intl.DateTimeFormat object.');

            for (var i = 0, max = props.length; i < max; i++) {
                if (hop.call(internal, prop = '[[' + props[i] + ']]')) descs[props[i]] = { value: internal[prop], writable: true, configurable: true, enumerable: true };
            }

            return objCreate({}, descs);
        }
    });

    var ls = Intl.__localeSensitiveProtos = {
        Number: {},
        Date: {}
    };

    /**
     * When the toLocaleString method is called with optional arguments locales and options,
     * the following steps are taken:
     */
    /* 13.2.1 */ls.Number.toLocaleString = function () {
        // Satisfy test 13.2.1_1
        if (Object.prototype.toString.call(this) !== '[object Number]') throw new TypeError('`this` value must be a number for Number.prototype.toLocaleString()');

        // 1. Let x be this Number value (as defined in ES5, 15.7.4).
        // 2. If locales is not provided, then let locales be undefined.
        // 3. If options is not provided, then let options be undefined.
        // 4. Let numberFormat be the result of creating a new object as if by the
        //    expression new Intl.NumberFormat(locales, options) where
        //    Intl.NumberFormat is the standard built-in constructor defined in 11.1.3.
        // 5. Return the result of calling the FormatNumber abstract operation
        //    (defined in 11.3.2) with arguments numberFormat and x.
        return FormatNumber(new NumberFormatConstructor(arguments[0], arguments[1]), this);
    };

    /**
     * When the toLocaleString method is called with optional arguments locales and options,
     * the following steps are taken:
     */
    /* 13.3.1 */ls.Date.toLocaleString = function () {
        // Satisfy test 13.3.0_1
        if (Object.prototype.toString.call(this) !== '[object Date]') throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleString()');

        // 1. Let x be this time value (as defined in ES5, 15.9.5).
        var x = +this;

        // 2. If x is NaN, then return "Invalid Date".
        if (isNaN(x)) return 'Invalid Date';

        // 3. If locales is not provided, then let locales be undefined.
        var locales = arguments[0];

        // 4. If options is not provided, then let options be undefined.
        var options = arguments[1];

        // 5. Let options be the result of calling the ToDateTimeOptions abstract
        //    operation (defined in 12.1.1) with arguments options, "any", and "all".
        options = ToDateTimeOptions(options, 'any', 'all');

        // 6. Let dateTimeFormat be the result of creating a new object as if by the
        //    expression new Intl.DateTimeFormat(locales, options) where
        //    Intl.DateTimeFormat is the standard built-in constructor defined in 12.1.3.
        var dateTimeFormat = new DateTimeFormatConstructor(locales, options);

        // 7. Return the result of calling the FormatDateTime abstract operation (defined
        //    in 12.3.2) with arguments dateTimeFormat and x.
        return FormatDateTime(dateTimeFormat, x);
    };

    /**
     * When the toLocaleDateString method is called with optional arguments locales and
     * options, the following steps are taken:
     */
    /* 13.3.2 */ls.Date.toLocaleDateString = function () {
        // Satisfy test 13.3.0_1
        if (Object.prototype.toString.call(this) !== '[object Date]') throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleDateString()');

        // 1. Let x be this time value (as defined in ES5, 15.9.5).
        var x = +this;

        // 2. If x is NaN, then return "Invalid Date".
        if (isNaN(x)) return 'Invalid Date';

        // 3. If locales is not provided, then let locales be undefined.
        var locales = arguments[0],


        // 4. If options is not provided, then let options be undefined.
        options = arguments[1];

        // 5. Let options be the result of calling the ToDateTimeOptions abstract
        //    operation (defined in 12.1.1) with arguments options, "date", and "date".
        options = ToDateTimeOptions(options, 'date', 'date');

        // 6. Let dateTimeFormat be the result of creating a new object as if by the
        //    expression new Intl.DateTimeFormat(locales, options) where
        //    Intl.DateTimeFormat is the standard built-in constructor defined in 12.1.3.
        var dateTimeFormat = new DateTimeFormatConstructor(locales, options);

        // 7. Return the result of calling the FormatDateTime abstract operation (defined
        //    in 12.3.2) with arguments dateTimeFormat and x.
        return FormatDateTime(dateTimeFormat, x);
    };

    /**
     * When the toLocaleTimeString method is called with optional arguments locales and
     * options, the following steps are taken:
     */
    /* 13.3.3 */ls.Date.toLocaleTimeString = function () {
        // Satisfy test 13.3.0_1
        if (Object.prototype.toString.call(this) !== '[object Date]') throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleTimeString()');

        // 1. Let x be this time value (as defined in ES5, 15.9.5).
        var x = +this;

        // 2. If x is NaN, then return "Invalid Date".
        if (isNaN(x)) return 'Invalid Date';

        // 3. If locales is not provided, then let locales be undefined.
        var locales = arguments[0];

        // 4. If options is not provided, then let options be undefined.
        var options = arguments[1];

        // 5. Let options be the result of calling the ToDateTimeOptions abstract
        //    operation (defined in 12.1.1) with arguments options, "time", and "time".
        options = ToDateTimeOptions(options, 'time', 'time');

        // 6. Let dateTimeFormat be the result of creating a new object as if by the
        //    expression new Intl.DateTimeFormat(locales, options) where
        //    Intl.DateTimeFormat is the standard built-in constructor defined in 12.1.3.
        var dateTimeFormat = new DateTimeFormatConstructor(locales, options);

        // 7. Return the result of calling the FormatDateTime abstract operation (defined
        //    in 12.3.2) with arguments dateTimeFormat and x.
        return FormatDateTime(dateTimeFormat, x);
    };

    defineProperty(Intl, '__applyLocaleSensitivePrototypes', {
        writable: true,
        configurable: true,
        value: function value() {
            defineProperty(Number.prototype, 'toLocaleString', { writable: true, configurable: true, value: ls.Number.toLocaleString });
            // Need this here for IE 8, to avoid the _DontEnum_ bug
            defineProperty(Date.prototype, 'toLocaleString', { writable: true, configurable: true, value: ls.Date.toLocaleString });

            for (var k in ls.Date) {
                if (hop.call(ls.Date, k)) defineProperty(Date.prototype, k, { writable: true, configurable: true, value: ls.Date[k] });
            }
        }
    });

    /**
     * Can't really ship a single script with data for hundreds of locales, so we provide
     * this __addLocaleData method as a means for the developer to add the data on an
     * as-needed basis
     */
    defineProperty(Intl, '__addLocaleData', {
        value: function value(data) {
            if (!IsStructurallyValidLanguageTag(data.locale)) throw new Error("Object passed doesn't identify itself with a valid language tag");

            addLocaleData(data, data.locale);
        }
    });

    function addLocaleData(data, tag) {
        // Both NumberFormat and DateTimeFormat require number data, so throw if it isn't present
        if (!data.number) throw new Error("Object passed doesn't contain locale data for Intl.NumberFormat");

        var locale = void 0,
            locales = [tag],
            parts = tag.split('-');

        // Create fallbacks for locale data with scripts, e.g. Latn, Hans, Vaii, etc
        if (parts.length > 2 && parts[1].length === 4) arrPush.call(locales, parts[0] + '-' + parts[2]);

        while (locale = arrShift.call(locales)) {
            // Add to NumberFormat internal properties as per 11.2.3
            arrPush.call(internals.NumberFormat['[[availableLocales]]'], locale);
            internals.NumberFormat['[[localeData]]'][locale] = data.number;

            // ...and DateTimeFormat internal properties as per 12.2.3
            if (data.date) {
                data.date.nu = data.number.nu;
                arrPush.call(internals.DateTimeFormat['[[availableLocales]]'], locale);
                internals.DateTimeFormat['[[localeData]]'][locale] = data.date;
            }
        }

        // If this is the first set of locale data added, make it the default
        if (defaultLocale === undefined) setDefaultLocale(tag);
    }

    defineProperty(Intl, '__disableRegExpRestore', {
        value: function value() {
            internals.disableRegExpRestore = true;
        }
    });

    module.exports = Intl;
});
$__System.registerDynamic("node_modules/intl/locale-data/complete.js", [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal($__module.id, null, null);

  (function ($__global) {
    (function (addLocaleData) {
      var a = ["gregory", "buddhist", "chinese", "coptic", "dangi", "ethioaa", "ethiopic", "generic", "hebrew", "indian", "islamic", "islamicc", "japanese", "persian", "roc", "{1}, {0}", "{1} 'at' {0}", "d", "ccc", "d E", "E h:mm a", "E HH:mm", "E h:mm:ss a", "E HH:mm:ss", "y G", "MMM y G", "MMM d, y G", "E, MMM d, y G", "h a", "HH", "h:mm a", "HH:mm", "h:mm:ss a", "HH:mm:ss", "h:mm:ss a v", "HH:mm:ss v", "h:mm a v", "HH:mm v", "L", "M/d", "E, M/d", "LLL", "MMM d", "E, MMM d", "MMMM d", "mm:ss", "y", "M/y", "M/d/y", "E, M/d/y", "MMM y", "MMM d, y", "E, MMM d, y", "MMMM y", "QQQ y", "QQQQ y", "EEEE, MMMM d, y", "MMMM d, y", "M/d/yy", "h:mm:ss a zzzz", "h:mm:ss a z", "J", "F", "M", "A", "S", "O", "N", "D", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December", "T", "W", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "BE", "AM", "PM", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "Mo1", "Mo2", "Mo3", "Mo4", "Mo5", "Mo6", "Mo7", "Mo8", "Mo9", "Mo10", "Mo11", "Mo12", "Month1", "Month2", "Month3", "Month4", "Month5", "Month6", "Month7", "Month8", "Month9", "Month10", "Month11", "Month12", "13", "Tout", "Baba", "Hator", "Kiahk", "Toba", "Amshir", "Baramhat", "Baramouda", "Bashans", "Paona", "Epep", "Mesra", "Nasie", "ERA0", "ERA1", "Meskerem", "Tekemt", "Hedar", "Tahsas", "Ter", "Yekatit", "Megabit", "Miazia", "Genbot", "Sene", "Hamle", "Nehasse", "Pagumen", "M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08", "M09", "M10", "M11", "M12", "B", "BCE", "CE", "BC", "AD", "Before Christ", "Anno Domini", "Before Common Era", "Common Era", "Tishri", "Heshvan", "Kislev", "Tevet", "Shevat", "Adar I", "Adar", "Nisan", "Iyar", "Sivan", "Tamuz", "Av", "Elul", "Adar II", "Chaitra", "Vaisakha", "Jyaistha", "Asadha", "Sravana", "Bhadra", "Asvina", "Kartika", "Agrahayana", "Pausa", "Magha", "Phalguna", "Saka", "Muh.", "Saf.", "Rab. I", "Rab. II", "Jum. I", "Jum. II", "Raj.", "Sha.", "Ram.", "Shaw.", "Dhuʻl-Q.", "Dhuʻl-H.", "Muharram", "Safar", "Rabiʻ I", "Rabiʻ II", "Jumada I", "Jumada II", "Rajab", "Shaʻban", "Ramadan", "Shawwal", "Dhuʻl-Qiʻdah", "Dhuʻl-Hijjah", "AH", "Taika (645–650)", "Hakuchi (650–671)", "Hakuhō (672–686)", "Shuchō (686–701)", "Taihō (701–704)", "Keiun (704–708)", "Wadō (708–715)", "Reiki (715–717)", "Yōrō (717–724)", "Jinki (724–729)", "Tenpyō (729–749)", "Tenpyō-kampō (749-749)", "Tenpyō-shōhō (749-757)", "Tenpyō-hōji (757-765)", "Tenpyō-jingo (765-767)", "Jingo-keiun (767-770)", "Hōki (770–780)", "Ten-ō (781-782)", "Enryaku (782–806)", "Daidō (806–810)", "Kōnin (810–824)", "Tenchō (824–834)", "Jōwa (834–848)", "Kajō (848–851)", "Ninju (851–854)", "Saikō (854–857)", "Ten-an (857-859)", "Jōgan (859–877)", "Gangyō (877–885)", "Ninna (885–889)", "Kanpyō (889–898)", "Shōtai (898–901)", "Engi (901–923)", "Enchō (923–931)", "Jōhei (931–938)", "Tengyō (938–947)", "Tenryaku (947–957)", "Tentoku (957–961)", "Ōwa (961–964)", "Kōhō (964–968)", "Anna (968–970)", "Tenroku (970–973)", "Ten’en (973–976)", "Jōgen (976–978)", "Tengen (978–983)", "Eikan (983–985)", "Kanna (985–987)", "Eien (987–989)", "Eiso (989–990)", "Shōryaku (990–995)", "Chōtoku (995–999)", "Chōhō (999–1004)", "Kankō (1004–1012)", "Chōwa (1012–1017)", "Kannin (1017–1021)", "Jian (1021–1024)", "Manju (1024–1028)", "Chōgen (1028–1037)", "Chōryaku (1037–1040)", "Chōkyū (1040–1044)", "Kantoku (1044–1046)", "Eishō (1046–1053)", "Tengi (1053–1058)", "Kōhei (1058–1065)", "Jiryaku (1065–1069)", "Enkyū (1069–1074)", "Shōho (1074–1077)", "Shōryaku (1077–1081)", "Eihō (1081–1084)", "Ōtoku (1084–1087)", "Kanji (1087–1094)", "Kahō (1094–1096)", "Eichō (1096–1097)", "Jōtoku (1097–1099)", "Kōwa (1099–1104)", "Chōji (1104–1106)", "Kashō (1106–1108)", "Tennin (1108–1110)", "Ten-ei (1110-1113)", "Eikyū (1113–1118)", "Gen’ei (1118–1120)", "Hōan (1120–1124)", "Tenji (1124–1126)", "Daiji (1126–1131)", "Tenshō (1131–1132)", "Chōshō (1132–1135)", "Hōen (1135–1141)", "Eiji (1141–1142)", "Kōji (1142–1144)", "Ten’yō (1144–1145)", "Kyūan (1145–1151)", "Ninpei (1151–1154)", "Kyūju (1154–1156)", "Hōgen (1156–1159)", "Heiji (1159–1160)", "Eiryaku (1160–1161)", "Ōho (1161–1163)", "Chōkan (1163–1165)", "Eiman (1165–1166)", "Nin’an (1166–1169)", "Kaō (1169–1171)", "Shōan (1171–1175)", "Angen (1175–1177)", "Jishō (1177–1181)", "Yōwa (1181–1182)", "Juei (1182–1184)", "Genryaku (1184–1185)", "Bunji (1185–1190)", "Kenkyū (1190–1199)", "Shōji (1199–1201)", "Kennin (1201–1204)", "Genkyū (1204–1206)", "Ken’ei (1206–1207)", "Jōgen (1207–1211)", "Kenryaku (1211–1213)", "Kenpō (1213–1219)", "Jōkyū (1219–1222)", "Jōō (1222–1224)", "Gennin (1224–1225)", "Karoku (1225–1227)", "Antei (1227–1229)", "Kanki (1229–1232)", "Jōei (1232–1233)", "Tenpuku (1233–1234)", "Bunryaku (1234–1235)", "Katei (1235–1238)", "Ryakunin (1238–1239)", "En’ō (1239–1240)", "Ninji (1240–1243)", "Kangen (1243–1247)", "Hōji (1247–1249)", "Kenchō (1249–1256)", "Kōgen (1256–1257)", "Shōka (1257–1259)", "Shōgen (1259–1260)", "Bun’ō (1260–1261)", "Kōchō (1261–1264)", "Bun’ei (1264–1275)", "Kenji (1275–1278)", "Kōan (1278–1288)", "Shōō (1288–1293)", "Einin (1293–1299)", "Shōan (1299–1302)", "Kengen (1302–1303)", "Kagen (1303–1306)", "Tokuji (1306–1308)", "Enkyō (1308–1311)", "Ōchō (1311–1312)", "Shōwa (1312–1317)", "Bunpō (1317–1319)", "Genō (1319–1321)", "Genkō (1321–1324)", "Shōchū (1324–1326)", "Karyaku (1326–1329)", "Gentoku (1329–1331)", "Genkō (1331–1334)", "Kenmu (1334–1336)", "Engen (1336–1340)", "Kōkoku (1340–1346)", "Shōhei (1346–1370)", "Kentoku (1370–1372)", "Bunchū (1372–1375)", "Tenju (1375–1379)", "Kōryaku (1379–1381)", "Kōwa (1381–1384)", "Genchū (1384–1392)", "Meitoku (1384–1387)", "Kakei (1387–1389)", "Kōō (1389–1390)", "Meitoku (1390–1394)", "Ōei (1394–1428)", "Shōchō (1428–1429)", "Eikyō (1429–1441)", "Kakitsu (1441–1444)", "Bun’an (1444–1449)", "Hōtoku (1449–1452)", "Kyōtoku (1452–1455)", "Kōshō (1455–1457)", "Chōroku (1457–1460)", "Kanshō (1460–1466)", "Bunshō (1466–1467)", "Ōnin (1467–1469)", "Bunmei (1469–1487)", "Chōkyō (1487–1489)", "Entoku (1489–1492)", "Meiō (1492–1501)", "Bunki (1501–1504)", "Eishō (1504–1521)", "Taiei (1521–1528)", "Kyōroku (1528–1532)", "Tenbun (1532–1555)", "Kōji (1555–1558)", "Eiroku (1558–1570)", "Genki (1570–1573)", "Tenshō (1573–1592)", "Bunroku (1592–1596)", "Keichō (1596–1615)", "Genna (1615–1624)", "Kan’ei (1624–1644)", "Shōho (1644–1648)", "Keian (1648–1652)", "Jōō (1652–1655)", "Meireki (1655–1658)", "Manji (1658–1661)", "Kanbun (1661–1673)", "Enpō (1673–1681)", "Tenna (1681–1684)", "Jōkyō (1684–1688)", "Genroku (1688–1704)", "Hōei (1704–1711)", "Shōtoku (1711–1716)", "Kyōhō (1716–1736)", "Genbun (1736–1741)", "Kanpō (1741–1744)", "Enkyō (1744–1748)", "Kan’en (1748–1751)", "Hōreki (1751–1764)", "Meiwa (1764–1772)", "An’ei (1772–1781)", "Tenmei (1781–1789)", "Kansei (1789–1801)", "Kyōwa (1801–1804)", "Bunka (1804–1818)", "Bunsei (1818–1830)", "Tenpō (1830–1844)", "Kōka (1844–1848)", "Kaei (1848–1854)", "Ansei (1854–1860)", "Man’en (1860–1861)", "Bunkyū (1861–1864)", "Genji (1864–1865)", "Keiō (1865–1868)", "H", "Meiji", "Taishō", "Shōwa", "Heisei", "Farvardin", "Ordibehesht", "Khordad", "Tir", "Mordad", "Shahrivar", "Mehr", "Aban", "Azar", "Dey", "Bahman", "Esfand", "AP", "Before R.O.C.", "Minguo", "latn", "{number}", "{minusSign}{number}", "{currency}{number}", "{minusSign}{currency}{number}", "{number}{percentSign}", "{minusSign}{number}{percentSign}", ".", ",", "NaN", "+", "-", "%", "∞", "A$", "R$", "CA$", "CN¥", "€", "£", "HK$", "₪", "₹", "¥", "₩", "MX$", "NZ$", "NT$", "$", "₫", "FCFA", "EC$", "CFA", "CFPF", "{1} {0}", "E d", "E hh:mm a", "E hh:mm:ss a", "dd MMM y G", "E, dd MMM y G", "dd-MM", "E, d/M", "d MMM", "E d MMM", "E d MMMM", "MM-y", "y-MM-dd", "E y-MM-dd", "d MMM y", "E, d MMM y", "EEEE, dd MMMM y", "dd MMMM y", "dd MMM y", "Jan.", "Feb.", "Mrt.", "Apr.", "Mei", "Jun.", "Jul.", "Aug.", "Sep.", "Okt.", "Nov.", "Des.", "Januarie", "Februarie", "Maart", "Junie", "Julie", "Augustus", "Oktober", "Desember", "V", "So.", "Ma.", "Di.", "Wo.", "Do.", "Vr.", "Sa.", "Sondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrydag", "Saterdag", "vm.", "nm.", "v.C.", "n.C.", "v.g.j.", "g.j.", "voor Christus", "na Christus", "voor die gewone jaartelling", "R.O.C.", " ", "JP¥", "฿", "US$", "R", "G y", "G y MMM", "G y MMM d", "G y MMM d, E", "d/M", "E d/M", "m:ss", "d/M/y", "E d/M/y", "E d MMM y", "y MMMM", "EEEE d MMMM y", "d MMMM y", "d MMM, y", "HH:mm:ss zzzz", "HH:mm:ss z", "n", "k", "t", "s", "z", "f", "l", "c", "nùm", "kɨz", "tɨd", "taa", "see", "nzu", "dum", "fɔe", "dzu", "lɔm", "kaa", "fwo", "ndzɔ̀ŋɔ̀nùm", "ndzɔ̀ŋɔ̀kƗ̀zùʔ", "ndzɔ̀ŋɔ̀tƗ̀dʉ̀ghà", "ndzɔ̀ŋɔ̀tǎafʉ̄ghā", "ndzɔ̀ŋèsèe", "ndzɔ̀ŋɔ̀nzùghò", "ndzɔ̀ŋɔ̀dùmlo", "ndzɔ̀ŋɔ̀kwîfɔ̀e", "ndzɔ̀ŋɔ̀tƗ̀fʉ̀ghàdzughù", "ndzɔ̀ŋɔ̀ghǔuwelɔ̀m", "ndzɔ̀ŋɔ̀chwaʔàkaa wo", "ndzɔ̀ŋèfwòo", "g", "u", "nts", "kpa", "ghɔ", "tɔm", "ume", "ghɨ", "dzk", "tsuʔntsɨ", "tsuʔukpà", "tsuʔughɔe", "tsuʔutɔ̀mlò", "tsuʔumè", "tsuʔughɨ̂m", "tsuʔndzɨkɔʔɔ", "a.g", "a.k", "SK", "BK", "Sěe Kɨ̀lesto", "Bǎa Kɨ̀lesto", "{number}{currency}", "{minusSign}{number}{currency}", "d, E", "E, MMMM d", "y/M/d", "y MMM d", "EEEE, y MMMM dd", "y MMMM d", "yy/MM/dd", "S-Ɔ", "K-Ɔ", "E-Ɔ", "E-O", "E-K", "O-A", "A-K", "D-Ɔ", "F-Ɛ", "Ɔ-A", "Ɔ-O", "M-Ɔ", "Sanda-Ɔpɛpɔn", "Kwakwar-Ɔgyefuo", "Ebɔw-Ɔbenem", "Ebɔbira-Oforisuo", "Esusow Aketseaba-Kɔtɔnimba", "Obirade-Ayɛwohomumu", "Ayɛwoho-Kitawonsa", "Difuu-Ɔsandaa", "Fankwa-Ɛbɔ", "Ɔbɛsɛ-Ahinime", "Ɔberɛfɛw-Obubuo", "Mumu-Ɔpɛnimba", "K", "Y", "Kwe", "Dwo", "Ben", "Wuk", "Yaw", "Fia", "Mem", "Kwesida", "Dwowda", "Benada", "Wukuda", "Yawda", "Fida", "Memeneda", "AN", "EW", "AK", "KE", "Ansa Kristo", "Kristo Ekyiri", "GH₵", "MMM d፣ y G", "E፣ MMM d፣ y G", "E፣ M/d", "E፣ MMM d", "E፣ MMMM d", "E፣ d/M/y", "E፣ MMM d y", "EEEE ፣d MMMM y", "dd/MM/y", "ጃ", "ፌ", "ማ", "ኤ", "ሜ", "ጁ", "ኦ", "ሴ", "ኖ", "ዲ", "ጃንዩ", "ፌብሩ", "ማርች", "ኤፕሪ", "ሜይ", "ጁን", "ጁላይ", "ኦገስ", "ሴፕቴ", "ኦክቶ", "ኖቬም", "ዲሴም", "ጃንዩወሪ", "ፌብሩወሪ", "ኤፕሪል", "ኦገስት", "ሴፕቴምበር", "ኦክቶበር", "ኖቬምበር", "ዲሴምበር", "እ", "ሰ", "ረ", "ሐ", "ዓ", "ቅ", "እሑድ", "ሰኞ", "ማክሰ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ", "ማክሰኞ", "ጥዋት", "ከሰዓት", "መስከረም", "ጥቅምት", "ኅዳር", "ታኅሣሥ", "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜን", "ዓ/ዓ", "ዓ/ም", "ዓመተ ዓለም", "ዓመተ ምሕረት", "AU$", "ብር", "E، d", "d MMM، y G", "E، d MMM، y G", "d/‏M", "E، d/M", "dd‏/MM", "E، d MMM", "d MMMM", "E، d MMMM", "M‏/y", "d‏/M‏/y", "E، d/‏M/‏y", "MM‏/y", "d MMM، y", "E، d MMM، y", "EEEE، d MMMM، y", "d MMMM، y", "dd‏/MM‏/y", "ي", "ف", "م", "أ", "و", "ن", "ل", "غ", "س", "ك", "ب", "د", "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر", "ح", "ث", "ر", "خ", "ج", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "التقويم البوذي", "ص", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "١٠", "١١", "١٢", "١٣", "توت", "بابه", "هاتور", "كيهك", "طوبة", "أمشير", "برمهات", "برمودة", "بشنس", "بؤونة", "أبيب", "مسرى", "نسيئ", "مسكريم", "تكمت", "هدار", "تهساس", "تر", "يكتت", "مجابيت", "ميازيا", "جنبت", "سين", "هامل", "نهاس", "باجمن", "ق.م", "ب.م", "قبل الميلاد", "ميلادي", "بعد الميلاد", "تشري", "مرحشوان", "كيسلو", "طيفت", "شباط", "آذار الأول", "آذار", "نيسان", "أيار", "سيفان", "تموز", "آب", "أيلول", "آذار الثاني", "محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة", "هـ", "تيكا", "هاكتشي", "هاكهو", "شتشو", "تيهو", "كيين", "وادو", "رييكي", "يورو", "جينكي", "تمبيو", "تمبيو-كامبو", "تمبيو-شوهو", "تمبيو-هوجي", "تمفو-جينجو", "جينجو-كيين", "هوكي", "تن-أو", "إنرياكو", "ديدو", "كونين", "تنتشو", "شووا (٨٣٤–٨٤٨)‏", "كاجو", "نينجو", "سيكو", "تنان", "جوجان", "جينكيي", "نينا", "كامبيو", "شوتاي", "انجي", "انتشو", "شوهيي", "تنجيو", "تنرياكو", "تنتوكو", "أووا", "كوهو", "آنا", "تينروكو", "تن-نن", "جوجن", "تنجن", "إيكان", "كانا", "اي-ان", "ايسو", "شورياكو (٩٩٠–٩٩٥)‏", "تشوتوكو", "تشوهو", "كانكو", "تشووا", "كانين", "جاين", "مانجو", "تشوجين", "تشورياكو", "تشوكيو (١٠٤٠–١٠٤٤)‏", "كانتوكو", "ايشو (١٠٤٦–١٠٥٣)‏", "تينجي", "كوهيي", "جيرياكو", "انكيو (١٠٦٩–١٠٧٤)‏", "شوهو (١٠٧٤–١٠٧٧)‏", "شورياكو (١٠٧٧–١٠٨١)‏", "ايهو", "أوتوكو", "كانجي", "كاهو", "ايتشو", "شوتوكو", "كووا (١٠٩٩–١١٠٤)‏", "تشوجي", "كاشو", "تنين", "تن-اي", "ايكيو (١١١٣–١١١٨)‏", "جن-اي", "هوان", "تنجي", "ديجي", "تنشو (١١٣١–١١٣٢)‏", "تشوشو", "هوين", "ايجي", "كوجي (١١٤٢–١١٤٤)‏", "تنيو", "كيوان", "نينبيي", "كيوجو", "هجين", "هيجي", "ايرياكو", "أوهو", "تشوكان", "ايمان", "نين-ان", "كاو", "شون", "أنجين", "جيشو", "يووا", "جيي", "جنريوكو", "بنجي", "كنكيو", "شوجي", "كنين", "جنكيو (١٢٠٤–١٢٠٦)‏", "كن-اي", "شوجن (١٢٠٧–١٢١١)‏", "كنرياكو", "كنبو (١٢١٣–١٢١٩)‏", "شوكيو", "جو", "جيننين", "كروكو", "أنتيي", "كنكي", "جويي", "تمبكو", "بنرياكو", "كاتيي", "رياكنين", "ان-أو", "نينجي", "كنجين", "هوجي", "كنتشو", "كوجن", "شوكا", "شوجن (١٢٥٩–١٢٦٠)‏", "بن-أو", "كوتشو", "بن-اي", "كنجي", "كوان", "شوو (١٢٨٨–١٢٩٣)‏", "اينين", "شوان", "كنجن", "كجن", "توكجي", "انكي", "أوتشو", "شووا (١٣١٢–١٣١٧)‏", "بنبو", "جنو", "جنكيو (١٣٢١–١٣٢٤)‏", "شوتشو (١٣٢٤–١٣٢٦)‏", "كريكي", "جنتكو", "جنكو", "كمو", "إنجن", "كوككو", "شوهي", "كنتكو", "بنتشو", "تنجو", "كورياكو", "كووا (١٣٨١–١٣٨٤)‏", "جنتشو", "مييتكو (١٣٨٤–١٣٨٧)‏", "كاكي", "كو", "مييتكو (١٣٩٠–١٣٩٤)‏", "أويي", "شوتشو (١٤٢٨–١٤٢٩)‏", "ايكيو (١٤٢٩–١٤٤١)‏", "ككيتسو", "بن-أن", "هوتكو", "كيوتكو", "كوشو", "تشوركو", "كنشو", "بنشو", "أونين", "بنمي", "تشوكيو (١٤٨٧–١٤٨٩)‏", "انتكو", "ميو", "بنكي", "ايشو (١٥٠٤–١٥٢١)‏", "تييي", "كيوركو", "تنمن", "كوجي (١٥٥٥–١٥٥٨)‏", "ايركو", "جنكي", "تنشو (١٥٧٣–١٥٩٢)‏", "بنركو", "كيتشو", "جنوا", "كان-اي", "شوهو (١٦٤٤–١٦٤٨)‏", "كيان", "شوو (١٦٥٢–١٦٥٥)‏", "ميرياكو", "منجي", "كنبن", "انبو", "تنوا", "جوكيو", "جنركو", "هويي", "شوتكو", "كيوهو", "جنبن", "كنبو (١٧٤١–١٧٤٤)‏", "انكيو (١٧٤٤–١٧٤٨)‏", "كان-ان", "هورياكو", "مييوا", "ان-اي", "تنمي", "كنسي", "كيووا", "بنكا", "بنسي", "تنبو", "كوكا", "كاي", "أنسي", "من-ان", "بنكيو", "جنجي", "كيو", "ميجي", "تيشو", "شووا", "هيسي", "فرفردن", "أذربيهشت", "خرداد", "تار", "مرداد", "شهرفار", "مهر", "آيان", "آذر", "دي", "بهمن", "اسفندار", "ه‍.ش", "جمهورية الصي", "arab", "{currency} {number}", "{minusSign}{currency} {number}", "٫", "٬", "ليس رقم", "‏+", "‏-", "٪", "ليس رقمًا", "‎+", "‎-", "د.إ.‏", "د.ب.‏", "د.ج.‏", "ج.م.‏", "ر.إن.", "د.ع.‏", "ر.إ.", "د.أ.‏", "ف.ج.ق.‏", "د.ك.‏", "ل.ل.‏", "د.ل.‏", "د.م.‏", "أ.م.‏", "ر.ع.‏", "ر.ب.", "ر.ق.‏", "ر.س.‏", "د.س.‏", "ج.س.", "ج.ج.س.", "ل.س.‏", "د.ت.‏", "ل.ت.", "***", "ر.ي.‏", "Fdj", "جانفي", "فيفري", "أفريل", "ماي", "جوان", "جويلية", "أوت", "Nfk", "H:mm:ss zzzz", "H:mm:ss z", "H:mm:ss", "H:mm", "ش", "آ", "ت", "كانون الثاني", "حزيران", "تشرین الأول", "تشرين الثاني", "كانون الأول", "تشرين الأول", "يوليوز", "غشت", "شتنبر", "نونبر", "دجنبر", "إ", "إبريل", "أغشت", "شتمبر", "دجمبر", "GB£", "MM-dd", "MM-dd, E", "MMM d, E", "y-MM", "y-MM-dd, E", "y MMM", "y MMM d, E", "y QQQ", "y QQQQ", "y MMMM d, EEEE", "জানু", "ফেব্ৰু", "মাৰ্চ", "এপ্ৰিল", "মে", "জুন", "জুলাই", "আগ", "সেপ্ট", "অক্টো", "নভে", "ডিসে", "জানুৱাৰী", "ফেব্ৰুৱাৰী", "আগষ্ট", "ছেপ্তেম্বৰ", "অক্টোবৰ", "নৱেম্বৰ", "ডিচেম্বৰ", "ৰবি", "সোম", "মঙ্গল", "বুধ", "বৃহষ্পতি", "শুক্ৰ", "শনি", "দেওবাৰ", "সোমবাৰ", "মঙ্গলবাৰ", "বুধবাৰ", "বৃহষ্পতিবাৰ", "শুক্ৰবাৰ", "শনিবাৰ", "পূৰ্বাহ্ণ", "অপৰাহ্ণ", "beng", "EEEE, d MMMM y", "Mac", "Ago", "Okt", "Januari", "Februari", "Machi", "Aprili", "Juni", "Julai", "Agosti", "Septemba", "Oktoba", "Novemba", "Desemba", "I", "Jpi", "Jtt", "Jnn", "Jtn", "Alh", "Ijm", "Jmo", "Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi", "icheheavo", "ichamthi", "KM", "BM", "Kabla yakwe Yethu", "Baada yakwe Yethu", "{number} {currency}", "{minusSign}{number} {currency}", "TSh", "{1} 'a' 'les' {0}", "d MMM y G", "E, d MMM y G", "E, d MMM", "E, d/M/y", "LLLL 'de' y", "EEEE, d MMMM 'de' y", "d MMMM 'de' y", "d/M/yy", "X", "P", "xin", "feb", "mar", "abr", "may", "xun", "xnt", "ago", "set", "och", "pay", "avi", "de xineru", "de febreru", "de marzu", "d’abril", "de mayu", "de xunu", "de xunetu", "d’agostu", "de setiembre", "d’ochobre", "de payares", "d’avientu", "dom", "llu", "mié", "xue", "vie", "sáb", "domingu", "llunes", "martes", "miércoles", "xueves", "vienres", "sábadu", "EB", "era budista", "de la mañana", "de la tardi", "mes 1", "mes 2", "mes 3", "mes 4", "mes 5", "mes 6", "mes 7", "mes 8", "mes 9", "mes 10", "mes 11", "mes 12", "mes", "tek", "hed", "tah", "ter", "yek", "meg", "mia", "gen", "sen", "ham", "neh", "pag", "de meskerem", "de tekemt", "d’hedar", "de tahsas", "de ter", "de yekatit", "de megabit", "de miazia", "de genbot", "de sene", "d’hamle", "de nehasse", "de pagumen", "aE", "dE", "a. E.", "d. E.", "antes de la Encarnación", "después de la Encarnación", "aC", "dC", "anE", "nE", "a.C.", "d.C.", "edC", "n.E.", "después de Cristu", "antes de nuestra Era", "nuestra Era", "Taika", "Tenpyō", "T. kampō", "T. shōhō", "T. hōji", "T. jingo", "Saikō", "Ten-an", "Jōgan", "Gangyō", "Kanpyō", "Jōhei", "Tenryaku", "Eien", "Eihō", "Hakuchi", "Hakuhō", "Shuchō", "Taihō", "Keiun", "Wadō", "Reiki", "Yōrō", "Jinki", "T.-kampō", "T.-shōhō", "T.-hōji", "T.-jingo", "J.-keiun", "Hōki", "Ten-ō", "Enryaku", "Daidō", "Kōnin", "Tenchō", "Jōwa", "Kajō", "Ninju", "Ninna", "Shōtai", "Engi", "Enchō", "Tengyō", "Tentoku", "Ōwa", "Kōhō", "Anna", "Tenroku", "Ten’en", "Jōgen", "Tengen", "Eikan", "Kanna", "Eiso", "Shōryaku", "Chōtoku", "Chōhō", "Kankō", "Chōwa", "Kannin", "Jian", "Manju", "Chōgen", "Chōryaku", "Chōkyū", "Kantoku", "Eishō", "Tengi", "Kōhei", "Jiryaku", "Enkyū", "Shōho", "Shōryaku II", "Ōtoku", "Kanji", "Kahō", "Eichō", "Jōtoku", "Kōwa", "Chōji", "Kashō", "Tennin", "Ten-ei", "Eikyū", "Gen’ei", "Hōan", "Tenji", "Daiji", "Tenshō", "Chōshō", "Hōen", "Eiji", "Kōji", "Ten’yō", "Kyūan", "Ninpei", "Kyūju", "Hōgen", "Heiji", "Eiryaku", "Ōho", "Chōkan", "Eiman", "Nin’an", "Kaō", "Shōan", "Angen", "Jishō", "Yōwa", "Juei", "Genryaku", "Bunji", "Kenkyū", "Shōji", "Kennin", "Genkyū", "Ken’ei", "Jōgen II", "Kenryaku", "Kenpō", "Jōkyū", "Jōō", "Gennin", "Karoku", "Antei", "Kanki", "Jōei", "Tenpuku", "Bunryaku", "Katei", "Ryakunin", "En’ō", "Ninji", "Kangen", "Hōji", "Kenchō", "Kōgen", "Shōka", "Shōgen", "Bun’ō", "Kōchō", "Bun’ei", "Kenji", "Kōan", "Shōō", "Einin", "Shōan II", "Kengen", "Kagen", "Tokuji", "Enkyō", "Ōchō", "Bunpō", "Genō", "Genkō", "Shōchū", "Karyaku", "Gentoku", "Genkō II", "Kenmu", "Engen", "Kōkoku", "Shōhei", "Kentoku", "Bunchū", "Tenju", "Kōryaku", "Kōwa II", "Genchū", "Meitoku", "Kakei", "Kōō", "Meitoku II", "Ōei", "Shōchō", "Eikyō", "Kakitsu", "Bun’an", "Hōtoku", "Kyōtoku", "Kōshō", "Chōroku", "Kanshō", "Bunshō", "Ōnin", "Bunmei", "Chōkyō", "Entoku", "Meiō", "Bunki", "Eishō II", "Taiei", "Kyōroku", "Tenbun", "Kōji II", "Eiroku", "Genki", "Tenshō II", "Bunroku", "Keichō", "Genna", "Kan’ei", "Shōho II", "Keian", "Jōō II", "Meireki", "Manji", "Kanbun", "Enpō", "Tenna", "Jōkyō", "Genroku", "Hōei", "Shōtoku", "Kyōhō", "Genbun", "Kanpō", "Enkyō II", "Kan’en", "Hōreki", "Meiwa", "An’ei", "Tenmei", "Kansei", "Kyōwa", "Bunka", "Bunsei", "Tenpō", "Kōka", "Kaei", "Ansei", "Man’en", "Bunkyū", "Genji", "Keiō", "e. Shōwa", "En-ō (1239-1240)", "era Shōwa", "A.R.D.C.", "R.D.C.", "antes de la R.D.C.", "ND", "G MMM y", "G d MMM y", "G d MMM y, E", "dd.MM", "dd.MM, E", "d MMM, E", "MM.y", "dd.MM.y", "dd.MM.y, E", "d MMM y, E", "d MMMM y, EEEE", "dd.MM.yy", "yan", "fev", "apr", "iyn", "iyl", "avq", "okt", "noy", "dek", "yanvar", "fevral", "mart", "aprel", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr", "B.", "B.E.", "Ç.A.", "Ç.", "C.A.", "C.", "Ş.", "bazar", "bazar ertəsi", "çərşənbə axşamı", "çərşənbə", "cümə axşamı", "cümə", "şənbə", "e.ə.", "b.e.", "ü.e.ö.", "ü.e.", "eramızdan əvvəl", "eramız", "ümumi eradan öncə", "ümumi era", "₼", "E, dd.MM", "E, d, MMM", "E, dd.MM.y", "MMM, y", "E, d, MMM, y", "EEEE, d, MMMM, y", "d MMMM, y", "јанвар", "феврал", "март", "апрел", "май", "ијун", "ијул", "август", "сентјабр", "октјабр", "нојабр", "декабр", "базар", "базар ертәси", "чәршәнбә ахшамы", "чәршәнбә", "ҹүмә ахшамы", "ҹүмә", "шәнбә", "m", "h", "b", "kɔn", "mac", "mat", "mto", "mpu", "hil", "nje", "hik", "dip", "bio", "liɓ", "Kɔndɔŋ", "Màcɛ̂l", "Màtùmb", "Màtop", "M̀puyɛ", "Hìlòndɛ̀", "Njèbà", "Hìkaŋ", "Dìpɔ̀s", "Bìòôm", "Màyɛsèp", "Lìbuy li ńyèe", "ŋ", "j", "nɔy", "nja", "uum", "ŋge", "mbɔ", "kɔɔ", "jon", "ŋgwà nɔ̂y", "ŋgwà njaŋgumba", "ŋgwà ûm", "ŋgwà ŋgê", "ŋgwà mbɔk", "ŋgwà kɔɔ", "ŋgwà jôn", "I bikɛ̂glà", "I ɓugajɔp", "b.Y.K", "m.Y.K", "bisū bi Yesù Krǐstò", "i mbūs Yesù Krǐstò", "{number} {percentSign}", "{minusSign}{number} {percentSign}", "{1} 'у' {0}", "E hh.mm a", "E HH.mm", "E hh.mm.ss a", "E HH.mm.ss", "LLL y G", "hh a", "hh.mm a", "HH.mm", "hh.mm.ss a", "HH.mm.ss", "hh.mm.ss a v", "HH.mm.ss v", "hh.mm a v", "HH.mm v", "d.M", "E, d.M", "E, d MMMM", "mm.ss", "M.y", "d.M.y", "E, d.M.y", "LLL y", "LLLL y", "d.M.yy", "HH.mm.ss zzzz", "HH.mm.ss z", "с", "л", "к", "м", "ч", "ж", "в", "сту", "лют", "сак", "кра", "мая", "чэр", "ліп", "жні", "вер", "кас", "ліс", "сне", "студзеня", "лютага", "сакавіка", "красавіка", "чэрвеня", "ліпеня", "жніўня", "верасня", "кастрычніка", "лістапада", "снежня", "н", "п", "а", "нд", "пн", "аў", "ср", "чц", "пт", "сб", "нядзеля", "панядзелак", "аўторак", "серада", "чацвер", "пятніца", "субота", "да паўдня", "пасля паўдня", "да н.э.", "н.э.", "да нашай эры", "нашай эры", "наша эра", "р.", "₽", "E", "Epr", "Oga", "Dis", "Epreo", "Ogasti", "Disemba", "Pa Mulungu", "Palichimo", "Palichibuli", "Palichitatu", "Palichine", "Palichisano", "Pachibelushi", "uluchelo", "akasuba", "Before Yesu", "After Yesu", "Hut", "Vil", "Dat", "Tai", "Han", "Sit", "Sab", "Nan", "Tis", "Kum", "Kmj", "Kmb", "pa mwedzi gwa hutala", "pa mwedzi gwa wuvili", "pa mwedzi gwa wudatu", "pa mwedzi gwa wutai", "pa mwedzi gwa wuhanu", "pa mwedzi gwa sita", "pa mwedzi gwa saba", "pa mwedzi gwa nane", "pa mwedzi gwa tisa", "pa mwedzi gwa kumi", "pa mwedzi gwa kumi na moja", "pa mwedzi gwa kumi na mbili", "Mul", "Hiv", "Hid", "Hit", "Hih", "Lem", "pa mulungu", "pa shahuviluha", "pa hivili", "pa hidatu", "pa hitayi", "pa hihanu", "pa shahulembela", "pamilau", "pamunyi", "Kabla ya Mtwaa", "Baada ya Mtwaa", "E, d", "E, h:mm a", "E, HH:mm", "E, h:mm:ss a", "E, H:mm:ss", "y 'г'. G", "MM.y 'г'. G", "d.MM.y 'г'. G", "E, d.MM.y 'г'. G", "MMMM y 'г'. G", "d MMMM y 'г'. G", "E, d MMMM y 'г'. G", "d.MM", "E, d.MM", "MM", "LLLL", "y 'г'.", "M.y 'г'.", "d.MM.y 'г'.", "E, d.MM.y 'г'.", "MM.y 'г'.", "MMMM y 'г'.", "d MMMM y 'г'.", "E, d MMMM y 'г'.", "QQQ y 'г'.", "QQQQ y 'г'.", "EEEE, d MMMM y 'г'.", "d.MM.yy 'г'.", "я", "ф", "ю", "о", "д", "яну", "фев", "апр", "юни", "юли", "авг", "сеп", "окт", "ное", "дек", "януари", "февруари", "април", "септември", "октомври", "ноември", "декември", "вт", "чт", "неделя", "понеделник", "вторник", "сряда", "четвъртък", "петък", "събота", "пр.об.", "сл.об.", "пр.Хр.", "сл.Хр.", "пр.н.е.", "сл.н.е.", "преди Христа", "след Христа", "преди новата ера", "след новата ера", "тишри", "хешван", "кислев", "тебет", "шебат", "адар I", "адар", "нисан", "иар", "сиван", "тамуз", "ав", "елул", "адар II", "чайтра", "вайсакха", "джаинтха", "асадха", "сравана", "бхада", "азвина", "картика", "аграхайана", "пауза", "магха", "пхалгуна", "мухарам", "сафар", "раби-1", "раби-2", "джумада-1", "джумада-2", "раджаб", "шабан", "рамазан", "Шавал", "Дхул-Каада", "Дхул-хиджа", "лв.", "щ.д.", "d/MM", "dd/MM", "MMM", "MM/y", "Z", "U", "Ɔ", "zan", "awi", "mɛ", "zuw", "zul", "uti", "sɛt", "ɔku", "now", "des", "zanwuye", "feburuye", "marisi", "awirili", "zuwɛn", "zuluye", "sɛtanburu", "ɔkutɔburu", "nowanburu", "desanburu", "kar", "ntɛ", "tar", "ara", "ala", "jum", "sib", "kari", "ntɛnɛ", "tarata", "araba", "alamisa", "juma", "sibiri", "J.-C. ɲɛ", "ni J.-C.", "jezu krisiti ɲɛ", "jezu krisiti minkɛ", "d MMM, y G", "E, d MMM, y G", "E, d-M", "E, d MMM, y", "EEEE, d MMMM, y", "জা", "ফে", "মা", "এ", "জু", "আ", "সে", "অ", "ন", "ডি", "জানুয়ারী", "ফেব্রুয়ারী", "মার্চ", "এপ্রিল", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর", "র", "সো", "ম", "বু", "বৃ", "শু", "শ", "রবি", "বৃহস্পতি", "শুক্র", "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার", "অপরাহ্ণ", "খ্রিস্টপূর্ব", "খৃষ্টাব্দ", "খ্রিষ্টপূর্বাব্দ", "খ্রিষ্টাব্দ", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "১০", "১১", "১২", "চৈত্র", "বৈশাখ", "জৈষ্ঠ্য", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "সাল", "মহররম", "সফর", "রবিউল আউয়াল", "রবিউস সানি", "জমাদিউল আউয়াল", "জমাদিউস সানি", "রজব", "শা‘বান", "রমজান", "শাওয়াল", "জ্বিলকদ", "জ্বিলহজ্জ", "যুগ", "সংখ্যা না", "৳", "G y LLLL", "MMMཚེས་d", "MMMཚེས་d, E", "MMMMའི་ཚེས་d", "y LLL", "y ལོའི་MMMཚེས་d", "སྤྱི་ལོ་y MMMMའི་ཚེས་d", "y MMMMའི་ཚེས་d, EEEE", "ཟླ་༡", "ཟླ་༢", "ཟླ་༣", "ཟླ་༤", "ཟླ་༥", "ཟླ་༦", "ཟླ་༧", "ཟླ་༨", "ཟླ་༩", "ཟླ་༡༠", "ཟླ་༡༡", "ཟླ་༡༢", "ཟླ་བ་དང་པོ", "ཟླ་བ་གཉིས་པ", "ཟླ་བ་གསུམ་པ", "ཟླ་བ་བཞི་པ", "ཟླ་བ་ལྔ་པ", "ཟླ་བ་དྲུག་པ", "ཟླ་བ་བདུན་པ", "ཟླ་བ་བརྒྱད་པ", "ཟླ་བ་དགུ་པ", "ཟླ་བ་བཅུ་པ", "ཟླ་བ་བཅུ་གཅིག་པ", "ཟླ་བ་བཅུ་གཉིས་པ", "ཉི", "ཟླ", "མིག", "ལྷག", "ཕུར", "སངས", "སྤེན", "ཉི་མ་", "ཟླ་བ་", "མིག་དམར་", "ལྷག་པ་", "ཕུར་བུ་", "པ་སངས་", "སྤེན་པ་", "གཟའ་ཉི་མ་", "གཟའ་ཟླ་བ་", "གཟའ་མིག་དམར་", "གཟའ་ལྷག་པ་", "གཟའ་ཕུར་བུ་", "གཟའ་པ་སངས་", "གཟའ་སྤེན་པ་", "སྔ་དྲོ་", "ཕྱི་དྲོ་", "སྤྱི་ལོ་སྔོན་", "སྤྱི་ལོ་", "ཨང་མེན་", "{1} 'da' {0}", "E d MMM y G", "E dd/MM", "E dd/MM/y", "01", "02", "03", "04", "05", "06", "07", "08", "09", "Gen.", "Cʼhwe.", "Meur.", "Ebr.", "Mae", "Mezh.", "Goue.", "Eost", "Gwen.", "Here", "Du", "Kzu.", "Genver", "Cʼhwevrer", "Meurzh", "Ebrel", "Mezheven", "Gouere", "Gwengolo", "Kerzu", "Su", "Mz", "Mc", "G", "Sa", "Sul", "Lun", "Meu.", "Mer.", "Yaou", "Gwe.", "Sad.", "Mercʼher", "Gwener", "Sadorn", "A.M.", "G.M.", "a-raok J.K.", "goude J.K.", "a-raok Jezuz-Krist", "goude Jezuz-Krist", "a-raok R.S.", "R.S.", "a-raok Republik Sina", "Republik Sina", "$A", "$CA", "£ RU", "$ HK", "$ ZN", "$ SU", "MMM, y G", "d-MMM", "ज", "फे", "मा", "ए", "मे", "जु", "आ", "से", "अ", "न", "दि", "जानुवारी", "फेब्रुवारी", "मार्स", "एफ्रिल", "जुन", "जुलाइ", "आगस्थ", "सेबथेज्ब़र", "अखथबर", "नबेज्ब़र", "दिसेज्ब़र", "र", "स", "मं", "बु", "बि", "सु", "रबि", "सम", "मंगल", "बुद", "बिसथि", "सुखुर", "सुनि", "रबिबार", "समबार", "मंगलबार", "बुदबार", "बिसथिबार", "सुखुरबार", "सुनिबार", "फुं", "बेलासे", "ईसा.पूर्व", "सन", "बैसागो/बैसाग", "जेथो", "आसार", "सावुन", "भाद्र", "आसिन", "खाथि", "आगाह्न", "फुस", "मागो", "फागुन", "सैथो", "{1} 'u' {0}", "E, dd.", "y. G", "MMM y. G", "dd. MMM y. G", "E, dd. MMM y. G", "hh:mm a", "hh:mm:ss a", "dd.MM.", "E, dd.MM.", "dd. MM.", "dd. MMM", "E, dd. MMM", "d. MMMM", "E, d. MMMM", "y.", "MM.y.", "dd.MM.y.", "E, dd.MM.y.", "MM. y.", "MMM y.", "dd. MMM y.", "E, dd. MMM y.", "LLLL y.", "EEEE, dd. MMMM y.", "dd. MMMM y.", "dd. MMM. y.", "dd.MM.yy.", "a", "o", "jan", "maj", "jun", "jul", "aug", "sep", "nov", "dec", "januar", "februar", "april", "juni", "juli", "august", "septembar", "oktobar", "novembar", "decembar", "Č", "ned", "pon", "uto", "sri", "čet", "pet", "sub", "nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota", "prije podne", "popodne", "p. n. e.", "n. e.", "pr.n.e.", "n.e.", "Prije nove ere", "Nove ere", "pr. n. e.", "kn", "din.", "E, d.", "d.M.yy.", "ј", "јан", "феб", "мар", "мај", "јун", "јул", "нов", "дец", "јануар", "фебруар", "јуни", "јули", "септембар", "октобар", "новембар", "децембар", "у", "нед", "пон", "уто", "сри", "чет", "пет", "суб", "недеља", "понедељак", "уторак", "сриједа", "четвртак", "петак", "БЕ", "пре подне", "поподне", "Таут", "Баба", "Хатор", "Киахк", "Тоба", "Амшир", "Барамхат", "Барамуда", "Башанс", "Паона", "Епеп", "Месра", "Наси", "Мескерем", "Текемт", "Хедар", "Тахсас", "Тер", "Јекатит", "Мегабит", "Миазиа", "Генбот", "Сене", "Хамле", "Нехасе", "Пагумен", "п.н.е.", "н.е.", "п. н. е.", "н. е.", "Пре нове ере", "Нове ере", "Тишри", "Хешван", "Кислев", "Тевет", "Шеват", "Адар I", "Адар", "Нисан", "Ијар", "Сиван", "Тамуз", "Ав", "Елул", "Адар II", "Чаитра", "Ваисака", "Јиаиста", "Асада", "Сравана", "Бадра", "Асвина", "Картика", "Аргајана", "Пауза", "Мага", "Фалгуна", "САКА", "Мурахам", "Сафар", "Рабиʻ I", "Рабиʻ II", "Јумада I", "Јумада II", "Рађаб", "Шаʻбан", "Рамадан", "Дуʻл-Киʻда", "Дуʻл-хиђа", "АХ", "Таика (645–650)", "Хакучи (650–671)", "Хакухо (672–686)", "Шучо (686–701)", "Таихо (701–704)", "Кеиун (704–708)", "Вадо (708–715)", "Реики (715–717)", "Јоро (717–724)", "Јинки (724–729)", "Темпио (729–749)", "Темпио-кампо (749-749)", "Темпио-шохо (749-757)", "Темпио-хођи (757-765)", "Темпо-ђинго (765-767)", "Ђинго-кеиун (767-770)", "Хоки (770–780)", "Тен-о (781-782)", "Енрјаку (782–806)", "Даидо (806–810)", "Конин (810–824)", "Тенчо (824–834)", "Шова (834–848)", "Кајо (848–851)", "Нињу (851–854)", "Саико (854–857)", "Тенан (857–859)", "Јоган (859–877)", "Генкеи (877–885)", "Ниња (885–889)", "Кампјо (889–898)", "Шотаи (898–901)", "Енђи (901–923)", "Енчо (923–931)", "Шохеи (931–938)", "Тенгјо (938–947)", "Тенриаку (947–957)", "Тентоку (957–961)", "Ова (961–964)", "Кохо (964–968)", "Ана (968–970)", "Тенроку (970–973)", "Тен-ен (973-976)", "Јоген (976–978)", "Тенген (978–983)", "Еикан (983–985)", "Кана (985–987)", "Еи-ен (987-989)", "Еисо (989–990)", "Шорјаку (990–995)", "Чотоку (995–999)", "Чохо (999–1004)", "Канко (1004–1012)", "Чова (1012–1017)", "Канин (1017–1021)", "Ђиан (1021–1024)", "Мању (1024–1028)", "Чоген (1028–1037)", "Чорјаку (1037–1040)", "Чокју (1040–1044)", "Кантоку (1044–1046)", "Еишо (1046–1053)", "Тенђи (1053–1058)", "Кохеи (1058–1065)", "Ђирјаку (1065–1069)", "Енкју (1069–1074)", "Шохо (1074–1077)", "Шорјаку (1077–1081)", "Еишо (1081–1084)", "Отоку (1084–1087)", "Канђи (1087–1094)", "Кахо (1094–1096)", "Еичо (1096–1097)", "Шотоку (1097–1099)", "Кова (1099–1104)", "Чођи (1104–1106)", "Кашо (1106–1108)", "Тенин (1108–1110)", "Тен-еи (1110-1113)", "Еикју (1113–1118)", "Ђен-еи (1118-1120)", "Хоан (1120–1124)", "Тенђи (1124–1126)", "Даиђи (1126–1131)", "Теншо (1131–1132)", "Чошао (1132–1135)", "Хоен (1135–1141)", "Еиђи (1141–1142)", "Кођи (1142–1144)", "Тењо (1144–1145)", "Кјуан (1145–1151)", "Нинпеи (1151–1154)", "Кјују (1154–1156)", "Хоген (1156–1159)", "Хеиђи (1159–1160)", "Еирјаку (1160–1161)", "Охо (1161–1163)", "Чокан (1163–1165)", "Еиман (1165–1166)", "Нин-ан (1166-1169)", "Као (1169–1171)", "Шоан (1171–1175)", "Анген (1175–1177)", "Ђишо (1177–1181)", "Јова (1181–1182)", "Ђуеи (1182–1184)", "Генрјуку (1184–1185)", "Бунђи (1185–1190)", "Кенкју (1190–1199)", "Шођи (1199–1201)", "Кенин (1201–1204)", "Генкју (1204–1206)", "Кен-еи (1206-1207)", "Шоген (1207–1211)", "Кенрјаку (1211–1213)", "Кенпо (1213–1219)", "Шокју (1219–1222)", "Ђу (1222–1224)", "Ђенин (1224–1225)", "Кароку (1225–1227)", "Антеи (1227–1229)", "Канки (1229–1232)", "Ђоеи (1232–1233)", "Темпуку (1233–1234)", "Бунрјаку (1234–1235)", "Катеи (1235–1238)", "Рјакунин (1238–1239)", "Ен-о (1239-1240)", "Нињи (1240–1243)", "Канген (1243–1247)", "Хођи (1247–1249)", "Кенчо (1249–1256)", "Коген (1256–1257)", "Шока (1257–1259)", "Шоген (1259–1260)", "Бун-о (1260-1261)", "Кочо (1261–1264)", "Бун-еи (1264-1275)", "Кенђи (1275–1278)", "Коан (1278–1288)", "Шу (1288–1293)", "Еинин (1293–1299)", "Шоан (1299–1302)", "Кенген (1302–1303)", "Каген (1303–1306)", "Токуђи (1306–1308)", "Енкеи (1308–1311)", "Очо (1311–1312)", "Шова (1312–1317)", "Бунпо (1317–1319)", "Ђено (1319–1321)", "Ђенкјо (1321–1324)", "Шочу (1324–1326)", "Кареки (1326–1329)", "Гентоку (1329–1331)", "Генко (1331–1334)", "Кему (1334–1336)", "Енген (1336–1340)", "Кококу (1340–1346)", "Шохеи (1346–1370)", "Кентоку (1370–1372)", "Бучу (1372–1375)", "Тењу (1375–1379)", "Корјаку (1379–1381)", "Кова (1381–1384)", "Генчу (1384–1392)", "Меитоку (1384–1387)", "Какеи (1387–1389)", "Ку (1389–1390)", "Меитоку (1390–1394)", "Оеи (1394–1428)", "Шочо (1428–1429)", "Еикјо (1429–1441)", "Какитсу (1441–1444)", "Бун-ан (1444-1449)", "Хотоку (1449–1452)", "Кјотоку (1452–1455)", "Кошо (1455–1457)", "Чороку (1457–1460)", "Каншо (1460–1466)", "Буншо (1466–1467)", "Онин (1467–1469)", "Бунмеи (1469–1487)", "Чокјо (1487–1489)", "Ентоку (1489–1492)", "Меио (1492–1501)", "Бунки (1501–1504)", "Еишо (1504–1521)", "Таиеи (1521–1528)", "Кјороку (1528–1532)", "Тенмон (1532–1555)", "Кођи (1555–1558)", "Еироку (1558–1570)", "Генки (1570–1573)", "Теншо (1573–1592)", "Бунроку (1592–1596)", "Кеичо (1596–1615)", "Генва (1615–1624)", "Кан-еи (1624-1644)", "Шохо (1644–1648)", "Кеиан (1648–1652)", "Шу (1652–1655)", "Меирјаку (1655–1658)", "Мањи (1658–1661)", "Канбун (1661–1673)", "Енпо (1673–1681)", "Тенва (1681–1684)", "Јокјо (1684–1688)", "Генроку (1688–1704)", "Хоеи (1704–1711)", "Шотоку (1711–1716)", "Кјохо (1716–1736)", "Генбун (1736–1741)", "Канпо (1741–1744)", "Енкјо (1744–1748)", "Кан-ен (1748-1751)", "Хорјаку (1751–1764)", "Меива (1764–1772)", "Ан-еи (1772-1781)", "Тенмеи (1781–1789)", "Кансеи (1789–1801)", "Кјова (1801–1804)", "Бунка (1804–1818)", "Бунсеи (1818–1830)", "Тенпо (1830–1844)", "Кока (1844–1848)", "Каеи (1848–1854)", "Ансеи (1854–1860)", "Ман-ен (1860-1861)", "Бункју (1861–1864)", "Генђи (1864–1865)", "Кеико (1865–1868)", "Меиђи", "Таишо", "Шова", "Хаисеи", "Фаравадин", "Ордибехешт", "Кордад", "Тир", "Мордад", "Шахривар", "Мехр", "Абан", "Азар", "Деј", "Бахман", "Есфанд", "Пре РК", "РК", "КМ", "Кч", "зл", "дин.", "Тл", "E H:mm", "E H:mm:ss", "LLLL 'de' y G", "d MMMM 'de' y G", "E, d MMMM 'de' y G", "LLL 'de' y", "E, d MMMM 'de' y", "GN", "FB", "MÇ", "AB", "MG", "JN", "JL", "AG", "ST", "OC", "NV", "DS", "gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des.", "de gener", "de febrer", "de març", "de maig", "de juny", "de juliol", "d’agost", "de setembre", "d’octubre", "de novembre", "de desembre", "dg", "dl", "dt", "dc", "dj", "dv", "ds", "dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds.", "diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte", "eB", "a. m.", "p. m.", "AEC", "EC", "abans de Crist", "després de Crist", "abans de l’Era Comuna", "Era Comuna", "₧", "янв", "июн", "июл", "сен", "ноя", "январь", "февраль", "апрель", "июнь", "июль", "сентябрь", "октябрь", "ноябрь", "декабрь", "кӀиранан де", "оршотан де", "шинарин де", "кхаарин де", "еарин де", "пӀераскан де", "шот де", "Терхьаш дац", "KBZ", "KBR", "KST", "KKN", "KTN", "KMK", "KMS", "KMN", "KMW", "KKM", "KNK", "KNB", "Okwokubanza", "Okwakabiri", "Okwakashatu", "Okwakana", "Okwakataana", "Okwamukaaga", "Okwamushanju", "Okwamunaana", "Okwamwenda", "Okwaikumi", "Okwaikumi na kumwe", "Okwaikumi na ibiri", "SAN", "ORK", "OKB", "OKS", "OKN", "OKT", "OMK", "Sande", "Orwokubanza", "Orwakabiri", "Orwakashatu", "Orwakana", "Orwakataano", "Orwamukaaga", "Kurisito Atakaijire", "Kurisito Yaijire", "USh", "Ꭴ", "Ꭷ", "Ꭰ", "Ꮥ", "Ꭻ", "Ꭶ", "Ꮪ", "Ꮕ", "Ꭵ", "ᎤᏃ", "ᎧᎦ", "ᎠᏅ", "ᎧᏬ", "ᎠᏂ", "ᏕᎭ", "ᎫᏰ", "ᎦᎶ", "ᏚᎵ", "ᏚᏂ", "ᏅᏓ", "ᎥᏍ", "ᎤᏃᎸᏔᏅ", "ᎧᎦᎵ", "ᎠᏅᏱ", "ᎧᏬᏂ", "ᎠᏂᏍᎬᏘ", "ᏕᎭᎷᏱ", "ᎫᏰᏉᏂ", "ᎦᎶᏂ", "ᏚᎵᏍᏗ", "ᏚᏂᏅᏗ", "ᏅᏓᏕᏆ", "ᎥᏍᎩᏱ", "Ꮖ", "Ꮙ", "Ꮤ", "Ꮶ", "Ꮷ", "ᏆᏍᎬ", "ᏉᏅᎯ", "ᏔᎵᏁ", "ᏦᎢᏁ", "ᏅᎩᏁ", "ᏧᎾᎩ", "ᏈᏕᎾ", "ᎤᎾᏙᏓᏆᏍᎬ", "ᎤᎾᏙᏓᏉᏅᎯ", "ᏔᎵᏁᎢᎦ", "ᏦᎢᏁᎢᎦ", "ᏅᎩᏁᎢᎦ", "ᏧᎾᎩᎶᏍᏗ", "ᎤᎾᏙᏓᏈᏕᎾ", "ᏌᎾᎴ", "ᏒᎯᏱᎢᏗᏢ", "ᎤᏓᎷᎸ", "ᎤᎶᏐᏅ", "Ꮟ ᏥᏌ ᎾᏕᎲᏍᎬᎾ", "ᎠᎩᏃᎮᎵᏓᏍᏗᏱ ᎠᏕᏘᏱᏍᎬ ᏱᎰᏩ ᏧᏓᏂᎸᎢᏍᏗ", "d.", "E d.", "LLLL y G", "d. M. y G", "E d. M. y G", "d. MMMM y G", "E d. MMMM y G", "H:mm:ss v", "H:mm v", "d. M.", "E d. M.", "E d. MMMM", "d. M. y", "E d. M. y", "d. MMMM y", "E d. MMMM y", "EEEE d. MMMM y", "led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro", "ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince", "Ú", "ne", "po", "út", "st", "čt", "pá", "so", "neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota", "dop.", "odp.", "př.n.l.", "n.l.", "př. n. l.", "n. l.", "Před R. O. C.", "Kčs", "Kč", "ECU", "{1} 'am' {0}", "E, HH:mm:ss", "Q y", "dd/MM/yy", "Ch", "Rh", "Ion", "Chwef", "Maw", "Ebrill", "Mai", "Meh", "Gorff", "Awst", "Medi", "Hyd", "Tach", "Rhag", "Ionawr", "Chwefror", "Mawrth", "Mehefin", "Gorffennaf", "Hydref", "Tachwedd", "Rhagfyr", "Ll", "Llun", "Mer", "Iau", "Gwen", "Sad", "Dydd Sul", "Dydd Llun", "Dydd Mawrth", "Dydd Mercher", "Dydd Iau", "Dydd Gwener", "Dydd Sadwrn", "C", "CC", "Cyn Crist", "Oed Crist", "Cyn Cyfnod Cyffredin", "Cyfnod Cyffredin", "{1} 'kl'. {0}", "E 'den' d.", "E h.mm a", "E h.mm.ss a", "d. MMM y G", "E d. MMM y G", "h.mm a", "h.mm.ss a", "h.mm.ss a v", "h.mm a v", "d. MMM", "E d. MMM", "d. MMM y", "E d. MMM y", "EEEE 'den' d. MMMM y", "jan.", "feb.", "mar.", "apr.", "jun.", "aug.", "sep.", "okt.", "dec.", "marts", "september", "oktober", "november", "december", "søn.", "man.", "tir.", "ons.", "tor.", "fre.", "lør.", "søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag", "fKr", "eKr", "fvt", "vt", "f.Kr.", "e.Kr.", "f.v.t.", "v.t.", "før vesterlandsk tidsregning", "vesterlandsk tidsregning", "kr.", "h.mm.ss a zzzz", "h.mm.ss a z", "Imb", "Kaw", "Kad", "Kan", "Kas", "Kar", "Mfu", "Wun", "Ike", "Iku", "Imw", "Iwi", "Mori ghwa imbiri", "Mori ghwa kawi", "Mori ghwa kadadu", "Mori ghwa kana", "Mori ghwa kasanu", "Mori ghwa karandadu", "Mori ghwa mfungade", "Mori ghwa wunyanya", "Mori ghwa ikenda", "Mori ghwa ikumi", "Mori ghwa ikumi na imweri", "Mori ghwa ikumi na iwi", "Jum", "Jim", "Ngu", "Ituku ja jumwa", "Kuramuka jimweri", "Kuramuka kawi", "Kuramuka kadadu", "Kuramuka kana", "Kuramuka kasanu", "Kifula nguwo", "Luma lwa K", "luma lwa p", "KK", "Kabla ya Kristo", "Baada ya Kristo", "Ksh", "{1} 'um' {0}", "E, d. MMM y G", "HH 'Uhr'", "d.M.", "E, d.M.", "d.MM.", "E, d. MMM", "E, d. MMM y", "EEEE, d. MMMM y", "März", "Juli", "Dez.", "Januar", "Februar", "Dezember", "Mo.", "Mi.", "Fr.", "Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "vorm.", "nachm.", "v. Chr.", "n. Chr.", "v. u. Z.", "u. Z.", "vor unserer Zeitrechnung", "unserer Zeitrechnung", "öS", "BGK", "BGJ", "DM", "Jän.", "Jänner", "{currency}{minusSign}{number}", "'", "Ž", "Žan", "Fee", "Awi", "Me", "Žuw", "Žuy", "Ut", "Sek", "Noo", "Dee", "Žanwiye", "Feewiriye", "Marsi", "Awiril", "Žuweŋ", "Žuyye", "Sektanbur", "Oktoobur", "Noowanbur", "Deesanbur", "Ati", "Ata", "Ala", "Alm", "Alz", "Asi", "Alhadi", "Atinni", "Atalaata", "Alarba", "Alzuma", "Asibti", "Subbaahi", "Zaarikay b", "IJ", "IZ", "Isaa jine", "Isaa zamanoo", "E, 'zeg'. H:mm", "'zeg'. H", "'zeg'. H:mm", "měr.", "maj.", "awg.", "now.", "januara", "februara", "měrca", "apryla", "maja", "junija", "julija", "awgusta", "septembra", "oktobra", "nowembra", "decembra", "p", "w", "pón", "wał", "srj", "stw", "pět", "sob", "njeźela", "pónjeźele", "wałtora", "srjoda", "stwórtk", "pětk", "dopołdnja", "wótpołdnja", "pś.Chr.n.", "pó Chr.n.", "pś.n.l.c.", "n.l.c.", "pśed Kristusowym naroźenim", "pó Kristusowem naroźenju", "pśed našym licenim casa", "našogo licenja casa", "zł", "e", "di", "ŋgɔn", "sɔŋ", "diɓ", "emi", "esɔ", "mad", "diŋ", "nyɛt", "tin", "elá", "dimɔ́di", "ŋgɔndɛ", "sɔŋɛ", "diɓáɓá", "emiasele", "esɔpɛsɔpɛ", "madiɓɛ́díɓɛ́", "diŋgindi", "nyɛtɛki", "mayésɛ́", "tiníní", "eláŋgɛ́", "ɗ", "ét", "mɔ́s", "kwa", "muk", "ŋgi", "ɗón", "esa", "éti", "mɔ́sú", "kwasú", "mukɔ́sú", "ŋgisú", "ɗónɛsú", "esaɓasú", "idiɓa", "ebyámu", "ɓ.Ys", "mb.Ys", "ɓoso ɓwá yáɓe lá", "mbúsa kwédi a Yés", "Fe", "Ma", "Ab", "Sú", "Se", "Ok", "No", "De", "Sanvie", "Fébirie", "Mars", "Aburil", "Mee", "Sueŋ", "Súuyee", "Settembar", "Oktobar", "Novembar", "Disambar", "Dim", "Ten", "Tal", "Ara", "Arj", "Sib", "Dimas", "Teneŋ", "Talata", "Alarbay", "Aramisay", "Arjuma", "Sibiti", "ArY", "AtY", "Ariŋuu Yeesu", "Atooŋe Yeesu", "G y སྤྱི་ཟླ་MMM", "གཟའ་E, G ལོy ཟླ་MMM ཚེ་d", "ཆུ་ཚོད་h a", "ཆུ་ཚོད་HH", "M-d", "E, M-d", "སྤྱི་LLL", "སྤྱི་LLL ཚེ་d", "E, སྤྱི་LLL ཚེ་d", "y-M", "y-M-d", "E, y-M-d", "y སྤྱི་ཟླ་MMM", "གཟའ་E, ལོy ཟླ་MMM ཚེ་d", "EEEE, སྤྱི་ལོ་y MMMM ཚེས་dd", "སྤྱི་ལོ་y MMMM ཚེས་ dd", "སྤྱི་ལོ་y ཟླ་MMM ཚེས་dd", "ཆུ་ཚོད་ h སྐར་མ་ mm:ss a zzzz", "ཆུ་ཚོད་ h སྐར་མ་ mm:ss a z", "ཆུ་ཚོད་h:mm:ss a", "ཆུ་ཚོད་ h སྐར་མ་ mm a", "༡", "༢", "༣", "༥", "༦", "༧", "༨", "༡༠", "༡༡", "༡༢", "༤", "༩", "ཟླ་དངཔ་", "ཟླ་གཉིས་པ་", "ཟླ་གསུམ་པ་", "ཟླ་བཞི་པ་", "ཟླ་ལྔ་པ་", "ཟླ་དྲུག་པ", "ཟླ་བདུན་པ་", "ཟླ་བརྒྱད་པ་", "ཟླ་དགུ་པ་", "ཟླ་བཅུ་པ་", "ཟླ་བཅུ་གཅིག་པ་", "ཟླ་བཅུ་གཉིས་པ་", "མིར", "སངྶ", "ཟླ་", "མིར་", "ལྷག་", "ཕུར་", "སངས་", "སྤེན་", "ཉི་", "སྔ་ཆ་", "ཕྱི་ཆ་", "tibt", "ཨང་མད", "གྲངས་མེད", "Nu.", "KR₩", "TH฿", "Mbe", "Kai", "Kat", "Gat", "Gan", "Mug", "Knn", "Ken", "Igi", "Mweri wa mbere", "Mweri wa kaĩri", "Mweri wa kathatũ", "Mweri wa kana", "Mweri wa gatano", "Mweri wa gatantatũ", "Mweri wa mũgwanja", "Mweri wa kanana", "Mweri wa kenda", "Mweri wa ikũmi", "Mweri wa ikũmi na ũmwe", "Mweri wa ikũmi na Kaĩrĩ", "Kma", "Tat", "Ine", "Tan", "Arm", "Maa", "NMM", "Kiumia", "Njumatatu", "Njumaine", "Njumatano", "Aramithi", "Njumaa", "NJumamothii", "KI", "UT", "MK", "TK", "Mbere ya Kristo", "Thutha wa Kristo", "{0} {1}", "E a 'ga' h:mm", "E a 'ga' h:mm:ss", "MMM d 'lia', y G", "E, MMM d 'lia' y G", "a 'ga' h", "a 'ga' h:mm", "a 'ga' h:mm:ss", "MMM d 'lia'", "E, MMM d 'lia'", "MMMM d 'lia'", "E, MMMM d 'lia'", "'aɖabaƒoƒo' mm:ss", "MMM d 'lia', y", "EEEE, MMMM d 'lia' y", "MMMM d 'lia' y", "a 'ga' h:mm:ss zzzz", "a 'ga' h:mm:ss z", "dzv", "dzd", "ted", "afɔ", "dam", "mas", "sia", "dea", "any", "kel", "ade", "dzm", "dzove", "dzodze", "tedoxe", "afɔfĩe", "dama", "masa", "siamlɔm", "deasiamime", "anyɔnyɔ", "kele", "adeɛmekpɔxe", "dzome", "kɔs", "dzo", "bla", "kuɖ", "yaw", "fiɖ", "mem", "kɔsiɖa", "dzoɖa", "blaɖa", "kuɖa", "yawoɖa", "fiɖa", "memleɖa", "ŋdi", "ɣetrɔ", "hY", "Yŋ", "Bŋ", "Eŋ", "Hafi Yesu Va Do ŋgɔ", "Yesu Ŋɔli", "mnn", "{1} - {0}", "Ι", "Φ", "Μ", "Α", "Σ", "Ο", "Ν", "Δ", "Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαΐ", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ", "Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου", "Κ", "Τ", "Π", "Κυρ", "Δευ", "Τρί", "Τετ", "Πέμ", "Παρ", "Σάβ", "Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο", "π.μ.", "μ.μ.", "π.Χ.", "μ.Χ.", "π.Κ.Χ.", "ΚΧ", "προ Χριστού", "μετά Χριστόν", "πριν από την Κοινή Χρονολογία", "Κοινή Χρονολογία", "Πριν R.O.C.", "Δρχ", "E, dd/MM", "E, dd/MM/y", "LL", "E, d MMM,y", "dMMMM,y", "dMMM,y", "Mar.", "Oct.", "Dec.", "Su.", "M.", "Tu.", "W.", "Th.", "F.", "Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "am", "pm", "Rs", "CFP", "FBu", "dd MMM", "E, dd MMM", "E, dd MMM y", "dd-MMM-y", "E, MM-dd", "E, y-MM-dd", "E H.mm", "E H.mm.ss", "H.mm", "H.mm.ss", "H.mm.ss v", "H.mm v", "H.mm.ss zzzz", "H.mm.ss z", "a.m.", "p.m.", "E d MMM, y", "Ar", "MOP$", "RM", "₦", "{currency} {minusSign}{number}", "d/MM/y", "d/MM/yy", "₱", "RF", "SR", "kr", "Le", "NAf.", "T$", "VT", "WS$", "MM/dd", "E, MM/dd", "y/MM/dd", "E, y/MM/dd", "dd MMM, y", "E, dd MMM, y", "dd MMM,y", "EEEE, d-'a' 'de' MMMM y", "y-MMMM-dd", "y-MMM-dd", "yy-MM-dd", "H-'a' 'horo' 'kaj' m:ss zzzz", "aŭg", "januaro", "februaro", "marto", "aprilo", "majo", "junio", "julio", "aŭgusto", "septembro", "oktobro", "novembro", "decembro", "lu", "ma", "me", "ĵa", "ve", "sa", "dimanĉo", "lundo", "mardo", "merkredo", "ĵaŭdo", "vendredo", "sabato", "atm", "ptm", "aK", "pK", "E, H:mm", "MMMM 'de' y G", "d 'de' MMMM 'de' y G", "E, d 'de' MMMM 'de' y G", "h:mm:ss a (vvvv)", "H:mm:ss (vvvv)", "d 'de' MMMM", "E, d 'de' MMMM", "EEE, d/M/y", "EEE, d MMM y", "MMMM 'de' y", "d 'de' MMMM 'de' y", "EEE, d 'de' MMMM 'de' y", "QQQQ 'de' y", "EEEE, d 'de' MMMM 'de' y", "H:mm:ss (zzzz)", "ene.", "may.", "ago.", "sept.", "dic.", "enero", "febrero", "marzo", "abril", "mayo", "agosto", "septiembre", "octubre", "noviembre", "diciembre", "dom.", "lun.", "mié.", "jue.", "vie.", "sáb.", "domingo", "lunes", "jueves", "viernes", "sábado", "a. C.", "d. C.", "a. e. c.", "e. c.", "antes de Cristo", "después de Cristo", "antes de la era común", "era común", "antes de R.O.C.", "d 'de' MMM 'de' y G", "dd-MMM", "E, d 'de' MMM 'de' y", "QQQ 'de' y", "v", "E, d 'de' MMM 'de' y G", "hh:mm:ss", "E d-M", "M-y", "d 'de' MMM 'de' y", "Bs", "E, dd-MM", "dd-MM-y", "E dd-MM-y", "dd-MM-yy", "MMM 'de' y G", "E, d MMM 'de' y G", "d 'de' MMM", "E, d 'de' MMM", "MMM 'de' y", "₡", "d MMM 'de' y", "antes de la Era Común", "Era Común", "RD$", "Q", "EEEE dd 'de' MMMM 'de' y", "dd 'de' MMMM 'de' y", "E d 'de' MMM", "ene", "oct", "dic", "Af", "Naf", "Kz", "$a", "Afl.", "C$", "MM/dd/y", "E MM/dd/y", "MM/dd/yy", "B/.", "setiembre", "S/.", "Gs.", "Bs.", "E h:mm.ss a", "E HH:mm.ss", "E, d. MMMM y G", "h:mm.ss a", "H:mm.ss", "h:mm.ss a v", "HH:mm.ss v", "MMMM", "E, d. MMMM y", "H:mm.ss zzzz", "H:mm.ss z", "jaan", "veebr", "märts", "mai", "juuni", "juuli", "sept", "dets", "jaanuar", "veebruar", "aprill", "oktoober", "detsember", "pühapäev", "esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev", "pKr", "e.m.a", "m.a.j", "enne Kristust", "pärast Kristust", "enne meie ajaarvamist", "meie ajaarvamise järgi", "−", "G y. 'urteko' MMM", "G y. 'urteko' MMM d", "G y. 'urteko' MMM d, E", "M/d, E", "y/M", "y/M/d, E", "y('e')'ko' MMMM", "y('e')'ko' MMMM d", "y('e')'ko' MMMM d, E", "y('e')'ko' QQQ", "y('e')'ko' QQQQ", "y('e')'ko' MMMM d, EEEE", "HH:mm:ss (zzzz)", "HH:mm:ss (z)", "urt.", "ots.", "api.", "mai.", "eka.", "uzt.", "abu.", "ira.", "urr.", "aza.", "abe.", "urtarrilak", "otsailak", "martxoak", "apirilak", "maiatzak", "ekainak", "uztailak", "abuztuak", "irailak", "urriak", "azaroak", "abenduak", "ig.", "al.", "ar.", "az.", "og.", "or.", "lr.", "igandea", "astelehena", "asteartea", "asteazkena", "osteguna", "ostirala", "larunbata", "BG", "K.a.", "K.o.", "R.O.C. aurretik", "{percentSign} {number}", "{minusSign}{percentSign} {number}", "ngo", "ngb", "ngl", "ngn", "ngt", "ngs", "ngz", "ngm", "nge", "nga", "ngad", "ngab", "ngɔn osú", "ngɔn bɛ̌", "ngɔn lála", "ngɔn nyina", "ngɔn tána", "ngɔn saməna", "ngɔn zamgbála", "ngɔn mwom", "ngɔn ebulú", "ngɔn awóm", "ngɔn awóm ai dziá", "ngɔn awóm ai bɛ̌", "sɔ́n", "mɔ́n", "smb", "sml", "smn", "fúl", "sér", "sɔ́ndɔ", "mɔ́ndi", "sɔ́ndɔ məlú mə́bɛ̌", "sɔ́ndɔ məlú mə́lɛ́", "sɔ́ndɔ məlú mə́nyi", "fúladé", "séradé", "kíkíríg", "ngəgógəle", "oyk", "ayk", "osúsúa Yésus kiri", "ámvus Yésus Kirís", "{1}،‏ {0}", "{1}، ساعت {0}", "HH:mm (Z)", "E M/d", "d LLL", "E d LLL", "d LLLL", "E d LLLL", "E y/M/d", "H:mm:ss (z)", "ژ", "ا", "ژانویهٔ", "فوریهٔ", "آوریل", "مهٔ", "ژوئن", "ژوئیهٔ", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر", "ی", "چ", "پ", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه", "قبل‌ازظهر", "بعدازظهر", "ق", "ق.د.م", "د.م.", "ق.م.", "م.", "قبل از میلاد", "میلادی", "قبل از دوران مشترک", "دوران مشترک", "ک", "ط", "تشری", "حشوان", "کسلو", "طوت", "واذار", "نیسان", "ایار", "سیوان", "ایلول", "واذار الثانی", "ربیع الاول", "ربیع الثانی", "جمادی الاول", "جمادی الثانی", "ذیقعدهٔ", "ذیحجهٔ", "ه‍.ق.", "هجری قمری", "فروردین", "اردیبهشت", "تیر", "شهریور", "آبان", "دی", "اسفند", "ه‍.ش.", "هجری شمسی", "arabext", "‎{currency}{number}", "{minusSign}‎{currency}{number}", "ناعدد", "‎+‎", "‎−", "؋", "¥CN", "$HK", "ریال", "$MX", "$NZ", "$EC", "می", "جول", "دسم", "جنوری", "فبروری", "مارچ", "اپریل", "جون", "جولای", "اگست", "سپتمبر", "اکتوبر", "نومبر", "دسمبر", "حمل", "ثور", "جوزا", "سرطان", "اسد", "سنبلهٔ", "میزان", "عقرب", "قوس", "جدی", "دلو", "حوت", "sii", "col", "mbo", "duu", "kor", "mor", "juk", "slt", "yar", "jol", "bow", "siilo", "colte", "mbooy", "seeɗto", "duujal", "korse", "morso", "juko", "siilto", "yarkomaa", "jolal", "bowte", "dew", "aaɓ", "maw", "naa", "mwd", "hbi", "dewo", "aaɓnde", "mawbaare", "njeslaare", "naasaande", "mawnde", "hoore-biir", "subaka", "kikiiɗe", "H-I", "C-I", "Hade Iisa", "Caggal Iisa", "FG", "UM", "{1} 'klo' {0}", "E d.M.", "ccc d. MMM", "m.ss", "L.y", "E d.M.y", "cccc d. MMMM y", "tammikuuta", "helmikuuta", "maaliskuuta", "huhtikuuta", "toukokuuta", "kesäkuuta", "heinäkuuta", "elokuuta", "syyskuuta", "lokakuuta", "marraskuuta", "joulukuuta", "su", "ti", "ke", "to", "pe", "la", "sunnuntaina", "maanantaina", "tiistaina", "keskiviikkona", "torstaina", "perjantaina", "lauantaina", "ap.", "ip.", "eK", "jK", "eaa", "jaa", "eKr.", "jKr.", "eaa.", "jaa.", "ennen Kristuksen syntymää", "jälkeen Kristuksen syntymän", "ennen ajanlaskun alkua", "jälkeen ajanlaskun alun", "tišríkuuta", "hešvánkuuta", "kislévkuuta", "tevétkuuta", "ševátkuuta", "adárkuuta I", "adárkuuta", "nisánkuuta", "ijjárkuuta", "sivánkuuta", "tammúzkuuta", "abkuuta", "elúlkuuta", "adárkuuta II", "muharram", "safar", "rabi’ al-awwal", "rabi’ al-akhir", "džumada-l-ula", "džumada-l-akhira", "radžab", "ša’ban", "ramadan", "šawwal", "dhu-l-qa’da", "dhu-l-hiddža", "epäluku", "mk", "{1} 'nang' {0}", "Ene", "Peb", "Abr", "Hun", "Hul", "Set", "Nob", "Enero", "Pebrero", "Marso", "Abril", "Mayo", "Hunyo", "Hulyo", "Agosto", "Setyembre", "Oktubre", "Nobyembre", "Disyembre", "Lin", "Miy", "Huw", "Biy", "Linggo", "Lunes", "Martes", "Miyerkules", "Huwebes", "Biyernes", "Sabado", "E dd.MM", "E dd.MM.y", "QQQ 'í' y", "QQQQ 'í' y", "mars", "apríl", "desember", "sun.", "mán.", "týs.", "mik.", "hós.", "frí.", "ley.", "sunnudagur", "mánadagur", "týsdagur", "mikudagur", "hósdagur", "fríggjadagur", "leygardagur", "flt", "lt", "f.o.tíðr.", "o.tíðr.", "fyri Krist", "eftir Krist", "fyri okkara tíðarrokning", "okkara tíðarrokning", "{1} 'à' {0}", "HH 'h'", "janv.", "févr.", "avr.", "juin", "juil.", "août", "déc.", "janvier", "février", "avril", "juillet", "septembre", "octobre", "novembre", "décembre", "dim.", "mer.", "jeu.", "ven.", "sam.", "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "E.B.", "ère b.", "ère bouddhiste", "1yuè", "2yuè", "3yuè", "4yuè", "5yuè", "6yuè", "7yuè", "8yuè", "9yuè", "10yuè", "11yuè", "12yuè", "zhēngyuè", "èryuè", "sānyuè", "sìyuè", "wǔyuè", "liùyuè", "qīyuè", "bāyuè", "jiǔyuè", "shíyuè", "shíyīyuè", "shí’èryuè", "av. J.-C.", "ap. J.-C.", "avant Jésus-Christ", "après Jésus-Christ", "avant l’ère commune", "de l’ère commune", "Tisseri", "Hesvan", "Tébeth", "Schébat", "Nissan", "Tamouz", "Elloul", "mouh.", "saf.", "rab. aw.", "rab. th.", "joum. oul.", "joum. tha.", "raj.", "chaa.", "ram.", "chaw.", "dhou. q.", "dhou. h.", "mouharram", "rabia al awal", "rabia ath-thani", "joumada al oula", "joumada ath-thania", "rajab", "chaabane", "chawwal", "dhou al qi`da", "dhou al-hijja", "avant RdC", "RdC", "$AR", "$AU", "$BM", "$BN", "$BS", "$BZ", "$CL", "$CO", "£CY", "$FJ", "£FK", "£GB", "£GI", "£IE", "£IL", "₤IT", "£LB", "£MT", "$NA", "$RH", "$SB", "$SG", "$SR", "$TT", "$US", "$UY", "FCFP", "H 'h' mm 'min' ss 's' zzzz", "E M-d", "MM-d", "$ AU", "$ HK", "$ NZ", "$ SG", "$ US", "FC", "HH.mm:ss 'h' zzzz", "DA", "CF", "fév.", "jui.", "LS", "DT", "d 'di' MMMM", "LLLL 'dal' y", "EEEE d 'di' MMMM 'dal' y", "d 'di' MMMM 'dal' y", "Zen", "Fev", "Avr", "Jug", "Lui", "Avo", "Otu", "Dic", "Zenâr", "Fevrâr", "Març", "Avrîl", "Jugn", "Avost", "Setembar", "Otubar", "Dicembar", "lun", "mie", "joi", "vin", "sab", "domenie", "lunis", "martars", "miercus", "joibe", "vinars", "sabide", "a.", "p.", "pdC", "ddC", "d-M", "d-M-y", "E d-M-y", "mrt.", "jannewaris", "febrewaris", "maart", "maaie", "july", "augustus", "septimber", "novimber", "desimber", "si", "mo", "wo", "fr", "snein", "moandei", "tiisdei", "woansdei", "tongersdei", "freed", "sneon", "Tut", "Babah", "Hatur", "Kiyahk", "Tubah", "Baramundah", "Ba’unah", "Abib", "Misra", "Nasi", "Mäskäräm", "Teqemt", "T’er", "Yäkatit", "Mägabit", "Miyazya", "Säne", "Nähase", "Pagumän", "f.K.", "n.K.", "fgj", "gj", "n.Kr.", "f.g.j.", "Foar Kristus", "nei Kristus", "foar gewoane jiertelling", "gewoane jiertelling", "Tisjrie", "Chesjwan", "Sjevat", "Adar A", "Ijar", "Tammoez", "Elloel", "Adar B", "Vaishakha", "Jyeshtha", "Aashaadha", "Shraavana", "Bhaadrapada", "Ashvina", "Kaartika", "Pausha", "Maagha", "Phaalguna", "SAKA", "Moeh.", "Joem. I", "Joem. II", "Sja.", "Sjaw.", "Doe al k.", "Doe al h.", "Moeharram", "Rabiʻa al awal", "Rabiʻa al thani", "Joemadʻal awal", "Joemadʻal thani", "Sjaʻaban", "Sjawal", "Doe al kaʻaba", "Doe al hizja", "Saʻna Hizjria", "{currency} {number}{minusSign}", "FJ$", "SI$", "Ean", "Feabh", "Márta", "Aib", "Beal", "Meith", "Iúil", "Lún", "MFómh", "DFómh", "Samh", "Noll", "Eanáir", "Feabhra", "Aibreán", "Bealtaine", "Meitheamh", "Lúnasa", "Meán Fómhair", "Deireadh Fómhair", "Samhain", "Nollaig", "Domh", "Luan", "Máirt", "Céad", "Déar", "Aoine", "Sath", "Dé Domhnaigh", "Dé Luain", "Dé Máirt", "Dé Céadaoin", "Déardaoin", "Dé hAoine", "Dé Sathairn", "RC", "RCR", "CR", "Roimh Chríost", "Roimh Chomh-Ré", "Comh-Ré", "E h:mma", "ha", "h:mma", "h:mma v", "d'mh' MMMM", "EEEE, d'mh' MMMM y", "d'mh' MMMM y", "Ò", "Faoi", "Gearr", "Màrt", "Gibl", "Cèit", "Ògmh", "Iuch", "Lùna", "Sult", "Dàmh", "Dùbh", "dhen Fhaoilleach", "dhen Ghearran", "dhen Mhàrt", "dhen Ghiblean", "dhen Chèitean", "dhen Ògmhios", "dhen Iuchar", "dhen Lùnastal", "dhen t-Sultain", "dhen Dàmhair", "dhen t-Samhain", "dhen Dùbhlachd", "DiD", "DiL", "DiM", "DiC", "Dia", "Dih", "DiS", "DiDòmhnaich", "DiLuain", "DiMàirt", "DiCiadain", "DiarDaoin", "DihAoine", "DiSathairne", "Ro Chrìosta", "An dèidh Chrìosta", "Ro PnS", "Mínguó", "Ro Ph. na Sìne", "EEEE dd MMMM y", "xan", "xuñ", "xul", "out", "xaneiro", "febreiro", "maio", "xuño", "xullo", "setembro", "outubro", "luns", "mér", "xov", "ven", "mércores", "xoves", "venres", "despois de Cristo", "$R", "¥JP", "$NT", "Mär", "Dez", "Auguscht", "Septämber", "Oktoober", "Novämber", "Dezämber", "Mä.", "Zi.", "Du.", "Sunntig", "Määntig", "Ziischtig", "Mittwuch", "Dunschtig", "Friitig", "Samschtig", "nam.", "’", "MMM, G y", "d MMM, G y", "E, d MMM, G y", "hh:mm:ss a zzzz", "hh:mm:ss a z", "જા", "ફે", "મા", "એ", "મે", "જૂ", "જુ", "ઑ", "સ", "ન", "ડિ", "જાન્યુ", "ફેબ્રુ", "માર્ચ", "એપ્રિલ", "જૂન", "જુલાઈ", "ઑગસ્ટ", "સપ્ટે", "ઑક્ટો", "નવે", "ડિસે", "જાન્યુઆરી", "ફેબ્રુઆરી", "સપ્ટેમ્બર", "ઑક્ટોબર", "નવેમ્બર", "ડિસેમ્બર", "ર", "સો", "મં", "બુ", "ગુ", "શુ", "શ", "રવિ", "સોમ", "મંગળ", "બુધ", "ગુરુ", "શુક્ર", "શનિ", "રવિવાર", "સોમવાર", "મંગળવાર", "બુધવાર", "ગુરુવાર", "શુક્રવાર", "શનિવાર", "ઇ સ પુ", "ઇસ", "સા.યુ.પ.", "સા.યુ.", "ઈ.સ.પૂર્વે", "ઈ.સ.", "ઈસવીસન પૂર્વે", "ઇસવીસન", "સામાન્ય યુગ પહેલા", "સામાન્ય યુગ", "Can", "Cul", "Agt", "Chanuari", "Feburari", "Apiriri", "Chulai", "Okitoba", "Nobemba", "Cpr", "Ctt", "Cmn", "Cmt", "Ars", "Icm", "Est", "Chumapiri", "Chumatato", "Chumaine", "Chumatano", "Aramisi", "Ichuma", "Esabato", "Ma/Mo", "Mambia/Mog", "YA", "YK", "Yeso ataiborwa", "Yeso kaiboirwe", "J-guer", "T-arree", "Mayrnt", "Avrril", "Boaldyn", "M-souree", "J-souree", "Luanistyn", "M-fouyir", "J-fouyir", "M-Houney", "M-Nollick", "Jerrey-geuree", "Toshiaght-arree", "Averil", "Mean-souree", "Jerrey-souree", "Mean-fouyir", "Jerrey-fouyir", "Mee Houney", "Mee ny Nollick", "Jed", "Jel", "Jem", "Jerc", "Jerd", "Jeh", "Jes", "Jedoonee", "Jelhein", "Jemayrt", "Jercean", "Jerdein", "Jeheiney", "Jesarn", "Fab", "Afi", "Yun", "Yul", "Agu", "Nuw", "Janairu", "Faburairu", "Maris", "Afirilu", "Mayu", "Yuni", "Yuli", "Agusta", "Satumba", "Nuwamba", "Disamba", "Lh", "Li", "Ta", "Lr", "Al", "Ju", "As", "Lahadi", "Litinin", "Laraba", "Alhamis", "Jummaʼa", "Asabar", "KHAI", "BHAI", "Kafin haihuwar annab", "Bayan haihuwar annab", "M=romanlow", "Ian.", "Pep.", "Mal.", "ʻAp.", "Iun.", "Iul.", "ʻAu.", "Kep.", "ʻOk.", "Now.", "Kek.", "Ianuali", "Pepeluali", "Malaki", "ʻApelila", "Iune", "Iulai", "ʻAukake", "Kepakemapa", "ʻOkakopa", "Nowemapa", "Kekemapa", "LP", "P1", "P2", "P3", "P4", "P5", "P6", "Lāpule", "Poʻakahi", "Poʻalua", "Poʻakolu", "Poʻahā", "Poʻalima", "Poʻaono", "{1} בשעה {0}", "E ה-d", "d בMMM y G", "E, d בMMM y G", "‏h a", "d בMMM", "E, d בMMM", "d בMMM y", "E, d בMMM y", "EEEE, d בMMMM y", "d בMMMM y", "ינו׳", "פבר׳", "מרץ", "אפר׳", "מאי", "יוני", "יולי", "אוג׳", "ספט׳", "אוק׳", "נוב׳", "דצמ׳", "ינואר", "פברואר", "אפריל", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר", "א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳", "יום א׳", "יום ב׳", "יום ג׳", "יום ד׳", "יום ה׳", "יום ו׳", "שבת", "יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת", "לפנה״צ", "אחה״צ", "לפנה״ס", "לספירה", "לפני הספירה", "תש׳", "חש׳", "כס׳", "טב׳", "שב׳", "א״א", "אד׳", "ני׳", "אי׳", "סי׳", "תמ׳", "אב", "אל׳", "א״ב", "תשרי", "חשון", "כסלו", "טבת", "שבט", "אדר א׳", "אדר", "ניסן", "אייר", "סיון", "תמוז", "אלול", "אדר ב׳", "לבה״ע", "מוחרם", "צפר", "רביע א׳", "רביע ב׳", "ג׳ומאדא א׳", "ג׳ומאדא ב׳", "רג׳ב", "שעבאן", "רמדאן", "שוואל", "ד׳ו אל־קעדה", "ד׳ו אל־חיג׳ה", "רביע אל-אוול", "רביע א-ת׳אני", "ג׳ומאדא אל-אולא", "ג׳ומאדא א-ת׳אניה", "שנת היג׳רה", "טאיקה", "נינג׳ו", "שוטוקו", "ל״י", "{1} को {0}", "MMM G y", "फ़", "म", "जू", "सि", "जन॰", "फ़र॰", "मार्च", "अप्रैल", "मई", "जून", "जुल॰", "अग॰", "सित॰", "अक्तू॰", "नव॰", "दिस॰", "जनवरी", "फ़रवरी", "जुलाई", "अगस्त", "सितंबर", "अक्तूबर", "नवंबर", "दिसंबर", "सो", "गु", "शु", "श", "रवि", "सोम", "बुध", "गुरु", "शुक्र", "शनि", "रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार", "पूर्वाह्न", "अपराह्न", "मस्केरेम", "टेकेम्ट", "हेदर", "तहसास", "टर", "येकाटिट", "मेगाबिट", "मियाज़िया", "गनबोट", "सेन", "हम्ले", "नेहासे", "पागूमन", "ईसा-पूर्व", "ईस्वी", "ईसवी पूर्व", "ईसवी", "ईसवी सन", "चैत्र", "वैशाख", "ज्येष्ठ", "आषाढ़", "श्रावण", "भाद्रपद", "अश्विन", "कार्तिक", "अग्रहायण", "पौष", "माघ", "फाल्गुन", "शक", "मुहर्रम", "सफर", "राबी प्रथम", "राबी द्वितीय", "जुम्डा प्रथम", "जुम्डा द्वितीय", "रजब", "शावन", "रमजान", "शव्व्ल", "जिल-क्दाह", "जिल्-हिज्जाह", "ताएका (645–650)", "हाकूची (650–671)", "हाकूहो (672–686)", "शूचो (686–701)", "ताहिओ (701–704)", "केउन (704–708)", "वाडू (708–715)", "रैकी (715–717)", "योरो (717–724)", "जिंकी (724–729)", "टेम्प्यो (729–749)", "टेम्प्यो-काम्पो (749–749)", "टेम्प्यो-शोहो (749–757)", "टेम्प्यो-होजी (757–765)", "टेम्प्यो-जिंगो (765–767)", "टेम्प्यो-किउन (767–770)", "होकी (770–780)", "टेनो (781–782)", "इंर्याकू (782–806)", "डाईडू (806–810)", "क़ोनिन (810–824)", "टेंचो (824–834)", "शोवा (834–848)", "काज्यो (848–851)", "निंजू (851–854)", "शाईकू (854–857)", "टेनन (857–859)", "जोगन् (859–877)", "गेंकेई (877–885)", "निन्ना (885–889)", "केम्प्यो (889–898)", "शूताई (898–901)", "ईंगी (901–923)", "ईंचो (923–931)", "शोहेई (931–938)", "टेंग्यो (938–947)", "टेंर्याकू (947–957)", "टेंटूकू (957–961)", "ओवा (961–964)", "कोहो (964–968)", "अन्ना (968–970)", "टेंरोकू (970–973)", "टेन-एन (973–976)", "जोगन् (976–978)", "टेंगेन (978–983)", "ईकान (983–985)", "कन्ना (985–987)", "ई-एन (987–989)", "एइसो (989–990)", "शोर्याकू (990–995)", "चोटूकु (995–999)", "चोहो (999–1004)", "कंको (1004–1012)", "च्योवा (1012–1017)", "कन्निन (1017–1021)", "ज़ियान (1021–1024)", "मंजू (1024–1028)", "चोगन (1028–1037)", "चोर्याकू (1037–1040)", "चोक्यु (1040–1044)", "कांटूको (1044–1046)", "ईशो (1046–1053)", "टेंगी (1053–1058)", "कोहैइ (1058–1065)", "जिर्याकू (1065–1069)", "ईंक्यू (1069–1074)", "सोहो (1074–1077)", "शोर्याकू (1077–1081)", "ईहो (1081–1084)", "ओटूको (1084–1087)", "कांजि (1087–1094)", "कोहो (1094–1096)", "ईचो (1096–1097)", "शोटूको (1097–1099)", "कोवा (1099–1104)", "चोजी (1104–1106)", "काशो (1106–1108)", "टेन्निन (1108–1110)", "टेन-ई (1110–1113)", "ईक्यू (1113–1118)", "जेन-ई (1118–1120)", "होआन (1120–1124)", "तेंजी (1124–1126)", "दाईजी (1126–1131)", "टेंशो (1131–1132)", "चोशो (1132–1135)", "होएन (1135–1141)", "ईजी (1141–1142)", "कोजी (1142–1144)", "टेन्यो (1144–1145)", "क्यूआन (1145–1151)", "निंपैई (1151–1154)", "क्योजो (1154–1156)", "होगेन (1156–1159)", "हैजी (1159–1160)", "ईर्याकू (1160–1161)", "ओहो (1161–1163)", "चोकान (1163–1165)", "ईमान (1165–1166)", "निन-आन (1166–1169)", "काओ (1169–1171)", "शोअन (1171–1175)", "अंजन (1175–1177)", "जिशो (1177–1181)", "योवा (1181–1182)", "जूऐई (1182–1184)", "जेंर्याकू (1184–1185)", "बूंजी (1185–1190)", "केंक्यू (1190–1199)", "शोजी (1199–1201)", "केन्निन (1201–1204)", "जेंक्यू (1204–1206)", "केन-ई (1206–1207)", "शोगेन (1207–1211)", "केंर्याकू (1211–1213)", "केंपो (1213–1219)", "शोक्यू (1219–1222)", "जू (1222–1224)", "जेन्निन (1224–1225)", "कोरोकू (1225–1227)", "अंटैइ (1227–1229)", "कांकी (1229–1232)", "जोएई (1232–1233)", "टेम्पूकू (1233–1234)", "बुंर्याकू (1234–1235)", "काटेई (1235–1238)", "र्याकूनिन (1238–1239)", "ईन-ओ (1239–1240)", "निंजी (1240–1243)", "कांजेन (1243–1247)", "होजी (1247–1249)", "केंचो (1249–1256)", "कोगेन (1256–1257)", "शोका (1257–1259)", "शोगेन (1259–1260)", "बुन-ओ (1260–1261)", "कोचो (1261–1264)", "बुन-ई (1264–1275)", "केंजी (1275–1278)", "कोअन (1278–1288)", "शो (1288–1293)", "ईनिन (1293–1299)", "शोअन (1299–1302)", "केंजेन (1302–1303)", "काजेन (1303–1306)", "टोकूजी (1306–1308)", "ईंकेई (1308–1311)", "ओचो (1311–1312)", "शोवा (1312–1317)", "बुंपो (1317–1319)", "जेनो (1319–1321)", "जेंक्यो (1321–1324)", "शोचू (1324–1326)", "कारेकी (1326–1329)", "जेंटोकू (1329–1331)", "गेंको (1331–1334)", "केम्मू (1334–1336)", "ईंजेन (1336–1340)", "कोकोकू (1340–1346)", "शोहेई (1346–1370)", "केंटोकू (1370–1372)", "बूंचो (1372–1375)", "टेंजो (1375–1379)", "कोर्याकू (1379–1381)", "कोवा (1381–1384)", "जेंचू (1384–1392)", "मेटोकू (1384–1387)", "काकेई (1387–1389)", "कू (1389–1390)", "मेटोकू (1390–1394)", "ओई (1394–1428)", "शोचो (1428–1429)", "ईक्यो (1429–1441)", "काकीत्सू (1441–1444)", "बुन-अन (1444–1449)", "होटोकू (1449–1452)", "क्योटोकू (1452–1455)", "कोशो (1455–1457)", "चोरोकू (1457–1460)", "कांशो (1460–1466)", "बुंशो (1466–1467)", "ओनिन (1467–1469)", "बुन्मेई (1469–1487)", "चोक्यो (1487–1489)", "ईंटोकू (1489–1492)", "मेईओ (1492–1501)", "बुंकी (1501–1504)", "ईशो (1504–1521)", "ताईएई (1521–1528)", "क्योरोकू (1528–1532)", "टेन्मन (1532–1555)", "कोजी (1555–1558)", "ईरोकू (1558–1570)", "जेंकी (1570–1573)", "टेंशो (1573–1592)", "बुंरोकू (1592–1596)", "केईचो (1596–1615)", "जेनवा (1615–1624)", "कान-एई (1624–1644)", "शोहो (1644–1648)", "केईआन (1648–1652)", "शो (1652–1655)", "मेईर्याकू (1655–1658)", "मानजी (1658–1661)", "कनबुन (1661–1673)", "ईंपो (1673–1681)", "टेंवा (1681–1684)", "जोक्यो (1684–1688)", "जेंरोकू (1688–1704)", "होएई (1704–1711)", "शोटूको (1711–1716)", "क्योहो (1716–1736)", "जेंबुन (1736–1741)", "कांपो (1741–1744)", "इंक्यो (1744–1748)", "कान-एन (1748–1751)", "होर्याकू (1751–1764)", "मेईवा (1764–1772)", "अन-एई (1772–1781)", "टेनमेई (1781–1789)", "कांसेई (1789–1801)", "क्योवा (1801–1804)", "बुंका (1804–1818)", "बुंसेई (1818–1830)", "टेंपो (1830–1844)", "कोका (1844–1848)", "काईए (1848–1854)", "अंसेई (1854–1860)", "मान-ईन (1860–1861)", "बुंक्यौ (1861–1864)", "जेंजी (1864–1865)", "केईओ (1865–1868)", "मेजी", "ताईशो", "शोवा", "हेईसेई", "फर्वादिन", "ओर्दिवेहेस्ट", "खोरर्दाद", "टिर", "मोरदाद", "शाहरीवर्", "मेहर", "अवन", "अज़र", "डे", "बहमन", "ईस्फन्द्", "LLL y. G", "d. MMM y. G", "E, d. MMM y. G", "L.", "LLL y.", "d. MMM y.", "E, d. MMM y.", "QQQ y.", "QQQQ y.", "EEEE, d. MMMM y.", "d. MMMM y.", "1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "11.", "12.", "sij", "velj", "ožu", "tra", "svi", "lip", "kol", "ruj", "stu", "siječnja", "veljače", "ožujka", "travnja", "svibnja", "lipnja", "srpnja", "kolovoza", "rujna", "listopada", "studenoga", "prosinca", "pr. Kr.", "p. Kr.", "prije Krista", "poslije Krista", "Taika (645.-650.)", "Hakuchi (650.-671.)", "Hakuhō (672.-686.)", "Shuchō (686.-701.)", "Taihō (701.-704.)", "Keiun (704.-708.)", "Wadō (708.-715.)", "Reiki (715.-717.)", "Yōrō (717.-724.)", "Jinki (724.-729.)", "Tempyō (729.-749.)", "Tempyō-kampō (749.-749.)", "Tempyō-shōhō (749.-757.)", "Tempyō-hōji (757.-765.)", "Temphō-jingo (765.-767.)", "Jingo-keiun (767.-770.)", "Hōki (770.-780.)", "Ten-ō (781.-782.)", "Enryaku (782.-806.)", "Daidō (806.-810.)", "Kōnin (810.-824.)", "Tenchō (824.-834.)", "Jōwa (834.-848.)", "Kajō (848.-851.)", "Ninju (851.-854.)", "Saiko (854.-857.)", "Tennan (857.-859.)", "Jōgan (859.-877.)", "Genkei (877.-885.)", "Ninna (885.-889.)", "Kampyō (889.-898.)", "Shōtai (898.-901.)", "Engi (901.-923.)", "Enchō (923.-931.)", "Shōhei (931.-938.)", "Tengyō (938.-947.)", "Tenryaku (947.-957.)", "Tentoku (957.-961.)", "Ōwa (961.-964.)", "Kōhō (964.-968.)", "Anna (968.-970.)", "Tenroku (970.-973.)", "Ten-en (973.-976.)", "Jōgen (976.-978.)", "Tengen (978.-983.)", "Eikan (983.-985.)", "Kanna (985.-987.)", "Ei-en (987.-989.)", "Eiso (989.-990.)", "Shōryaku (990.-995.)", "Chōtoku (995.-999.)", "Chōhō (999.-1004.)", "Kankō (1004.-1012.)", "Chōwa (1012.-1017.)", "Kannin (1017.-1021.)", "Jian (1021.-1024.)", "Manju (1024.-1028.)", "Chōgen (1028.-1037.)", "Chōryaku (1037.-1040.)", "Chōkyū (1040.-1044.)", "Kantoku (1044.-1046.)", "Eishō (1046.-1053.)", "Tengi (1053.-1058.)", "Kōhei (1058.-1065.)", "Jiryaku (1065.-1069.)", "Enkyū (1069.-1074.)", "Shōho (1074.-1077.)", "Shōryaku (1077.-1081.)", "Eiho (1081.-1084.)", "Ōtoku (1084.-1087.)", "Kanji (1087.-1094.)", "Kaho (1094.-1096.)", "Eichō (1096.-1097.)", "Shōtoku (1097.-1099.)", "Kōwa (1099.-1104.)", "Chōji (1104.-1106.)", "Kashō (1106.-1108.)", "Tennin (1108.-1110.)", "Ten-ei (1110.-1113.)", "Eikyū (1113.-1118.)", "Gen-ei (1118.-1120.)", "Hoan (1120.-1124.)", "Tenji (1124.-1126.)", "Daiji (1126.-1131.)", "Tenshō (1131.-1132.)", "Chōshō (1132.-1135.)", "Hoen (1135.-1141.)", "Eiji (1141.-1142.)", "Kōji (1142.-1144.)", "Tenyō (1144.-1145.)", "Kyūan (1145.-1151.)", "Ninpei (1151.-1154.)", "Kyūju (1154.-1156.)", "Hogen (1156.-1159.)", "Heiji (1159.-1160.)", "Eiryaku (1160.-1161.)", "Ōho (1161.-1163.)", "Chōkan (1163.-1165.)", "Eiman (1165.-1166.)", "Nin-an (1166.-1169.)", "Kaō (1169.-1171.)", "Shōan (1171.-1175.)", "Angen (1175.-1177.)", "Jishō (1177.-1181.)", "Yōwa (1181.-1182.)", "Juei (1182.-1184.)", "Genryuku (1184.-1185.)", "Bunji (1185.-1190.)", "Kenkyū (1190.-1199.)", "Shōji (1199.-1201.)", "Kennin (1201.-1204.)", "Genkyū (1204.-1206.)", "Ken-ei (1206.-1207.)", "Shōgen (1207.-1211.)", "Kenryaku (1211.-1213.)", "Kenpō (1213.-1219.)", "Shōkyū (1219.-1222.)", "Jōō (1222.-1224.)", "Gennin (1224.-1225.)", "Karoku (1225.-1227.)", "Antei (1227.-1229.)", "Kanki (1229.-1232.)", "Jōei (1232.-1233.)", "Tempuku (1233.-1234.)", "Bunryaku (1234.-1235.)", "Katei (1235.-1238.)", "Ryakunin (1238.-1239.)", "En-ō (1239.-1240.)", "Ninji (1240.-1243.)", "Kangen (1243.-1247.)", "Hōji (1247.-1249.)", "Kenchō (1249.-1256.)", "Kōgen (1256.-1257.)", "Shōka (1257.-1259.)", "Shōgen (1259.-1260.)", "Bun-ō (1260.-1261.)", "Kōchō (1261.-1264.)", "Bun-ei (1264.-1275.)", "Kenji (1275.-1278.)", "Kōan (1278.-1288.)", "Shōō (1288.-1293.)", "Einin (1293.-1299.)", "Shōan (1299.-1302.)", "Kengen (1302.-1303.)", "Kagen (1303.-1306.)", "Tokuji (1306.-1308.)", "Enkei (1308.-1311.)", "Ōchō (1311.-1312.)", "Shōwa (1312.-1317.)", "Bunpō (1317.-1319.)", "Genō (1319.-1321.)", "Genkyō (1321.-1324.)", "Shōchū (1324.-1326.)", "Kareki (1326.-1329.)", "Gentoku (1329.-1331.)", "Genkō (1331.-1334.)", "Kemmu (1334.-1336.)", "Engen (1336.-1340.)", "Kōkoku (1340.-1346.)", "Shōhei (1346.-1370.)", "Kentoku (1370.-1372.)", "Bunchū (1372.-1375.)", "Tenju (1375.-1379.)", "Kōryaku (1379.-1381.)", "Kōwa (1381.-1384.)", "Genchū (1384.-1392.)", "Meitoku (1384.-1387.)", "Kakei (1387.-1389.)", "Kōō (1389.-1390.)", "Meitoku (1390.-1394.)", "Ōei (1394.-1428.)", "Shōchō (1428.-1429.)", "Eikyō (1429.-1441.)", "Kakitsu (1441.-1444.)", "Bun-an (1444.-1449.)", "Hōtoku (1449.-1452.)", "Kyōtoku (1452.-1455.)", "Kōshō (1455.-1457.)", "Chōroku (1457.-1460.)", "Kanshō (1460.-1466.)", "Bunshō (1466.-1467.)", "Ōnin (1467.-1469.)", "Bunmei (1469.-1487.)", "Chōkyō (1487.-1489.)", "Entoku (1489.-1492.)", "Meiō (1492.-1501.)", "Bunki (1501.-1504.)", "Eishō (1504.-1521.)", "Taiei (1521.-1528.)", "Kyōroku (1528.-1532.)", "Tenmon (1532.-1555.)", "Kōji (1555.-1558.)", "Eiroku (1558.-1570.)", "Genki (1570.-1573.)", "Tenshō (1573.-1592.)", "Bunroku (1592.-1596.)", "Keichō (1596.-1615.)", "Genwa (1615.-1624.)", "Kan-ei (1624.-1644.)", "Shōho (1644.-1648.)", "Keian (1648.-1652.)", "Shōō (1652.-1655.)", "Meiryaku (1655.-1658.)", "Manji (1658.-1661.)", "Kanbun (1661.-1673.)", "Enpō (1673.-1681.)", "Tenwa (1681.-1684.)", "Jōkyō (1684.-1688.)", "Genroku (1688.-1704.)", "Hōei (1704.-1711.)", "Shōtoku (1711.-1716.)", "Kyōhō (1716.-1736.)", "Genbun (1736.-1741.)", "Kanpō (1741.-1744.)", "Enkyō (1744.-1748.)", "Kan-en (1748.-1751.)", "Hōryaku (1751.-1764.)", "Meiwa (1764.-1772.)", "An-ei (1772.-1781.)", "Tenmei (1781.-1789.)", "Kansei (1789.-1801.)", "Kyōwa (1801.-1804.)", "Bunka (1804.-1818.)", "Bunsei (1818.-1830.)", "Tenpō (1830.-1844.)", "Kōka (1844.-1848.)", "Kaei (1848.-1854.)", "Ansei (1854.-1860.)", "Man-en (1860.-1861.)", "Bunkyū (1861.-1864.)", "Genji (1864.-1865.)", "Keiō (1865.-1868.)", "prije R.O.C.", "E, H:mm 'hodź'.", "H 'hodź'.", "H:mm 'hodź'.", "mej.", "meje", "š", "wut", "štw", "pja", "njedźela", "póndźela", "wutora", "srjeda", "štwórtk", "pjatk", "popołdnju", "př.Chr.n.", "po Chr.n.", "př.n.l.č.", "n.l.č.", "před Chrystowym narodźenjom", "po Chrystowym narodźenju", "před našim ličenjom časa", "našeho ličenja časa", "d., E", "G y.", "G y. MMM", "G y. MMM d.", "G y. MMM d., E", "a h", "a h:mm", "a h:mm:ss", "M. d.", "M. d., E", "MMM d.", "MMM d., E", "MMMM d.", "y. M.", "y. MM. dd.", "y. MM. dd., E", "y. MMM", "y. MMM d.", "y. MMM d., E", "y. MMMM", "y. QQQ", "y. QQQQ", "y. MMMM d., EEEE", "y. MMMM d.", "Á", "Sz", "márc.", "ápr.", "máj.", "jún.", "júl.", "szept.", "január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "Cs", "Sze", "Szo", "vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat", "de.", "du.", "ie.", "isz.", "i. e.", "i. sz.", "időszámításunk előtt", "időszámításunk szerint", "Tisri", "Hesván", "Kiszlév", "Tévész", "Svát", "Ádár I", "Ádár", "Niszán", "Ijár", "Sziván", "Áv", "Ádár II", "TÉ", "Moh.", "Réb. 1", "Réb. 2", "Dsem. I", "Dsem. II", "Red.", "Sab.", "Sev.", "Dsül k.", "Dsül h.", "Moharrem", "Rébi el avvel", "Rébi el accher", "Dsemádi el avvel", "Dsemádi el accher", "Redseb", "Sabán", "Ramadán", "Sevvál", "Dsül kade", "Dsül hedse", "MF", "R.O.C. előtt", "Ft", "d, ccc", "G yթ.", "G yթ. LLL", "d MMM, yթ.,", "G yթ. MMM d, E", "d.MM.yթ., E", "yթ. LLL", "d MMM, yթ.", "yթ. MMM d, E", "yթ․ MMMM", "y թ, QQQ", "y թ, QQQQ", "yթ. MMMM d, EEEE", "dd MMMM, yթ.", "dd MMM, yթ.", "H:mm:ss, zzzz", "H:mm:ss, z", "Հ", "Փ", "Մ", "Ա", "Օ", "Ս", "Ն", "Դ", "հնվ", "փտվ", "մրտ", "ապր", "մյս", "հնս", "հլս", "օգս", "սեպ", "հոկ", "նոյ", "դեկ", "հունվարի", "փետրվարի", "մարտի", "ապրիլի", "մայիսի", "հունիսի", "հուլիսի", "օգոստոսի", "սեպտեմբերի", "հոկտեմբերի", "նոյեմբերի", "դեկտեմբերի", "Կ", "Ե", "Չ", "Ու", "Շ", "կիր", "երկ", "երք", "չրք", "հնգ", "ուր", "շբթ", "կիրակի", "երկուշաբթի", "երեքշաբթի", "չորեքշաբթի", "հինգշաբթի", "ուրբաթ", "շաբաթ", "մ.թ.ա.", "մ.թ.", "մ.թ.ա", "մեր թվարկությունից առաջ", "մեր թվարկության", "֏", "h.mm.ss. a v", "Des", "Maret", "Agustus", "Min", "Sen", "Sel", "Rab", "Kam", "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "SM", "SEU", "EU", "Sebelum Masehi", "Sebelum Era Umum", "Era Umum", "Syaw.", "Sya’ban", "Ramadhan", "Syawal", "Tempyō (729–749)", "Tempyō-kampō (749-749)", "Tempyō-shōhō (749-757)", "Tempyō-hōji (757-765)", "Temphō-jingo (765-767)", "Saiko (854–857)", "Tennan (857–859)", "Genkei (877–885)", "Kampyō (889–898)", "Shōhei (931–938)", "Ten-en (973-976)", "Ei-en (987-989)", "Eiho (1081–1084)", "Kaho (1094–1096)", "Shōtoku (1097–1099)", "Gen-ei (1118-1120)", "Hoan (1120–1124)", "Hoen (1135–1141)", "Tenyō (1144–1145)", "Hogen (1156–1159)", "Nin-an (1166-1169)", "Genryuku (1184–1185)", "Ken-ei (1206-1207)", "Shōgen (1207–1211)", "Shōkyū (1219–1222)", "Tempuku (1233–1234)", "Bun-ō (1260-1261)", "Bun-ei (1264-1275)", "Enkei (1308–1311)", "Genkyō (1321–1324)", "Kareki (1326–1329)", "Kemmu (1334–1336)", "Bun-an (1444-1449)", "Tenmon (1532–1555)", "Genwa (1615–1624)", "Kan-ei (1624-1644)", "Shōō (1652–1655)", "Meiryaku (1655–1658)", "Tenwa (1681–1684)", "Kan-en (1748-1751)", "Hōryaku (1751–1764)", "An-ei (1772-1781)", "Man-en (1860-1861)", "Sebelum R.O.C.", "Rp", "Jen", "Juu", "Ọgọ", "Ọkt", "Jenụwarị", "Febrụwarị", "Maachị", "Eprel", "Juun", "Julaị", "Ọgọọst", "Ọktoba", "Ụka", "Mọn", "Tiu", "Wen", "Tọọ", "Fraị", "Mbọsị Ụka", "Mọnde", "Tiuzdee", "Wenezdee", "Tọọzdee", "Fraịdee", "Satọdee", "P.M.", "T.K.", "A.K.", "Tupu Kristi", "Afọ Kristi", "ꋍꆪ", "ꑍꆪ", "ꌕꆪ", "ꇖꆪ", "ꉬꆪ", "ꃘꆪ", "ꏃꆪ", "ꉆꆪ", "ꈬꆪ", "ꊰꆪ", "ꊰꊪꆪ", "ꊰꑋꆪ", "ꆏ", "ꋍ", "ꑍ", "ꌕ", "ꇖ", "ꉬ", "ꃘ", "ꑭꆏ", "ꆏꋍ", "ꆏꑍ", "ꆏꌕ", "ꆏꇖ", "ꆏꉬ", "ꆏꃘ", "ꑭꆏꑍ", "ꆏꊂꋍ", "ꆏꊂꑍ", "ꆏꊂꌕ", "ꆏꊂꇖ", "ꆏꊂꉬ", "ꆏꊂꃘ", "ꎸꄑ", "ꁯꋒ", "ꃅꋊꂿ", "ꃅꋊꊂ", "M. y", "maí", "ágú.", "nóv.", "janúar", "febrúar", "júní", "júlí", "ágúst", "nóvember", "Þ", "þri.", "mið.", "fim.", "fös.", "lau.", "mánudagur", "þriðjudagur", "miðvikudagur", "fimmtudagur", "föstudagur", "laugardagur", "f.h.", "e.h.", "f.k.", "e.k.", "f.l.t.", "l.t.", "fyrir Krist", "fyrir kristið tímatal", "kristið tímatal", "mag", "giu", "lug", "ott", "gennaio", "febbraio", "aprile", "maggio", "giugno", "luglio", "settembre", "ottobre", "dicembre", "mer", "gio", "domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "a.E.V.", "E.V.", "avanti Era Volgare", "Era Volgare", "Prima di R.O.C.", "d-MMM-y", "d日", "d日(E)", "d日EEEE", "aK:mm (E)", "H:mm (E)", "aK:mm:ss (E)", "H:mm:ss (E)", "Gy年", "Gy年M月", "Gy年M月d日", "Gy年M月d日(E)", "Gy年M月d日EEEE", "aK時", "H時", "aK:mm", "aK:mm:ss", "aK:mm:ss v", "aK:mm v", "M月", "M/d(E)", "M/dEEEE", "M月d日", "M月d日(E)", "M月d日EEEE", "y年", "y/M/d(E)", "y/M/dEEEE", "y/MM", "y年M月", "y年M月d日", "y年M月d日(E)", "y年M月d日EEEE", "y/QQQ", "yQQQQ", "H時mm分ss秒 zzzz", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", "日", "月", "火", "水", "木", "金", "土", "日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "仏暦", "午前", "午後", "正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", "トウト", "ババ", "ハトール", "キアック", "トーバ", "アムシール", "バラムハート", "バラモウダ", "バシャンス", "パオーナ", "エペープ", "メスラ", "ナシエ", "メスケレム", "テケムト", "ヘダル", "ターサス", "テル", "イェカティト", "メガビト", "ミアジア", "ゲンボト", "セネ", "ハムレ", "ネハッセ", "パグメン", "紀元前", "西暦", "西暦紀元前", "西暦紀元", "ティスレ", "へシボン", "キスレブ", "テベット", "シバット", "アダル I", "アダル", "ニサン", "イヤル", "シバン", "タムズ", "アヴ", "エルル", "アダル II", "カイトラ", "ヴァイサカ", "ジャイスタ", "アーサダ", "スラバナ", "バードラ", "アスビナ", "カルディカ", "アヴラハヤナ", "パウサ", "マーガ", "パルグナ", "サカ", "ムハッラム", "サフアル", "ラビー・ウル・アウワル", "ラビー・ウッ・サーニー", "ジュマーダル・アウワル", "ジュマーダッサーニー", "ラジャブ", "シャアバーン", "ラマダーン", "シャウワール", "ズル・カイダ", "ズル・ヒッジャ", "大化", "白雉", "白鳯", "朱鳥", "大宝", "慶雲", "和銅", "霊亀", "養老", "神亀", "天平", "天平感宝", "天平勝宝", "天平宝字", "天平神護", "神護景雲", "宝亀", "天応", "延暦", "大同", "弘仁", "天長", "承和", "嘉祥", "仁寿", "斉衡", "天安", "貞観", "元慶", "仁和", "寛平", "昌泰", "延喜", "延長", "承平", "天慶", "天暦", "天徳", "応和", "康保", "安和", "天禄", "天延", "貞元", "天元", "永観", "寛和", "永延", "永祚", "正暦", "長徳", "長保", "寛弘", "長和", "寛仁", "治安", "万寿", "長元", "長暦", "長久", "寛徳", "永承", "天喜", "康平", "治暦", "延久", "承保", "承暦", "永保", "応徳", "寛治", "嘉保", "永長", "承徳", "康和", "長治", "嘉承", "天仁", "天永", "永久", "元永", "保安", "天治", "大治", "天承", "長承", "保延", "永治", "康治", "天養", "久安", "仁平", "久寿", "保元", "平治", "永暦", "応保", "長寛", "永万", "仁安", "嘉応", "承安", "安元", "治承", "養和", "寿永", "元暦", "文治", "建久", "正治", "建仁", "元久", "建永", "承元", "建暦", "建保", "承久", "貞応", "元仁", "嘉禄", "安貞", "寛喜", "貞永", "天福", "文暦", "嘉禎", "暦仁", "延応", "仁治", "寛元", "宝治", "建長", "康元", "正嘉", "正元", "文応", "弘長", "文永", "建治", "弘安", "正応", "永仁", "正安", "乾元", "嘉元", "徳治", "延慶", "応長", "正和", "文保", "元応", "元亨", "正中", "嘉暦", "元徳", "元弘", "建武", "延元", "興国", "正平", "建徳", "文中", "天授", "康暦", "弘和", "元中", "至徳", "嘉慶", "康応", "明徳", "応永", "正長", "永享", "嘉吉", "文安", "宝徳", "享徳", "康正", "長禄", "寛正", "文正", "応仁", "文明", "長享", "延徳", "明応", "文亀", "永正", "大永", "享禄", "天文", "弘治", "永禄", "元亀", "天正", "文禄", "慶長", "元和", "寛永", "正保", "慶安", "承応", "明暦", "万治", "寛文", "延宝", "天和", "貞享", "元禄", "宝永", "正徳", "享保", "元文", "寛保", "延享", "寛延", "宝暦", "明和", "安永", "天明", "寛政", "享和", "文化", "文政", "天保", "弘化", "嘉永", "安政", "万延", "文久", "元治", "慶応", "明治", "大正", "昭和", "平成", "ファルヴァルディーン", "オルディーベヘシュト", "ホルダード", "ティール", "モルダード", "シャハリーヴァル", "メフル", "アーバーン", "アーザル", "デイ", "バフマン", "エスファンド", "民国前", "民国", "元", "￥", "M.d.y", "Nduŋmbi Saŋ", "Pɛsaŋ Pɛ́pá", "Pɛsaŋ Pɛ́tát", "Pɛsaŋ Pɛ́nɛ́kwa", "Pɛsaŋ Pataa", "Pɛsaŋ Pɛ́nɛ́ntúkú", "Pɛsaŋ Saambá", "Pɛsaŋ Pɛ́nɛ́fɔm", "Pɛsaŋ Pɛ́nɛ́pfúꞋú", "Pɛsaŋ Nɛgɛ́m", "Pɛsaŋ Ntsɔ̌pmɔ́", "Pɛsaŋ Ntsɔ̌ppá", "Sɔ́", "Mɔ́", "ÁM", "Wɛ́", "Tɔ́", "Fɛ", "Sá", "Sɔ́ndi", "Mɔ́ndi", "Ápta Mɔ́ndi", "Wɛ́nɛsɛdɛ", "Tɔ́sɛdɛ", "Fɛlâyɛdɛ", "Sásidɛ", "mbaꞌmbaꞌ", "ŋka mbɔ́t nji", "tsɛttsɛt mɛŋguꞌ mi ɛ́ lɛɛnɛ Kɛlísɛtɔ gɔ ńɔ́", "tsɛttsɛt mɛŋguꞌ mi ɛ́ fúnɛ Kɛlísɛtɔ tɔ́ mɔ́", "Aprilyi", "Junyi", "Julyai", "Agusti", "Iju", "Jumapilyi", "Jumatatuu", "Jumatanu", "utuko", "kyiukonyi", "Kabla ya Kristu", "Baada ya Kristu", "MMM. y G", "d MMM. y G", "E, d MMM. y G", "MMM. y", "d MMM. y", "E, d MMM. y", "MMMM, y", "QQQ, y", "QQQQ, y", "EEEE, dd MMMM, y", "ი", "თ", "მ", "ა", "ს", "ო", "ნ", "დ", "იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ", "იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი", "კ", "ხ", "პ", "შ", "კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ", "კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი", "ძვ. წ.", "ახ. წ.", "ჩვ. ერამდე", "ჩვ. ერა", "ძველი წელთაღრიცხვით", "ახალი წელთაღრიცხვით", "ჩვენს ერამდე", "ჩვენი ერა", "არ არის რიცხვი", "Ɣ", "Yen", "Fur", "Meɣ", "Yeb", "Ɣuc", "Cte", "Tub", "Nun", "Duǧ", "Yennayer", "Fuṛar", "Meɣres", "Yebrir", "Mayyu", "Yunyu", "Yulyu", "Ɣuct", "Ctembeṛ", "Tubeṛ", "Nunembeṛ", "Duǧembeṛ", "Yan", "San", "Kraḍ", "Kuẓ", "Sam", "Sḍis", "Say", "Yanass", "Sanass", "Kraḍass", "Kuẓass", "Samass", "Sḍisass", "Sayass", "n tufat", "n tmeddit", "snd. T.Ɛ", "sld. T.Ɛ", "send talalit n Ɛisa", "seld talalit n Ɛisa", "Ĩ", "Kel", "Ktũ", "Ktn", "Tha", "Moo", "Nya", "Knd", "Ĩku", "Ĩkm", "Ĩkl", "Mwai wa mbee", "Mwai wa kelĩ", "Mwai wa katatũ", "Mwai wa kana", "Mwai wa katano", "Mwai wa thanthatũ", "Mwai wa muonza", "Mwai wa nyaanya", "Mwai wa kenda", "Mwai wa ĩkumi", "Mwai wa ĩkumi na ĩmwe", "Mwai wa ĩkumi na ilĩ", "Wky", "Wkw", "Wkl", "Wtũ", "Wkn", "Wtn", "Wth", "Wa kyumwa", "Wa kwambĩlĩlya", "Wa kelĩ", "Wa katatũ", "Wa kana", "Wa katano", "Wa thanthatũ", "Ĩyakwakya", "Ĩyawĩoo", "MY", "IY", "Mbee wa Yesũ", "Ĩtina wa Yesũ", "Mwedi Ntandi", "Mwedi wa Pili", "Mwedi wa Tatu", "Mwedi wa Nchechi", "Mwedi wa Nnyano", "Mwedi wa Nnyano na Umo", "Mwedi wa Nnyano na Mivili", "Mwedi wa Nnyano na Mitatu", "Mwedi wa Nnyano na Nchechi", "Mwedi wa Nnyano na Nnyano", "Mwedi wa Nnyano na Nnyano na U", "Mwedi wa Nnyano na Nnyano na M", "Ll2", "Ll3", "Ll4", "Ll5", "Ll6", "Ll7", "Ll1", "Liduva lyapili", "Liduva lyatatu", "Liduva lyanchechi", "Liduva lyannyano", "Liduva lyannyano na linji", "Liduva lyannyano na mavili", "Liduva litandi", "Muhi", "Chilo", "AY", "NY", "Akanapawa Yesu", "Nankuida Yesu", "MMM 'di' y G", "d 'di' MMM 'di' y G", "E, d 'di' MMM 'di' y G", "E, d 'di' MMMM", "MMM 'di' y", "MMMM 'di' y", "QQQQ 'di' y", "EEEE, d 'di' MMMM 'di' y", "d 'di' MMMM 'di' y", "Nuv", "Diz", "Janeru", "Febreru", "Marsu", "Maiu", "Junhu", "Julhu", "Agostu", "Setenbru", "Otubru", "Nuvenbru", "Dizenbru", "sig", "kua", "kin", "ses", "dumingu", "sigunda-fera", "tersa-fera", "kuarta-fera", "kinta-fera", "sesta-fera", "sabadu", "DK", "AEK", "EK", "Antis di Kristu", "Dispos di Kristu", "Antis di Era Kumun", "Era Kumun", "​", "Alj", "Ass", "Atini", "Atalata", "Alhamiisa", "Aljuma", "Assabdu", "Adduha", "Aluula", "Isaa jamanoo", "JEN", "WKR", "WGT", "WKN", "WTN", "WTD", "WMJ", "WNN", "WKD", "WIK", "WMW", "DIT", "Njenuarĩ", "Mwere wa kerĩ", "Mwere wa gatatũ", "Mwere wa kana", "Mwere wa gatano", "Mwere wa gatandatũ", "Mwere wa mũgwanja", "Mwere wa kanana", "Mwere wa kenda", "Mwere wa ikũmi", "Mwere wa ikũmi na ũmwe", "Ndithemba", "KMA", "NTT", "NMN", "NMT", "ART", "NMA", "Njumatatũ", "Njumatana", "Njumamothi", "Kiroko", "Hwaĩ-inĩ", "E, a h:mm", "E, a h:mm:ss", "G y 'ж'.", "G y 'ж'. MMM", "G y 'ж'. d MMM", "G y 'ж'. d MMM, E", "a h:mm:ss v", "a h:mm v", "y 'ж'. MMM", "y 'ж'. d MMM", "y 'ж'. d MMM, E", "y 'ж'. MMMM", "y 'ж'. QQQ", "y 'ж'. QQQQ", "y 'ж'. d MMMM, EEEE", "y 'ж'. d MMMM", "y 'ж'. dd MMM", "Қ", "А", "Н", "С", "М", "Ш", "Т", "Ж", "қаң.", "ақп.", "нау.", "сәу.", "мам.", "мау.", "шіл.", "там.", "қыр.", "қаз.", "қар.", "жел.", "қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым", "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан", "Д", "Б", "Жс", "Дс", "Сс", "Ср", "Бс", "Жм", "Сб", "жексенбі", "дүйсенбі", "сейсенбі", "сәрсенбі", "бейсенбі", "жұма", "сенбі", "таңғы", "түскі/кешкі", "б.з.д.", "б.з.", "Біздің заманымызға дейін", "Біздің заманымыз", "БД", "КД$", "₸", "MM y", "dd/MM y", "E dd/MM y", "pamba", "wanja", "mbiyɔ mɛndoŋgɔ", "Nyɔlɔmbɔŋgɔ", "Mɔnɔ ŋgbanja", "Nyaŋgwɛ ŋgbanja", "kuŋgwɛ", "fɛ", "njapi", "nyukul", "ɓulɓusɛ", "ye", "va", "ms", "sɔndi", "mɛrkɛrɛdi", "yedi", "vaŋdɛrɛdi", "mɔnɔ sɔndi", "januari", "februari", "martsi", "aprili", "maji", "augustusi", "septemberi", "oktoberi", "novemberi", "decemberi", "ata", "pin", "sis", "tal", "arf", "sabaat", "ataasinngorneq", "marlunngorneq", "pingasunngorneq", "sisamanngorneq", "tallimanngorneq", "arfininngorneq", "Ngat", "Taa", "Iwo", "Mam", "Paa", "Nge", "Roo", "Bur", "Epe", "Kpt", "Kpa", "Mulgul", "Ng’atyaato", "Kiptaamo", "Iwootkuut", "Mamuut", "Paagi", "Ng’eiyeet", "Rooptui", "Bureet", "Epeeso", "Kipsuunde ne taai", "Kipsuunde nebo aeng’", "Kts", "Kot", "Koo", "Kos", "Koa", "Kom", "Kol", "Kotisap", "Kotaai", "Koaeng’", "Kosomok", "Koang’wan", "Komuut", "Kolo", "karoon", "kooskoliny", "KO", "Amait kesich Jesu", "Kokakesich Jesu", "{1} នៅ {0}", "y នៃ G", "MMM y នៃ G", "d MMM y នៃ G", "E d MMM y នៃ G", "មករា", "កុម្ភៈ", "មីនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ", "អា", "ច", "អ", "ពុ", "ព្រ", "សុ", "ស", "អាទិត្យ", "ច័ន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍", "ព្រឹក", "ល្ងាច", "មុន គ.ស.", "គ.ស.", "មុន​គ្រិស្តសករាជ", "គ្រិស្តសករាជ", "៛", "d/M, E", "MMM d,y", "ಜ", "ಫೆ", "ಮಾ", "ಏ", "ಮೇ", "ಜೂ", "ಜು", "ಆ", "ಸೆ", "ಅ", "ನ", "ಡಿ", "ಜನ", "ಫೆಬ್ರ", "ಮಾರ್ಚ್", "ಏಪ್ರಿ", "ಜೂನ್", "ಜುಲೈ", "ಆಗ", "ಸೆಪ್ಟೆಂ", "ಅಕ್ಟೋ", "ನವೆಂ", "ಡಿಸೆಂ", "ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಏಪ್ರಿಲ್", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟೆಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್", "ಭಾ", "ಸೋ", "ಮಂ", "ಬು", "ಗು", "ಶು", "ಶ", "ಭಾನು", "ಸೋಮ", "ಮಂಗಳ", "ಬುಧ", "ಗುರು", "ಶುಕ್ರ", "ಶನಿ", "ಭಾನುವಾರ", "ಸೋಮವಾರ", "ಮಂಗಳವಾರ", "ಬುಧವಾರ", "ಗುರುವಾರ", "ಶುಕ್ರವಾರ", "ಶನಿವಾರ", "ಪೂರ್ವಾಹ್ನ", "ಅಪರಾಹ್ನ", "ಕ್ರಿ.ಪೂ", "ಕ್ರಿ.ಶ", "ಕ್ರಿ.ಪೂ.ಕಾಲ", "ಪ್ರಸಕ್ತ ಶಕ", "ಕ್ರಿಸ್ತ ಪೂರ್ವ", "ಕ್ರಿಸ್ತ ಶಕ", "d일", "d일 (E)", "d일 EEEE", "(E) a h:mm", "(E) HH:mm", "(E) a h:mm:ss", "(E) HH:mm:ss", "G y년", "G y년 MMM", "G y년 MMM d일", "G y년 MMM d일 (E)", "G y년 MMM d일 EEEE", "a h시", "H시", "H시 m분 s초", "H시 m분 s초 v", "M월", "M. d. (E)", "M. d. EEEE", "MMM d일", "MMM d일 (E)", "MMM d일 EEEE", "MMMM d일", "y년", "y. M. d.", "y. M. d. (E)", "y. M. d. EEEE", "y년 MMM", "y년 MMM d일", "y년 MMM d일 (E)", "y년 MMM d일 EEEE", "y년 MMMM", "y년 QQQ", "y년 QQQQ", "y년 M월 d일 EEEE", "y년 M월 d일", "yy. M. d.", "a h시 m분 s초 zzzz", "a h시 m분 s초 z", "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월", "일", "월", "화", "수", "목", "금", "토", "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "불기", "오전", "오후", "투트", "바바흐", "하투르", "키야흐크", "투바흐", "암쉬르", "바라마트", "바라문다흐", "바샨스", "바우나흐", "아비브", "미스라", "나시", "매스캐램", "테켐트", "헤다르", "타흐사스", "테르", "얘카티트", "매가비트", "미야지야", "겐보트", "새네", "함레", "내하세", "파구맨", "기원전", "서기", "디스리월", "말케스월", "기슬르월", "데벳월", "스밧월", "아달월 1", "아달월", "닛산월", "이야르월", "시완월", "담무르월", "압월", "엘룰월", "아달월 2", "무하람", "사파르", "라비 알 아왈", "라비 알 쎄니", "주마다 알 아왈", "주마다 알 쎄니", "라잡", "쉐아반", "라마단", "쉐왈", "듀 알 까다", "듀 알 히자", "다이카 (645 ~ 650)", "하쿠치 (650 ~ 671)", "하쿠호 (672 ~ 686)", "슈초 (686 ~ 701)", "다이호 (701 ~ 704)", "게이운 (704 ~ 708)", "와도 (708 ~ 715)", "레이키 (715 ~ 717)", "요로 (717 ~ 724)", "진키 (724 ~ 729)", "덴표 (729 ~ 749)", "덴표칸포 (749 ~ 749)", "덴표쇼호 (749 ~ 757)", "덴표호지 (757 ~ 765)", "덴표진고 (765 ~ 767)", "진고케이운 (767 ~ 770)", "호키 (770 ~ 780)", "덴오 (781 ~ 782)", "엔랴쿠 (782 ~ 806)", "다이도 (806 ~ 810)", "고닌 (810 ~ 824)", "덴초 (824 ~ 834)", "조와 (834 ~ 848)", "가쇼 (848 ~ 851)", "닌주 (851 ~ 854)", "사이코 (854 ~ 857)", "덴난 (857 ~ 859)", "조간 (859 ~ 877)", "간교 (877 ~ 885)", "닌나 (885 ~ 889)", "간표 (889 ~ 898)", "쇼타이 (898 ~ 901)", "엔기 (901 ~ 923)", "엔초 (923 ~ 931)", "조헤이 (931 ~ 938)", "덴교 (938 ~ 947)", "덴랴쿠 (947 ~ 957)", "덴토쿠 (957 ~ 961)", "오와 (961 ~ 964)", "고호 (964 ~ 968)", "안나 (968 ~ 970)", "덴로쿠 (970 ~ 973)", "덴엔 (973 ~ 976)", "조겐 (976 ~ 978)", "덴겐 (978 ~ 983)", "에이간 (983 ~ 985)", "간나 (985 ~ 987)", "에이엔 (987 ~ 989)", "에이소 (989 ~ 990)", "쇼랴쿠 (990 ~ 995)", "조토쿠 (995 ~ 999)", "조호 (999 ~ 1004)", "간코 (1004 ~ 1012)", "조와 (1012 ~ 1017)", "간닌 (1017 ~ 1021)", "지안 (1021 ~ 1024)", "만주 (1024 ~ 1028)", "조겐 (1028 ~ 1037)", "조랴쿠 (1037 ~ 1040)", "조큐 (1040 ~ 1044)", "간토쿠 (1044 ~ 1046)", "에이쇼 (1046 ~ 1053)", "덴기 (1053 ~ 1058)", "고헤이 (1058 ~ 1065)", "지랴쿠 (1065 ~ 1069)", "엔큐 (1069 ~ 1074)", "조호 (1074 ~ 1077)", "쇼랴쿠 (1077 ~ 1081)", "에이호 (1081 ~ 1084)", "오토쿠 (1084 ~ 1087)", "간지 (1087 ~ 1094)", "가호 (1094 ~ 1096)", "에이초 (1096 ~ 1097)", "조토쿠 (1097 ~ 1099)", "고와 (1099 ~ 1104)", "조지 (1104 ~ 1106)", "가쇼 (1106 ~ 1108)", "덴닌 (1108 ~ 1110)", "덴에이 (1110 ~ 1113)", "에이큐 (1113 ~ 1118)", "겐에이 (1118 ~ 1120)", "호안 (1120 ~ 1124)", "덴지 (1124 ~ 1126)", "다이지 (1126 ~ 1131)", "덴쇼 (1131 ~ 1132)", "조쇼 (1132 ~ 1135)", "호엔 (1135 ~ 1141)", "에이지 (1141 ~ 1142)", "고지 (1142 ~ 1144)", "덴요 (1144 ~ 1145)", "규안 (1145 ~ 1151)", "닌페이 (1151 ~ 1154)", "규주 (1154 ~ 1156)", "호겐 (1156 ~ 1159)", "헤이지 (1159 ~ 1160)", "에이랴쿠 (1160 ~ 1161)", "오호 (1161 ~ 1163)", "조칸 (1163 ~ 1165)", "에이만 (1165 ~ 1166)", "닌난 (1166 ~ 1169)", "가오 (1169 ~ 1171)", "조안 (1171 ~ 1175)", "안겐 (1175 ~ 1177)", "지쇼 (1177 ~ 1181)", "요와 (1181 ~ 1182)", "주에이 (1182 ~ 1184)", "겐랴쿠 (1184 ~ 1185)", "분지 (1185 ~ 1190)", "겐큐 (1190 ~ 1199)", "쇼지 (1199 ~ 1201)", "겐닌 (1201 ~ 1204)", "겐큐 (1204 ~ 1206)", "겐에이 (1206 ~ 1207)", "조겐 (1207 ~ 1211)", "겐랴쿠 (1211 ~ 1213)", "겐포 (1213 ~ 1219)", "조큐 (1219 ~ 1222)", "조오 (1222 ~ 1224)", "겐닌 (1224 ~ 1225)", "가로쿠 (1225 ~ 1227)", "안테이 (1227 ~ 1229)", "간키 (1229 ~ 1232)", "조에이 (1232 ~ 1233)", "덴푸쿠 (1233 ~ 1234)", "분랴쿠 (1234 ~ 1235)", "가테이 (1235 ~ 1238)", "랴쿠닌 (1238 ~ 1239)", "엔오 (1239 ~ 1240)", "닌지 (1240 ~ 1243)", "간겐 (1243 ~ 1247)", "호지 (1247 ~ 1249)", "겐초 (1249 ~ 1256)", "고겐 (1256 ~ 1257)", "쇼카 (1257 ~ 1259)", "쇼겐 (1259 ~ 1260)", "분오 (1260 ~ 1261)", "고초 (1261 ~ 1264)", "분에이 (1264 ~ 1275)", "겐지 (1275 ~ 1278)", "고안 (1278 ~ 1288)", "쇼오 (1288 ~ 1293)", "에이닌 (1293 ~ 1299)", "쇼안 (1299 ~ 1302)", "겐겐 (1302 ~ 1303)", "가겐 (1303 ~ 1306)", "도쿠지 (1306 ~ 1308)", "엔쿄 (1308 ~ 1311)", "오초 (1311 ~ 1312)", "쇼와 (1312 ~ 1317)", "분포 (1317 ~ 1319)", "겐오 (1319 ~ 1321)", "겐코 (1321 ~ 1324)", "쇼추 (1324 ~ 1326)", "가랴쿠 (1326 ~ 1329)", "겐토쿠 (1329 ~ 1331)", "겐코 (1331 ~ 1334)", "겐무 (1334 ~ 1336)", "엔겐 (1336 ~ 1340)", "고코쿠 (1340 ~ 1346)", "쇼헤이 (1346 ~ 1370)", "겐토쿠 (1370 ~ 1372)", "분추 (1372 ~ 1375)", "덴주 (1375 ~ 1379)", "고랴쿠 (1379 ~ 1381)", "고와 (1381 ~ 1384)", "겐추 (1384 ~ 1392)", "메이토쿠 (1384 ~ 1387)", "가쿄 (1387 ~ 1389)", "고오 (1389 ~ 1390)", "메이토쿠 (1390 ~ 1394)", "오에이 (1394 ~ 1428)", "쇼초 (1428 ~ 1429)", "에이쿄 (1429 ~ 1441)", "가키쓰 (1441 ~ 1444)", "분안 (1444 ~ 1449)", "호토쿠 (1449 ~ 1452)", "교토쿠 (1452 ~ 1455)", "고쇼 (1455 ~ 1457)", "조로쿠 (1457 ~ 1460)", "간쇼 (1460 ~ 1466)", "분쇼 (1466 ~ 1467)", "오닌 (1467 ~ 1469)", "분메이 (1469 ~ 1487)", "조쿄 (1487 ~ 1489)<", "엔토쿠 (1489 ~ 1492)", "메이오 (1492 ~ 1501)", "분키 (1501 ~ 1504)", "에이쇼 (1504 ~ 1521)", "다이에이 (1521 ~ 1528)", "교로쿠 (1528 ~ 1532)", "덴분 (1532 ~ 1555)", "고지 (1555 ~ 1558)", "에이로쿠 (1558 ~ 1570)", "겐키 (1570 ~ 1573)", "덴쇼 (1573 ~ 1592)", "분로쿠 (1592 ~ 1596)", "게이초 (1596 ~ 1615)", "겐나 (1615 ~ 1624)", "간에이 (1624 ~ 1644)", "쇼호 (1644 ~ 1648)", "게이안 (1648 ~ 1652)", "조오 (1652 ~ 1655)", "메이레키 (1655 ~ 1658)", "만지 (1658 ~ 1661)", "간분 (1661 ~ 1673)", "엔포 (1673 ~ 1681)", "덴나 (1681 ~ 1684)", "조쿄 (1684 ~ 1688)", "겐로쿠 (1688 ~ 1704)", "호에이 (1704 ~ 1711)", "쇼토쿠 (1711 ~ 1716)", "교호 (1716 ~ 1736)", "겐분 (1736 ~ 1741)", "간포 (1741 ~ 1744)", "엔쿄 (1744 ~ 1748)", "간엔 (1748 ~ 1751)", "호레키 (1751 ~ 1764)", "메이와 (1764 ~ 1772)", "안에이 (1772 ~ 1781)", "덴메이 (1781 ~ 1789)", "간세이 (1789 ~ 1801)", "교와 (1801 ~ 1804)", "분카 (1804 ~ 1818)", "분세이 (1818 ~ 1830)", "덴포 (1830 ~ 1844)", "고카 (1844 ~ 1848)", "가에이 (1848 ~ 1854)", "안세이 (1854 ~ 1860)", "만엔 (1860 ~ 1861)", "분큐 (1861 ~ 1864)", "겐지 (1864 ~ 1865)", "게이오 (1865 ~ 1868)", "메이지", "다이쇼", "쇼와", "헤이세이", "화르바딘", "오르디베헤쉬트", "호르다드", "티르", "모르다드", "샤흐리바르", "메흐르", "아반", "아자르", "다이", "바흐만", "에스판드", "중화민국전", "중화민국", "जानेवारी", "एप्रिल", "जुलै", "ओगस्ट", "सेप्टेंबर", "ओक्टोबर", "नोव्हेंबर", "डिसेंबर", "मंगळ", "आदित्यवार", "मंगळार", "म.पू.", "म.नं.", "क्रिस्तपूर्व", "क्रिस्तशखा", "Gy", "MMM Gy", "MMM d, Gy", "EEE, MMM d, Gy", "EEE, M/d/y", "EEE, MMM d, y", "جنؤری", "فرؤری", "مارٕچ", "میٔ", "جوٗن", "جوٗلایی", "ستمبر", "اکتوٗبر", "آتھوار", "ژٔنٛدٕروار", "بوٚموار", "بودوار", "برٛٮ۪سوار", "جُمہ", "بٹوار", "اَتھوار", "ژٔنٛدرٕروار", "بی سی", "اے ڈی", "قبٕل مسیٖح", "عیٖسوی سنہٕ", "ربیٖع الاول", "ربیٖع الثانی", "ذِی القد", "ذِی الحج", "‎-‎", "?", "Januali", "Febluali", "Aplili", "Jmn", "Jumaapii", "Jumaatatu", "Jumaane", "Jumaatano", "Jumaamosi", "makeo", "nyiaghuo", "Kabla ya Klisto", "Baada ya Klisto", "ŋ1", "ŋ2", "ŋ3", "ŋ4", "ŋ5", "ŋ6", "ŋ7", "ŋ8", "ŋ9", "ŋ10", "ŋ11", "ŋ12", "ŋwíí a ntɔ́ntɔ", "ŋwíí akǝ bɛ́ɛ", "ŋwíí akǝ ráá", "ŋwíí akǝ nin", "ŋwíí akǝ táan", "ŋwíí akǝ táafɔk", "ŋwíí akǝ táabɛɛ", "ŋwíí akǝ táaraa", "ŋwíí akǝ táanin", "ŋwíí akǝ ntɛk", "ŋwíí akǝ ntɛk di bɔ́k", "ŋwíí akǝ ntɛk di bɛ́ɛ", "lǝn", "maa", "mɛk", "jǝǝ", "júm", "sam", "sɔ́ndǝ", "lǝndí", "maadí", "mɛkrɛdí", "jǝǝdí", "júmbá", "samdí", "sárúwá", "cɛɛ́nko", "d.Y.", "k.Y.", "di Yɛ́sus aká yálɛ", "cámɛɛn kǝ kǝbɔpka Y", "E 'dä' d.", "Y-MM", "d. MMM. y", "E d. MMM. y", "QQQy", "EEEE, 'dä' d. MMMM y", "Fäb", "Mäz", "Mäi", "Ouj", "Säp", "Jannewa", "Fäbrowa", "Määz", "Aprell", "Juuni", "Juuli", "Oujoß", "Me.", "Sunndaach", "Moondaach", "Dinnsdaach", "Metwoch", "Dunnersdaach", "Friidaach", "Samsdaach", "Uhr vörmiddaachs", "Uhr nommendaachs", "vC", "nC", "vdZ", "dZ", "v. d. Z.", "d. Z.", "vür Chrestus", "noh Chrestus", "vür der gewöhnlichen Zeitrechnung", "der gewöhnlichen Zeitrechnung", "¤¤¤", "Gen", "Hwe", "Meu", "Ebr", "Met", "Gor", "Gwn", "Hed", "Kev", "mis Genver", "mis Hwevrer", "mis Meurth", "mis Ebrel", "mis Me", "mis Metheven", "mis Gortheren", "mis Est", "mis Gwynngala", "mis Hedra", "mis Du", "mis Kevardhu", "Mth", "Mhr", "Yow", "Gwe", "dy Sul", "dy Lun", "dy Meurth", "dy Merher", "dy Yow", "dy Gwener", "dy Sadorn", "G y-'ж'.", "G y-'ж'. MMM", "G y-'ж'. d-MMM", "G y-'ж'. d-MMM, E", "dd-MM, E", "d-MMM, E", "y-'ж'. MMM", "y-'ж'. d-MMM", "y-'ж'. d-MMM, E", "y-'ж'., QQQ", "y-'ж'., QQQQ", "EEEE, d-MMMM, y-'ж'.", "Я", "Ф", "И", "О", "янв.", "фев.", "мар.", "апр.", "июн.", "июл.", "авг.", "сен.", "окт.", "ноя.", "дек.", "жек.", "дүй.", "шейш.", "шарш.", "бейш.", "жума", "ишм.", "жекшемби", "дүйшөмбү", "шейшемби", "шаршемби", "бейшемби", "ишемби", "таңкы", "түштөн кийинки", "б.з.ч.", "биздин заманга чейин", "биздин заман", "сан эмес", "сом", "Fúngatɨ", "Naanɨ", "Keenda", "Ikúmi", "Inyambala", "Idwaata", "Mʉʉnchɨ", "Vɨɨrɨ", "Saatʉ", "Inyi", "Saano", "Sasatʉ", "Kʉfúngatɨ", "Kʉnaanɨ", "Kʉkeenda", "Kwiikumi", "Kwiinyambála", "Kwiidwaata", "Kʉmʉʉnchɨ", "Kʉvɨɨrɨ", "Kʉsaatʉ", "Kwiinyi", "Kʉsaano", "Kʉsasatʉ", "Píili", "Táatu", "Íne", "Táano", "Móosi", "Jumapíiri", "Jumatátu", "Jumaíne", "Jumatáano", "Alamíisi", "Ijumáa", "Jumamóosi", "TOO", "MUU", "KSA", "KA", "Kɨrɨsitʉ sɨ anavyaal", "Kɨrɨsitʉ akavyaalwe", "HH 'Auer'", "Mäe.", "Abr.", "Mäerz", "Abrëll", "Son.", "Méi.", "Dën.", "Mët.", "Don.", "Fre.", "Sam.", "Sonndeg", "Méindeg", "Dënschdeg", "Mëttwoch", "Donneschdeg", "Freideg", "Samschdeg", "moies", "nomëttes", "v. e. Z.", "n. e. Z.", "Apu", "Seb", "Oki", "Janwaliyo", "Febwaliyo", "Marisi", "Apuli", "Maayi", "Julaayi", "Agusito", "Sebuttemba", "Okitobba", "Bal", "Lw2", "Lw3", "Lw4", "Lw5", "Lw6", "Sabbiiti", "Balaza", "Lwakubiri", "Lwakusatu", "Lwakuna", "Lwakutaano", "Lwamukaaga", "Kulisito nga tannaza", "Bukya Kulisito Azaal", "Wiótheȟika Wí", "Thiyóȟeyuŋka Wí", "Ištáwičhayazaŋ Wí", "Pȟežítȟo Wí", "Čhaŋwápetȟo Wí", "Wípazukȟa-wašté Wí", "Čhaŋpȟásapa Wí", "Wasútȟuŋ Wí", "Čhaŋwápeǧi Wí", "Čhaŋwápe-kasná Wí", "Waníyetu Wí", "Tȟahékapšuŋ Wí", "Aŋpétuwakȟaŋ", "Aŋpétuwaŋži", "Aŋpétunuŋpa", "Aŋpétuyamni", "Aŋpétutopa", "Aŋpétuzaptaŋ", "Owáŋgyužažapi", "ɔ", "fbl", "msi", "apl", "yun", "yul", "agt", "stb", "ɔtb", "nvb", "dsb", "sánzá ya yambo", "sánzá ya míbalé", "sánzá ya mísáto", "sánzá ya mínei", "sánzá ya mítáno", "sánzá ya motóbá", "sánzá ya nsambo", "sánzá ya mwambe", "sánzá ya libwa", "sánzá ya zómi", "sánzá ya zómi na mɔ̌kɔ́", "sánzá ya zómi na míbalé", "eye", "ybo", "mbl", "mst", "min", "mtn", "mps", "eyenga", "mokɔlɔ mwa yambo", "mokɔlɔ mwa míbalé", "mokɔlɔ mwa mísáto", "mokɔlɔ ya mínéi", "mokɔlɔ ya mítáno", "mpɔ́sɔ", "ntɔ́ngɔ́", "mpókwa", "libóso ya", "nsima ya Y", "Yambo ya Yézu Krís", "Nsima ya Yézu Krís", "d MMMM, G y", "E d MMMM, G y", "h ໂມງa", "EEEE ທີ d MMMM G y", "H ໂມງ m ນາທີ ss ວິນາທີ zzzz", "H ໂມງ m ນາທີ ss ວິນາທີ z", "ມ.ກ.", "ກ.ພ.", "ມ.ນ.", "ມ.ສ.", "ພ.ພ.", "ມິ.ຖ.", "ກ.ລ.", "ສ.ຫ.", "ກ.ຍ.", "ຕ.ລ.", "ພ.ຈ.", "ທ.ວ.", "ມັງກອນ", "ກຸມພາ", "ມີນາ", "ເມສາ", "ພຶດສະພາ", "ມິຖຸນາ", "ກໍລະກົດ", "ສິງຫາ", "ກັນຍາ", "ຕຸລາ", "ພະຈິກ", "ທັນວາ", "ວັນອາທິດ", "ວັນຈັນ", "ວັນອັງຄານ", "ວັນພຸດ", "ວັນພະຫັດ", "ວັນສຸກ", "ວັນເສົາ", "ກ່ອນທ່ຽງ", "ຫຼັງທ່ຽງ", "ເທົາ", "ບາບາ", "ຮາໂຕ", "ເຄຍ", "ໂທບາ", "ອຳເຊີ", "ບາລຳຮາດ", "ບາລາມູດາ", "ບາສຮານ", "ເປົານາ", "ອີແປບ", "ມາສລາ", "ນາຊິວ", "ອາເຊີ", "ນາຊີວ", "ແມສເຄີແຣມ", "ເຕເກມ", "ເຮດາ", "ທາຊັສ", "ເທີ", "ເຍຄາທິດ", "ເມກາບິດ", "ເມຍເຊຍ", "ເຈນບອດ", "ເຊເນ", "ຮຳເລ", "ເນແຮສ໌", "ພາກູເມນ", "ກ່ອນ ຄ.ສ.", "ຄ.ສ.", "ກ່ອນຍຸກ ຄ.ສ", "ຍຸກ ຄ.ສ", "ກ່ອນຄຣິດສັກກະລາດ", "ຄຣິດສັກກະລາດ", "ກ່ອນສາກົນສັກກະລາດ", "ສາກົນສັກກະລາດ", "ທຣິດຣີ", "ເຮວານ", "ກິດເລບ", "ເຕເວດ", "ຊີວັດ", "ອາດາ I", "ອາດາ", "ນິດຊານ", "ອີຍາຣ", "ສີວານ", "ຕາມູ", "ເອບ", "ອີລູ", "ອາດາ II", "ຈິຕຣາ", "ວິສາຂະ", "ເຊດຖາ", "ອັດສາ", "ສາຣາວານາ", "ພະຕຣາ", "ອັສວິຊາ", "ການຕິກາ", "ອັກຣາຮາຢານາ", "ປຸສາ", "ມາຄະ", "ຜາລກຸນີ", "ປຸສະຍາ", "ມຸຮັດ", "ເຄາະ", "ຮອດບີ 1", "ຮອກບີ 2", "ນຸມາ 1", "ນຸມາ 2", "ເຮາະ", "ຊະອ໌", "ເຮາະມະ", "ເຊົາ", "ຊຸລກິອຸ", "ຊຸລຫິຈ", "ມຸຣະຮອມ", "ຊາຟາຣ", "ຮອດບີ 2", "ຈຸມາດາ 1", "ຈຸມາດາ 2", "ຮາຈັບ", "ຊະບານ", "ຮາມາດອນ", "ເຊົາວັດ", "ດຸອັດກິດະ", "ດຸອັດກິຈະ", "ທະອິກະ (645–650)", "ຮາກູຊິ (650–671)", "ຮາກູໂຮ (672–686)", "ຊູໂຊ (686–701)", "ທາອິໂຮ (701–704)", "ເຄອຸງ (704–708)", "ວະໂດ (708–715)", "ເຣອິກິ (715–717)", "ໂຢໂຣ (717–724)", "ຈິງກິ (724–729)", "ເທັມປຽວ (729–749)", "ເທັມປຽວ-ຄໍາໂປ (749–749)", "ເທັມປຽວ-ໂຊໂຮ (749–757)", "ເທັມປຽວ-ໂຮຈິ (757–765)", "ເທັມປຽວ-ຈິງໂງະ (765–767)", "ຈິງໂງະ-ເຄອຸງ (767–770)", "ໂຮກິ (770–780)", "ເທັນ-ໂອ (781–782)", "ເອັນຣຢາກຸ (782–806)", "ດາອິໂດ (806–810)", "ໂກນິນ (810–824)", "ເທັນໂຊ (824–834)", "ໂຊວະ (834–848)", "ກະໂຈ (848–851)", "ນິນຈູ (851–854)", "ສະອິໂກະ (854–857)", "ເທັນນານ (857–859)", "ໂຈງານ (859–877)", "ເກັນເກ (877–885)", "ນິນນາ (885–889)", "ກໍາປຽວ (889–898)", "ໂຊຕາອິ (898–901)", "ເອັນງິ (901–923)", "ເອັນໂຊ (923–931)", "ໂຊເຮ (931–938)", "ເທັນງຽວ (938–947)", "ເທັນຣຢາກູ (947–957)", "ເທັນໂຕະກຸ (957–961)", "ໂອວະ (961–964)", "ໂກໂຮ (964–968)", "ອານະ (968–970)", "ເທັນໂຣະກຸ (970–973)", "ເທັນ-ເອັນ (973–976)", "ໂຈເງັນ (976–978)", "ເທັນເງັນ (978–983)", "ເອການ (983–985)", "ການນະ (985–987)", "ເອ-ເອັນ (987–989)", "ເອໂຊ (989–990)", "ໂຊຣຢະກຸ (990–995)", "ໂຊໂຕະກຸ (995–999)", "ໂຊໂຮ (999–1004)", "ການໂກ (1004–1012)", "ໂຊຫວະ (1012–1017)", "ການນິງ (1017–1021)", "ຈິອານ (1021–1024)", "ມານຈຸ (1024–1028)", "ໂຊເງັນ (1028–1037)", "ໂຊເຣຢະກຸ (1037–1040)", "ໂຊຄິວ (1040–1044)", "ການໂຕະກຸ (1044–1046)", "ເອະໂຊ (1046–1053)", "ເທັນງິ (1053–1058)", "ໂກເຮ (1058–1065)", "ຈິເຣຢະກຸ (1065–1069)", "ເອັນຄິວ (1069–1074)", "ໂຊະໂຮ (1074–1077)", "ໂຊະເຣຢະກຸ (1077–1081)", "ເອໂຊະ (1081–1084)", "ໂອໂຕະກຸ (1084–1087)", "ການຈິ (1087–1094)", "ກາໂຊ (1094–1096)", "ເອະໂຊະ (1096–1097)", "ໂຊະໂຕະກຸ (1097–1099)", "ໂກະວະ (1099–1104)", "ໂຊະຈິ (1104–1106)", "ກາໂຊະ (1106–1108)", "ເທັນນິນ (1108–1110)", "ເທັນ-ອິ (1110–1113)", "ເອກິວ (1113–1118)", "ເຄັນ-ເອ (1118–1120)", "ໂຮະອານ (1120–1124)", "ເທັນຈິ (1124–1126)", "ດາອິຈິ (1126–1131)", "ເທັນໂຊະ (1131–1132)", "ໂຊະໂຊະ (1132–1135)", "ໂຮເອັນ (1135–1141)", "ເອຈິ (1141–1142)", "ໂກະຈິ (1142–1144)", "ເທັນໂຢະ (1144–1145)", "ຄິວອານ (1145–1151)", "ນິນເປ (1151–1154)", "ຄິວຈຸ (1154–1156)", "ໂຮເຄັນ (1156–1159)", "ເຮຈິ (1159–1160)", "ເອເຣຢະກຸ (1160–1161)", "ໂອໂຊ (1161–1163)", "ໂຊະການ (1163–1165)", "ເອມານ (1165–1166)", "ນິນ-ອານ (1166–1169)", "ກະໂອ (1169–1171)", "ໂຊະອານ (1171–1175)", "ອານເຄັນ (1175–1177)", "ຈິໂຊະ (1177–1181)", "ໂຢະວະ (1181–1182)", "ຈຸເອະ (1182–1184)", "ເຄັນເຣຢຸກິ (1184–1185)", "ບັນຈິ (1185–1190)", "ເກັນຄິວ (1190–1199)", "ໂຊຈິ (1199–1201)", "ເກັນນິນ (1201–1204)", "ເຄັນກິວ (1204–1206)", "ເກັນ-ເອະ (1206–1207)", "ໂຊະເຄັນ (1207–1211)", "ເກັນເຣຢະກຸ (1211–1213)", "ເກັນໂປະ (1213–1219)", "ໂຊະກິວ (1219–1222)", "ໂຈະໂອະ (1222–1224)", "ເຄັນນິນ (1224–1225)", "ກາໂຮກຸ (1225–1227)", "ອານເຕະ (1227–1229)", "ການກິ (1229–1232)", "ໂຈະເອະ (1232–1233)", "ເທັມປຸກຸ (1233–1234)", "ບັນເຣຢະກຸ (1234–1235)", "ກາເຕະ (1235–1238)", "ເຣຢະກຸນິນ (1238–1239)", "ເອັນ-ໂອ (1239–1240)", "ນິນຈີ (1240–1243)", "ຄານເຈນ (1243–1247)", "ໂຫຈີ (1247–1249)", "ເຄນໂຊ (1249–1256)", "ໂຄເຈນ (1256–1257)", "ໂຊກາ (1257–1259)", "ໂຊເກນ (1259–1260)", "ບຸນ-ໂອ (1260–1261)", "ໂຄໂຊ (1261–1264)", "ບຸນ-ອີ (1264–1275)", "ເຄນຈີ (1275–1278)", "ເຄິນ (1278–1288)", "ໂຊ (1288–1293)", "ອິນນິນ (1293–1299)", "ເຊີນ (1299–1302)", "ເຄນເຈນ (1302–1303)", "ຄາເຈນ (1303–1306)", "ໂຕກູຈິ (1306–1308)", "ອິນກິ (1308–1311)", "ໂອໂຊ (1300–1312)", "ໂຊວາ (1312–1317)", "ບຸນໂປ (1317–1319)", "ຈີໂນ (1319–1321)", "ເຈນກຽວ (1321–1324)", "ໂຊຊິ (1324–1326)", "ຄາຣາກິ (1326–1329)", "ເຈນໂຕກູ (1329–1331)", "ເຈນໂກ (1331–1334)", "ເກັມມຸ (1334–1336)", "ເອັນເຈັນ (1336–1340)", "ໂກໂກກຸ (1340–1346)", "ໂຊຊິ (1346–1370)", "ເຄນໂຕກຸ (1370–1372)", "ບຸນຊຸ (1372–1375)", "ເທັນຈຸ (1375–1379)", "ຄໍຢາກຸ (1379–1381)", "ໂກວາ (1381–1384)", "ເຈັນຊຸ (1384–1392)", "ມີໂຕກຸ (1384–1387)", "ກາກິ (1387–1389)", "ຄູ (1389–1390)", "ມິໂຕກຸ (1390–1394)", "ໂອອິ (1394–1428)", "ໂຊໂຊ (1428–1429)", "ອິກຽວ (1429–1441)", "ກາກິຊຸ (1441–1444)", "ບຸນ-ອານ (1444–1449)", "ໂຫໂຕກຸ (1449–1452)", "ກຽວໂຕກຸ (1452–1455)", "ເກໂຊ (1455–1457)", "ໂຊໂຣກຸ (1457–1460)", "ຄານໂຊ (1460–1466)", "ບຸນໂຊ (1466–1467)", "ໂອນິນ (1467–1469)", "ບຸນມິ (1469–1487)", "ໂຊກຽວ (1487–1489)", "ເອັນໂຕກຸ (1489–1492)", "ມິໂອ (1492–1501)", "ບຸນກິ (1501–1504)", "ອິໂຊ (1504–1521)", "ໄຕອິ (1521–1528)", "ກຽວໂຣກຸ (1528–1532)", "ເທັນມອນ (1532–1555)", "ໂກຈິ (1555–1558)", "ອິໂຣກຸ (1558–1570)", "ເຈັນກິ (1570–1573)", "ເທັນໂຊ (1573–1592)", "ບຸນໂຣກຸ (1592–1596)", "ຄິໂຊ (1596–1615)", "ເກັນວາ (1615–1624)", "ຄານ-ອິ (1624–1644)", "ໂຊໂຊ (1644–1648)", "ຄຽນ (1648–1652)", "ຊຸ (1652–1655)", "ເມຍຢາກຸ (1655–1658)", "ແມນຈິ (1658–1661)", "ການບຸນ (1661–1673)", "ເອັນໂປ (1673–1681)", "ເທັນວາ (1681–1684)", "ໂຈກຽວ (1684–1688)", "ເຈັນໂຣກຸ (1688–1704)", "ໂຫອິ (1704–1711)", "ຊຸຕຸກຸ (1711–1716)", "ກຽວຫຸ (1716–1736)", "ເຈັນບຸນ (1736–1741)", "ຄານໂປ (1741–1744)", "ເອັນກຽວ (1744–1748)", "ຄານ-ອິນ (1748–1751)", "ໂຫຢາກຸ (1751–1764)", "ເມຍວາ (1764–1772)", "ເອັນ-ອິ (1772–1781)", "ເທັນມິ (1781–1789)", "ຄານຊິ (1789–1801)", "ກຽວວາ (1801–1804)", "ບຸນກາ (1804–1818)", "ບຸນຊິ (1818–1830)", "ເທັນໂປ (1830–1844)", "ກຸກາ (1844–1848)", "ກາອິ (1848–1854)", "ແອັນຊິ (1854–1860)", "ແມັນ-ເອັນ (1860–1861)", "ບຸນກຸ (1861–1864)", "ເຈນຈີ (1864–1865)", "ຄີໂອ (1865–1868)", "ມີຈີ", "ໄຕໂຊ", "ໂຊວາ", "ຮີຊີ", "ຟາຣວາດິນ", "ອໍຣດີບີເຫຣດ", "ຄໍຣເດດ", "ແຕຣ", "ມໍຣເດດ", "ຊາຣຫິວາ", "ເມີ", "ອາບານ", "ອາຊາ", "ດີຣ", "ບຣາມານ", "ເອສຟານ", "ຟຣາວາດິນ", "ອາຊາຣ", "ບຣາແມນ", "ປີເປີເຊຍ", "ກ່ອນ R.O.C.", "ບໍ່​ແມ່ນ​ໂຕ​ເລກ", "₭", "جانڤیە", "فئڤریە", "آڤریل", "مئی", "جوٙأن", "جوٙلا", "آگوست", "سئپتامر", "ئوکتوڤر", "نوڤامر", "دئسامر", "dd", "hh:mm a, E", "HH:mm, E", "hh:mm:ss a, E", "HH:mm:ss, E", "y 'm'. G", "y-MM G", "y-MM-dd G", "y-MM-dd G, E", "y 'm'. G, LLLL", "y 'm'. G MMMM d 'd'.", "y 'm'. G MMMM d 'd'., E", "hh:mm:ss a; v", "HH:mm:ss; v", "hh:mm a; v", "HH:mm; v", "MMMM d 'd'.", "MMMM d 'd'., E", "y 'm'. LLLL", "y 'm'. MMMM d 'd'.", "y 'm'. MMMM d 'd'., E", "y 'm'. MMMM d 'd'., EEEE", "saus.", "vas.", "kov.", "bal.", "geg.", "birž.", "liep.", "rugp.", "rugs.", "spal.", "lapkr.", "gruod.", "sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio", "liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio", "Š", "sk", "pr", "an", "tr", "kt", "pn", "št", "sekmadienis", "pirmadienis", "antradienis", "trečiadienis", "ketvirtadienis", "penktadienis", "šeštadienis", "priešpiet", "popiet", "po Kr.", "pr. m. e.", "mūsų eroje", "prieš Kristų", "po Kristaus", "prieš mūsų erą", "Hakuči (650–671)", "Hakuho (672–686)", "Šučo (686–701)", "Taiho (701–704)", "Vado (708–715)", "Joro (717–724)", "Tempio (729–749)", "Tempio-kampo (749–749)", "Tempio-šoho (749–757)", "Tempio-hodzi (757–765)", "Tempo-dzingo (765–767)", "Dzingo-keiun (767–770)", "Hoki (770–780)", "Ten-o (781–782)", "Enrjaku (782–806)", "Daido (806–810)", "Konin (810–824)", "Tenčo (824–834)", "Šova (834–848)", "Kajo (848–851)", "Tenan (857–859)", "Jogan (859–877)", "Ninja (885–889)", "Kampjo (889–898)", "Šotai (898–901)", "Enčo (923–931)", "Šohei (931–938)", "Tengjo (938–947)", "Tenriaku (947–957)", "Ova (961–964)", "Koho (964–968)", "Ana (968–970)", "Ten-en (973–976)", "Jogen (976–978)", "Kana (985–987)", "Ei-en (987–989)", "Šorjaku (990–995)", "Čotoku (995–999)", "Čoho (999–1004)", "Kanko (1004–1012)", "Čova (1012–1017)", "Kanin (1017–1021)", "Džian (1021–1024)", "Mandžiu (1024–1028)", "Čogen (1028–1037)", "Čorjaku (1037–1040)", "Čokju (1040–1044)", "Eišo (1046–1053)", "Kohei (1058–1065)", "Džirjaku (1065–1069)", "Enkju (1069–1074)", "Šoho (1074–1077)", "Šorjaku (1077–1081)", "Eiho (1081–084)", "Otoku (1084–1087)", "Kandži (1087–1094)", "Eičo (1096–1097)", "Šotoku (1097–1099)", "Kova (1099–1104)", "Čodži (1104–1106)", "Kašo (1106–1108)", "Tenin (1108–1110)", "Ten-ei (1110–1113)", "Eikju (1113–1118)", "Gen-ei (1118–1120)", "Tendži (1124–1126)", "Daidži (1126–1131)", "Tenšo (1131–1132)", "Čošo (1132–1135)", "Eidži (1141–1142)", "Kodži (1142–1144)", "Tenjo (1144–1145)", "Kjuan (1145–1151)", "Kjuju (1154–1156)", "Heidži (1159–1160)", "Eirjaku (1160–1161)", "Oho (1161–1163)", "Čokan (1163–1165)", "Nin-an (1166–1169)", "Kao (1169–1171)", "Šoan (1171–1175)", "Džišo (1177–1181)", "Jova (1181–1182)", "Džuei (1182–1184)", "Genrjuku (1184–1185)", "Bundži (1185–1190)", "Kenkju (1190–1199)", "Šodži (1199–1201)", "Kenin (1201–1204)", "Genkju (1204–1206)", "Ken-ei (1206–1207)", "Šogen (1207–1211)", "Kenrjaku (1211–1213)", "Kenpo (1213–1219)", "Šokju (1219–1222)", "Džu (1222–1224)", "Genin (1224–1225)", "Džoei (1232–1233)", "Bunrjaku (1234–1235)", "Rjakunin (1238–1239)", "En-o (1239–1240)", "Nindži (1240–1243)", "Hodži (1247–1249)", "Kenčo (1249–1256)", "Kogen (1256–1257)", "Šoka (1257–1259)", "Šogen (1259–1260)", "Bun-o (1260–1261)", "Kočo (1261–1264)", "Bun-ei (1264–1275)", "Kendži (1275–1278)", "Koan (1278–1288)", "Šu (1288–1293)", "Šoan (1299–1302)", "Tokudži (1306–1308)", "Očo (1311–1312)", "Šova (1312–1317)", "Bunpo (1317–1319)", "Dženo (1319–1321)", "Dženkjo (1321–1324)", "Šoču (1324–1326)", "Genko (1331–1334)", "Kemu (1334–1336)", "Kokoku (1340–1346)", "Šohei (1346–1370)", "Bunču (1372–1375)", "Tendžu (1375–1379)", "Korjaku (1379–1381)", "Kova (1381–1384)", "Genču (1384–1392)", "Ku (1389–1390)", "Oei (1394–1428)", "Šočo (1428–1429)", "Eikjo (1429–1441)", "Bun-an (1444–1449)", "Hotoku (1449–1452)", "Kjotoku (1452–1455)", "Košo (1455–1457)", "Čoroku (1457–1460)", "Kanšo (1460–1466)", "Bunšo (1466–1467)", "Onin (1467–1469)", "Čokjo (1487–1489)", "Meio (1492–1501)", "Eišo (1504–1521)", "Kjoroku (1528–1532)", "Kodži (1555–1558)", "Tenšo (1573–1592)", "Keičo (1596–1615)", "Genva (1615–1624)", "Kan-ei (1624–1644)", "Šoho (1644–1648)", "Šu (1652–1655)", "Meirjaku (1655–1658)", "Mandži (1658–1661)", "Enpo (1673–1681)", "Tenva (1681–1684)", "Džokjo (1684–1688)", "Hoei (1704–1711)", "Šotoku (1711–1716)", "Kjoho (1716–1736)", "Kanpo (1741–1744)", "Enkjo (1744–1748)", "Kan-en (1748–1751)", "Horjaku (1751–1764)", "Meiva (1764–1772)", "An-ei (1772–1781)", "Kjova (1801–1804)", "Tenpo (1830–1844)", "Koka (1844–1848)", "Man-en (1860–1861)", "Bunkju (1861–1864)", "Gendži (1864–1865)", "Keiko (1865–1868)", "Meidži", "Taišo", "Šova", "Prieš R.O.C.", "Cio", "Lus", "Muu", "Lum", "Luf", "Kab", "Lush", "Lut", "Cis", "Ciongo", "Lùishi", "Lusòlo", "Mùuyà", "Lumùngùlù", "Lufuimi", "Kabàlàshìpù", "Lùshìkà", "Lutongolo", "Lungùdi", "Kaswèkèsè", "Ciswà", "Nko", "Ndy", "Ndg", "Njw", "Ngv", "Lub", "Lumingu", "Nkodya", "Ndàayà", "Ndangù", "Njòwa", "Ngòvya", "Lubingu", "Dinda", "Dilolo", "kmp. Y.K.", "kny. Y. K.", "Kumpala kwa Yezu Kli", "Kunyima kwa Yezu Kli", "DAC", "DAR", "DAD", "DAN", "DAH", "DAU", "DAO", "DAB", "DOC", "DAP", "DGI", "DAG", "Dwe mar Achiel", "Dwe mar Ariyo", "Dwe mar Adek", "Dwe mar Ang’wen", "Dwe mar Abich", "Dwe mar Auchiel", "Dwe mar Abiriyo", "Dwe mar Aboro", "Dwe mar Ochiko", "Dwe mar Apar", "Dwe mar gi achiel", "Dwe mar Apar gi ariyo", "JMP", "WUT", "TAR", "TAD", "TAN", "TAB", "NGS", "Jumapil", "Wuok Tich", "Tich Ariyo", "Tich Adek", "Tich Ang’wen", "Tich Abich", "Ngeso", "OD", "OT", "Kapok Kristo obiro", "Ka Kristo osebiro", "J2", "J3", "J4", "J5", "Ij", "J1", "Jumapiri", "Murwa wa Kanne", "Murwa wa Katano", "Imberi ya Kuuza Kwa", "Muhiga Kuvita Kuuza", "{currency}{minusSign} {number}", "G y. 'g'.", "G y. 'g'. MMM", "G y. 'g'. d. MMM", "E, G y. 'g'. d. MMM", "y. 'g'.", "d.M.y.", "E, d.M.y.", "y. 'g'. MMM", "y. 'g'. d. MMM", "E, y. 'g'. d. MMM", "y. 'g'. MMMM", "y. 'g'. QQQ", "y. 'g'. QQQQ", "EEEE, y. 'gada' d. MMMM", "y. 'gada' d. MMMM", "y. 'gada' d. MMM", "maijs", "jūn.", "jūl.", "janvāris", "februāris", "aprīlis", "jūnijs", "jūlijs", "augusts", "septembris", "oktobris", "novembris", "decembris", "Sv", "Pr", "Ot", "Tr", "Ce", "Pk", "svētdiena", "pirmdiena", "otrdiena", "trešdiena", "ceturtdiena", "piektdiena", "sestdiena", "priekšpusdienā", "pēcpusdienā", "p.m.ē.", "m.ē.", "pirms mūsu ēras", "mūsu ērā", "tišri", "hešvans", "kisļevs", "tevets", "ševats", "1. adars", "adars", "nisans", "ijars", "sivans", "tamuzs", "avs", "eluls", "2. adars", "muharams", "safars", "1. rabī", "2. rabī", "1. džumādā", "2. džumādā", "radžabs", "šabans", "ramadāns", "šauvals", "du al-kidā", "du al-hidžā", "nav skaitlis", "Ls", "Dal", "Ará", "Ɔɛn", "Doy", "Lép", "Rok", "Sás", "Bɔ́r", "Kús", "Gís", "Shʉ́", "Ntʉ́", "Oladalʉ́", "Arát", "Ɔɛnɨ́ɔɨŋɔk", "Olodoyíóríê inkókúâ", "Oloilépūnyīē inkókúâ", "Kújúɔrɔk", "Mórusásin", "Ɔlɔ́ɨ́bɔ́rárɛ", "Kúshîn", "Olgísan", "Pʉshʉ́ka", "Ntʉ́ŋʉ́s", "Jumapílí", "Jumane", "Jumatánɔ", "Alaámisi", "Jumáa", "Jumamósi", "Ɛnkakɛnyá", "Ɛndámâ", "EY", "Meínō Yɛ́sʉ", "Eínō Yɛ́sʉ", "JAN", "FEB", "MAC", "ĨPU", "MĨĨ", "NJU", "NJR", "AGA", "SPT", "NOV", "DEC", "Januarĩ", "Feburuarĩ", "Ĩpurũ", "Mĩĩ", "Njuni", "Njuraĩ", "Agasti", "Oktũba", "Dicemba", "KIU", "MRA", "WAI", "WET", "WEN", "JUM", "Muramuko", "Wairi", "Wethatu", "Wena", "Wetano", "RŨ", "ŨG", "NK", "Mbere ya Kristũ", "Nyuma ya Kristũ", "avr", "zin", "zil", "zanvie", "fevriye", "zilye", "septam", "oktob", "novam", "desam", "dim", "lin", "ze", "van", "dimans", "lindi", "merkredi", "zedi", "vandredi", "samdi", "av. Z-K", "ap. Z-K", "avan Zezi-Krist", "apre Zezi-Krist", "Mey", "Jon", "Jol", "Aog", "Janoary", "Febroary", "Martsa", "Aprily", "Jona", "Jolay", "Aogositra", "Septambra", "Oktobra", "Novambra", "Desambra", "Alah", "Alats", "Alar", "Alak", "Zom", "Asab", "Alahady", "Alatsinainy", "Alarobia", "Alakamisy", "Zoma", "Asabotsy", "Alohan’i JK", "Aorian’i JK", "Kwa", "Una", "Rar", "Che", "Moc", "Moj", "Yel", "Mweri wo kwanza", "Mweri wo unayeli", "Mweri wo uneraru", "Mweri wo unecheshe", "Mweri wo unethanu", "Mweri wo thanu na mocha", "Mweri wo saba", "Mweri wo nane", "Mweri wo tisa", "Mweri wo kumi", "Mweri wo kumi na moja", "Mweri wo kumi na yel’li", "Sabato", "Arahamisi", "wichishu", "mchochil’l", "HY", "YY", "Hinapiya yesu", "Yopia yesu", "MTn", "M1", "A2", "M3", "N4", "F5", "I6", "A7", "I8", "K9", "mbegtug", "imeg àbùbì", "imeg mbəŋchubi", "iməg ngwə̀t", "iməg fog", "iməg ichiibɔd", "iməg àdùmbə̀ŋ", "iməg ichika", "iməg kud", "iməg tèsiʼe", "iməg zò", "iməg krizmed", "iməg mbegtug", "A1", "A3", "A4", "A5", "A6", "Aneg 1", "Aneg 2", "Aneg 3", "Aneg 4", "Aneg 5", "Aneg 6", "Aneg 7", "dd.M", "MMM y 'г'.", "d MMM y 'г'.", "E, d MMM y 'г'.", "dd.M.y", "dd.M.yy", "јан.", "јун.", "јул.", "септ.", "ноем.", "јануари", "нед.", "пон.", "вт.", "сре.", "чет.", "пет.", "саб.", "недела", "среда", "четврток", "петок", "сабота", "претпладне", "попладне", "пр. н.е.", "пред нашата ера", "од нашата ера", "ден", "MMMM d, E", "d-M-y, E", "y, MMMM d, EEEE", "y, MMMM d", "y, MMM d", "ജ", "ഫ", "മാ", "ഏ", "മെ", "ജൂ", "ഓ", "സ", "ഒ", "ന", "ഡി", "ജനു", "ഫെബ്രു", "മാർ", "ഏപ്രി", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗ", "സെപ്റ്റം", "ഒക്ടോ", "നവം", "ഡിസം", "ജനുവരി", "ഫെബ്രുവരി", "മാർച്ച്", "ഏപ്രിൽ", "ഓഗസ്റ്റ്", "സെപ്റ്റംബർ", "ഒക്‌ടോബർ", "നവംബർ", "ഡിസംബർ", "ഞ", "തി", "ചൊ", "ബു", "വ്യാ", "വെ", "ശ", "ഞായർ", "തിങ്കൾ", "ചൊവ്വ", "ബുധൻ", "വ്യാഴം", "വെള്ളി", "ശനി", "ഞായറാഴ്‌ച", "തിങ്കളാഴ്‌ച", "ചൊവ്വാഴ്ച", "ബുധനാഴ്‌ച", "വ്യാഴാഴ്‌ച", "വെള്ളിയാഴ്‌ച", "ശനിയാഴ്‌ച", "ക്രി.മു.", "എഡി", "ബിസിഇ", "സിഇ", "ക്രിസ്‌തുവിന് മുമ്പ്", "ആന്നോ ഡൊമിനി", "ബി.സി.ഇ.", "സി.ഇ.", "ചൈ", "വൈ", "ജ്യേ", "ആ", "ശ്രാ", "ഭാ", "കാ", "പൗ", "ചൈത്രം", "വൈശാഖം", "ജ്യേഷ്ഠം", "ആഷാഢം", "ശ്രാവണം", "ഭാദ്രപാദം", "ആശ്വിനം", "കാർത്തികം", "മാർഗശീർഷം", "പൗഷം", "മാഘം", "ഫൽഗുനം", "ശക", "മു", "റ", "ദു", "മുഹറം", "സഫർ", "റബീഹുൽ അവ്വൽ", "റബീഹുൽ ആഖിർ", "ജമാദുൽ അവ്വൽ", "ജമാദുൽ ആഖിർ", "റജബ്", "ശഹബാൻ", "റമളാൻ", "ശവ്വാൽ", "ദുൽ ഖഹദ്", "ദുൽ ഹിജ്ജ", "ഹിജറ", "സംഖ്യയല്ല", "dd E", "E, G y MMM d", "E MMM d", "E, y MMM d", "y 'оны' QQQQ", "EEEE, y 'оны' MM 'сарын' d", "y 'оны' MM 'сарын' d", "1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар", "Нэгдүгээр сар", "Хоёрдугаар сар", "Гуравдугаар сар", "Дөрөвдүгээр сар", "Тавдугаар сар", "Зургадугаар сар", "Долдугаар сар", "Наймдугаар сар", "Есдүгээр сар", "Аравдугаар сар", "Арван нэгдүгээр сар", "Арван хоёрдугаар сар", "Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя", "ням", "даваа", "мягмар", "лхагва", "пүрэв", "баасан", "бямба", "ҮӨ", "ҮХ", "МЭӨ", "МЭ", "НТӨ", "НТ", "м.э.ө", "м.э.", "манай эриний өмнөх", "манай эриний", "₮", "{1} रोजी {0}", "E, d, MMM y", "जा", "ऑ", "नो", "डि", "जाने", "फेब्रु", "एप्रि", "ऑग", "सप्टें", "ऑक्टो", "नोव्हें", "डिसें", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "मंगळवार", "म.उ.", "इ. स. पू.", "इ. स.", "ईसापूर्व युग", "ख्रि. यु.", "ईसवीसनपूर्व", "ईसवीसन", "ख्रिस्तयुग", "deva", "Ogo", "Ogos", "Disember", "Ahd", "Isn", "Kha", "Ahad", "Isnin", "Khamis", "Jumaat", "PG", "PTG", "Jn", "Fb", "Ap", "Jl", "Og", "Sp", "Nv", "Ds", "S.M.", "TM", "EEEE, d 'ta'’ MMMM y", "d 'ta'’ MMMM y", "Ġ", "Fra", "Mej", "Ġun", "Lul", "Aww", "Ott", "Diċ", "Jannar", "Frar", "Marzu", "Mejju", "Ġunju", "Lulju", "Awwissu", "Settembru", "Ottubru", "Novembru", "Diċembru", "Ħ", "Ħad", "Tne", "Tli", "Erb", "Ħam", "Ġim", "Il-Ħadd", "It-Tnejn", "It-Tlieta", "L-Erbgħa", "Il-Ħamis", "Il-Ġimgħa", "Is-Sibt", "QK", "WK", "QEK", "Qabel Kristu", "Wara Kristu", "FLO", "CLA", "CKI", "FMF", "MAD", "MBI", "MLI", "MAM", "FDE", "FMU", "FGW", "FYU", "Fĩi Loo", "Cokcwaklaŋne", "Cokcwaklii", "Fĩi Marfoo", "Madǝǝuutǝbijaŋ", "Mamǝŋgwãafahbii", "Mamǝŋgwãalii", "Madǝmbii", "Fĩi Dǝɓlii", "Fĩi Mundaŋ", "Fĩi Gwahlle", "Fĩi Yuru", "Cya", "Cla", "Czi", "Cko", "Cka", "Cga", "Cze", "Com’yakke", "Comlaaɗii", "Comzyiiɗii", "Comkolle", "Comkaldǝɓlii", "Comgaisuu", "Comzyeɓsuu", "comme", "lilli", "PK", "KǝPel Kristu", "Pel Kristu", "{1}မှာ {0}", "E၊ d", "E၊ G d MMM y", "E၊ d/M", "E၊ d MMM", "E၊ d MMMM", "E၊ d-M-y", "E၊ d MMM y", "EEEE၊ dd MMMM y", "ဇ", "ဖ", "မ", "ဧ", "ဩ", "စ", "အ", "န", "ဒ", "ဇန်", "ဖေ", "မတ်", "ဧပြီ", "မေ", "ဇွန်", "ဇူ", "စက်", "အောက်", "နို", "ဒီ", "ဇန်နဝါရီ", "ဖေဖော်ဝါရီ", "ဇူလိုင်", "ဩဂုတ်", "စက်တင်ဘာ", "အောက်တိုဘာ", "နိုဝင်ဘာ", "ဒီဇင်ဘာ", "တ", "ဗ", "က", "သ", "တနင်္ဂနွေ", "တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓဟူး", "ကြာသပတေး", "သောကြာ", "စနေ", "နံနက်", "ညနေ", "ဘီစီ", "အေဒီ", "ဘီစီအီး", "စီအီး", "ခရစ်တော် မပေါ်မီကာလ", "ခရစ်တော် ပေါ်ထွန်းပြီးကာလ", "mymr", "ဂဏန်းမဟုတ်သော", "စီအာစီ", "ژانویه", "فوریه", "مه", "ژوئیه", "پ.م", "پ.م.", "قبل میلاد", "بعد میلاد", "قبل میلادی تقویم", "ǃKhanni", "ǃKhanǀgôab", "ǀKhuuǁkhâb", "ǃHôaǂkhaib", "ǃKhaitsâb", "Gamaǀaeb", "ǂKhoesaob", "Aoǁkhuumûǁkhâb", "Taraǀkhuumûǁkhâb", "ǂNûǁnâiseb", "ǀHooǂgaeb", "Hôasoreǁkhâb", "Son", "Wu", "Do", "Fr", "Sontaxtsees", "Mantaxtsees", "Denstaxtsees", "Wunstaxtsees", "Dondertaxtsees", "Fraitaxtsees", "Satertaxtsees", "ǁgoagas", "ǃuias", "Xristub aiǃâ", "Xristub khaoǃgâ", "E d.M", "E d.MM.y", "tout", "baba", "hator", "kiahk", "toba", "amshir", "baramhat", "baramouda", "bashans", "paona", "epep", "mesra", "nasie", "TA0", "TA1", "0. t.a.", "1. t.a.", "0. tidsalder", "1. tidsalder", "meskerem", "tekemt", "hedar", "tahsas", "yekatit", "megabit", "miazia", "genbot", "sene", "hamle", "nehasse", "pagumen", "fvt.", "vt.", "evt.", "før Kristus", "etter Kristus", "før vår tidsregning", "etter vår tidsregning", "tishri", "heshvan", "kislev", "tevet", "shevat", "adar I", "adar", "nisan", "iyar", "sivan", "tamuz", "av", "elul", "adar II", "chaitra", "vaisakha", "jyaistha", "asadha", "sravana", "bhadra", "asvina", "kartika", "agrahayana", "pausa", "magha", "phalguna", "saka", "muh.", "rab. I", "rab. II", "jum. I", "jum. II", "sha.", "shaw.", "dhuʻl-q.", "dhuʻl-h.", "rabiʻ I", "rabiʻ II", "jumada I", "jumada II", "shaʻban", "shawwal", "dhuʻl-qiʻdah", "dhuʻl-hijjah", "farvardin", "ordibehesht", "khordad", "tir", "mordad", "shahrivar", "mehr", "aban", "azar", "dey", "bahman", "esfand", "Zib", "Nhlo", "Mbi", "Mab", "Nkw", "Nhla", "Ntu", "Ncw", "Mpan", "Lwe", "Mpal", "Zibandlela", "Nhlolanja", "Mbimbitho", "Mabasa", "Nkwenkwezi", "Nhlangula", "Ntulikazi", "Ncwabakazi", "Mpandula", "Mfumfu", "Lwezi", "Mpalakazi", "Mvu", "Sin", "Sih", "Mgq", "Sonto", "Mvulo", "Sibili", "Sithathu", "Sine", "Sihlanu", "Mgqibelo", "UKristo angakabuyi", "Ukristo ebuyile", "१", "२", "३", "४", "५", "६", "७", "८", "९", "१०", "११", "१२", "फेब्रुअरी", "अप्रिल", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर", "आइत", "मङ्गल", "बिही", "आइतबार", "सोमबार", "मङ्गलबार", "बुधबार", "बिहिबार", "शुक्रबार", "शनिबार", "ईसा पूर्व", "सन्", "इस्वीपूर्व", "सिइ", "जेठ", "असार", "साउन", "भदौ", "असोज", "कात्तिक", "मङसिर", "पुस", "चैत", "नेरू", "mei", "zo", "do", "vr", "za", "zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "mnd 1", "mnd 2", "mnd 3", "mnd 4", "mnd 5", "mnd 6", "mnd 7", "mnd 8", "mnd 9", "mnd 10", "mnd 11", "mnd 12", "maand 1", "maand 2", "maand 3", "maand 4", "maand 5", "maand 6", "maand 7", "maand 8", "maand 9", "maand 10", "maand 11", "maand 12", "vgj", "v.Chr.", "n.Chr.", "vóór gewone jaartelling", "gewone jaartelling", "voor R.O.C.", "ng1", "ng2", "ng3", "ng4", "ng5", "ng6", "ng7", "ng8", "ng9", "ng10", "ng11", "kris", "ngwɛn matáhra", "ngwɛn ńmba", "ngwɛn ńlal", "ngwɛn ńna", "ngwɛn ńtan", "ngwɛn ńtuó", "ngwɛn hɛmbuɛrí", "ngwɛn lɔmbi", "ngwɛn rɛbvuâ", "ngwɛn wum", "ngwɛn wum navǔr", "krísimin", "mbs", "sas", "mɔ́ndɔ", "sɔ́ndɔ mafú mába", "sɔ́ndɔ mafú málal", "sɔ́ndɔ mafú mána", "mabágá má sukul", "sásadi", "maná", "kugú", "BL", "PB", "Bó Lahlɛ̄", "Pfiɛ Burī", "M y", "'kl'. HH:mm:ss zzzz", "sø.", "må.", "ty.", "on.", "to.", "fr.", "la.", "måndag", "tysdag", "laurdag", "formiddag", "ettermiddag", "{1},{0}", "E , 'lyɛ'̌ʼ d 'na' M, y", "'lyɛ'̌ʼ d 'na' MMMM, y", "E , 'lyɛ'̌ʼ d 'na' MMM, y", "EEEE , 'lyɛ'̌ʼ d 'na' MMMM, y", "saŋ tsetsɛ̀ɛ lùm", "saŋ kàg ngwóŋ", "saŋ lepyè shúm", "saŋ cÿó", "saŋ tsɛ̀ɛ cÿó", "saŋ njÿoláʼ", "saŋ tyɛ̀b tyɛ̀b mbʉ̀ŋ", "saŋ mbʉ̀ŋ", "saŋ ngwɔ̀ʼ mbÿɛ", "saŋ tàŋa tsetsáʼ", "saŋ mejwoŋó", "saŋ lùm", "lyɛʼɛ́ sẅíŋtè", "mvfò lyɛ̌ʼ", "mbɔ́ɔntè mvfò lyɛ̌ʼ", "tsètsɛ̀ɛ lyɛ̌ʼ", "mbɔ́ɔntè tsetsɛ̀ɛ lyɛ̌ʼ", "mvfò màga lyɛ̌ʼ", "màga lyɛ̌ʼ", "mbaʼámbaʼ", "ncwònzém", "m.z.Y.", "m.g.n.Y.", "mé zyé Yěsô", "mé gÿo ńzyé Yěsô", "E، d-M", "E، d/M/y", "E، d MMM y", "zzzz h:mm:ss a", "z h:mm:ss a", "Tiop", "Pɛt", "Duɔ̱ɔ̱", "Guak", "Duä", "Kor", "Pay", "Thoo", "Tɛɛ", "Laa", "Kur", "Tid", "Tiop thar pɛt", "Duɔ̱ɔ̱ŋ", "Duät", "Kornyoot", "Pay yie̱tni", "Tho̱o̱r", "Tɛɛr", "Laath", "Tio̱p in di̱i̱t", "Ŋ", "Cäŋ", "Jiec", "Rɛw", "Diɔ̱k", "Ŋuaan", "Dhieec", "Bäkɛl", "Cäŋ kuɔth", "Jiec la̱t", "Rɛw lätni", "Diɔ̱k lätni", "Ŋuaan lätni", "Dhieec lätni", "Bäkɛl lätni", "RW", "TŊ", "ƐY", "A ka̱n Yecu ni dap", "Ɛ ca Yecu dap", "dd MMMM", "Ama", "Gur", "Bit", "Elb", "Cam", "Wax", "Ado", "Hag", "Ful", "Onk", "Mud", "Amajjii", "Guraandhala", "Bitooteessa", "Elba", "Caamsa", "Waxabajjii", "Adooleessa", "Hagayya", "Fuulbana", "Onkololeessa", "Sadaasa", "Muddee", "Dil", "Wix", "Qib", "Rob", "Dilbata", "Wiixata", "Qibxata", "Roobii", "Kamiisa", "Jimaata", "Sanbata", "WD", "WB", "KD", "KB", "Br", "d-M-yy", "ଜା", "ଫେ", "ମା", "ଅ", "ମଇ", "ଜୁ", "ସେ", "ନ", "ଡି", "ଜାନୁଆରୀ", "ଫେବୃଆରୀ", "ମାର୍ଚ୍ଚ", "ଅପ୍ରେଲ", "ଜୁନ", "ଜୁଲାଇ", "ଅଗଷ୍ଟ", "ସେପ୍ଟେମ୍ବର", "ଅକ୍ଟୋବର", "ନଭେମ୍ବର", "ଡିସେମ୍ବର", "ର", "ସୋ", "ମ", "ବୁ", "ଗୁ", "ଶୁ", "ଶ", "ରବି", "ସୋମ", "ମଙ୍ଗଳ", "ବୁଧ", "ଗୁରୁ", "ଶୁକ୍ର", "ଶନି", "ରବିବାର", "ସୋମବାର", "ମଙ୍ଗଳବାର", "ବୁଧବାର", "ଗୁରୁବାର", "ଶୁକ୍ରବାର", "ଶନିବାର", "ccc, d MMM", "y-'ӕм' 'азы' QQQ", "y-'ӕм' 'азы' QQQQ", "EEEE, d MMMM, y 'аз'", "d MMMM, y 'аз'", "dd MMM y 'аз'", "майы", "июны", "июлы", "январы", "февралы", "мартъийы", "апрелы", "августы", "сентябры", "октябры", "ноябры", "декабры", "Х", "К", "Ӕ", "Ц", "хцб", "крс", "дцг", "ӕрт", "цпр", "мрб", "сбт", "хуыцаубон", "къуырисӕр", "дыццӕг", "ӕртыццӕг", "цыппӕрӕм", "майрӕмбон", "сабат", "ӕмбисбоны размӕ", "ӕмбисбоны фӕстӕ", "н.д.а.", "н.д.", "НН", "E d MMM, G y", "E, dd-MM.", "ਜ", "ਫ਼", "ਮਾ", "ਅ", "ਮ", "ਜੂ", "ਜੁ", "ਸ", "ਨ", "ਦ", "ਜਨ", "ਫ਼ਰ", "ਮਾਰਚ", "ਅਪ੍ਰੈ", "ਮਈ", "ਜੂਨ", "ਜੁਲਾ", "ਅਗ", "ਸਤੰ", "ਅਕਤੂ", "ਨਵੰ", "ਦਸੰ", "ਜਨਵਰੀ", "ਫ਼ਰਵਰੀ", "ਅਪ੍ਰੈਲ", "ਜੁਲਾਈ", "ਅਗਸਤ", "ਸਤੰਬਰ", "ਅਕਤੂਬਰ", "ਨਵੰਬਰ", "ਦਸੰਬਰ", "ਐ", "ਸੋ", "ਮੰ", "ਬੁੱ", "ਵੀ", "ਸ਼ੁੱ", "ਸ਼", "ਐਤ", "ਸੋਮ", "ਮੰਗਲ", "ਬੁੱਧ", "ਵੀਰ", "ਸ਼ੁੱਕਰ", "ਸ਼ਨਿੱਚਰ", "ਐਤਵਾਰ", "ਸੋਮਵਾਰ", "ਮੰਗਲਵਾਰ", "ਬੁੱਧਵਾਰ", "ਵੀਰਵਾਰ", "ਸ਼ੁੱਕਰਵਾਰ", "ਸ਼ਨਿੱਚਰਵਾਰ", "ਪੂ.ਦੁ.", "ਬਾ.ਦੁ.", "ਈ. ਪੂ.", "ਸੰਨ", "ਈ. ਪੂ. ਸੰ.", "ਈ. ਸੰ.", "ਈਸਵੀ ਪੂਰਵ", "ਈਸਵੀ ਸੰਨ", "ਈਸਵੀ ਪੂਰਵ ਯੁੱਗ", "ਈਸਵੀ ਯੁੱਗ", "੧", "੨", "੩", "੪", "੫", "੬", "੭", "੮", "੯", "੧੦", "੧੧", "੧੨", "ਚੇਤ", "ਵੈਸਾਖ", "ਜੇਠ", "ਹਾੜ", "ਸਾਉਣ", "ਭਾਦੋਂ", "ਅੱਸੂ", "ਕੱਤਕ", "ਮੱਘਰ", "ਪੋਹ", "ਮਾਘ", "ਫੱਗਣ", "ਸਾਕਾ", "فروری", "مئ", "جولائی", "اتوار", "پیر", "منگل", "بُدھ", "جمعرات", "جمعہ", "ہفتہ", "ايساپورو", "سں", "d.MM.y G", "d MMMM y G", "E, d MMMM y G", "d.MM.y", "E, d.MM.y", "E, d MMMM y", "sty", "lut", "kwi", "cze", "sie", "wrz", "paź", "gru", "stycznia", "lutego", "marca", "kwietnia", "czerwca", "lipca", "sierpnia", "września", "października", "grudnia", "Ś", "niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob.", "niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "p.n.e.", "Tiszri", "Cheszwan", "Kislew", "Tewet", "Szwat", "Siwan", "Aw", "Dżu. I", "Dżu. II", "Ra.", "Sza.", "Szaw.", "Zu al-k.", "Zu al-h.", "Dżumada I", "Dżumada II", "Radżab", "Szaban", "Szawwal", "Zu al-kada", "Zu al-hidżdża", "Farwardin", "Ordibeheszt", "Chordād", "Mordād", "Szahriwar", "Ābān", "Āsar", "Déi", "Przed ROC", "ROC", "EEEE د y د MMMM d", "د y د MMMM d", "جنوري", "فبروري", "اګست", "غ.م.", "غ.و.", "وری", "غویی", "غبرگولی", "چنگاښ", "زمری", "وږی", "تله", "لړم", "لیندۍ", "مرغومی", "سلواغه", "کب", "E, d 'de' MMMM 'de' y", "dez", "janeiro", "fevereiro", "março", "junho", "julho", "dezembro", "seg", "qua", "qui", "sex", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "Mês 1", "Mês 2", "Mês 3", "Mês 4", "Mês 5", "Mês 6", "Mês 7", "Mês 8", "Mês 9", "Mês 10", "Mês 11", "Mês 12", "depois de Cristo", "antes da Era Comum", "Era Comum", "Antes de R.O.C.", "Esc.", "{1} 'às' {0}", "E, d/MM", "ccc, d 'de' MMMM", "E, d/MM/y", "EEEE, d/MM/y", "ccc, d 'de' MMMM 'de' y", "segunda", "terça", "quarta", "quinta", "sexta", "da manhã", "da tarde", "M2", "M4", "M5", "M6", "M7", "M8", "M9", "a.E.C.", "E.C.", "​PTE", "Db", "Qul", "Hat", "Pau", "Ayr", "Aym", "Int", "Ant", "Qha", "Uma", "Aya", "Kap", "Qulla puquy", "Hatun puquy", "Pauqar waray", "Ayriwa", "Aymuray", "Inti raymi", "Anta Sitwa", "Qhapaq Sitwa", "Uma raymi", "Kantaray", "Ayamarqʼa", "Kapaq Raymi", "Dom", "Mié", "Jue", "Vie", "Domingo", "Miércoles", "Jueves", "Viernes", "Sábado", "EEEE, 'ils' d 'da' MMMM y", "d 'da' MMMM y", "schan.", "favr.", "matg", "zercl.", "fan.", "avust", "sett.", "schaner", "favrer", "avrigl", "zercladur", "fanadur", "settember", "october", "du", "gli", "gie", "dumengia", "glindesdi", "mesemna", "gievgia", "venderdi", "sonda", "sm", "av. Cr.", "s. Cr.", "avant Cristus", "suenter Cristus", "Mut.", "Gas.", "Wer.", "Mat.", "Gic.", "Kam.", "Nya.", "Kan.", "Nze.", "Ukw.", "Ugu.", "Uku.", "Nzero", "Ruhuhuma", "Ntwarante", "Ndamukiza", "Rusama", "Ruheshi", "Mukakaro", "Nyandagaro", "Nyakanga", "Gitugutu", "Munyonyo", "Kigarama", "cu.", "mbe.", "kab.", "gtu.", "kan.", "gnu.", "gnd.", "Ku w’indwi", "Ku wa mbere", "Ku wa kabiri", "Ku wa gatatu", "Ku wa kane", "Ku wa gatanu", "Ku wa gatandatu", "Z.MU.", "Z.MW.", "Mb.Y.", "Ny.Y", "Mbere ya Yezu", "Nyuma ya Yezu", "ian.", "iun.", "iul.", "ianuarie", "februarie", "martie", "aprilie", "iunie", "iulie", "septembrie", "octombrie", "noiembrie", "decembrie", "dum.", "mie.", "vin.", "sâm.", "duminică", "luni", "marți", "miercuri", "vineri", "sâmbătă", "e.b.", "era budistă", "î.Hr.", "d.Hr.", "î.e.n", "e.n.", "înainte de Hristos", "după Hristos", "înaintea erei noastre", "era noastră", "Tișrei", "Heșvan", "Șevat", "Tammuz", "Mi", "Dum", "Mie", "Joi", "Vin", "Sâm", "î.e.n.", "Mweri wa kwanza", "Mweri wa kaili", "Mweri wa katatu", "Mweri wa kaana", "Mweri wa tanu", "Mweri wa sita", "Mweri wa saba", "Mweri wa nane", "Mweri wa tisa", "Mweri wa ikumi", "Mweri wa ikumi na moja", "Mweri wa ikumi na mbili", "Ijp", "Ijt", "Ijn", "Ijtn", "Ijumapili", "Ijumatatu", "Ijumanne", "Ijumatano", "Ijumamosi", "kang’ama", "kingoto", "Kabla ya Mayesu", "Baada ya Mayesu", "ccc, d", "d MMM y 'г'. G", "E, d MMM y 'г'. G", "ccc, d.MM.y 'г'.", "LLL y 'г'.", "LLLL y 'г'.", "февр.", "сент.", "нояб.", "января", "февраля", "марта", "апреля", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря", "вс", "воскресенье", "понедельник", "четверг", "пятница", "суббота", "ДП", "ПП", "Тот", "Бабэ", "Хатур", "Кихак", "Тубэ", "Бармуда", "Башнас", "Бауна", "Абиб", "Мисра", "Якатит", "Магабит", "Миазия", "Сэнэ", "Хамлэ", "Нахасэ", "Эпагомен", "до н.э.", "до н. э.", "н. э.", "до Рождества Христова", "от Рождества Христова", "до нашей эры", "нашей эры", "Тишрей", "Ияр", "Таммуз", "Элул", "Чайтра", "Ваисакха", "Джанштха", "Асадха", "Бхадра", "Азвина", "Аграхайана", "Магха", "Пхалгуна", "Мухаррам", "Раби-уль-авваль", "Раби-уль-ахир", "Джумад-уль-авваль", "Джумад-уль-ахир", "Раджаб", "Шаабан", "Шавваль", "Зуль-Каада", "Зуль-Хиджжа", "Эпоха Тайка (645–650)", "Эпоха Хакути (650–671)", "Эпоха Хакухо (672–686)", "Эпоха Сючё (686–701)", "Эпоха Тайхо (701–704)", "Эпоха Кёюн (704–708)", "Эпоха Вадо (708–715)", "Эпоха Рэйки (715–717)", "Эпоха Ёро (717–724)", "Эпоха Дзинки (724–729)", "Эпоха Темпьё (729–749)", "Эпоха Темпьё (749–749)", "Эпоха Темпьё-Сьохо (749-757)", "Эпоха Темпьё-Ходзи (757-765)", "Эпоха Темпьё-Ходзи (765-767)", "Эпоха Джинго-Кёюн (767-770)", "Эпоха Хоки (770–780)", "Эпоха Теньё (781–782)", "Эпоха Енряку (782–806)", "Эпоха Дайдо (806–810)", "Эпоха Конин (810–824)", "Эпоха Тентьо (824–834)", "Эпоха Шова (834–848)", "Эпоха Кайо (848–851)", "Эпоха Ниндзю (851–854)", "Эпоха Сайко (854–857)", "Эпоха Теннан (857–859)", "Эпоха Йоган (859–877)", "Эпоха Генкей (877–885)", "Эпоха Нинна (885–889)", "Эпоха Кампьё (889–898)", "Эпоха Сьотай (898–901)", "Эпоха Энги (901–923)", "Эпоха Ентьо (923–931)", "Эпоха Сьёхэй (931–938)", "Эпоха Тенгьо (938–947)", "Эпоха Тенрияку (947–957)", "Эпоха Тентоку (957–961)", "Эпоха Ова (961–964)", "Эпоха Кохо (964–968)", "Эпоха Анна (968–970)", "Эпоха Тенроку (970–973)", "Эпоха Теньен (973–976)", "Эпоха Дзьоген (976–978)", "Эпоха Тенген (978–983)", "Эпоха Ейкан (983–985)", "Эпоха Канна (985–987)", "Эпоха Ейен (987–989)", "Эпоха Ейсо (989–990)", "Эпоха Сёряку (990–995)", "Эпоха Тётоку (995–999)", "Эпоха Тёхо (999–1004)", "Эпоха Канко (1004–1012)", "Эпоха Тёва (1012–1017)", "Эпоха Каннин (1017–1021)", "Эпоха Дзиан (1021–1024)", "Эпоха Мандзю (1024–1028)", "Эпоха Тёгэн (1028–1037)", "Эпоха Тёряку (1037–1040)", "Эпоха Тёкю (1040–1044)", "Эпоха Катоку (1044–1046)", "Эпоха Эйсо (1046–1053)", "Эпоха Тэнги (1053–1058)", "Эпоха Кохэй (1058–1065)", "Эпоха Дзиряку (1065–1069)", "Эпоха Энкю (1069–1074)", "Эпоха Сёхо (1074–1077)", "Эпоха Сёряку (1077–1081)", "Эпоха Эйхо (1081–1084)", "Эпоха Отоку (1084–1087)", "Эпоха Кандзи (1087–1094)", "Эпоха Кахо (1094–1096)", "Эпоха Эйтё (1096–1097)", "Эпоха Сётоку (1097–1099)", "Эпоха Кова (1099–1104)", "Эпоха Тёдзи (1104–1106)", "Эпоха Касё (1106–1108)", "Эпоха Тэннин (1108–1110)", "Эпоха Тэнъэй (1110–1113)", "Эпоха Эйкю (1113–1118)", "Эпоха Гэнъэй (1118–1120)", "Эпоха Хоан (1120–1124)", "Эпоха Тэндзи (1124–1126)", "Эпоха Дайдзи (1126–1131)", "Эпоха Тэнсё (1131–1132)", "Эпоха Тёсё (1132–1135)", "Эпоха Хоэн (1135–1141)", "Эпоха Эйдзи (1141–1142)", "Эпоха Кодзи (1142–1144)", "Эпоха Тэнё (1144–1145)", "Эпоха Кюан (1145–1151)", "Эпоха Нимпэй (1151–1154)", "Эпоха Кюдзю (1154–1156)", "Эпоха Хогэн (1156–1159)", "Эпоха Хэйдзи (1159–1160)", "Эпоха Эйряку (1160–1161)", "Эпоха Охо (1161–1163)", "Эпоха Тёкан (1163–1165)", "Эпоха Эйман (1165–1166)", "Эпоха Нинъан (1166–1169)", "Эпоха Као (1169–1171)", "Эпоха Сёан (1171–1175)", "Эпоха Ангэн (1175–1177)", "Эпоха Дзисё (1177–1181)", "Эпоха Ёва (1181–1182)", "Эпоха Дзюэй (1182–1184)", "Эпоха Гэнрюку (1184–1185)", "Эпоха Бундзи (1185–1190)", "Эпоха Кэнкю (1190–1199)", "Эпоха Сёдзи (1199–1201)", "Эпоха Кэннин (1201–1204)", "Эпоха Гэнкю (1204–1206)", "Эпоха Кэнъэй (1206–1207)", "Эпоха Сёгэн (1207–1211)", "Эпоха Кэнряку (1211–1213)", "Эпоха Кэмпо (1213–1219)", "Эпоха Сёкю (1219–1222)", "Эпоха Дзёо (1222–1224)", "Эпоха Гэннин (1224–1225)", "Эпоха Кароку (1225–1227)", "Эпоха Антэй (1227–1229)", "Эпоха Канки (1229–1232)", "Эпоха Дзёэй (1232–1233)", "Эпоха Тэмпуку (1233–1234)", "Эпоха Бунряку (1234–1235)", "Эпоха Катэй (1235–1238)", "Эпоха Рякунин (1238–1239)", "Эпоха Энъо (1239–1240)", "Эпоха Ниндзи (1240–1243)", "Эпоха Кангэн (1243–1247)", "Эпоха Ходзи (1247–1249)", "Эпоха Кэнтё (1249–1256)", "Эпоха Когэн (1256–1257)", "Эпоха Сёка (1257–1259)", "Эпоха Сёгэн (1259–1260)", "Эпоха Бунъо (1260–1261)", "Эпоха Котё (1261–1264)", "Эпоха Бунъэй (1264–1275)", "Эпоха Кэндзи (1275–1278)", "Эпоха Коан (1278–1288)", "Эпоха Сёо (1288–1293)", "Эпоха Эйнин (1293–1299)", "Эпоха Сёан (1299–1302)", "Эпоха Кэнгэн (1302–1303)", "Эпоха Кагэн (1303–1306)", "Эпоха Токудзи (1306–1308)", "Эпоха Энкэй (1308–1311)", "Эпоха Отё (1311–1312)", "Эпоха Сёва (1312–1317)", "Эпоха Бумпо (1317–1319)", "Эпоха Гэно (1319–1321)", "Эпоха Гэнкё (1321–1324)", "Эпоха Сётю (1324–1326)", "Эпоха Карэки (1326–1329)", "Эпоха Гэнтоку (1329–1331)", "Эпоха Гэнко (1331–1334)", "Эпоха Кэмму (1334–1336)", "Эпоха Энгэн (1336–1340)", "Эпоха Кококу (1340–1346)", "Эпоха Сёхэй (1346–1370)", "Эпоха Кэнтоку (1370–1372)", "Эпоха Бунтю (1372–1375)", "Эпоха Иэндзю (1375–1379)", "Эпоха Коряку (1379–1381)", "Эпоха Кова (1381–1384)", "Эпоха Гэнтю (1384–1392)", "Эпоха Мэйтоку (1384–1387)", "Эпоха Какэй (1387–1389)", "Эпоха Коо (1389–1390)", "Эпоха Мэйтоку (1390–1394)", "Эпоха Оэй (1394–1428)", "Эпоха Сётё (1428–1429)", "Эпоха Эйкё (1429–1441)", "Эпоха Какицу (1441–1444)", "Эпоха Банъан (1444–1449)", "Эпоха Хотоку (1449–1452)", "Эпоха Кётоку (1452–1455)", "Эпоха Косё (1455–1457)", "Эпоха Тёроку (1457–1460)", "Эпоха Кансё (1460–1466)", "Эпоха Бунсё (1466–1467)", "Эпоха Онин (1467–1469)", "Эпоха Буммэй (1469–1487)", "Эпоха Тёкё (1487–1489)", "Эпоха Энтоку (1489–1492)", "Эпоха Мэйо (1492–1501)", "Эпоха Бунки (1501–1504)", "Эпоха Эйсё (1504–1521)", "Эпоха Тайэй (1521–1528)", "Эпоха Кёроку (1528–1532)", "Эпоха Тэммон (1532–1555)", "Эпоха Кодзи (1555–1558)", "Эпоха Эйроку (1558–1570)", "Эпоха Гэнки (1570–1573)", "Эпоха Тэнсё (1573–1592)", "Эпоха Бунроку (1592–1596)", "Эпоха Кэйтё (1596–1615)", "Эпоха Гэнва (1615–1624)", "Эпоха Канъэй (1624–1644)", "Эпоха Сёхо (1644–1648)", "Эпоха Кэйан (1648–1652)", "Эпоха Сё (1652–1655)", "Эпоха Мэйряку (1655–1658)", "Эпоха Мандзи (1658–1661)", "Эпоха Камбун (1661–1673)", "Эпоха Эмпо (1673–1681)", "Эпоха Тэнва (1681–1684)", "Эпоха Дзёкё (1684–1688)", "Эпоха Гэнроку (1688–1704)", "Эпоха Хоэй (1704–1711)", "Эпоха Сётоку (1711–1716)", "Эпоха Кёхо (1716–1736)", "Эпоха Гэмбун (1736–1741)", "Эпоха Кампо (1741–1744)", "Эпоха Энкё (1744–1748)", "Эпоха Канъэн (1748–1751)", "Эпоха Хоряку (1751–1764)", "Эпоха Мэйва (1764–1772)", "Эпоха Анъэй (1772–1781)", "Эпоха Тэммэй (1781–1789)", "Эпоха Кансэй (1789–1801)", "Эпоха Кёва (1801–1804)", "Эпоха Бунка (1804–1818)", "Эпоха Бунсэй (1818–1830)", "Эпоха Тэмпо (1830–1844)", "Эпоха Кока (1844–1848)", "Эпоха Каэй (1848–1854)", "Эпоха Ансэй (1854–1860)", "Эпоха Манъэн (1860–1861)", "Эпоха Бункю (1861–1864)", "Эпоха Гендзи (1864–1865)", "Эпоха Кейо (1865–1868)", "Эпоха Мэйдзи", "Эпоха Тайсьо", "Сьова", "Эпоха Хэйсэй", "Фарвардин", "Хордад", "Шахривер", "Азер", "Дей", "Эсфанд", "не число", "ТМТ", "₴", "XXXX", "mut.", "gas.", "wer.", "mat.", "gic.", "kam.", "nya.", "nze.", "ukw.", "ugu.", "uku.", "Mutarama", "Gashyantare", "Werurwe", "Mata", "Gicuransi", "Kamena", "Kanama", "Nzeli", "Ukwakira", "Ugushyingo", "Ukuboza", "cyu.", "Ku cyumweru", "Kuwa mbere", "Kuwa kabiri", "Kuwa gatatu", "Kuwa kane", "Kuwa gatanu", "Kuwa gatandatu", "y 'сыл' MMMM d 'күнэ', EEEE", "yy/M/d", "Ы", "Тохс", "Олун", "Клн_ттр", "Мус_уст", "Ыам_йн", "Бэс_йн", "От_йн", "Атрдь_йн", "Блҕн_йн", "Алт", "Сэт", "Ахс", "Тохсунньу", "Олунньу", "Кулун тутар", "Муус устар", "Ыам ыйын", "Бэс ыйын", "От ыйын", "Атырдьых ыйын", "Балаҕан ыйын", "Алтынньы", "Сэтинньи", "Ахсынньы", "Ч", "Бн", "Оп", "Сэ", "Чп", "Бэ", "Баскыһыанньа", "Бэнидиэлинньик", "Оптуорунньук", "Сэрэдэ", "Чэппиэр", "Бээтиҥсэ", "Субуота", "ЭИ", "ЭК", "б. э. и.", "б. э", "Obo", "Waa", "Oku", "Ong", "Ime", "Ile", "Sap", "Isi", "Saa", "Tom", "Tob", "Tow", "Lapa le obo", "Lapa le waare", "Lapa le okuni", "Lapa le ong’wan", "Lapa le imet", "Lapa le ile", "Lapa le sapa", "Lapa le isiet", "Lapa le saal", "Lapa le tomon", "Lapa le tomon obo", "Lapa le tomon waare", "Are", "Kun", "Mderot ee are", "Mderot ee kuni", "Mderot ee ong’wan", "Mderot ee inet", "Mderot ee ile", "Mderot ee sapa", "Mderot ee kwe", "Tesiran", "Teipa", "Kabla ya Christo", "Baada ya Christo", "MMM d y", "Mup", "Mwi", "Msh", "Mun", "Mag", "Muj", "Msp", "Mpg", "Mye", "Mok", "Mus", "Muh", "Mupalangulwa", "Mwitope", "Mushende", "Munyi", "Mushende Magali", "Mujimbi", "Mushipepo", "Mupuguto", "Munyense", "Mokhu", "Musongandembwe", "Muhaano", "Mulungu", "Alahamisi", "Lwamilawu", "Pashamihe", "Ashanali uKilisito", "Pamwandi ya Kilisto", "ođđj", "guov", "njuk", "cuo", "mies", "geas", "suoi", "borg", "čakč", "golg", "skáb", "juov", "ođđajagemánnu", "guovvamánnu", "njukčamánnu", "cuoŋománnu", "miessemánnu", "geassemánnu", "suoidnemánnu", "borgemánnu", "čakčamánnu", "golggotmánnu", "skábmamánnu", "juovlamánnu", "sotn", "vuos", "maŋ", "gask", "duor", "bear", "láv", "sotnabeaivi", "vuossárga", "maŋŋebárga", "gaskavahkku", "duorasdat", "bearjadat", "lávvardat", "iđitbeaivet", "eahketbeaivet", "o.Kr.", "m.Kr.", "ovdal Kristtusa", "maŋŋel Kristtusa", "Dkr", "Skr", "Nkr", "Janeiro", "Fevreiro", "Marco", "Maio", "Junho", "Julho", "Augusto", "Setembro", "Otubro", "Novembro", "Decembro", "Pos", "Pir", "Nai", "Sha", "Dimingu", "Chiposi", "Chipiri", "Chitatu", "Chinai", "Chishanu", "Sabudu", "AC", "Antes de Cristo", "Nye", "Mbä", "Bêl", "Fön", "Len", "Kük", "Ngb", "Nab", "Kak", "Nyenye", "Fulundïgi", "Mbängü", "Ngubùe", "Bêläwü", "Föndo", "Lengua", "Kükürü", "Mvuka", "Ngberere", "Nabändüru", "Kakauka", "Bk1", "Bk2", "Bk3", "Bk4", "Bk5", "Lâp", "Lây", "Bikua-ôko", "Bïkua-ûse", "Bïkua-ptâ", "Bïkua-usïö", "Bïkua-okü", "Lâpôsö", "Lâyenga", "LK", "KnK", "NpK", "Kôzo na Krîstu", "Na pekô tî Krîstu", "ⵉ", "ⴱ", "ⵎ", "ⵢ", "ⵖ", "ⵛ", "ⴽ", "ⵏ", "ⴷ", "ⵉⵏⵏ", "ⴱⵕⴰ", "ⵎⴰⵕ", "ⵉⴱⵔ", "ⵎⴰⵢ", "ⵢⵓⵏ", "ⵢⵓⵍ", "ⵖⵓⵛ", "ⵛⵓⵜ", "ⴽⵜⵓ", "ⵏⵓⵡ", "ⴷⵓⵊ", "ⵉⵏⵏⴰⵢⵔ", "ⴱⵕⴰⵢⵕ", "ⵎⴰⵕⵚ", "ⵉⴱⵔⵉⵔ", "ⵎⴰⵢⵢⵓ", "ⵢⵓⵏⵢⵓ", "ⵢⵓⵍⵢⵓⵣ", "ⵖⵓⵛⵜ", "ⵛⵓⵜⴰⵏⴱⵉⵔ", "ⴽⵜⵓⴱⵔ", "ⵏⵓⵡⴰⵏⴱⵉⵔ", "ⴷⵓⵊⴰⵏⴱⵉⵔ", "ⴰⵙⴰ", "ⴰⵢⵏ", "ⴰⵙⵉ", "ⴰⴽⵕ", "ⴰⴽⵡ", "ⴰⵙⵉⵎ", "ⴰⵙⵉⴹ", "ⴰⵙⴰⵎⴰⵙ", "ⴰⵢⵏⴰⵙ", "ⴰⵙⵉⵏⴰⵙ", "ⴰⴽⵕⴰⵙ", "ⴰⴽⵡⴰⵙ", "ⵙⵉⵎⵡⴰⵙ", "ⴰⵙⵉⴹⵢⴰⵙ", "ⵜⵉⴼⴰⵡⵜ", "ⵜⴰⴷⴳⴳⵯⴰⵜ", "ⴷⴰⵄ", "ⴷⴼⵄ", "ⴷⴰⵜ ⵏ ⵄⵉⵙⴰ", "ⴷⴼⴼⵉⵔ ⵏ ⵄⵉⵙⴰ", "i", "ɣ", "inn", "bṛa", "maṛ", "ibr", "ɣuc", "cut", "ktu", "nuw", "duj", "innayr", "bṛayṛ", "maṛṣ", "ibrir", "mayyu", "yunyu", "yulyuz", "ɣuct", "cutanbir", "ktubr", "nuwanbir", "dujanbir", "asa", "ayn", "asi", "akṛ", "akw", "asim", "asiḍ", "asamas", "aynas", "asinas", "akṛas", "akwas", "asimwas", "asiḍyas", "tifawt", "tadggʷat", "daɛ", "dfɛ", "dat n ɛisa", "dffir n ɛisa", "E a h.mm", "E a h.mm.ss", "a h.mm", "a h.mm.ss", "M-d, E", "MMM d E", "y-M-d, E", "ජ", "පෙ", "මා", "අ", "මැ", "ජූ", "සැ", "ඔ", "නෙ", "දෙ", "ජන", "පෙබ", "මාර්තු", "අප්‍රේල්", "මැයි", "ජූනි", "ජූලි", "අගෝ", "සැප්", "ඔක්", "නොවැ", "දෙසැ", "ජනවාරි", "පෙබරවාරි", "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්", "ඉ", "ස", "බ", "බ්‍ර", "සි", "සෙ", "ඉරිදා", "සඳුදා", "අඟහ", "බදාදා", "බ්‍රහස්", "සිකු", "සෙන", "අඟහරුවාදා", "බ්‍රහස්පතින්දා", "සිකුරාදා", "සෙනසුරාදා", "පෙ.ව.", "ප.ව.", "ක්‍රි.පූ.", "ක්‍රි.ව.", "පොපෙ", "පො.යු", "ක්‍රිස්තු පූර්ව", "ක්‍රිස්තු වර්ෂ", "පොදු යුගයට පෙර", "පොදු යුගය", "රු.", "සිෆ්එ", "E, d. M. y G", "máj", "jún", "júl", "januára", "februára", "apríla", "mája", "júna", "júla", "augusta", "októbra", "novembra", "ut", "pi", "nedeľa", "pondelok", "utorok", "streda", "štvrtok", "piatok", "pred Kr.", "pred n. l.", "pred Kristom", "po Kristovi", "pred naším letopočtom", "nášho letopočtu", "NIS", "E, d. M.", "E, d. M. y", "EEEE, dd. MMMM y", "dd. MMMM y", "d. MM. yy", "avg.", "marec", "junij", "julij", "avgust", "č", "ned.", "sre.", "čet.", "pet.", "nedelja", "ponedeljek", "torek", "sreda", "četrtek", "petek", "pop.", "po n. št.", "pr. n. št.", "n. št.", "pred Kristusom", "naše štetje", "pred našim štetjem", "pa", "vu", "ko", "tu", "vá", "lá", "pasepeeivi", "vuossaargâ", "majebaargâ", "koskoho", "tuorâstuv", "vástuppeeivi", "lávurduv", "epiloho", "Ndi", "Kuk", "Kub", "Chv", "Chk", "Chg", "Gun", "Gum", "Mb", "Zvi", "Ndira", "Kukadzi", "Kurume", "Kubvumbi", "Chivabvu", "Chikumi", "Chikunguru", "Nyamavhuvhu", "Gunyana", "Gumiguru", "Mbudzi", "Zvita", "Svo", "Muv", "Chip", "Chit", "Chin", "Chis", "Svondo", "Muvhuro", "China", "Mugovera", "Kristo asati auya", "Kristo ashaya", "EEEE, MMMM dd, y", "Kob", "Lab", "Afr", "Lix", "Tod", "Sid", "Sag", "KIT", "LIT", "Bisha Koobaad", "Bisha Labaad", "Bisha Saddexaad", "Bisha Afraad", "Bisha Shanaad", "Bisha Lixaad", "Bisha Todobaad", "Bisha Sideedaad", "Bisha Sagaalaad", "Bisha Tobnaad", "Bisha Kow iyo Tobnaad", "Bisha Laba iyo Tobnaad", "Axd", "Arb", "Axad", "Isniin", "Talaado", "Arbaco", "Khamiis", "Jimco", "Sabti", "sn.", "gn.", "CK", "CD", "Ciise ka hor (CS)", "Ciise ka dib (CS)", "{1} 'në' {0}", "h:mm:ss a, v", "HH:mm:ss, v", "h:mm a, v", "HH:mm, v", "h:mm:ss a, zzzz", "h:mm:ss a, z", "Shk", "Pri", "Maj", "Qer", "Gsh", "Sht", "Tet", "Nën", "Dhj", "janar", "shkurt", "prill", "qershor", "korrik", "gusht", "shtator", "tetor", "nëntor", "dhjetor", "Die", "Hën", "Mër", "Enj", "Pre", "e diel", "e hënë", "e martë", "e mërkurë", "e enjte", "e premte", "e shtunë", "e paradites", "e pasdites", "p.e.r.", "e.r.", "p.e.s.", "e.s.", "para erës së re", "erës së re", "para erës sonë", "erës sonë", "Lekë", "den", "E, h.mm a", "E, HH.mm", "E, h.mm.ss a", "E, HH.mm.ss", "dd.MMM", "M.y.", "MMMM y.", "QQQ. y", "QQQQ. y", "сре", "по подне", "пре нове ере", "нове ере", "[BGN]", "[BYR]", "avg", "sre", "ponedeljak", "pre podne", "po podne", "Taut", "Amšir", "Baramuda", "Bašans", "Jekatit", "Nehase", "pre nove ere", "nove ere", "Tišri", "Hešvan", "Ševat", "Čaitra", "Vaisaka", "Jiaista", "Asada", "Badra", "Argajana", "Pauza", "Maga", "Falguna", "Muraham", "Rađab", "Šaʻban", "Šaval", "Duʻl-Kiʻda", "Duʻl-hiđa", "Tempio-kampo (749-749)", "Tempio-šoho (749-757)", "Tempio-hođi (757-765)", "Tempo-đingo (765-767)", "Đingo-keiun (767-770)", "Ten-o (781-782)", "Enđi (901–923)", "Đian (1021–1024)", "Tenđi (1053–1058)", "Đirjaku (1065–1069)", "Eišo (1081–1084)", "Kanđi (1087–1094)", "Čođi (1104–1106)", "Đen-ei (1118-1120)", "Tenđi (1124–1126)", "Daiđi (1126–1131)", "Čošao (1132–1135)", "Eiđi (1141–1142)", "Kođi (1142–1144)", "Heiđi (1159–1160)", "Đišo (1177–1181)", "Đuei (1182–1184)", "Bunđi (1185–1190)", "Šođi (1199–1201)", "Đu (1222–1224)", "Đenin (1224–1225)", "Đoei (1232–1233)", "En-o (1239-1240)", "Hođi (1247–1249)", "Bun-o (1260-1261)", "Kenđi (1275–1278)", "Tokuđi (1306–1308)", "Đeno (1319–1321)", "Đenkjo (1321–1324)", "Buču (1372–1375)", "Kođi (1555–1558)", "Jokjo (1684–1688)", "Genđi (1864–1865)", "Meiđi", "Haisei", "Faravadin", "Ordibehešt", "Kordad", "Šahrivar", "Dej", "Pre RK", "RK", "augusti", "sön", "mån", "tis", "ons", "tors", "fre", "lör", "söndag", "tisdag", "lördag", "fm", "em", "bâbâ", "hâtour", "toubah", "amshîr", "barmahât", "barmoudah", "ba’ounah", "abîb", "misra", "al-nasi", "mäskäräm", "teqemt", "tahesas", "yäkatit", "mägabit", "miyazya", "guenbot", "säné", "hamlé", "nähasé", "pagumén", "före Kristus", "efter Kristus", "före västerländsk tideräkning", "västerländsk tideräkning", "tishrí", "heshván", "kislév", "tevét", "shevát", "adár I", "adár", "nisán", "ijjár", "siván", "tammúz", "ab", "elúl", "adár II", "vaishākh", "jyaishtha", "āshādha", "shrāvana", "bhādrapad", "āshwin", "kārtik", "mārgashīrsha", "paush", "māgh", "phālgun", "Saka-eran", "jumada-l-ula", "jumada-l-akhira", "sha’ban", "dhu-l-ga’da", "dhu-l-hijja", "Tempyō-kampō (749–749)", "Tempyō-shōhō (749–757)", "Tempyō-hōji (757–765)", "Temphō-jingo (765–767)", "Jingo-keiun (767–770)", "Ten-ō (781–782)", "En-ō (1239–1240)", "Bun-ō (1260–1261)", "khordād", "mordād", "ābān", "āzar", "före R.K.", "R.K.", "Bds$", "BM$", "BR$", "BS$", "BZ$", "Ekr", "EG£", "Ikr", "JM$", "mkw", "mpi", "mtu", "msb", "mun", "mts", "mku", "mkm", "mkb", "mwezi ya kwanja", "mwezi ya pili", "mwezi ya tatu", "mwezi ya ine", "mwezi ya tanu", "mwezi ya sita", "mwezi ya saba", "mwezi ya munane", "mwezi ya tisa", "mwezi ya kumi", "mwezi ya kumi na moya", "mwezi ya kumi ya mbili", "yen", "pil", "tat", "ine", "tan", "sit", "siku ya yenga", "siku ya kwanza", "siku ya pili", "siku ya tatu", "siku ya ine", "siku ya tanu", "siku ya sita", "ya asubuyi", "ya muchana", "{1} ’அன்று’ {0}", "E a h:mm", "E a h:mm:ss", "a h:mm:ss zzzz", "a h:mm:ss z", "ஜ", "பி", "மா", "ஏ", "மே", "ஜூ", "ஆ", "செ", "அ", "ந", "டி", "ஜன.", "பிப்.", "மார்.", "ஏப்.", "ஜூன்", "ஜூலை", "ஆக.", "செப்.", "அக்.", "நவ.", "டிச.", "ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்", "ஞா", "தி", "பு", "வி", "வெ", "ச", "ஞாயி.", "திங்.", "செவ்.", "புத.", "வியா.", "வெள்.", "சனி", "ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "முற்பகல்", "பிற்பகல்", "மா1", "மா2", "மா3", "மா4", "மா5", "மா6", "மா7", "மா8", "மா9", "மா10", "மா11", "மா12", "மாதம்1", "மாதம்2", "மாதம்3", "மாதம்4", "மாதம்5", "மாதம்6", "மாதம்7", "மாதம்8", "மாதம்9", "மாதம்10", "மாதம்11", "மாதம்12", "கி.மு.", "கி.பி.", "பொ.ச.மு", "பொ.ச", "கிறிஸ்துவுக்கு முன்", "அன்னோ டோமினி", "Rs.", "S$", "G d, MMM y", "G, E d, MMM y", "d, MMM y", "d, MMMM y, EEEE", "జ", "ఫి", "మా", "ఏ", "మే", "జూ", "జు", "ఆ", "సె", "అ", "న", "డి", "జన", "ఫిబ్ర", "మార్చి", "ఏప్రి", "జూన్", "జులై", "ఆగ", "సెప్టెం", "అక్టో", "నవం", "డిసెం", "జనవరి", "ఫిబ్రవరి", "ఏప్రిల్", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్", "సో", "మ", "బు", "గు", "శు", "శ", "ఆది", "సోమ", "మంగళ", "బుధ", "గురు", "శుక్ర", "శని", "ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం", "[AM]", "[PM]", "క్రీపూ", "క్రీశ", "[BCE]", "[CE]", "క్రీస్తు పూర్వం", "క్రీస్తు శకం", "ప్రస్తుత శకానికి పూర్వం", "ప్రస్తుత శకం", "Muk", "Dun", "Mod", "Ped", "Sok", "Tib", "Poo", "Orara", "Omuk", "Okwamg’", "Odung’el", "Omaruk", "Omodok’king’ol", "Ojola", "Opedel", "Osokosokoma", "Otibar", "Olabor", "Opoo", "Bar", "Aar", "Uni", "Ung", "Nakaejuma", "Nakaebarasa", "Nakaare", "Nakauni", "Nakaung’on", "Nakakany", "Nakasabiti", "Taparachu", "Ebongi", "E HH:mm น.", "d MMM G y", "E d MMM G y", "EEEEที่ d MMM G y", "HH:mm น.", "EEEEที่ d MMM", "EEEEที่ d MMMM", "EEEEที่ d MMM y", "MMMM G y", "d MMMM G y", "E d MMMM G y", "EEEEที่ d MMMM G y", "QQQQ G y", "H นาฬิกา mm นาที ss วินาที zzzz", "H นาฬิกา mm นาที ss วินาที z", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.", "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม", "อา", "จ", "อ", "พ", "พฤ", "ศ", "ส", "อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส.", "วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์", "พ.ศ.", "พุทธศักราช", "ก่อนเที่ยง", "หลังเที่ยง", "เทาท์", "บาบา", "ฮาเทอร์", "เคียฟ", "โทบา", "อัมเชอร์", "บารัมฮัท", "บาราเมาดา", "บาชันส์", "พาโอนา", "อีเปป", "เมสรา", "นาซี", "เมสเคอเรม", "เตเกมท", "เฮดาร์", "ทาฮ์ซัส", "เทอร์", "เยคาทิท", "เมกาบิต", "เมียเซีย", "เจนบอต", "เซเน", "ฮัมเล", "เนแฮซ", "พากูเมน", "ก่อน ค.ศ.", "ค.ศ.", "ก.ส.ศ.", "ส.ศ.", "ปีก่อน ค.ศ.", "ปีก่อนคริสต์ศักราช", "คริสต์ศักราช", "ก่อนสามัญศักราช", "สามัญศักราช", "ทิชรี", "เฮวาน", "กีสเลฟ", "เตเวต", "เชวัต", "อาดาร์ I", "อาดาร์", "นิสซาน", "อิยาร์", "สีวัน", "ตามูซ", "อัฟ", "เอลอุล", "อาดาร์ II", "ย.ศ.", "จิตรา", "วิสาขา", "เชษฐา", "อัษฎา", "ศรวณา", "พัตรา", "อัศวิชา", "การติกา", "มฤคศิรา", "ปุษยา", "มาฆะ", "ผลคุณี", "ม.ศ.", "มุฮัร.", "เศาะ.", "รอบี I", "รอบี II", "จุมาดา I", "จุมาดา II", "เราะ.", "ชะอ์.", "เราะมะ.", "เชาว.", "ซุลกิอฺ.", "ซุลหิจ.", "มุฮะร์รอม", "ซอฟาร์", "รอจับ", "ชะอะบาน", "รอมะดอน", "เชาวัล", "ซุลกิอฺดะฮฺ", "ซุลหิจญะฮฺ", "ฮ.ศ.", "ฮิจเราะห์ศักราช", "ทะอิกะ (645–650)", "ฮะกุชิ (650–671)", "ฮากุโฮ (672–686)", "ชุโช (686–701)", "ทะอิโฮ (701–704)", "เคอุง (704–708)", "วะโด (708–715)", "เรกิ (715–717)", "โยโร (717–724)", "จิงกิ (724–729)", "เท็มเพียว (729–749)", "เท็มเพียว-คัมโป (749-749)", "เท็มเพียว-โชโฮ (749-757)", "เท็มเพียว-โฮจิ (757-765)", "เท็มเพียว-จิงโงะ (765-767)", "จิงโงะ-เคอุง (767-770)", "โฮกิ (770–780)", "เท็นโอ (781–782)", "เอ็นเรียะกุ (782–806)", "ดะอิโด (806–810)", "โคนิง (810–824)", "เท็นโช (824–834)", "โชวะ (834–848)", "คะโจ (848–851)", "นินจุ (851–854)", "ซะอิโกะ (854–857)", "เท็นนัง (857–859)", "โจงัง (859–877)", "เก็งเก (877–885)", "นินนะ (885–889)", "คัมเพียว (889–898)", "โชตะอิ (898–901)", "เอ็งงิ (901–923)", "เอ็นโช (923–931)", "โชเฮ (931–938)", "เท็งเงียว (938–947)", "เท็นเรียะกุ (947–957)", "เท็นโตะกุ (957–961)", "โอวะ (961–964)", "โคโฮ (964–968)", "อันนะ (968–970)", "เท็นโระกุ (970–973)", "เท็นเอ็ง (973–976)", "โจเง็ง (976–978)", "เท็งเง็ง (978–983)", "เอกัง (983–985)", "คันนะ (985–987)", "เอเอ็ง (987–989)", "เอโซ (989–990)", "โชเรียะกุ (990–995)", "โชโตะกุ (995–999)", "โชโฮ (999–1004)", "คันโก (1004–1012)", "โชวะ (1012–1017)", "คันนิง (1017–1021)", "จิอัง (1021–1024)", "มันจุ (1024–1028)", "โชเง็ง (1028–1037)", "โชเรียะกุ (1037–1040)", "โชคีว (1040–1044)", "คันโตะกุ (1044–1046)", "เอโช (1046–1053)", "เท็งงิ (1053–1058)", "โคเฮ (1058–1065)", "จิเรียะกุ (1065–1069)", "เอ็งคีว (1069–1074)", "โชโฮ (1074–1077)", "โชเรียะกุ (1077–1081)", "เอโฮะ (1081–1084)", "โอโตะกุ (1084–1087)", "คันจิ (1087–1094)", "คะโฮะ (1094–1096)", "เอโช (1096–1097)", "โชโตะกุ (1097–1099)", "โควะ (1099–1104)", "โชจิ (1104–1106)", "คะโช (1106–1108)", "เท็นนิง (1108–1110)", "เท็นเอ (1110–1113)", "เอกีว (1113–1118)", "เก็นเอ (1118–1120)", "โฮะอัง (1120–1124)", "เท็นจิ (1124–1126)", "ดะอิจิ (1126–1131)", "เท็นโช (1131–1132)", "โชโช (1132–1135)", "โฮะเอ็ง (1135–1141)", "เอจิ (1141–1142)", "โคจิ (1142–1144)", "เท็นโย (1144–1145)", "คีวอัง (1145–1151)", "นิมเป (1151–1154)", "คีวจุ (1154–1156)", "โฮะเง็ง (1156–1159)", "เฮจิ (1159–1160)", "เอเรียะกุ (1160–1161)", "โอโฮ (1161–1163)", "โชกัง (1163–1165)", "เอมัง (1165–1166)", "นินอัง (1166–1169)", "คะโอ (1169–1171)", "โชอัง (1171–1175)", "อังเง็ง (1175–1177)", "จิโช (1177–1181)", "โยวะ (1181–1182)", "จุเอ (1182–1184)", "เก็นเรียะกุ (1184–1185)", "บุนจิ (1185–1190)", "เค็งกีว (1190–1199)", "โชจิ (1199–1201)", "เค็นนิง (1201–1204)", "เก็งกีว (1204–1206)", "เค็นเอ (1206–1207)", "โชเก็ง (1207–1211)", "เค็นเรียะกุ (1211–1213)", "เค็มโป (1213–1219)", "โชกีว (1219–1222)", "โจโอ (1222–1224)", "เก็นนิง (1224–1225)", "คะโระกุ (1225–1227)", "อันเต (1227–1229)", "คังกิ (1229–1232)", "โจเอ (1232–1233)", "เท็มปุกุ (1233–1234)", "บุนเรียะกุ (1234–1235)", "คะเต (1235–1238)", "เรียะกุนิง (1238–1239)", "เอ็นโอ (1239–1240)", "นินจิ (1240–1243)", "คังเง็ง (1243–1247)", "โฮจิ (1247–1249)", "เค็นโช (1249–1256)", "โคเง็ง (1256–1257)", "โชกะ (1257–1259)", "โชเง็ง (1259–1260)", "บุนโอ (1260–1261)", "โคโช (1261–1264)", "บุนเอ (1264–1275)", "เค็นจิ (1275–1278)", "โคอัง (1278–1288)", "โชโอ (1288–1293)", "เอนิง (1293–1299)", "โชอัง (1299–1302)", "เค็งเง็ง (1302–1303)", "คะเง็ง (1303–1306)", "โทะกุจิ (1306–1308)", "เอ็งเก (1308–1311)", "โอโช (1311–1312)", "โชวะ (1312–1317)", "บุมโป (1317–1319)", "เก็นโอ (1319–1321)", "เก็งเกียว (1321–1324)", "โชชู (1324–1326)", "คะเระกิ (1326–1329)", "เก็นโตะกุ (1329–1331)", "เก็งโก (1331–1334)", "เค็มมุ (1334–1336)", "เอ็งเง็ง (1336–1340)", "โคโกะกุ (1340–1346)", "โชเฮ (1346–1370)", "เค็นโตะกุ (1370–1372)", "บุนชู (1372–1375)", "เท็นจุ (1375–1379)", "โคเรียะกุ (1379–1381)", "โควะ (1381–1384)", "เก็นชู (1384–1392)", "เมโตะกุ (1384–1387)", "คะเค (1387–1389)", "โคโอ (1389–1390)", "เมโตะกุ (1390–1394)", "โอเอ (1394–1428)", "โชโช (1428–1429)", "เอเกียว (1429–1441)", "คะกิสึ (1441–1444)", "บุนอัง (1444–1449)", "โฮโตะกุ (1449–1452)", "เคียวโตะกุ (1452–1455)", "โคโช (1455–1457)", "โชโระกุ (1457–1460)", "คันโช (1460–1466)", "บุนโช (1466–1467)", "โอนิง (1467–1469)", "บุมเม (1469–1487)", "โชเกียว (1487–1489)", "เอ็นโตะกุ (1489–1492)", "เมโอ (1492–1501)", "บุงกิ (1501–1504)", "เอโช (1504–1521)", "ทะอิเอ (1521–1528)", "เคียวโระกุ (1528–1532)", "เท็มมน (1532–1555)", "โคจิ (1555–1558)", "เอโระกุ (1558–1570)", "เก็งกิ (1570–1573)", "เท็นโช (1573–1592)", "บุนโระกุ (1592–1596)", "เคโช (1596–1615)", "เก็งวะ (1615–1624)", "คันเอ (1624–1644)", "โชโฮ (1644–1648)", "เคอัง (1648–1652)", "โชโอ (1652–1655)", "เมเรียะกุ (1655–1658)", "มันจิ (1658–1661)", "คัมบุง (1661–1673)", "เอ็มโป (1673–1681)", "เท็นวะ (1681–1684)", "โจเกียว (1684–1688)", "เก็นโระกุ (1688–1704)", "โฮเอ (1704–1711)", "โชโตะกุ (1711–1716)", "เคียวโฮ (1716–1736)", "เก็มบุง (1736–1741)", "คัมโป (1741–1744)", "เอ็งเกียว (1744–1748)", "คันเอ็ง (1748–1751)", "โฮเรียะกุ (1751–1764)", "เมวะ (1764–1772)", "อันเอ (1772–1781)", "เท็มเม (1781–1789)", "คันเซ (1789–1801)", "เคียววะ (1801–1804)", "บุงกะ (1804–1818)", "บุนเซ (1818–1830)", "เท็มโป (1830–1844)", "โคกะ (1844–1848)", "คะเอ (1848–1854)", "อันเซ (1854–1860)", "มันเอ็ง (1860–1861)", "บุงกีว (1861–1864)", "เก็นจิ (1864–1865)", "เคโอ (1865–1868)", "เมจิ", "ทะอิโช", "โชวะ", "เฮเซ", "ฟาร์วาร์ดิน", "ออร์ดิเบเฮชต์", "คอร์แดด", "เตอร์", "มอร์แดด", "ชาหริวาร์", "เมฮร์", "อะบาน", "อะซาร์", "เดย์", "บาฮ์มาน", "เอสฟานด์", "ปีเปอร์เซีย", "ปีก่อนไต้หวัน", "ไต้หวัน", "EEEE፣ dd MMMM መዓልቲ y G", "ኤፕረ", "ኦክተ", "ኤፕረል", "ኦክተውበር", "ሠ", "ኃ", "ቀ", "ሰንበት", "ሰኑይ", "ሠሉስ", "ኃሙስ", "ዓርቢ", "ቀዳም", "ንጉሆ ሰዓተ", "ድሕር ሰዓት", "EEEE፡ dd MMMM መዓልቲ y G", "ጥሪ", "ለካቲ", "መጋቢ", "ሚያዝ", "ግንቦ", "ሰነ", "ሓምለ", "ነሓሰ", "መስከ", "ጥቅም", "ሕዳር", "ታሕሳ", "ለካቲት", "ጥቅምቲ", "ታሕሳስ", "ሰሉስ", "ሓሙስ", "d MMMM y EEEE", "Ý", "Ç", "Ş", "san däl", "Sān", "Fēp", "Maʻa", "ʻEpe", "Mē", "Siu", "ʻAok", "ʻOka", "Nōv", "Tīs", "Sānuali", "Fēpueli", "Maʻasi", "ʻEpeleli", "Sune", "Siulai", "ʻAokosi", "Sepitema", "ʻOkatopa", "Nōvema", "Tīsema", "Sāp", "Mōn", "Tūs", "Pul", "Tuʻa", "Fal", "Tok", "Sāpate", "Mōnite", "Tūsite", "Pulelulu", "Tuʻapulelulu", "Falaite", "Tokonaki", "TS", "ki muʻa", "taʻu ʻo Sīsū", "TF", "AUD$", "NZD$", "G dd MMM y", "G d MMM y E", "dd/MM E", "d MMMM E", "dd MMMM E", "dd.MM.y E", "d MMM y E", "y/QQQQ", "Oca", "Şub", "Nis", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Ocak", "Şubat", "Mart", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık", "Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "ÖÖ", "ÖS", "Tût", "Bâbe", "Keyhek", "Tûbe", "Imşir", "Bermuhat", "Bermude", "Peyştes", "Bune", "Ebip", "Mısrî", "Nesî", "Tikimt", "Hidar", "Yakatit", "Magabit", "Ginbot", "Nehasa", "Pagumiene", "MÖ", "MS", "İÖ", "İS", "Milattan Önce", "Milattan Sonra", "İsa’dan Önce", "İsa’dan Sonra", "Tişri", "Heşvan", "Şevat", "Veadar", "İyar", "Muharrem", "Safer", "Rebiülevvel", "Rebiülahir", "Cemaziyelevvel", "Cemaziyelahir", "Recep", "Şaban", "Ramazan", "Şevval", "Zilkade", "Zilhicce", "Hicri", "Ferverdin", "Ordibeheşt", "Hordad", "Şehriver", "Azer", "Behmen", "Esfend", "{percentSign}{number}", "{minusSign}{percentSign}{number}", "₺", "Ibr", "Cut", "Kṭu", "Nwa", "Duj", "Yebrayer", "Ibrir", "Yulyuz", "Cutanbir", "Kṭuber", "Nwanbir", "Dujanbir", "Asa", "Ayn", "Asn", "Akr", "Akw", "Asm", "Asḍ", "Asamas", "Aynas", "Asinas", "Akras", "Akwas", "Asimwas", "Asiḍyas", "Zdat azal", "Ḍeffir aza", "ZƐ", "ḌƐ", "Zdat Ɛisa (TAƔ)", "Ḍeffir Ɛisa (TAƔ)", "{1}، {0}", "MMM d، y G", "E، MMM d، y G", "E، M/d", "E، MMM d", "E، M/d/y", "MMM d، y", "E، MMM d، y", "EEEE، MMMM d، y", "MMMM d، y", "يانۋار", "فېۋرال", "مارت", "ئاپرېل", "ئىيۇن", "ئىيۇل", "ئاۋغۇست", "سېنتەبىر", "ئۆكتەبىر", "نويابىر", "دېكابىر", "بويابىر", "يە", "دۈ", "سە", "چا", "پە", "چۈ", "شە", "يەكشەنبە", "دۈشەنبە", "سەيشەنبە", "چارشەنبە", "پەيشەنبە", "جۈمە", "شەنبە", "بۇددا يىلنامەسى", "چۈشتىن بۇرۇن", "چۈشتىن كېيىن", "مىلادىيە", "مىلادىيەدىن بۇرۇن", "مۇھەررەم", "سەپەر", "رەبىئۇلئەۋۋەل", "رەبىئۇلئاخىر", "جەمادىيەلئەۋۋەل", "جەمادىيەلئاخىر", "رەجەب", "شەئبان", "رامىزان", "شەۋۋال", "زۇلقەئدە", "زۇلھەججە", "ھىجرىيە", "مىنگو", "جۇڭخۇا مىنگودىن بۇرۇن", "{1} 'о' {0}", "QQQQ y 'р'.", "EEEE, d MMMM y 'р'.", "d MMMM y 'р'.", "d MMM y 'р'.", "Л", "В", "Г", "січ.", "лют.", "бер.", "квіт.", "трав.", "черв.", "лип.", "серп.", "вер.", "жовт.", "лист.", "груд.", "січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня", "П", "Нд", "Пн", "Вт", "Чт", "Пт", "неділя", "понеділок", "вівторок", "середа", "четвер", "пʼятниця", "дп", "пп", "Бабе", "Кіхак", "Тобе", "Абіб", "Насі", "мес.", "тек.", "хед.", "тах.", "тер.", "єкат.", "мег.", "міяз.", "ген.", "хам.", "нех.", "паг.", "мескерема", "текемта", "хедара", "тахсаса", "тера", "єкатіта", "мегабіта", "міязія", "генбота", "сене", "хамле", "нехасе", "пагумена", "до н.е.", "до н. е.", "до нашої ери", "нашої ери", "до нової ери", "нової ери", "Тішри", "Марчешван", "Числьов", "Тебет", "Нісан", "Іар", "Аб", "чайт.", "вайс.", "джай.", "асад.", "шрав.", "бхад.", "асв.", "кар.", "агр.", "паус.", "маг.", "фаль.", "джайстха", "шравана", "бхадра", "асвіна", "картіка", "аграхаяна", "пауса", "фальгуна", "Рабі I", "Рабі II", "Джумада I", "Джумада II", "Даввал", "Зу-ль-каада", "Зу-ль-хіджа", "Фарвардін", "Ордібехешт", "Тір", "Шахрівер", "крб.", "سوموار", "بدھ", "قبل دوپہر", "بعد دوپہر", "قبل مسیح", "عیسوی", "ر بیع الاول", "ر بیع الثانی", "ذوالقعدۃ", "ذوالحجۃ", "d-MMM, G y", "E, d-MMM, G y", "h:mm:ss (v)", "HH:mm:ss (v)", "h:mm (v)", "HH:mm (v)", "E, d-MMM", "d-MMMM", "d-MMM, y", "E, d-MMM, y", "y, QQQ", "y, QQQQ", "d-MMMM, y", "Sentabr", "Oktabr", "Ya", "Pa", "Sh", "yakshanba", "dushanba", "seshanba", "chorshanba", "payshanba", "shanba", "TO", "m.a.", "milodiy", "e.a.", "miloddan avvalgi", "eramizdan avvalgi", "Robiʼ ul-avval", "Robiʼ ul-oxir", "Jumad ul-avval", "Jumad ul-oxir", "Shaʼbon", "Ramazon", "Shavvol", "Zul-qaʼda", "Zul-hijja", "haqiqiy son emas", "soʻm", "فبر", "مار", "اپر", "اگس", "سپت", "اکت", "نوم", "ی.", "د.", "س.", "چ.", "پ.", "ج.", "ش.", "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек", "Январ", "Феврал", "Март", "Апрел", "Август", "Сентябр", "Октябр", "Ноябр", "Декабр", "Якш", "Душ", "Сеш", "Чор", "Пай", "Жум", "Шан", "якшанба", "душанба", "сешанба", "чоршанба", "пайшанба", "шанба", "М.А.", "Э", "сўм", "ꖨꕪꖃ ꔞꕮ", "ꕒꕡꖝꖕ", "ꕾꖺ", "ꖢꖕ", "ꖑꕱ", "ꗛꔕ", "ꕢꕌ", "ꕭꖃ", "ꔞꘋꕔꕿ ꕸꖃꗏ", "ꖨꕪꕱ ꗏꕮ", "ꕞꕌꔵ", "ꗳꗡꘉ", "ꕚꕞꕚ", "ꕉꕞꕒ", "ꕉꔤꕆꕢ", "ꕉꔤꕀꕮ", "ꔻꔬꔳ", "luukao kemã", "ɓandaɓu", "vɔɔ", "fulu", "goo", "kɔnde", "saah", "galo", "kenpkato ɓololɔ", "luukao lɔma", "lahadi", "tɛɛnɛɛ", "talata", "alaba", "aimisa", "aijima", "siɓiti", "{0}, {1}", "E, 'ngày' d", "dd MMM, y G", "dd/M", "E, dd/M", "E, dd/M/y", "'tháng' MM, y", "MMMM 'năm' y", "QQQQ 'năm' y", "EEEE, 'ngày' dd MMMM 'năm' y", "'Ngày' dd 'tháng' MM 'năm' y", "thg 1", "thg 2", "thg 3", "thg 4", "thg 5", "thg 6", "thg 7", "thg 8", "thg 9", "thg 10", "thg 11", "thg 12", "tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6", "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12", "CN", "T2", "T3", "T4", "T5", "T6", "T7", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7", "Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "SA", "CH", "tr. CN", "sau CN", "Trước R.O.C", "Ö", "Hor", "Brá", "Hei", "Öig", "Her", "Wím", "Win", "Chr", "Jenner", "Hornig", "Märze", "Abrille", "Meije", "Bráčet", "Heiwet", "Öigšte", "Herbštmánet", "Wímánet", "Wintermánet", "Chrištmánet", "Män", "Ziš", "Mit", "Fró", "Sunntag", "Mäntag", "Zištag", "Mittwuč", "Fróntag", "Fritag", "Samštag", "n. Chr", "Sabi", "Bala", "Kubi", "Kusa", "Kuna", "Kuta", "Muka", "Sabiiti", "Owokubili", "Owokusatu", "Olokuna", "Olokutaanu", "Olomukaaga", "Munkyo", "Eigulo", "AZ", "AF", "Kulisto nga azilawo", "Kulisto nga affile", "o.1", "o.2", "o.3", "o.4", "o.5", "o.6", "o.7", "o.8", "o.9", "o.10", "o.11", "o.12", "pikítíkítie, oólí ú kutúan", "siɛyɛ́, oóli ú kándíɛ", "ɔnsúmbɔl, oóli ú kátátúɛ", "mesiŋ, oóli ú kénie", "ensil, oóli ú kátánuɛ", "ɔsɔn", "efute", "pisuyú", "imɛŋ i puɔs", "imɛŋ i putúk,oóli ú kátíɛ", "makandikɛ", "pilɔndɔ́", "sd", "md", "mw", "et", "kl", "fl", "ss", "sɔ́ndiɛ", "móndie", "muányáŋmóndie", "metúkpíápɛ", "kúpélimetúkpiapɛ", "feléte", "séselé", "kiɛmɛ́ɛm", "kisɛ́ndɛ", "+J.C.", "katikupíen Yésuse", "ékélémkúnupíén n", "E דעם dטן", "dטן MMM y G", "E דעם dטן MMM yG", "dטן MMM y", "E, dטן MMM y", "EEEE, dטן MMMM y", "dטן MMMM y", "יאַנואַר", "פֿעברואַר", "מערץ", "אַפּריל", "מיי", "אויגוסט", "סעפּטעמבער", "אקטאבער", "נאוועמבער", "דעצעמבער", "זונטיק", "מאָנטיק", "דינסטיק", "מיטוואך", "דאנערשטיק", "פֿרײַטיק", "פֿאַרמיטאָג", "נאָכמיטאָג", "תש", "חש", "כס", "טב", "שב", "אא", "אד", "ני", "אי", "סי", "תמ", "אל", "א2", "חשוון", "Ṣẹ́rẹ́", "Èrèlè", "Ẹrẹ̀nà", "Ìgbé", "Ẹ̀bibi", "Òkúdu", "Agẹmọ", "Ògún", "Owewe", "Ọ̀wàrà", "Bélú", "Ọ̀pẹ̀", "Oṣù Ṣẹ́rẹ́", "Oṣù Èrèlè", "Oṣù Ẹrẹ̀nà", "Oṣù Ìgbé", "Oṣù Ẹ̀bibi", "Oṣù Òkúdu", "Oṣù Agẹmọ", "Oṣù Ògún", "Oṣù Owewe", "Oṣù Ọ̀wàrà", "Oṣù Bélú", "Oṣù Ọ̀pẹ̀", "Àìkú", "Ajé", "Ìsẹ́gun", "Ọjọ́rú", "Ọjọ́bọ", "Ẹtì", "Àbámẹ́ta", "Ọjọ́ Àìkú", "Ọjọ́ Ajé", "Ọjọ́ Ìsẹ́gun", "Ọjọ́ Ẹtì", "Ọjọ́ Àbámẹ́ta", "Àárọ̀", "Ọ̀sán", "Saju Kristi", "Lehin Kristi", "Shɛ́rɛ́", "Ɛrɛ̀nà", "Ɛ̀bibi", "Agɛmɔ", "Ɔ̀wàrà", "Ɔ̀pɛ̀", "Oshù Shɛ́rɛ́", "Oshù Èrèlè", "Oshù Ɛrɛ̀nà", "Oshù Ìgbé", "Oshù Ɛ̀bibi", "Oshù Òkúdu", "Oshù Agɛmɔ", "Oshù Ògún", "Oshù Owewe", "Oshù Ɔ̀wàrà", "Oshù Bélú", "Oshù Ɔ̀pɛ̀", "Ìsɛ́gun", "Ɔjɔ́rú", "Ɔjɔ́bɔ", "Ɛtì", "Àbámɛ́ta", "Ɔjɔ́ Àìkú", "Ɔjɔ́ Ajé", "Ɔjɔ́ Ìsɛ́gun", "Ɔjɔ́ Ɛtì", "Ɔjɔ́ Àbámɛ́ta", "Àárɔ̀", "Ɔ̀sán", "ⴰⵙⵉⵎⵡⴰⵙ", "d日E", "E ah:mm", "EHH:mm", "E ah:mm:ss", "EHH:mm:ss", "Gy年M月d日E", "ah时", "H时", "ah:mm", "ah:mm:ss", "v ah:mm:ss", "v HH:mm:ss", "v ah:mm", "v HH:mm", "M/dE", "M月d日E", "y/M/dE", "y年M月d日E", "y年第Q季度", "zzzz ah:mm:ss", "z ah:mm:ss", "一月", "一", "周日", "周一", "周二", "周三", "周四", "周五", "周六", "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "佛历", "上午", "下午", "冬", "腊", "冬月", "腊月", "13月", "十三月", "公元前", "公元", "西元前", "西元", "闰7月", "闰七月", "希伯来历", "印度历", "伊斯兰历", "大化 (645–650)", "白雉 (650–671)", "白凤 (672–686)", "朱鸟 (686–701)", "大宝 (701–704)", "庆云 (704–708)", "和铜 (708–715)", "灵龟 (715–717)", "养老 (717–724)", "神龟 (724–729)", "天平 (729–749)", "天平感宝 (749–749)", "天平胜宝 (749–757)", "天平宝字 (757–765)", "天平神护 (765–767)", "神护景云 (767–770)", "宝龟 (770–780)", "天应 (781–782)", "延历 (782–806)", "大同 (806–810)", "弘仁 (810–824)", "天长 (824–834)", "承和 (834–848)", "嘉祥 (848–851)", "仁寿 (851–854)", "齐衡 (854–857)", "天安 (857–859)", "贞观 (859–877)", "元庆 (877–885)", "仁和 (885–889)", "宽平 (889–898)", "昌泰 (898–901)", "延喜 (901–923)", "延长 (923–931)", "承平 (931–938)", "天庆 (938–947)", "天历 (947–957)", "天德 (957–961)", "应和 (961–964)", "康保 (964–968)", "安和 (968–970)", "天禄 (970–973)", "天延 (973–976)", "贞元 (976–978)", "天元 (978–983)", "永观 (983–985)", "宽和 (985–987)", "永延 (987–989)", "永祚 (989–990)", "正历 (990–995)", "长德 (995–999)", "长保 (999–1004)", "宽弘 (1004–1012)", "长和 (1012–1017)", "宽仁 (1017–1021)", "治安 (1021–1024)", "万寿 (1024–1028)", "长元 (1028–1037)", "长历 (1037–1040)", "长久 (1040–1044)", "宽德 (1044–1046)", "永承 (1046–1053)", "天喜 (1053–1058)", "康平 (1058–1065)", "治历 (1065–1069)", "延久 (1069–1074)", "承保 (1074–1077)", "正历 (1077–1081)", "永保 (1081–1084)", "应德 (1084–1087)", "宽治 (1087–1094)", "嘉保 (1094–1096)", "永长 (1096–1097)", "承德 (1097–1099)", "康和 (1099–1104)", "长治 (1104–1106)", "嘉承 (1106–1108)", "天仁 (1108–1110)", "天永 (1110–1113)", "永久 (1113–1118)", "元永 (1118–1120)", "保安 (1120–1124)", "天治 (1124–1126)", "大治 (1126–1131)", "天承 (1131–1132)", "长承 (1132–1135)", "保延 (1135–1141)", "永治 (1141–1142)", "康治 (1142–1144)", "天养 (1144–1145)", "久安 (1145–1151)", "仁平 (1151–1154)", "久寿 (1154–1156)", "保元 (1156–1159)", "平治 (1159–1160)", "永历 (1160–1161)", "应保 (1161–1163)", "长宽 (1163–1165)", "永万 (1165–1166)", "仁安 (1166–1169)", "嘉应 (1169–1171)", "承安 (1171–1175)", "安元 (1175–1177)", "治承 (1177–1181)", "养和 (1181–1182)", "寿永 (1182–1184)", "元历 (1184–1185)", "文治 (1185–1190)", "建久 (1190–1199)", "正治 (1199–1201)", "建仁 (1201–1204)", "元久 (1204–1206)", "建永 (1206–1207)", "承元 (1207–1211)", "建历 (1211–1213)", "建保 (1213–1219)", "承久 (1219–1222)", "贞应 (1222–1224)", "元仁 (1224–1225)", "嘉禄 (1225–1227)", "安贞 (1227–1229)", "宽喜 (1229–1232)", "贞永 (1232–1233)", "天福 (1233–1234)", "文历 (1234–1235)", "嘉祯 (1235–1238)", "历仁 (1238–1239)", "延应 (1239–1240)", "仁治 (1240–1243)", "宽元 (1243–1247)", "宝治 (1247–1249)", "建长 (1249–1256)", "康元 (1256–1257)", "正嘉 (1257–1259)", "正元 (1259–1260)", "文应 (1260–1261)", "弘长 (1261–1264)", "文永 (1264–1275)", "建治 (1275–1278)", "弘安 (1278–1288)", "正应 (1288–1293)", "永仁 (1293–1299)", "正安 (1299–1302)", "干元 (1302–1303)", "嘉元 (1303–1306)", "德治 (1306–1308)", "延庆 (1308–1311)", "应长 (1311–1312)", "正和 (1312–1317)", "文保 (1317–1319)", "元应 (1319–1321)", "元亨 (1321–1324)", "正中 (1324–1326)", "嘉历 (1326–1329)", "元德 (1329–1331)", "元弘 (1331–1334)", "建武 (1334–1336)", "延元 (1336–1340)", "兴国 (1340–1346)", "正平 (1346–1370)", "建德 (1370–1372)", "文中 (1372–1375)", "天授 (1375–1379)", "康历 (1379–1381)", "弘和 (1381–1384)", "元中 (1384–1392)", "至德 (1384–1387)", "嘉庆 (1387–1389)", "康应 (1389–1390)", "明德 (1390–1394)", "应永 (1394–1428)", "正长 (1428–1429)", "永享 (1429–1441)", "嘉吉 (1441–1444)", "文安 (1444–1449)", "宝德 (1449–1452)", "享德 (1452–1455)", "康正 (1455–1457)", "长禄 (1457–1460)", "宽正 (1460–1466)", "文正 (1466–1467)", "应仁 (1467–1469)", "文明 (1469–1487)", "长享 (1487–1489)", "延德 (1489–1492)", "明应 (1492–1501)", "文龟 (1501–1504)", "永正 (1504–1521)", "大永 (1521–1528)", "享禄 (1528–1532)", "天文 (1532–1555)", "弘治 (1555–1558)", "永禄 (1558–1570)", "元龟 (1570–1573)", "天正 (1573–1592)", "文禄 (1592–1596)", "庆长 (1596–1615)", "元和 (1615–1624)", "宽永 (1624–1644)", "正保 (1644–1648)", "庆安 (1648–1652)", "承应 (1652–1655)", "明历 (1655–1658)", "万治 (1658–1661)", "宽文 (1661–1673)", "延宝 (1673–1681)", "天和 (1681–1684)", "贞享 (1684–1688)", "元禄 (1688–1704)", "宝永 (1704–1711)", "正德 (1711–1716)", "享保 (1716–1736)", "元文 (1736–1741)", "宽保 (1741–1744)", "延享 (1744–1748)", "宽延 (1748–1751)", "宝历 (1751–1764)", "明和 (1764–1772)", "安永 (1772–1781)", "天明 (1781–1789)", "宽政 (1789–1801)", "享和 (1801–1804)", "文化 (1804–1818)", "文政 (1818–1830)", "天保 (1830–1844)", "弘化 (1844–1848)", "嘉永 (1848–1854)", "安政 (1854–1860)", "万延 (1860–1861)", "文久 (1861–1864)", "元治 (1864–1865)", "庆应 (1865–1868)", "波斯历", "ILS", "￦", "d/M/y（E）", "y年M月d日，E", "M-dE", "Gy年M月d日 E", "ah時", "ah:mm:ss [v]", "HH:mm:ss [v]", "ah:mm [v]", "HH:mm [v]", "M/d（E）", "M月d日 E", "y/M/d（E）", "y年M月d日 E", "y年QQQ", "y年QQQQ", "y年M月d日 EEEE", "ah:mm:ss [zzzz]", "ah:mm:ss [z]", "週日", "週一", "週二", "週三", "週四", "週五", "週六", "佛曆", "臘", "臘月", "提斯利月", "瑪西班月", "基斯流月", "提別月", "細罷特月", "亞達月 I", "亞達月", "尼散月", "以珥月", "西彎月", "搭模斯月", "埃波月", "以祿月", "亞達月 II", "創世紀元", "制檀邏月", "吠舍佉月", "逝瑟吒月", "頞沙荼月", "室羅伐拏月", "婆羅鉢陀月", "頞涇縛庚闍月", "迦剌底迦月", "末伽始羅月", "報沙月", "磨祛月", "頗勒窶拏月", "印度曆", "穆哈蘭姆月", "色法爾月", "賴比月 I", "賴比月 II", "主馬達月 I", "主馬達月 II", "賴哲卜月", "舍爾邦月", "賴買丹月", "閃瓦魯月", "都爾喀爾德月", "都爾黑哲月", "伊斯蘭曆", "白鳳", "大寶", "靈龜", "神龜", "天平感寶", "天平勝寶", "天平寶字", "寶龜", "天應", "延曆", "仁壽", "齊衡", "貞觀", "寬平", "天曆", "天德", "應和", "天祿", "永觀", "寬和", "正曆", "長德", "寬弘", "寬仁", "萬壽", "長曆", "寬德", "治曆", "承曆", "應德", "寬治", "承德", "久壽", "永曆", "應保", "長寬", "永萬", "嘉應", "壽永", "元曆", "建曆", "貞應", "嘉祿", "寬喜", "文曆", "曆仁", "延應", "寬元", "寶治", "文應", "正應", "德治", "應長", "元應", "嘉曆", "元德", "興國", "建德", "康曆", "至德", "康應", "明德", "應永", "寶德", "享德", "長祿", "寬正", "應仁", "延德", "明應", "文龜", "享祿", "永祿", "元龜", "文祿", "寬永", "承應", "明曆", "萬治", "寬文", "延寶", "元祿", "寶永", "正德", "寬保", "寬延", "寶曆", "寬政", "萬延", "慶應", "波斯曆", "民國前", "民國", "非數值", "cccc", "Mas", "Eph", "Aga", "Januwari", "Februwari", "Mashi", "Ephreli", "Meyi", "Julayi", "Septhemba", "Okthoba", "Mso", "Bil", "Hla", "ISonto", "UMsombuluko", "ULwesibili", "ULwesithathu", "ULwesine", "ULwesihlanu", "UMgqibelo"],
      addLocaleData(b[5][1]);
      addLocaleData(b[5][2]);
      addLocaleData(b[5][3]);
      addLocaleData(b[5][4]);
      addLocaleData(b[5][5]);
      addLocaleData(b[5][6]);
      addLocaleData(b[5][7]);
      addLocaleData(b[5][8]);
      addLocaleData(b[5][9]);
      addLocaleData(b[5][10]);
      addLocaleData(b[5][11]);
      addLocaleData(b[5][12]);
      addLocaleData(b[5][13]);
      addLocaleData(b[5][14]);
      addLocaleData(b[5][15]);
      addLocaleData(b[5][16]);
      addLocaleData(b[5][17]);
      addLocaleData(b[5][18]);
      addLocaleData(b[5][19]);
      addLocaleData(b[5][20]);
      addLocaleData(b[5][21]);
      addLocaleData(b[5][22]);
      addLocaleData(b[5][23]);
      addLocaleData(b[5][24]);
      addLocaleData(b[5][25]);
      addLocaleData(b[5][26]);
      addLocaleData(b[5][27]);
      addLocaleData(b[5][28]);
      addLocaleData(b[5][29]);
      addLocaleData(b[5][30]);
      addLocaleData(b[5][31]);
      addLocaleData(b[5][32]);
      addLocaleData(b[5][33]);
      addLocaleData(b[5][34]);
      addLocaleData(b[5][35]);
      addLocaleData(b[5][36]);
      addLocaleData(b[5][37]);
      addLocaleData(b[5][38]);
      addLocaleData(b[5][39]);
      addLocaleData(b[5][40]);
      addLocaleData(b[5][41]);
      addLocaleData(b[5][42]);
      addLocaleData(b[5][43]);
      addLocaleData(b[5][44]);
      addLocaleData(b[5][45]);
      addLocaleData(b[5][46]);
      addLocaleData(b[5][47]);
      addLocaleData(b[5][48]);
      addLocaleData(b[5][49]);
      addLocaleData(b[5][50]);
      addLocaleData(b[5][51]);
      addLocaleData(b[5][52]);
      addLocaleData(b[5][53]);
      addLocaleData(b[5][54]);
      addLocaleData(b[5][55]);
      addLocaleData(b[5][56]);
      addLocaleData(b[5][57]);
      addLocaleData(b[5][58]);
      addLocaleData(b[5][59]);
      addLocaleData(b[5][60]);
      addLocaleData(b[5][61]);
      addLocaleData(b[5][62]);
      addLocaleData(b[5][63]);
      addLocaleData(b[5][64]);
      addLocaleData(b[5][65]);
      addLocaleData(b[5][66]);
      addLocaleData(b[5][67]);
      addLocaleData(b[5][68]);
      addLocaleData(b[5][69]);
      addLocaleData(b[5][70]);
      addLocaleData(b[5][71]);
      addLocaleData(b[5][72]);
      addLocaleData(b[5][73]);
      addLocaleData(b[5][74]);
      addLocaleData(b[5][75]);
      addLocaleData(b[5][76]);
      addLocaleData(b[5][77]);
      addLocaleData(b[5][78]);
      addLocaleData(b[5][79]);
      addLocaleData(b[5][80]);
      addLocaleData(b[5][81]);
      addLocaleData(b[5][82]);
      addLocaleData(b[5][83]);
      addLocaleData(b[5][84]);
      addLocaleData(b[5][85]);
      addLocaleData(b[5][86]);
      addLocaleData(b[5][87]);
      addLocaleData(b[5][88]);
      addLocaleData(b[5][89]);
      addLocaleData(b[5][90]);
      addLocaleData(b[5][91]);
      addLocaleData(b[5][92]);
      addLocaleData(b[5][93]);
      addLocaleData(b[5][94]);
      addLocaleData(b[5][95]);
      addLocaleData(b[5][96]);
      addLocaleData(b[5][97]);
      addLocaleData(b[5][98]);
      addLocaleData(b[5][99]);
      addLocaleData(b[5][100]);
      addLocaleData(b[5][101]);
      addLocaleData(b[5][102]);
      addLocaleData(b[5][103]);
      addLocaleData(b[5][104]);
      addLocaleData(b[5][105]);
      addLocaleData(b[5][106]);
      addLocaleData(b[5][107]);
      addLocaleData(b[5][108]);
      addLocaleData(b[5][109]);
      addLocaleData(b[5][110]);
      addLocaleData(b[5][111]);
      addLocaleData(b[5][112]);
      addLocaleData(b[5][113]);
      addLocaleData(b[5][114]);
      addLocaleData(b[5][115]);
      addLocaleData(b[5][116]);
      addLocaleData(b[5][117]);
      addLocaleData(b[5][118]);
      addLocaleData(b[5][119]);
      addLocaleData(b[5][120]);
      addLocaleData(b[5][121]);
      addLocaleData(b[5][122]);
      addLocaleData(b[5][123]);
      addLocaleData(b[5][124]);
      addLocaleData(b[5][125]);
      addLocaleData(b[5][126]);
      addLocaleData(b[5][127]);
      addLocaleData(b[5][128]);
      addLocaleData(b[5][129]);
      addLocaleData(b[5][130]);
      addLocaleData(b[5][131]);
      addLocaleData(b[5][132]);
      addLocaleData(b[5][133]);
      addLocaleData(b[5][134]);
      addLocaleData(b[5][135]);
      addLocaleData(b[5][136]);
      addLocaleData(b[5][137]);
      addLocaleData(b[5][138]);
      addLocaleData(b[5][139]);
      addLocaleData(b[5][140]);
      addLocaleData(b[5][141]);
      addLocaleData(b[5][142]);
      addLocaleData(b[5][143]);
      addLocaleData(b[5][144]);
      addLocaleData(b[5][145]);
      addLocaleData(b[5][146]);
      addLocaleData(b[5][147]);
      addLocaleData(b[5][148]);
      addLocaleData(b[5][149]);
      addLocaleData(b[5][150]);
      addLocaleData(b[5][151]);
      addLocaleData(b[5][152]);
      addLocaleData(b[5][153]);
      addLocaleData(b[5][154]);
      addLocaleData(b[5][155]);
      addLocaleData(b[5][156]);
      addLocaleData(b[5][157]);
      addLocaleData(b[5][158]);
      addLocaleData(b[5][159]);
      addLocaleData(b[5][160]);
      addLocaleData(b[5][161]);
      addLocaleData(b[5][162]);
      addLocaleData(b[5][163]);
      addLocaleData(b[5][164]);
      addLocaleData(b[5][165]);
      addLocaleData(b[5][166]);
      addLocaleData(b[5][167]);
      addLocaleData(b[5][168]);
      addLocaleData(b[5][169]);
      addLocaleData(b[5][170]);
      addLocaleData(b[5][171]);
      addLocaleData(b[5][172]);
      addLocaleData(b[5][173]);
      addLocaleData(b[5][174]);
      addLocaleData(b[5][175]);
      addLocaleData(b[5][176]);
      addLocaleData(b[5][177]);
      addLocaleData(b[5][178]);
      addLocaleData(b[5][179]);
      addLocaleData(b[5][180]);
      addLocaleData(b[5][181]);
      addLocaleData(b[5][182]);
      addLocaleData(b[5][183]);
      addLocaleData(b[5][184]);
      addLocaleData(b[5][185]);
      addLocaleData(b[5][186]);
      addLocaleData(b[5][187]);
      addLocaleData(b[5][188]);
      addLocaleData(b[5][189]);
      addLocaleData(b[5][190]);
      addLocaleData(b[5][191]);
      addLocaleData(b[5][192]);
      addLocaleData(b[5][193]);
      addLocaleData(b[5][194]);
      addLocaleData(b[5][195]);
      addLocaleData(b[5][196]);
      addLocaleData(b[5][197]);
      addLocaleData(b[5][198]);
      addLocaleData(b[5][199]);
      addLocaleData(b[5][200]);
      addLocaleData(b[5][201]);
      addLocaleData(b[5][202]);
      addLocaleData(b[5][203]);
      addLocaleData(b[5][204]);
      addLocaleData(b[5][205]);
      addLocaleData(b[5][206]);
      addLocaleData(b[5][207]);
      addLocaleData(b[5][208]);
      addLocaleData(b[5][209]);
      addLocaleData(b[5][210]);
      addLocaleData(b[5][211]);
      addLocaleData(b[5][212]);
      addLocaleData(b[5][213]);
      addLocaleData(b[5][214]);
      addLocaleData(b[5][215]);
      addLocaleData(b[5][216]);
      addLocaleData(b[5][217]);
      addLocaleData(b[5][218]);
      addLocaleData(b[5][219]);
      addLocaleData(b[5][220]);
      addLocaleData(b[5][221]);
      addLocaleData(b[5][222]);
      addLocaleData(b[5][223]);
      addLocaleData(b[5][224]);
      addLocaleData(b[5][225]);
      addLocaleData(b[5][226]);
      addLocaleData(b[5][227]);
      addLocaleData(b[5][228]);
      addLocaleData(b[5][229]);
      addLocaleData(b[5][230]);
      addLocaleData(b[5][231]);
      addLocaleData(b[5][232]);
      addLocaleData(b[5][233]);
      addLocaleData(b[5][234]);
      addLocaleData(b[5][235]);
      addLocaleData(b[5][236]);
      addLocaleData(b[5][237]);
      addLocaleData(b[5][238]);
      addLocaleData(b[5][239]);
      addLocaleData(b[5][240]);
      addLocaleData(b[5][241]);
      addLocaleData(b[5][242]);
      addLocaleData(b[5][243]);
      addLocaleData(b[5][244]);
      addLocaleData(b[5][245]);
      addLocaleData(b[5][246]);
      addLocaleData(b[5][247]);
      addLocaleData(b[5][248]);
      addLocaleData(b[5][249]);
      addLocaleData(b[5][250]);
      addLocaleData(b[5][251]);
      addLocaleData(b[5][252]);
      addLocaleData(b[5][253]);
      addLocaleData(b[5][254]);
      addLocaleData(b[5][255]);
      addLocaleData(b[5][256]);
      addLocaleData(b[5][257]);
      addLocaleData(b[5][258]);
      addLocaleData(b[5][259]);
      addLocaleData(b[5][260]);
      addLocaleData(b[5][261]);
      addLocaleData(b[5][262]);
      addLocaleData(b[5][263]);
      addLocaleData(b[5][264]);
      addLocaleData(b[5][265]);
      addLocaleData(b[5][266]);
      addLocaleData(b[5][267]);
      addLocaleData(b[5][268]);
      addLocaleData(b[5][269]);
      addLocaleData(b[5][270]);
      addLocaleData(b[5][271]);
      addLocaleData(b[5][272]);
      addLocaleData(b[5][273]);
      addLocaleData(b[5][274]);
      addLocaleData(b[5][275]);
      addLocaleData(b[5][276]);
      addLocaleData(b[5][277]);
      addLocaleData(b[5][278]);
      addLocaleData(b[5][279]);
      addLocaleData(b[5][280]);
      addLocaleData(b[5][281]);
      addLocaleData(b[5][282]);
      addLocaleData(b[5][283]);
      addLocaleData(b[5][284]);
      addLocaleData(b[5][285]);
      addLocaleData(b[5][286]);
      addLocaleData(b[5][287]);
      addLocaleData(b[5][288]);
      addLocaleData(b[5][289]);
      addLocaleData(b[5][290]);
      addLocaleData(b[5][291]);
      addLocaleData(b[5][292]);
      addLocaleData(b[5][293]);
      addLocaleData(b[5][294]);
      addLocaleData(b[5][295]);
      addLocaleData(b[5][296]);
      addLocaleData(b[5][297]);
      addLocaleData(b[5][298]);
      addLocaleData(b[5][299]);
      addLocaleData(b[5][300]);
      addLocaleData(b[5][301]);
      addLocaleData(b[5][302]);
      addLocaleData(b[5][303]);
      addLocaleData(b[5][304]);
      addLocaleData(b[5][305]);
      addLocaleData(b[5][306]);
      addLocaleData(b[5][307]);
      addLocaleData(b[5][308]);
      addLocaleData(b[5][309]);
      addLocaleData(b[5][310]);
      addLocaleData(b[5][311]);
      addLocaleData(b[5][312]);
      addLocaleData(b[5][313]);
      addLocaleData(b[5][314]);
      addLocaleData(b[5][315]);
      addLocaleData(b[5][316]);
      addLocaleData(b[5][317]);
      addLocaleData(b[5][318]);
      addLocaleData(b[5][319]);
      addLocaleData(b[5][320]);
      addLocaleData(b[5][321]);
      addLocaleData(b[5][322]);
      addLocaleData(b[5][323]);
      addLocaleData(b[5][324]);
      addLocaleData(b[5][325]);
      addLocaleData(b[5][326]);
      addLocaleData(b[5][327]);
      addLocaleData(b[5][328]);
      addLocaleData(b[5][329]);
      addLocaleData(b[5][330]);
      addLocaleData(b[5][331]);
      addLocaleData(b[5][332]);
      addLocaleData(b[5][333]);
      addLocaleData(b[5][334]);
      addLocaleData(b[5][335]);
      addLocaleData(b[5][336]);
      addLocaleData(b[5][337]);
      addLocaleData(b[5][338]);
      addLocaleData(b[5][339]);
      addLocaleData(b[5][340]);
      addLocaleData(b[5][341]);
      addLocaleData(b[5][342]);
      addLocaleData(b[5][343]);
      addLocaleData(b[5][344]);
      addLocaleData(b[5][345]);
      addLocaleData(b[5][346]);
      addLocaleData(b[5][347]);
      addLocaleData(b[5][348]);
      addLocaleData(b[5][349]);
      addLocaleData(b[5][350]);
      addLocaleData(b[5][351]);
      addLocaleData(b[5][352]);
      addLocaleData(b[5][353]);
      addLocaleData(b[5][354]);
      addLocaleData(b[5][355]);
      addLocaleData(b[5][356]);
      addLocaleData(b[5][357]);
      addLocaleData(b[5][358]);
      addLocaleData(b[5][359]);
      addLocaleData(b[5][360]);
      addLocaleData(b[5][361]);
      addLocaleData(b[5][362]);
      addLocaleData(b[5][363]);
      addLocaleData(b[5][364]);
      addLocaleData(b[5][365]);
      addLocaleData(b[5][366]);
      addLocaleData(b[5][367]);
      addLocaleData(b[5][368]);
      addLocaleData(b[5][369]);
      addLocaleData(b[5][370]);
      addLocaleData(b[5][371]);
      addLocaleData(b[5][372]);
      addLocaleData(b[5][373]);
      addLocaleData(b[5][374]);
      addLocaleData(b[5][375]);
      addLocaleData(b[5][376]);
      addLocaleData(b[5][377]);
      addLocaleData(b[5][378]);
      addLocaleData(b[5][379]);
      addLocaleData(b[5][380]);
      addLocaleData(b[5][381]);
      addLocaleData(b[5][382]);
      addLocaleData(b[5][383]);
      addLocaleData(b[5][384]);
      addLocaleData(b[5][385]);
      addLocaleData(b[5][386]);
      addLocaleData(b[5][387]);
      addLocaleData(b[5][388]);
      addLocaleData(b[5][389]);
      addLocaleData(b[5][390]);
      addLocaleData(b[5][391]);
      addLocaleData(b[5][392]);
      addLocaleData(b[5][393]);
      addLocaleData(b[5][394]);
      addLocaleData(b[5][395]);
      addLocaleData(b[5][396]);
      addLocaleData(b[5][397]);
      addLocaleData(b[5][398]);
      addLocaleData(b[5][399]);
      addLocaleData(b[5][400]);
      addLocaleData(b[5][401]);
      addLocaleData(b[5][402]);
      addLocaleData(b[5][403]);
      addLocaleData(b[5][404]);
      addLocaleData(b[5][405]);
      addLocaleData(b[5][406]);
      addLocaleData(b[5][407]);
      addLocaleData(b[5][408]);
      addLocaleData(b[5][409]);
      addLocaleData(b[5][410]);
      addLocaleData(b[5][411]);
      addLocaleData(b[5][412]);
      addLocaleData(b[5][413]);
      addLocaleData(b[5][414]);
      addLocaleData(b[5][415]);
      addLocaleData(b[5][416]);
      addLocaleData(b[5][417]);
      addLocaleData(b[5][418]);
      addLocaleData(b[5][419]);
      addLocaleData(b[5][420]);
      addLocaleData(b[5][421]);
      addLocaleData(b[5][422]);
      addLocaleData(b[5][423]);
      addLocaleData(b[5][424]);
      addLocaleData(b[5][425]);
      addLocaleData(b[5][426]);
      addLocaleData(b[5][427]);
      addLocaleData(b[5][428]);
      addLocaleData(b[5][429]);
      addLocaleData(b[5][430]);
      addLocaleData(b[5][431]);
      addLocaleData(b[5][432]);
      addLocaleData(b[5][433]);
      addLocaleData(b[5][434]);
      addLocaleData(b[5][435]);
      addLocaleData(b[5][436]);
      addLocaleData(b[5][437]);
      addLocaleData(b[5][438]);
      addLocaleData(b[5][439]);
      addLocaleData(b[5][440]);
      addLocaleData(b[5][441]);
      addLocaleData(b[5][442]);
      addLocaleData(b[5][443]);
      addLocaleData(b[5][444]);
      addLocaleData(b[5][445]);
      addLocaleData(b[5][446]);
      addLocaleData(b[5][447]);
      addLocaleData(b[5][448]);
      addLocaleData(b[5][449]);
      addLocaleData(b[5][450]);
      addLocaleData(b[5][451]);
      addLocaleData(b[5][452]);
      addLocaleData(b[5][453]);
      addLocaleData(b[5][454]);
      addLocaleData(b[5][455]);
      addLocaleData(b[5][456]);
      addLocaleData(b[5][457]);
      addLocaleData(b[5][458]);
      addLocaleData(b[5][459]);
      addLocaleData(b[5][460]);
      addLocaleData(b[5][461]);
      addLocaleData(b[5][462]);
      addLocaleData(b[5][463]);
      addLocaleData(b[5][464]);
      addLocaleData(b[5][465]);
      addLocaleData(b[5][466]);
      addLocaleData(b[5][467]);
      addLocaleData(b[5][468]);
      addLocaleData(b[5][469]);
      addLocaleData(b[5][470]);
      addLocaleData(b[5][471]);
      addLocaleData(b[5][472]);
      addLocaleData(b[5][473]);
      addLocaleData(b[5][474]);
      addLocaleData(b[5][475]);
      addLocaleData(b[5][476]);
      addLocaleData(b[5][477]);
      addLocaleData(b[5][478]);
      addLocaleData(b[5][479]);
      addLocaleData(b[5][480]);
      addLocaleData(b[5][481]);
      addLocaleData(b[5][482]);
      addLocaleData(b[5][483]);
      addLocaleData(b[5][484]);
      addLocaleData(b[5][485]);
      addLocaleData(b[5][486]);
      addLocaleData(b[5][487]);
      addLocaleData(b[5][488]);
      addLocaleData(b[5][489]);
      addLocaleData(b[5][490]);
      addLocaleData(b[5][491]);
      addLocaleData(b[5][492]);
      addLocaleData(b[5][493]);
      addLocaleData(b[5][494]);
      addLocaleData(b[5][495]);
      addLocaleData(b[5][496]);
      addLocaleData(b[5][497]);
      addLocaleData(b[5][498]);
      addLocaleData(b[5][499]);
      addLocaleData(b[5][500]);
      addLocaleData(b[5][501]);
      addLocaleData(b[5][502]);
      addLocaleData(b[5][503]);
      addLocaleData(b[5][504]);
      addLocaleData(b[5][505]);
      addLocaleData(b[5][506]);
      addLocaleData(b[5][507]);
      addLocaleData(b[5][508]);
      addLocaleData(b[5][509]);
      addLocaleData(b[5][510]);
      addLocaleData(b[5][511]);
      addLocaleData(b[5][512]);
      addLocaleData(b[5][513]);
      addLocaleData(b[5][514]);
      addLocaleData(b[5][515]);
      addLocaleData(b[5][516]);
      addLocaleData(b[5][517]);
      addLocaleData(b[5][518]);
      addLocaleData(b[5][519]);
      addLocaleData(b[5][520]);
      addLocaleData(b[5][521]);
      addLocaleData(b[5][522]);
      addLocaleData(b[5][523]);
      addLocaleData(b[5][524]);
      addLocaleData(b[5][525]);
      addLocaleData(b[5][526]);
      addLocaleData(b[5][527]);
      addLocaleData(b[5][528]);
      addLocaleData(b[5][529]);
      addLocaleData(b[5][530]);
      addLocaleData(b[5][531]);
      addLocaleData(b[5][532]);
      addLocaleData(b[5][533]);
      addLocaleData(b[5][534]);
      addLocaleData(b[5][535]);
      addLocaleData(b[5][536]);
      addLocaleData(b[5][537]);
      addLocaleData(b[5][538]);
      addLocaleData(b[5][539]);
      addLocaleData(b[5][540]);
      addLocaleData(b[5][541]);
      addLocaleData(b[5][542]);
      addLocaleData(b[5][543]);
      addLocaleData(b[5][544]);
      addLocaleData(b[5][545]);
      addLocaleData(b[5][546]);
      addLocaleData(b[5][547]);
      addLocaleData(b[5][548]);
      addLocaleData(b[5][549]);
      addLocaleData(b[5][550]);
      addLocaleData(b[5][551]);
      addLocaleData(b[5][552]);
      addLocaleData(b[5][553]);
      addLocaleData(b[5][554]);
      addLocaleData(b[5][555]);
      addLocaleData(b[5][556]);
      addLocaleData(b[5][557]);
      addLocaleData(b[5][558]);
      addLocaleData(b[5][559]);
      addLocaleData(b[5][560]);
      addLocaleData(b[5][561]);
      addLocaleData(b[5][562]);
      addLocaleData(b[5][563]);
      addLocaleData(b[5][564]);
      addLocaleData(b[5][565]);
      addLocaleData(b[5][566]);
      addLocaleData(b[5][567]);
      addLocaleData(b[5][568]);
      addLocaleData(b[5][569]);
      addLocaleData(b[5][570]);
      addLocaleData(b[5][571]);
      addLocaleData(b[5][572]);
      addLocaleData(b[5][573]);
      addLocaleData(b[5][574]);
      addLocaleData(b[5][575]);
      addLocaleData(b[5][576]);
      addLocaleData(b[5][577]);
      addLocaleData(b[5][578]);
      addLocaleData(b[5][579]);
      addLocaleData(b[5][580]);
      addLocaleData(b[5][581]);
      addLocaleData(b[5][582]);
      addLocaleData(b[5][583]);
      addLocaleData(b[5][584]);
      addLocaleData(b[5][585]);
      addLocaleData(b[5][586]);
      addLocaleData(b[5][587]);
      addLocaleData(b[5][588]);
      addLocaleData(b[5][589]);
      addLocaleData(b[5][590]);
      addLocaleData(b[5][591]);
      addLocaleData(b[5][592]);
      addLocaleData(b[5][593]);
      addLocaleData(b[5][594]);
      addLocaleData(b[5][595]);
      addLocaleData(b[5][596]);
      addLocaleData(b[5][597]);
      addLocaleData(b[5][598]);
      addLocaleData(b[5][599]);
      addLocaleData(b[5][600]);
      addLocaleData(b[5][601]);
      addLocaleData(b[5][602]);
      addLocaleData(b[5][603]);
      addLocaleData(b[5][604]);
      addLocaleData(b[5][605]);
      addLocaleData(b[5][606]);
      addLocaleData(b[5][607]);
      addLocaleData(b[5][608]);
      addLocaleData(b[5][609]);
      addLocaleData(b[5][610]);
      addLocaleData(b[5][611]);
      addLocaleData(b[5][612]);
      addLocaleData(b[5][613]);
      addLocaleData(b[5][614]);
      addLocaleData(b[5][615]);
      addLocaleData(b[5][616]);
      addLocaleData(b[5][617]);
      addLocaleData(b[5][618]);
      addLocaleData(b[5][619]);
      addLocaleData(b[5][620]);
      addLocaleData(b[5][621]);
      addLocaleData(b[5][622]);
      addLocaleData(b[5][623]);
      addLocaleData(b[5][624]);
      addLocaleData(b[5][625]);
      addLocaleData(b[5][626]);
      addLocaleData(b[5][627]);
      addLocaleData(b[5][628]);
      addLocaleData(b[5][629]);
      addLocaleData(b[5][630]);
      addLocaleData(b[5][631]);
      addLocaleData(b[5][632]);
      addLocaleData(b[5][633]);
      addLocaleData(b[5][634]);
      addLocaleData(b[5][635]);
      addLocaleData(b[5][636]);
      addLocaleData(b[5][637]);
      addLocaleData(b[5][638]);
      addLocaleData(b[5][639]);
      addLocaleData(b[5][640]);
      addLocaleData(b[5][641]);
      addLocaleData(b[5][642]);
      addLocaleData(b[5][643]);
      addLocaleData(b[5][644]);
      addLocaleData(b[5][645]);
      addLocaleData(b[5][646]);
      addLocaleData(b[5][647]);
      addLocaleData(b[5][648]);
      addLocaleData(b[5][649]);
      addLocaleData(b[5][650]);
      addLocaleData(b[5][651]);
      addLocaleData(b[5][652]);
      addLocaleData(b[5][653]);
      addLocaleData(b[5][654]);
      addLocaleData(b[5][655]);
      addLocaleData(b[5][656]);
      addLocaleData(b[5][657]);
      addLocaleData(b[5][658]);
      addLocaleData(b[5][659]);
      addLocaleData(b[5][660]);
      addLocaleData(b[5][661]);
      addLocaleData(b[5][662]);
      addLocaleData(b[5][663]);
      addLocaleData(b[5][664]);
      addLocaleData(b[5][665]);
      addLocaleData(b[5][666]);
      addLocaleData(b[5][667]);
      addLocaleData(b[5][668]);
      addLocaleData(b[5][669]);
      addLocaleData(b[5][670]);
      addLocaleData(b[5][671]);
      addLocaleData(b[5][672]);
      addLocaleData(b[5][673]);
      addLocaleData(b[5][674]);
      addLocaleData(b[5][675]);
      addLocaleData(b[5][676]);
      addLocaleData(b[5][677]);
      addLocaleData(b[5][678]);
      addLocaleData(b[5][679]);
      addLocaleData(b[5][680]);
      addLocaleData(b[5][681]);
      addLocaleData(b[5][682]);
      addLocaleData(b[5][683]);
      addLocaleData(b[5][684]);
      addLocaleData(b[5][685]);
      addLocaleData(b[5][686]);
      addLocaleData(b[5][687]);
      addLocaleData(b[5][688]);
      addLocaleData(b[5][689]);
      addLocaleData(b[5][690]);
      addLocaleData(b[5][691]);
      addLocaleData(b[5][692]);
      addLocaleData(b[5][693]);
      addLocaleData(b[5][694]);
      addLocaleData(b[5][695]);
      addLocaleData(b[5][696]);
      addLocaleData(b[5][697]);
      addLocaleData(b[5][698]);
      addLocaleData(b[5][699]);
      addLocaleData(b[5][700]);
      addLocaleData(b[5][701]);
      addLocaleData(b[5][702]);
      addLocaleData(b[5][703]);
      addLocaleData(b[5][704]);
      addLocaleData(b[5][705]);
      addLocaleData(b[5][706]);
      addLocaleData(b[5][707]);
      addLocaleData(b[5][708]);
      addLocaleData(b[5][709]);
      addLocaleData(b[5][710]);
      addLocaleData(b[5][711]);
      addLocaleData(b[5][712]);
      addLocaleData(b[5][713]);
      addLocaleData(b[5][714]);
      addLocaleData(b[5][715]);
    })(IntlPolyfill.__addLocaleData);
  })(this);

  return _retrieveGlobal();
});
$__System.registerDynamic('node_modules/intl/index.js', ['node_modules/intl/lib/core.js', 'node_modules/intl/locale-data/complete.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    // Expose `IntlPolyfill` as global to add locale data into runtime later on.
    global.IntlPolyfill = $__require('node_modules/intl/lib/core.js');

    // Require all locale data for `Intl`. This module will be
    // ignored when bundling for the browser with Browserify/Webpack.
    $__require('node_modules/intl/locale-data/complete.js');

    // hack to export the polyfill as global Intl if needed
    if (!global.Intl) {
        global.Intl = global.IntlPolyfill;
        global.IntlPolyfill.__applyLocaleSensitivePrototypes();
    }

    // providing an idiomatic api for the nodejs version of this module
    module.exports = global.IntlPolyfill;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});
//# sourceMappingURL=intl.js.map