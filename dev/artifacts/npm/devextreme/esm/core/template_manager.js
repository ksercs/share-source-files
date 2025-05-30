/**
* DevExtreme (esm/core/template_manager.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from './renderer';
import { isDefined, isFunction, isRenderer } from './utils/type';
import { noop } from './utils/common';
import { extend } from './utils/extend';
import { FunctionTemplate } from './templates/function_template';
import { EmptyTemplate } from './templates/empty_template';
import { findTemplates, suitableTemplatesByName, templateKey, getNormalizedTemplateArgs, validateTemplateSource, defaultCreateElement, acquireTemplate } from './utils/template_manager';
var TEXT_NODE = 3;
var ANONYMOUS_TEMPLATE_NAME = 'template';
var TEMPLATE_OPTIONS_NAME = 'dxTemplate';
var TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
var DX_POLYMORPH_WIDGET_TEMPLATE = new FunctionTemplate(_ref => {
  var {
    model,
    parent
  } = _ref;
  var widgetName = model.widget;
  if (!widgetName) return $();
  var widgetElement = $('<div>');
  var widgetOptions = model.options || {};
  if (parent) {
    parent._createComponent(widgetElement, widgetName, widgetOptions);
  } else {
    widgetElement[widgetName](widgetOptions);
  }
  return widgetElement;
});
export class TemplateManager {
  constructor(createElement, anonymousTemplateName) {
    this._tempTemplates = [];
    this._defaultTemplates = {};
    this._anonymousTemplateName = anonymousTemplateName || ANONYMOUS_TEMPLATE_NAME;
    this._createElement = createElement || defaultCreateElement;
    this._createTemplateIfNeeded = this._createTemplateIfNeeded.bind(this);
  }
  static createDefaultOptions() {
    return {
      integrationOptions: {
        watchMethod: function watchMethod(fn, callback) {
          var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
          if (!options.skipImmediate) {
            callback(fn());
          }
          return noop;
        },
        templates: {
          'dx-polymorph-widget': DX_POLYMORPH_WIDGET_TEMPLATE
        },
        useDeferUpdateForTemplates: true
      }
    };
  }
  get anonymousTemplateName() {
    return this._anonymousTemplateName;
  }
  addDefaultTemplates(templates) {
    this._defaultTemplates = extend({}, this._defaultTemplates, templates);
  }
  dispose() {
    this._tempTemplates.forEach(tempTemplate => {
      tempTemplate.template.dispose && tempTemplate.template.dispose();
    });
    this._tempTemplates = [];
  }
  extractTemplates($el) {
    var templates = this._extractTemplates($el);
    var anonymousTemplateMeta = this._extractAnonymousTemplate($el);
    return {
      templates,
      anonymousTemplateMeta
    };
  }
  _extractTemplates($el) {
    var templates = findTemplates($el, TEMPLATE_OPTIONS_NAME);
    var suitableTemplates = suitableTemplatesByName(templates);
    templates.forEach(_ref2 => {
      var {
        element,
        options: {
          name
        }
      } = _ref2;
      if (element === suitableTemplates[name]) {
        $(element).addClass(TEMPLATE_WRAPPER_CLASS).detach();
      } else {
        $(element).remove();
      }
    });
    return Object.keys(suitableTemplates).map(name => {
      return {
        name,
        template: this._createTemplate(suitableTemplates[name])
      };
    });
  }
  _extractAnonymousTemplate($el) {
    var $anonymousTemplate = $el.contents().detach();
    var $notJunkTemplateContent = $anonymousTemplate.filter((_, element) => {
      var isTextNode = element.nodeType === TEXT_NODE;
      var isEmptyText = $(element).text().trim().length < 1;
      return !(isTextNode && isEmptyText);
    });
    return $notJunkTemplateContent.length > 0 ? {
      template: this._createTemplate($anonymousTemplate),
      name: this._anonymousTemplateName
    } : {};
  }
  _createTemplateIfNeeded(templateSource) {
    var cachedTemplate = this._tempTemplates.filter(tempTemplate => tempTemplate.source === templateKey(templateSource))[0];
    if (cachedTemplate) return cachedTemplate.template;
    var template = this._createTemplate(templateSource);
    this._tempTemplates.push({
      template,
      source: templateKey(templateSource)
    });
    return template;
  }
  _createTemplate(templateSource) {
    return this._createElement(validateTemplateSource(templateSource));
  }
  getTemplate(templateSource, templates, _ref3, context) {
    var {
      isAsyncTemplate,
      skipTemplates
    } = _ref3;
    if (!isFunction(templateSource)) {
      return acquireTemplate(templateSource, this._createTemplateIfNeeded, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates);
    }
    return new FunctionTemplate(options => {
      var templateSourceResult = templateSource.apply(context, getNormalizedTemplateArgs(options));
      if (!isDefined(templateSourceResult)) {
        return new EmptyTemplate();
      }
      var dispose = false;
      var template = acquireTemplate(templateSourceResult, templateSource => {
        if (templateSource.nodeType || isRenderer(templateSource) && !$(templateSource).is('script')) {
          return new FunctionTemplate(() => templateSource);
        }
        dispose = true;
        return this._createTemplate(templateSource);
      }, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates);
      var result = template.render(options);
      dispose && template.dispose && template.dispose();
      return result;
    });
  }
}
