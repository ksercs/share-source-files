import $ from '../../../core/renderer';
import { TemplateBase } from '../../../core/templates/template_base';
export class EmptyTemplate extends TemplateBase {
  _renderCore() {
    return $();
  }
}