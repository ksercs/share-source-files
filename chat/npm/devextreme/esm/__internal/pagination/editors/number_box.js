/**
* DevExtreme (esm/__internal/pagination/editors/number_box.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode } from "inferno";
import { BaseInfernoComponent } from '../../core/r1/runtime/inferno/index';
import LegacyNumberBox from '../../../ui/number_box';
import { DomComponentWrapper } from '../../core/r1/dom_component_wrapper';
import { EditorLabelDefaultProps } from './common/editor_label_props';
import { EditorDefaultProps } from './common/editor_props';
import { EditorStateDefaultProps } from './common/editor_state_props';
const DEFAULT_VALUE = 0;
export const NumberBoxDefaultProps = _extends({}, EditorDefaultProps, EditorStateDefaultProps, EditorLabelDefaultProps, {
  value: DEFAULT_VALUE,
  isReactComponentWrapper: true
});
export class NumberBox extends BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.state = {};
    this.refs = null;
  }
  /* istanbul ignore next: WA for Angular */
  get componentProps() {
    return this.props;
  }
  render() {
    return createComponentVNode(2, DomComponentWrapper, {
      "componentType": LegacyNumberBox,
      "componentProps": this.componentProps,
      "templateNames": []
    });
  }
}
NumberBox.defaultProps = NumberBoxDefaultProps;
