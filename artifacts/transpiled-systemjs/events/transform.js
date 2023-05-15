!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/events/transform.js"], ["../core/utils/math","../core/utils/iterator","./utils/index","./core/emitter","./core/emitter_registrator"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/events/transform.js", ["../core/utils/math", "../core/utils/iterator", "./utils/index", "./core/emitter", "./core/emitter_registrator"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  exports.zoomstart = exports.zoomend = exports.zoom = exports.translatestart = exports.translateend = exports.translate = exports.transformstart = exports.transformend = exports.transform = exports.rotatestart = exports.rotateend = exports.rotate = exports.pinchstart = exports.pinchend = exports.pinch = void 0;
  var _math = $__require("../core/utils/math");
  var iteratorUtils = _interopRequireWildcard($__require("../core/utils/iterator"));
  var _index = $__require("./utils/index");
  var _emitter = _interopRequireDefault($__require("./core/emitter"));
  var _emitter_registrator = _interopRequireDefault($__require("./core/emitter_registrator"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return { default: obj };
    }var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {
      return cache.get(obj);
    }var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }newObj.default = obj;if (cache) {
      cache.set(obj, newObj);
    }return newObj;
  }
  var DX_PREFIX = 'dx';
  var TRANSFORM = 'transform';
  var TRANSLATE = 'translate';
  var PINCH = 'pinch';
  var ROTATE = 'rotate';
  var START_POSTFIX = 'start';
  var UPDATE_POSTFIX = '';
  var END_POSTFIX = 'end';
  var eventAliases = [];
  var addAlias = function addAlias(eventName, eventArgs) {
    eventAliases.push({
      name: eventName,
      args: eventArgs
    });
  };
  addAlias(TRANSFORM, {
    scale: true,
    deltaScale: true,
    rotation: true,
    deltaRotation: true,
    translation: true,
    deltaTranslation: true
  });
  addAlias(TRANSLATE, {
    translation: true,
    deltaTranslation: true
  });
  addAlias(PINCH, {
    scale: true,
    deltaScale: true
  });
  addAlias(ROTATE, {
    rotation: true,
    deltaRotation: true
  });
  var getVector = function getVector(first, second) {
    return {
      x: second.pageX - first.pageX,
      y: -second.pageY + first.pageY,
      centerX: (second.pageX + first.pageX) * 0.5,
      centerY: (second.pageY + first.pageY) * 0.5
    };
  };
  var getEventVector = function getEventVector(e) {
    var pointers = e.pointers;
    return getVector(pointers[0], pointers[1]);
  };
  var getDistance = function getDistance(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
  };
  var getScale = function getScale(firstVector, secondVector) {
    return getDistance(firstVector) / getDistance(secondVector);
  };
  var getRotation = function getRotation(firstVector, secondVector) {
    var scalarProduct = firstVector.x * secondVector.x + firstVector.y * secondVector.y;
    var distanceProduct = getDistance(firstVector) * getDistance(secondVector);
    if (distanceProduct === 0) {
      return 0;
    }
    var sign = (0, _math.sign)(firstVector.x * secondVector.y - secondVector.x * firstVector.y);
    var angle = Math.acos((0, _math.fitIntoRange)(scalarProduct / distanceProduct, -1, 1));
    return sign * angle;
  };
  var getTranslation = function getTranslation(firstVector, secondVector) {
    return {
      x: firstVector.centerX - secondVector.centerX,
      y: firstVector.centerY - secondVector.centerY
    };
  };
  var TransformEmitter = _emitter.default.inherit({
    validatePointers: function validatePointers(e) {
      return (0, _index.hasTouches)(e) > 1;
    },
    start: function start(e) {
      this._accept(e);
      var startVector = getEventVector(e);
      this._startVector = startVector;
      this._prevVector = startVector;
      this._fireEventAliases(START_POSTFIX, e);
    },
    move: function move(e) {
      var currentVector = getEventVector(e);
      var eventArgs = this._getEventArgs(currentVector);
      this._fireEventAliases(UPDATE_POSTFIX, e, eventArgs);
      this._prevVector = currentVector;
    },
    end: function end(e) {
      var eventArgs = this._getEventArgs(this._prevVector);
      this._fireEventAliases(END_POSTFIX, e, eventArgs);
    },
    _getEventArgs: function _getEventArgs(vector) {
      return {
        scale: getScale(vector, this._startVector),
        deltaScale: getScale(vector, this._prevVector),
        rotation: getRotation(vector, this._startVector),
        deltaRotation: getRotation(vector, this._prevVector),
        translation: getTranslation(vector, this._startVector),
        deltaTranslation: getTranslation(vector, this._prevVector)
      };
    },
    _fireEventAliases: function _fireEventAliases(eventPostfix, originalEvent, eventArgs) {
      eventArgs = eventArgs || {};
      iteratorUtils.each(eventAliases, function (_, eventAlias) {
        var args = {};
        iteratorUtils.each(eventAlias.args, function (name) {
          if (name in eventArgs) {
            args[name] = eventArgs[name];
          }
        });
        this._fireEvent(DX_PREFIX + eventAlias.name + eventPostfix, originalEvent, args);
      }.bind(this));
    }
  });

  /**
   * @name UI Events.dxtransformstart
   * @type eventType
   * @type_function_param1 event:event
   * @type_function_param1_field1 cancel:boolean
   * @module events/transform
  */
  /**
    * @name UI Events.dxtransform
    * @type eventType
    * @type_function_param1 event:event
    * @type_function_param1_field1 scale:number
    * @type_function_param1_field2 deltaScale:number
    * @type_function_param1_field3 rotation:number
    * @type_function_param1_field4 deltaRotation:number
    * @type_function_param1_field5 translation:object
    * @type_function_param1_field6 deltaTranslation:object
    * @type_function_param1_field7 cancel:boolean
    * @module events/transform
  */
  /**
    * @name UI Events.dxtransformend
    * @type eventType
    * @type_function_param1 event:event
    * @type_function_param1_field1 scale:number
    * @type_function_param1_field2 deltaScale:number
    * @type_function_param1_field3 rotation:number
    * @type_function_param1_field4 deltaRotation:number
    * @type_function_param1_field5 translation:object
    * @type_function_param1_field6 deltaTranslation:object
    * @type_function_param1_field7 cancel:boolean
    * @module events/transform
  */

  /**
   * @name UI Events.dxtranslatestart
   * @type eventType
   * @type_function_param1 event:event
   * @type_function_param1_field1 cancel:boolean
   * @module events/transform
  */
  /**
    * @name UI Events.dxtranslate
    * @type eventType
    * @type_function_param1 event:event
    * @type_function_param1_field1 translation:object
    * @type_function_param1_field2 deltaTranslation:object
    * @type_function_param1_field3 cancel:boolean
    * @module events/transform
  */
  /**
    * @name UI Events.dxtranslateend
    * @type eventType
    * @type_function_param1 event:event
    * @type_function_param1_field1 translation:object
    * @type_function_param1_field2 deltaTranslation:object
    * @type_function_param1_field3 cancel:boolean
    * @module events/transform
  */

  /**
  * @name UI Events.dxpinchstart
  * @type eventType
  * @type_function_param1 event:event
  * @type_function_param1_field1 cancel:boolean
  * @module events/transform
     */
  /**
    * @name UI Events.dxpinch
    * @type eventType
    * @type_function_param1 event:event
    * @type_function_param1_field1 scale:number
    * @type_function_param1_field2 deltaScale:number
    * @type_function_param1_field3 cancel:boolean
    * @module events/transform
  */
  /**
    * @name UI Events.dxpinchend
    * @type eventType
    * @type_function_param1 event:event
    * @type_function_param1_field1 scale:number
    * @type_function_param1_field2 deltaScale:number
    * @type_function_param1_field3 cancel:boolean
    * @module events/transform
  */

  /**
   * @name UI Events.dxrotatestart
   * @type eventType
   * @type_function_param1 event:event
   * @type_function_param1_field1 cancel:boolean
   * @module events/transform
  */
  /**
    * @name UI Events.dxrotate
    * @type eventType
    * @type_function_param1 event:event
    * @type_function_param1_field1 rotation:number
    * @type_function_param1_field2 deltaRotation:number
    * @type_function_param1_field3 cancel:boolean
    * @module events/transform
  */
  /**
    * @name UI Events.dxrotateend
    * @type eventType
    * @type_function_param1 event:event
    * @type_function_param1_field1 rotation:number
    * @type_function_param1_field2 deltaRotation:number
    * @type_function_param1_field3 cancel:boolean
    * @module events/transform
  */

  var eventNames = eventAliases.reduce(function (result, eventAlias) {
    [START_POSTFIX, UPDATE_POSTFIX, END_POSTFIX].forEach(function (eventPostfix) {
      result.push(DX_PREFIX + eventAlias.name + eventPostfix);
    });
    return result;
  }, []);
  (0, _emitter_registrator.default)({
    emitter: TransformEmitter,
    events: eventNames
  });
  var exportNames = {};
  iteratorUtils.each(eventNames, function (_, eventName) {
    exportNames[eventName.substring(DX_PREFIX.length)] = eventName;
  });
  /* eslint-disable spellcheck/spell-checker */
  var transformstart = exportNames.transformstart,
      transform = exportNames.transform,
      transformend = exportNames.transformend,
      translatestart = exportNames.translatestart,
      translate = exportNames.translate,
      translateend = exportNames.translateend,
      zoomstart = exportNames.zoomstart,
      zoom = exportNames.zoom,
      zoomend = exportNames.zoomend,
      pinchstart = exportNames.pinchstart,
      pinch = exportNames.pinch,
      pinchend = exportNames.pinchend,
      rotatestart = exportNames.rotatestart,
      rotate = exportNames.rotate,
      rotateend = exportNames.rotateend;
  exports.rotateend = rotateend;
  exports.rotate = rotate;
  exports.rotatestart = rotatestart;
  exports.pinchend = pinchend;
  exports.pinch = pinch;
  exports.pinchstart = pinchstart;
  exports.zoomend = zoomend;
  exports.zoom = zoom;
  exports.zoomstart = zoomstart;
  exports.translateend = translateend;
  exports.translate = translate;
  exports.translatestart = translatestart;
  exports.transformend = transformend;
  exports.transform = transform;
  exports.transformstart = transformstart;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/math","../core/utils/iterator","./utils/index","./core/emitter","./core/emitter_registrator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/math"), require("../core/utils/iterator"), require("./utils/index"), require("./core/emitter"), require("./core/emitter_registrator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=transform.js.map