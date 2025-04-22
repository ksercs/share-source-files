/**
* DevExtreme (esm/__internal/core/templates/m_function_template.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
