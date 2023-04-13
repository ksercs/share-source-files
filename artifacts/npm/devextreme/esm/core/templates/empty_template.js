/**
* DevExtreme (esm/core/templates/empty_template.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../renderer';
import { TemplateBase } from './template_base';
export class EmptyTemplate extends TemplateBase {
  _renderCore() {
    return $();
  }
}
