/**
* DevExtreme (esm/core/templates/template_engines.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extractTemplateMarkup } from '../utils/dom';
import { registerTemplateEngine } from './template_engine_registry';
registerTemplateEngine('jquery-tmpl', {
  compile: element => extractTemplateMarkup(element),
  render: (template, data) => {
    /* global jQuery */
    return jQuery.tmpl(template, data);
  }
});
registerTemplateEngine('jsrender', {
  compile: element => {
    /* global jsrender */
    return (jQuery ? jQuery : jsrender).templates(extractTemplateMarkup(element));
  },
  render: (template, data) => template.render(data)
});
registerTemplateEngine('mustache', {
  compile: element => {
    /* global Mustache */
    return extractTemplateMarkup(element);
  },
  render: (template, data) => Mustache.render(template, data)
});
registerTemplateEngine('hogan', {
  compile: element => {
    /* global Hogan */
    return Hogan.compile(extractTemplateMarkup(element));
  },
  render: (template, data) => template.render(data)
});
registerTemplateEngine('underscore', {
  compile: element => {
    /* global _ */
    return _.template(extractTemplateMarkup(element));
  },
  render: (template, data) => template(data)
});
registerTemplateEngine('handlebars', {
  compile: element => {
    /* global Handlebars */
    return Handlebars.compile(extractTemplateMarkup(element));
  },
  render: (template, data) => template(data)
});
registerTemplateEngine('doT', {
  compile: element => {
    /* global doT */
    return doT.template(extractTemplateMarkup(element));
  },
  render: (template, data) => template(data)
});
