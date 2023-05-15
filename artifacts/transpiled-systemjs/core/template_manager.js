!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/core/template_manager.js"], ["./renderer","./utils/type","./utils/common","./utils/extend","./templates/function_template","./templates/empty_template","./utils/template_manager"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/core/template_manager.js", ["./renderer", "./utils/type", "./utils/common", "./utils/extend", "./templates/function_template", "./templates/empty_template", "./utils/template_manager"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.TemplateManager = void 0;
  var _renderer = _interopRequireDefault($__require("./renderer"));
  var _type = $__require("./utils/type");
  var _common = $__require("./utils/common");
  var _extend = $__require("./utils/extend");
  var _function_template = $__require("./templates/function_template");
  var _empty_template = $__require("./templates/empty_template");
  var _template_manager = $__require("./utils/template_manager");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  var TEXT_NODE = 3;
  var ANONYMOUS_TEMPLATE_NAME = 'template';
  var TEMPLATE_OPTIONS_NAME = 'dxTemplate';
  var TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
  var DX_POLYMORPH_WIDGET_TEMPLATE = new _function_template.FunctionTemplate(function (_ref) {
    var model = _ref.model,
        parent = _ref.parent;
    var widgetName = model.widget;
    if (!widgetName) return (0, _renderer.default)();
    var widgetElement = (0, _renderer.default)('<div>');
    var widgetOptions = model.options || {};
    if (parent) {
      parent._createComponent(widgetElement, widgetName, widgetOptions);
    } else {
      widgetElement[widgetName](widgetOptions);
    }
    return widgetElement;
  });
  var TemplateManager = /*#__PURE__*/function () {
    function TemplateManager(createElement, anonymousTemplateName) {
      this._tempTemplates = [];
      this._defaultTemplates = {};
      this._anonymousTemplateName = anonymousTemplateName || ANONYMOUS_TEMPLATE_NAME;
      this._createElement = createElement || _template_manager.defaultCreateElement;
      this._createTemplateIfNeeded = this._createTemplateIfNeeded.bind(this);
    }
    TemplateManager.createDefaultOptions = function createDefaultOptions() {
      return {
        integrationOptions: {
          watchMethod: function watchMethod(fn, callback) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            if (!options.skipImmediate) {
              callback(fn());
            }
            return _common.noop;
          },
          templates: {
            'dx-polymorph-widget': DX_POLYMORPH_WIDGET_TEMPLATE
          },
          useDeferUpdateForTemplates: true
        }
      };
    };
    var _proto = TemplateManager.prototype;
    _proto.addDefaultTemplates = function addDefaultTemplates(templates) {
      this._defaultTemplates = (0, _extend.extend)({}, this._defaultTemplates, templates);
    };
    _proto.dispose = function dispose() {
      this._tempTemplates.forEach(function (tempTemplate) {
        tempTemplate.template.dispose && tempTemplate.template.dispose();
      });
      this._tempTemplates = [];
    };
    _proto.extractTemplates = function extractTemplates($el) {
      var templates = this._extractTemplates($el);
      var anonymousTemplateMeta = this._extractAnonymousTemplate($el);
      return {
        templates: templates,
        anonymousTemplateMeta: anonymousTemplateMeta
      };
    };
    _proto._extractTemplates = function _extractTemplates($el) {
      var _this = this;
      var templates = (0, _template_manager.findTemplates)($el, TEMPLATE_OPTIONS_NAME);
      var suitableTemplates = (0, _template_manager.suitableTemplatesByName)(templates);
      templates.forEach(function (_ref2) {
        var element = _ref2.element,
            name = _ref2.options.name;
        if (element === suitableTemplates[name]) {
          (0, _renderer.default)(element).addClass(TEMPLATE_WRAPPER_CLASS).detach();
        } else {
          (0, _renderer.default)(element).remove();
        }
      });
      return Object.keys(suitableTemplates).map(function (name) {
        return {
          name: name,
          template: _this._createTemplate(suitableTemplates[name])
        };
      });
    };
    _proto._extractAnonymousTemplate = function _extractAnonymousTemplate($el) {
      var $anonymousTemplate = $el.contents().detach();
      var $notJunkTemplateContent = $anonymousTemplate.filter(function (_, element) {
        var isTextNode = element.nodeType === TEXT_NODE;
        var isEmptyText = (0, _renderer.default)(element).text().trim().length < 1;
        return !(isTextNode && isEmptyText);
      });
      return $notJunkTemplateContent.length > 0 ? {
        template: this._createTemplate($anonymousTemplate),
        name: this._anonymousTemplateName
      } : {};
    };
    _proto._createTemplateIfNeeded = function _createTemplateIfNeeded(templateSource) {
      var cachedTemplate = this._tempTemplates.filter(function (tempTemplate) {
        return tempTemplate.source === (0, _template_manager.templateKey)(templateSource);
      })[0];
      if (cachedTemplate) return cachedTemplate.template;
      var template = this._createTemplate(templateSource);
      this._tempTemplates.push({
        template: template,
        source: (0, _template_manager.templateKey)(templateSource)
      });
      return template;
    };
    _proto._createTemplate = function _createTemplate(templateSource) {
      return this._createElement((0, _template_manager.validateTemplateSource)(templateSource));
    };
    _proto.getTemplate = function getTemplate(templateSource, templates, _ref3, context) {
      var _this2 = this;
      var isAsyncTemplate = _ref3.isAsyncTemplate,
          skipTemplates = _ref3.skipTemplates;
      if (!(0, _type.isFunction)(templateSource)) {
        return (0, _template_manager.acquireTemplate)(templateSource, this._createTemplateIfNeeded, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates);
      }
      return new _function_template.FunctionTemplate(function (options) {
        var templateSourceResult = templateSource.apply(context, (0, _template_manager.getNormalizedTemplateArgs)(options));
        if (!(0, _type.isDefined)(templateSourceResult)) {
          return new _empty_template.EmptyTemplate();
        }
        var dispose = false;
        var template = (0, _template_manager.acquireTemplate)(templateSourceResult, function (templateSource) {
          if (templateSource.nodeType || (0, _type.isRenderer)(templateSource) && !(0, _renderer.default)(templateSource).is('script')) {
            return new _function_template.FunctionTemplate(function () {
              return templateSource;
            });
          }
          dispose = true;
          return _this2._createTemplate(templateSource);
        }, templates, isAsyncTemplate, skipTemplates, _this2._defaultTemplates);
        var result = template.render(options);
        dispose && template.dispose && template.dispose();
        return result;
      });
    };
    _createClass(TemplateManager, [{
      key: "anonymousTemplateName",
      get: function get() {
        return this._anonymousTemplateName;
      }
    }]);
    return TemplateManager;
  }();
  exports.TemplateManager = TemplateManager;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["./renderer","./utils/type","./utils/common","./utils/extend","./templates/function_template","./templates/empty_template","./utils/template_manager"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("./renderer"), require("./utils/type"), require("./utils/common"), require("./utils/extend"), require("./templates/function_template"), require("./templates/empty_template"), require("./utils/template_manager"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=template_manager.js.map