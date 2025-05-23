/**
* DevExtreme (cjs/core/utils/template_manager.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.validateTemplateSource = exports.templateKey = exports.suitableTemplatesByName = exports.getNormalizedTemplateArgs = exports.findTemplates = exports.defaultCreateElement = exports.addPublicElementNormalization = exports.addOneRenderedCall = exports.acquireTemplate = exports.acquireIntegrationTemplate = void 0;
var _config = _interopRequireDefault(require("../config"));
var _devices = _interopRequireDefault(require("../devices"));
var _element = require("../element");
var _errors = _interopRequireDefault(require("../errors"));
var _renderer = _interopRequireDefault(require("../renderer"));
var _child_default_template = require("../templates/child_default_template");
var _empty_template = require("../templates/empty_template");
var _template = require("../templates/template");
var _template_base = require("../templates/template_base");
var _array = require("./array");
var _common = require("./common");
var _dom = require("./dom");
var _extend = require("./extend");
var _type = require("./type");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var findTemplates = function findTemplates(element, name) {
  var optionsAttributeName = 'data-options';
  var templates = (0, _renderer.default)(element).contents().filter("[".concat(optionsAttributeName, "*=\"").concat(name, "\"]"));
  return [].slice.call(templates).map(function (element) {
    var optionsString = (0, _renderer.default)(element).attr(optionsAttributeName) || '';
    return {
      element,
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
  var render = template.render.bind(template);
  return (0, _extend.extend)({}, template, {
    render(options) {
      var templateResult = render(options);
      options && options.onRendered && options.onRendered();
      return templateResult;
    }
  });
};
exports.addOneRenderedCall = addOneRenderedCall;
var addPublicElementNormalization = function addPublicElementNormalization(template) {
  var render = template.render.bind(template);
  return (0, _extend.extend)({}, template, {
    render(options) {
      var $container = (0, _renderer.default)(options.container);
      return render(_extends({}, options, {
        container: (0, _element.getPublicElement)($container)
      }));
    }
  });
};
exports.addPublicElementNormalization = addPublicElementNormalization;
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
    if (integrationTemplate && !(integrationTemplate instanceof _template_base.TemplateBase)) {
      if ((0, _type.isFunction)(integrationTemplate.render)) {
        integrationTemplate = addPublicElementNormalization(integrationTemplate);
      }
      if (!isAsyncTemplate) {
        integrationTemplate = addOneRenderedCall(integrationTemplate);
      }
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
