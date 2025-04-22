import $ from '../../core/renderer';
import { EmptyTemplate } from '../../core/templates/empty_template';
import { FunctionTemplate } from '../../core/templates/function_template';
import { noop } from '../../core/utils/common';
import { extend } from '../../core/utils/extend';
import { acquireTemplate, defaultCreateElement, findTemplates, getNormalizedTemplateArgs, suitableTemplatesByName, templateKey, validateTemplateSource } from '../../core/utils/template_manager';
import { isDefined, isFunction, isRenderer } from '../../core/utils/type';
const TEXT_NODE = 3;
const ANONYMOUS_TEMPLATE_NAME = 'template';
const TEMPLATE_OPTIONS_NAME = 'dxTemplate';
const TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
// @ts-expect-error need to add overloaded constructor type to templates
const DX_POLYMORPH_WIDGET_TEMPLATE = new FunctionTemplate(_ref => {
  let {
    model,
    parent
  } = _ref;
  const widgetName = model.widget;
  if (!widgetName) return $();
  const widgetElement = $('<div>');
  const widgetOptions = model.options || {};
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
        watchMethod: function (fn, callback) {
          let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
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
    const templates = this._extractTemplates($el);
    const anonymousTemplateMeta = this._extractAnonymousTemplate($el);
    return {
      templates,
      anonymousTemplateMeta
    };
  }
  _extractTemplates($el) {
    const templates = findTemplates($el, TEMPLATE_OPTIONS_NAME);
    const suitableTemplates = suitableTemplatesByName(templates);
    templates.forEach(_ref2 => {
      let {
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
    return Object.keys(suitableTemplates).map(name => ({
      name,
      template: this._createTemplate(suitableTemplates[name])
    }));
  }
  _extractAnonymousTemplate($el) {
    const $anonymousTemplate = $el.contents().detach();
    const $notJunkTemplateContent = $anonymousTemplate.filter((_, element) => {
      const isTextNode = element.nodeType === TEXT_NODE;
      const isEmptyText = $(element).text().trim().length < 1;
      return !(isTextNode && isEmptyText);
    });
    return $notJunkTemplateContent.length > 0 ? {
      template: this._createTemplate($anonymousTemplate),
      name: this._anonymousTemplateName
    } : {};
  }
  _createTemplateIfNeeded(templateSource) {
    const cachedTemplate = this._tempTemplates.filter(tempTemplate => tempTemplate.source === templateKey(templateSource))[0];
    if (cachedTemplate) return cachedTemplate.template;
    const template = this._createTemplate(templateSource);
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
    let {
      isAsyncTemplate,
      skipTemplates
    } = _ref3;
    if (!isFunction(templateSource)) {
      return acquireTemplate(templateSource, this._createTemplateIfNeeded, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates);
    }
    // @ts-expect-error need to add overloaded constructor type to templates
    return new FunctionTemplate(options => {
      const templateSourceResult = templateSource.apply(context, getNormalizedTemplateArgs(options));
      if (!isDefined(templateSourceResult)) {
        return new EmptyTemplate();
      }
      let dispose = false;
      const template = acquireTemplate(templateSourceResult, templateSource => {
        if (templateSource.nodeType || isRenderer(templateSource) && !$(templateSource).is('script')) {
          // @ts-expect-error need to add overloaded constructor type to templates
          return new FunctionTemplate(() => templateSource);
        }
        dispose = true;
        return this._createTemplate(templateSource);
      }, templates, isAsyncTemplate, skipTemplates, this._defaultTemplates);
      const result = template.render(options);
      dispose && template.dispose && template.dispose();
      return result;
    });
  }
}
export default {
  TemplateManager
};