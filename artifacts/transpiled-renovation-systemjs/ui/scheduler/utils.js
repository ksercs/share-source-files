!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/scheduler/utils.js"], ["../../core/utils/size","../../core/renderer","../../core/utils/iterator","./constants","../../core/element","../../core/utils/data","../../core/utils/date_serialization"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/scheduler/utils.js", ["../../core/utils/size", "../../core/renderer", "../../core/utils/iterator", "./constants", "../../core/element", "../../core/utils/data", "../../core/utils/date_serialization"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.utils = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _iterator = $__require("../../core/utils/iterator");
  var _constants = $__require("./constants");
  var _element = $__require("../../core/element");
  var _data = $__require("../../core/utils/data");
  var _date_serialization = _interopRequireDefault($__require("../../core/utils/date_serialization"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  var utils = {
    dataAccessors: {
      getAppointmentSettings: function getAppointmentSettings(element) {
        return (0, _renderer.default)(element).data(_constants.APPOINTMENT_SETTINGS_KEY);
      },
      getAppointmentInfo: function getAppointmentInfo(element) {
        var settings = utils.dataAccessors.getAppointmentSettings(element);
        return settings === null || settings === void 0 ? void 0 : settings.info;
      },
      create: function create(fields, currentDataAccessors, forceIsoDateParsing, dateSerializationFormat) {
        var isDateField = function isDateField(field) {
          return field === 'startDate' || field === 'endDate';
        };
        var defaultDataAccessors = {
          getter: {},
          setter: {},
          expr: {}
        };
        var dataAccessors = currentDataAccessors ? _extends({}, currentDataAccessors) : defaultDataAccessors;
        (0, _iterator.each)(fields, function (name, expr) {
          if (expr) {
            var getter = (0, _data.compileGetter)(expr);
            var setter = (0, _data.compileSetter)(expr);
            var dateGetter;
            var dateSetter;
            var serializationFormat;
            if (isDateField(name)) {
              dateGetter = function dateGetter(object) {
                var value = getter(object);
                if (forceIsoDateParsing) {
                  value = _date_serialization.default.deserializeDate(value);
                }
                return value;
              };
              dateSetter = function dateSetter(object, value) {
                if (dateSerializationFormat) {
                  serializationFormat = dateSerializationFormat;
                } else if (forceIsoDateParsing && !serializationFormat) {
                  var oldValue = getter(object);
                  serializationFormat = _date_serialization.default.getDateSerializationFormat(oldValue);
                }
                var newValue = _date_serialization.default.serializeDate(value, serializationFormat);
                setter(object, newValue);
              };
            }
            dataAccessors.getter[name] = dateGetter || getter;
            dataAccessors.setter[name] = dateSetter || setter;
            dataAccessors.expr["".concat(name, "Expr")] = expr;
          } else {
            delete dataAccessors.getter[name];
            delete dataAccessors.setter[name];
            delete dataAccessors.expr["".concat(name, "Expr")];
          }
        });
        return dataAccessors;
      }
    },
    DOM: {
      getHeaderHeight: function getHeaderHeight(header) {
        return header ? header._$element && parseInt((0, _size.getOuterHeight)(header._$element), 10) : 0;
      }
    },
    renovation: {
      renderComponent: function renderComponent(widget, parentElement, componentClass, componentName, viewModel) {
        var component = widget[componentName];
        if (!component) {
          var container = (0, _element.getPublicElement)(parentElement);
          component = widget._createComponent(container, componentClass, viewModel);
          widget[componentName] = component;
        } else {
          // TODO: this is a workaround for setTablesSizes. Remove after CSS refactoring
          var $element = component.$element();
          var elementStyle = $element.get(0).style;
          var height = elementStyle.height;
          var width = elementStyle.width;
          component.option(viewModel);
          if (height) {
            (0, _size.setHeight)($element, height);
          }
          if (width) {
            (0, _size.setWidth)($element, width);
          }
        }
      }
    }
  };
  exports.utils = utils;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/utils/iterator","./constants","../../core/element","../../core/utils/data","../../core/utils/date_serialization"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/utils/iterator"), require("./constants"), require("../../core/element"), require("../../core/utils/data"), require("../../core/utils/date_serialization"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.js.map