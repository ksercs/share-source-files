/**
* DevExtreme (esm/__internal/core/templates/m_template.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import { TemplateBase } from '../../../core/templates/template_base';
import { getCurrentTemplateEngine, registerTemplateEngine, setTemplateEngine } from '../../../core/templates/template_engine_registry';
import { normalizeTemplateElement } from '../../../core/utils/dom';
registerTemplateEngine('default', {
  compile: element => normalizeTemplateElement(element),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: (template, model, index) => template.clone()
});
setTemplateEngine('default');
export class Template extends TemplateBase {
  constructor(element) {
    super();
    this._element = element;
  }
  // @ts-expect-error need type overload
  _renderCore(options) {
    const {
      transclude
    } = options;
    if (!transclude && !this._compiledTemplate) {
      this._compiledTemplate = getCurrentTemplateEngine().compile(this._element);
    }
    return $('<div>').append(transclude ? this._element : getCurrentTemplateEngine().render(this._compiledTemplate, options.model, options.index)).contents();
  }
  source() {
    return $(this._element).clone();
  }
}
