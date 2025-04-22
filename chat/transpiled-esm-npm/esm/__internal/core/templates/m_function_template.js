import { TemplateBase } from '../../../core/templates/template_base';
import { normalizeTemplateElement } from '../../../core/utils/dom';
export class FunctionTemplate extends TemplateBase {
  constructor(render) {
    super();
    this._render = render;
  }
  // @ts-expect-error need type overload
  _renderCore(options) {
    return normalizeTemplateElement(this._render(options));
  }
}