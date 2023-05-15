!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/core/utils/template_manager.js"], ["../config","../devices","../errors","../renderer","../templates/child_default_template","../templates/empty_template","../templates/template","../templates/template_base","./array","./common","./dom","./extend","./type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/core/utils/template_manager.js", ["../config", "../devices", "../errors", "../renderer", "../templates/child_default_template", "../templates/empty_template", "../templates/template", "../templates/template_base", "./array", "./common", "./dom", "./extend", "./type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.validateTemplateSource = exports.templateKey = exports.suitableTemplatesByName = exports.getNormalizedTemplateArgs = exports.findTemplates = exports.defaultCreateElement = exports.addOneRenderedCall = exports.acquireTemplate = exports.acquireIntegrationTemplate = void 0;
  var _config = _interopRequireDefault($__require("../config"));
  var _devices = _interopRequireDefault($__require("../devices"));
  var _errors = _interopRequireDefault($__require("../errors"));
  var _renderer = _interopRequireDefault($__require("../renderer"));
  var _child_default_template = $__require("../templates/child_default_template");
  var _empty_template = $__require("../templates/empty_template");
  var _template = $__require("../templates/template");
  var _template_base = $__require("../templates/template_base");
  var _array = $__require("./array");
  var _common = $__require("./common");
  var _dom = $__require("./dom");
  var _extend = $__require("./extend");
  var _type = $__require("./type");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var findTemplates = function findTemplates(element, name) {
    var optionsAttributeName = 'data-options';
    var templates = (0, _renderer.default)(element).contents().filter("[".concat(optionsAttributeName, "*=\"").concat(name, "\"]"));
    return [].slice.call(templates).map(function (element) {
      var optionsString = (0, _renderer.default)(element).attr(optionsAttributeName) || '';
      return {
        element: element,
        options: (0, _config.default)().optionsParser(optionsString)[name]
      };
    }).filter(function (template) {
      return !!template.options;
    });
  };
  exports.findTemplates = findTemplates;
  var suitableTemplatesByName = function suitableTemplatesByName(rawTemplates) {
    var templatesMap = (0, _array.groupBy)(rawTemplates, function (template) {
      return template.options.name;
    });
    if (templatesMap['undefined']) {
      throw _errors.default.Error('E0023');
    }
    var result = {};
    Object.keys(templatesMap).forEach(function (name) {
      var _findBestMatches$;
      var suitableTemplate = (_findBestMatches$ = (0, _common.findBestMatches)(_devices.default.current(), templatesMap[name], function (template) {
        return template.options;
      })[0]) === null || _findBestMatches$ === void 0 ? void 0 : _findBestMatches$.element;
      if (suitableTemplate) {
        result[name] = suitableTemplate;
      }
    });
    return result;
  };
  exports.suitableTemplatesByName = suitableTemplatesByName;
  var addOneRenderedCall = function addOneRenderedCall(template) {
    var _render = template.render.bind(template);
    return (0, _extend.extend)({}, template, {
      render: function render(options) {
        var templateResult = _render(options);
        options && options.onRendered && options.onRendered();
        return templateResult;
      }
    });
  };
  exports.addOneRenderedCall = addOneRenderedCall;
  var getNormalizedTemplateArgs = function getNormalizedTemplateArgs(options) {
    var args = [];
    if ('model' in options) {
      args.push(options.model);
    }
    if ('index' in options) {
      args.push(options.index);
    }
    args.push(options.container);
    return args;
  };
  exports.getNormalizedTemplateArgs = getNormalizedTemplateArgs;
  var validateTemplateSource = function validateTemplateSource(templateSource) {
    return typeof templateSource === 'string' ? (0, _dom.normalizeTemplateElement)(templateSource) : templateSource;
  };
  exports.validateTemplateSource = validateTemplateSource;
  var templateKey = function templateKey(templateSource) {
    return (0, _type.isRenderer)(templateSource) && templateSource[0] || templateSource;
  };
  exports.templateKey = templateKey;
  var defaultCreateElement = function defaultCreateElement(element) {
    return new _template.Template(element);
  };
  exports.defaultCreateElement = defaultCreateElement;
  var acquireIntegrationTemplate = function acquireIntegrationTemplate(templateSource, templates, isAsyncTemplate, skipTemplates) {
    var integrationTemplate = null;
    if (!skipTemplates || skipTemplates.indexOf(templateSource) === -1) {
      integrationTemplate = templates[templateSource];
      if (integrationTemplate && !(integrationTemplate instanceof _template_base.TemplateBase) && !isAsyncTemplate) {
        integrationTemplate = addOneRenderedCall(integrationTemplate);
      }
    }
    return integrationTemplate;
  };
  exports.acquireIntegrationTemplate = acquireIntegrationTemplate;
  var acquireTemplate = function acquireTemplate(templateSource, createTemplate, templates, isAsyncTemplate, skipTemplates, defaultTemplates) {
    if (templateSource == null) {
      return new _empty_template.EmptyTemplate();
    }
    if (templateSource instanceof _child_default_template.ChildDefaultTemplate) {
      return defaultTemplates[templateSource.name];
    }
    if (templateSource instanceof _template_base.TemplateBase) {
      return templateSource;
    }

    // TODO: templateSource.render is needed for angular2 integration. Try to remove it after supporting TypeScript modules.
    if ((0, _type.isFunction)(templateSource.render) && !(0, _type.isRenderer)(templateSource)) {
      return isAsyncTemplate ? templateSource : addOneRenderedCall(templateSource);
    }
    if (templateSource.nodeType || (0, _type.isRenderer)(templateSource)) {
      return createTemplate((0, _renderer.default)(templateSource));
    }
    return acquireIntegrationTemplate(templateSource, templates, isAsyncTemplate, skipTemplates) || defaultTemplates[templateSource] || createTemplate(templateSource);
  };
  exports.acquireTemplate = acquireTemplate;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../config","../devices","../errors","../renderer","../templates/child_default_template","../templates/empty_template","../templates/template","../templates/template_base","./array","./common","./dom","./extend","./type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../config"), require("../devices"), require("../errors"), require("../renderer"), require("../templates/child_default_template"), require("../templates/empty_template"), require("../templates/template"), require("../templates/template_base"), require("./array"), require("./common"), require("./dom"), require("./extend"), require("./type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=template_manager.js.map