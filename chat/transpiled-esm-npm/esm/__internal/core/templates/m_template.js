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