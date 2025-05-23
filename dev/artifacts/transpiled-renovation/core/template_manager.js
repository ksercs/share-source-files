"use strict";

exports.TemplateManager = void 0;
var _renderer = _interopRequireDefault(require("./renderer"));
var _type = require("./utils/type");
var _common = require("./utils/common");
var _extend = require("./utils/extend");
var _function_template = require("./templates/function_template");
var _empty_template = require("./templates/empty_template");
var _template_manager = require("./utils/template_manager");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
      templates,
      anonymousTemplateMeta
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
        name,
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
      template,
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