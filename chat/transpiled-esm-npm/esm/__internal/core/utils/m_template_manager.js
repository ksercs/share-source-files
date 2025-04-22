import _extends from "@babel/runtime/helpers/esm/extends";
import config from '../../../core/config';
import devices from '../../../core/devices';
import { getPublicElement } from '../../../core/element';
import Errors from '../../../core/errors';
import $ from '../../../core/renderer';
import { ChildDefaultTemplate } from '../../../core/templates/child_default_template';
import { EmptyTemplate } from '../../../core/templates/empty_template';
import { Template } from '../../../core/templates/template';
import { TemplateBase } from '../../../core/templates/template_base';
import { groupBy } from '../../../core/utils/array';
import { findBestMatches } from '../../../core/utils/common';
import { extend } from '../../../core/utils/extend';
import domUtils from './m_dom';
import typeUtils from './m_type';
export const findTemplates = (element, name) => {
  const optionsAttributeName = 'data-options';
  const templates = $(element).contents().filter(`[${optionsAttributeName}*="${name}"]`);
  return [].slice.call(templates).map(element => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const optionsString = $(element).attr(optionsAttributeName) || '';
    return {
      element,
      // @ts-expect-error optionsParser do not exist in public type
      options: config().optionsParser(optionsString)[name]
    };
  }).filter(template => !!template.options);
};
export const suitableTemplatesByName = rawTemplates => {
  const templatesMap = groupBy(rawTemplates, template => template.options.name);
  if (templatesMap.undefined) {
    throw Errors.Error('E0023');
  }
  const result = {};
  Object.keys(templatesMap).forEach(name => {
    var _findBestMatches$;
    const suitableTemplate = (_findBestMatches$ = findBestMatches(devices.current(), templatesMap[name], template => template.options)[0]) === null || _findBestMatches$ === void 0 ? void 0 : _findBestMatches$.element;
    if (suitableTemplate) {
      result[name] = suitableTemplate;
    }
  });
  return result;
};
export const addOneRenderedCall = template => {
  const render = template.render.bind(template);
  return extend({}, template, {
    render(options) {
      const templateResult = render(options);
      options && options.onRendered && options.onRendered();
      return templateResult;
    }
  });
};
export const addPublicElementNormalization = template => {
  const render = template.render.bind(template);
  return extend({}, template, {
    render(options) {
      const $container = $(options.container);
      return render(_extends({}, options, {
        container: getPublicElement($container)
      }));
    }
  });
};
export const getNormalizedTemplateArgs = options => {
  const args = [];
  if ('model' in options) {
    args.push(options.model);
  }
  if ('index' in options) {
    args.push(options.index);
  }
  args.push(options.container);
  return args;
};
export const validateTemplateSource = templateSource => typeof templateSource === 'string' ? domUtils.normalizeTemplateElement(templateSource) : templateSource;
export const templateKey = templateSource => typeUtils.isRenderer(templateSource) && templateSource[0] || templateSource;
export const defaultCreateElement = element => new Template(element);
export const acquireIntegrationTemplate = (templateSource, templates, isAsyncTemplate, skipTemplates) => {
  let integrationTemplate = null;
  if (!skipTemplates || skipTemplates.indexOf(templateSource) === -1) {
    integrationTemplate = templates[templateSource];
    if (integrationTemplate && !(integrationTemplate instanceof TemplateBase)) {
      if (typeUtils.isFunction(integrationTemplate.render)) {
        integrationTemplate = addPublicElementNormalization(integrationTemplate);
      }
      if (!isAsyncTemplate) {
        integrationTemplate = addOneRenderedCall(integrationTemplate);
      }
    }
  }
  return integrationTemplate;
};
export const acquireTemplate = (templateSource, createTemplate, templates, isAsyncTemplate, skipTemplates, defaultTemplates) => {
  if (templateSource == null) {
    return new EmptyTemplate();
  }
  if (templateSource instanceof ChildDefaultTemplate) {
    return defaultTemplates[templateSource.name];
  }
  if (templateSource instanceof TemplateBase) {
    return templateSource;
  }
  // TODO: templateSource.render is needed for angular2 integration. Try to remove it after supporting TypeScript modules.
  if (typeUtils.isFunction(templateSource.render) && !typeUtils.isRenderer(templateSource)) {
    return isAsyncTemplate ? templateSource : addOneRenderedCall(templateSource);
  }
  if (templateSource.nodeType || typeUtils.isRenderer(templateSource)) {
    return createTemplate($(templateSource));
  }
  return acquireIntegrationTemplate(templateSource, templates, isAsyncTemplate, skipTemplates) || defaultTemplates[templateSource] || createTemplate(templateSource);
};
export default {
  findTemplates,
  suitableTemplatesByName,
  addOneRenderedCall,
  addPublicElementNormalization,
  getNormalizedTemplateArgs,
  validateTemplateSource,
  templateKey,
  defaultCreateElement,
  acquireIntegrationTemplate,
  acquireTemplate
};