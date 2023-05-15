!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/notify.js"], ["../core/renderer","../core/utils/view_port","../core/utils/extend","../core/utils/type","../core/utils/window","./toast"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/notify.js", ["../core/renderer", "../core/utils/view_port", "../core/utils/extend", "../core/utils/type", "../core/utils/window", "./toast"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _view_port = $__require("../core/utils/view_port");
  var _extend = $__require("../core/utils/extend");
  var _type = $__require("../core/utils/type");
  var _window = $__require("../core/utils/window");
  var _toast = _interopRequireDefault($__require("./toast"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();
  var $notify = null;
  var $containers = {};
  function notify(message, /* optional */typeOrStack, displayTime) {
    var options = (0, _type.isPlainObject)(message) ? message : {
      message: message
    };
    var stack = (0, _type.isPlainObject)(typeOrStack) ? typeOrStack : undefined;
    var type = (0, _type.isPlainObject)(typeOrStack) ? undefined : typeOrStack;
    var userOnHidden = options.onHidden;
    if (stack !== null && stack !== void 0 && stack.position) {
      var position = stack.position;
      var direction = stack.direction || getDefaultDirection(position);
      var containerKey = (0, _type.isString)(position) ? position : "".concat(position.top, "-").concat(position.left, "-").concat(position.bottom, "-").concat(position.right);
      var userOnShowing = options.onShowing;
      var $container = getStackContainer(containerKey);
      setContainerClasses($container, direction);
      (0, _extend.extend)(options, {
        container: $container,
        onShowing: function onShowing(args) {
          setContainerStyles($container, direction, position);
          userOnShowing === null || userOnShowing === void 0 ? void 0 : userOnShowing(args);
        }
      });
    }
    (0, _extend.extend)(options, {
      type: type,
      displayTime: displayTime,
      onHidden: function onHidden(args) {
        (0, _renderer.default)(args.element).remove();
        userOnHidden === null || userOnHidden === void 0 ? void 0 : userOnHidden(args);
      }
    });
    $notify = (0, _renderer.default)('<div>').appendTo((0, _view_port.value)());
    new _toast.default($notify, options).show();
  }
  var getDefaultDirection = function getDefaultDirection(position) {
    return (0, _type.isString)(position) && position.includes('top') ? 'down-push' : 'up-push';
  };
  var createStackContainer = function createStackContainer(key) {
    var $container = (0, _renderer.default)('<div>').appendTo((0, _view_port.value)());
    $containers[key] = $container;
    return $container;
  };
  var getStackContainer = function getStackContainer(key) {
    var $container = $containers[key];
    return $container ? $container : createStackContainer(key);
  };
  var setContainerClasses = function setContainerClasses(container, direction) {
    var containerClasses = "dx-toast-stack dx-toast-stack-".concat(direction, "-direction");
    container.removeAttr('class').addClass(containerClasses);
  };
  var setContainerStyles = function setContainerStyles(container, direction, position) {
    var _container$children$f = container.children().first().get(0),
        toastWidth = _container$children$f.offsetWidth,
        toastHeight = _container$children$f.offsetHeight;
    var dimensions = {
      toastWidth: toastWidth,
      toastHeight: toastHeight,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    };
    var coordinates = (0, _type.isString)(position) ? getCoordinatesByAlias(position, dimensions) : position;
    var styles = getPositionStylesByCoordinates(direction, coordinates, dimensions);
    container.css(styles);
  };
  var getCoordinatesByAlias = function getCoordinatesByAlias(alias, _ref) {
    var toastWidth = _ref.toastWidth,
        toastHeight = _ref.toastHeight,
        windowHeight = _ref.windowHeight,
        windowWidth = _ref.windowWidth;
    switch (alias) {
      case 'top left':
        return {
          top: 10,
          left: 10
        };
      case 'top right':
        return {
          top: 10,
          right: 10
        };
      case 'bottom left':
        return {
          bottom: 10,
          left: 10
        };
      case 'bottom right':
        return {
          bottom: 10,
          right: 10
        };
      case 'top center':
        return {
          top: 10,
          left: Math.round(windowWidth / 2 - toastWidth / 2)
        };
      case 'left center':
        return {
          top: Math.round(windowHeight / 2 - toastHeight / 2),
          left: 10
        };
      case 'right center':
        return {
          top: Math.round(windowHeight / 2 - toastHeight / 2),
          right: 10
        };
      case 'center':
        return {
          top: Math.round(windowHeight / 2 - toastHeight / 2),
          left: Math.round(windowWidth / 2 - toastWidth / 2)
        };
      case 'bottom center':
      default:
        return {
          bottom: 10,
          left: Math.round(windowWidth / 2 - toastWidth / 2)
        };
    }
  };
  var getPositionStylesByCoordinates = function getPositionStylesByCoordinates(direction, coordinates, dimensions) {
    var _coordinates$bottom, _coordinates$left, _coordinates$right, _coordinates$top, _coordinates$left2, _coordinates$right2, _coordinates$right3, _coordinates$top2, _coordinates$bottom2, _coordinates$left3, _coordinates$top3, _coordinates$bottom3;
    var toastWidth = dimensions.toastWidth,
        toastHeight = dimensions.toastHeight,
        windowHeight = dimensions.windowHeight,
        windowWidth = dimensions.windowWidth;
    switch (direction.replace(/-push|-stack/g, '')) {
      case 'up':
        return {
          bottom: (_coordinates$bottom = coordinates.bottom) !== null && _coordinates$bottom !== void 0 ? _coordinates$bottom : windowHeight - toastHeight - coordinates.top,
          top: '',
          left: (_coordinates$left = coordinates.left) !== null && _coordinates$left !== void 0 ? _coordinates$left : '',
          right: (_coordinates$right = coordinates.right) !== null && _coordinates$right !== void 0 ? _coordinates$right : ''
        };
      case 'down':
        return {
          top: (_coordinates$top = coordinates.top) !== null && _coordinates$top !== void 0 ? _coordinates$top : windowHeight - toastHeight - coordinates.bottom,
          bottom: '',
          left: (_coordinates$left2 = coordinates.left) !== null && _coordinates$left2 !== void 0 ? _coordinates$left2 : '',
          right: (_coordinates$right2 = coordinates.right) !== null && _coordinates$right2 !== void 0 ? _coordinates$right2 : ''
        };
      case 'left':
        return {
          right: (_coordinates$right3 = coordinates.right) !== null && _coordinates$right3 !== void 0 ? _coordinates$right3 : windowWidth - toastWidth - coordinates.left,
          left: '',
          top: (_coordinates$top2 = coordinates.top) !== null && _coordinates$top2 !== void 0 ? _coordinates$top2 : '',
          bottom: (_coordinates$bottom2 = coordinates.bottom) !== null && _coordinates$bottom2 !== void 0 ? _coordinates$bottom2 : ''
        };
      case 'right':
        return {
          left: (_coordinates$left3 = coordinates.left) !== null && _coordinates$left3 !== void 0 ? _coordinates$left3 : windowWidth - toastWidth - coordinates.right,
          right: '',
          top: (_coordinates$top3 = coordinates.top) !== null && _coordinates$top3 !== void 0 ? _coordinates$top3 : '',
          bottom: (_coordinates$bottom3 = coordinates.bottom) !== null && _coordinates$bottom3 !== void 0 ? _coordinates$bottom3 : ''
        };
    }
  };

  ///#DEBUG
  Object.setPrototypeOf(notify, {
    _resetContainers: function _resetContainers() {
      Object.keys($containers).forEach(function (key) {
        return delete $containers[key];
      });
    }
  });
  ///#ENDDEBUG
  var _default = notify;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/renderer","../core/utils/view_port","../core/utils/extend","../core/utils/type","../core/utils/window","./toast"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/renderer"), require("../core/utils/view_port"), require("../core/utils/extend"), require("../core/utils/type"), require("../core/utils/window"), require("./toast"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=notify.js.map