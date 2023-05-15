!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/component_wrapper/common/template_wrapper.js"], ["@devextreme/runtime/inferno","inferno","../../utils/shallow_equals","../../../core/renderer","../../../core/dom_adapter","../../../core/element","../../../core/utils/type","../../../core/utils/common","./mutations_recording"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/renovation/component_wrapper/common/template_wrapper.js", ["@devextreme/runtime/inferno", "inferno", "../../utils/shallow_equals", "../../../core/renderer", "../../../core/dom_adapter", "../../../core/element", "../../../core/utils/type", "../../../core/utils/common", "./mutations_recording"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.TemplateWrapper = void 0;
  exports.buildTemplateArgs = buildTemplateArgs;
  var _inferno = $__require("@devextreme/runtime/inferno");
  var _inferno2 = $__require("inferno");
  var _shallow_equals = $__require("../../utils/shallow_equals");
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _dom_adapter = _interopRequireDefault($__require("../../../core/dom_adapter"));
  var _element = $__require("../../../core/element");
  var _type = $__require("../../../core/utils/type");
  var _common = $__require("../../../core/utils/common");
  var _mutations_recording = $__require("./mutations_recording");
  var _excluded = ["isEqual"];
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return self;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];
      }
    }return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];
    }return target;
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
  function isDxElementWrapper(element) {
    return !!element.toArray;
  }
  function buildTemplateArgs(model, template) {
    var _model$data;
    var args = {
      template: template,
      model: _extends({}, model)
    };
    var _ref = (_model$data = model.data) !== null && _model$data !== void 0 ? _model$data : {},
        isEqual = _ref.isEqual,
        data = _objectWithoutProperties(_ref, _excluded);
    if (isEqual) {
      args.model.data = data;
      args.isEqual = isEqual;
    }
    return args;
  }
  function buildTemplateContent(props, container) {
    var _props$model;
    var _ref2 = (_props$model = props.model) !== null && _props$model !== void 0 ? _props$model : {
      data: {}
    },
        data = _ref2.data,
        index = _ref2.index;
    if (data) {
      Object.keys(data).forEach(function (name) {
        if (data[name] && _dom_adapter.default.isNode(data[name])) {
          data[name] = (0, _element.getPublicElement)((0, _renderer.default)(data[name]));
        }
      });
    }
    var rendered = props.template.render(_extends({
      container: container,
      transclude: props.transclude
    }, {
      renovated: props.renovated
    }, !props.transclude ? {
      model: data
    } : {}, !props.transclude && Number.isFinite(index) ? {
      index: index
    } : {}));
    if (rendered === undefined) {
      return [];
    }
    return isDxElementWrapper(rendered) ? rendered.toArray() : [(0, _renderer.default)(rendered).get(0)];
  }
  var TemplateWrapper = /*#__PURE__*/function (_InfernoComponent) {
    _inheritsLoose(TemplateWrapper, _InfernoComponent);
    function TemplateWrapper(props) {
      var _this;
      _this = _InfernoComponent.call(this, props) || this;
      _this.cleanParent = _common.noop;
      _this.renderTemplate = _this.renderTemplate.bind(_assertThisInitialized(_this));
      return _this;
    }
    var _proto = TemplateWrapper.prototype;
    _proto.renderTemplate = function renderTemplate() {
      var _this2 = this;
      var node = (0, _inferno2.findDOMfromVNode)(this.$LI, true);
      var container = node.parentElement;
      this.cleanParent();
      this.cleanParent = (0, _mutations_recording.recordMutations)(container, function () {
        var content = buildTemplateContent(_this2.props, (0, _element.getPublicElement)((0, _renderer.default)(container)));
        if (content.length !== 0 && !(content.length === 1 && content[0] === container)) {
          node.after.apply(node, _toConsumableArray(content));
        }
      });
    };
    _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
      var _this$props = this.props,
          model = _this$props.model,
          template = _this$props.template;
      var isEqual = nextProps.isEqual,
          nextModel = nextProps.model,
          nextTemplate = nextProps.template;
      var equalityComparer = isEqual !== null && isEqual !== void 0 ? isEqual : _shallow_equals.shallowEquals;
      if (template !== nextTemplate) {
        return true;
      }
      if (!(0, _type.isDefined)(model) || !(0, _type.isDefined)(nextModel)) {
        return model !== nextModel;
      }
      var data = model.data,
          index = model.index;
      var nextData = nextModel.data,
          nextIndex = nextModel.index;
      if (index !== nextIndex) {
        return true;
      }
      return !equalityComparer(data, nextData);
    };
    _proto.createEffects = function createEffects() {
      return [new _inferno.InfernoEffect(this.renderTemplate, [this.props.template, this.props.model])];
    };
    _proto.updateEffects = function updateEffects() {
      this._effects[0].update([this.props.template, this.props.model]);
    };
    _proto.componentWillUnmount = function componentWillUnmount() {
      this.cleanParent();
    };
    _proto.render = function render() {
      return null;
    };
    return TemplateWrapper;
  }(_inferno.InfernoComponent);
  exports.TemplateWrapper = TemplateWrapper;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["@devextreme/runtime/inferno","inferno","../../utils/shallow_equals","../../../core/renderer","../../../core/dom_adapter","../../../core/element","../../../core/utils/type","../../../core/utils/common","./mutations_recording"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("@devextreme/runtime/inferno"), require("inferno"), require("../../utils/shallow_equals"), require("../../../core/renderer"), require("../../../core/dom_adapter"), require("../../../core/element"), require("../../../core/utils/type"), require("../../../core/utils/common"), require("./mutations_recording"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=template_wrapper.js.map