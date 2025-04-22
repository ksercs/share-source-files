/**
* DevExtreme (esm/__internal/ui/check_box/check_box_icon.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["size"];
import { createVNode } from "inferno";
/* eslint-disable @typescript-eslint/no-unsafe-return */
import '../../../ui/themes';
import { normalizeStyleProp } from '../../../core/utils/style';
import { BaseInfernoComponent, normalizeStyles } from '../../core/r1/runtime/inferno/index';
import { createRef as infernoCreateRef } from 'inferno';
export const defaultCheckBoxIconProps = {};
export class CheckBoxIcon extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.elementRef = infernoCreateRef();
    this.__getterCache = {};
  }
  get cssStyles() {
    if (this.__getterCache.cssStyles !== undefined) {
      return this.__getterCache.cssStyles;
    }
    // eslint-disable-next-line no-return-assign
    return this.__getterCache.cssStyles = (() => {
      const {
        size
      } = this.props;
      const fontSize = normalizeStyleProp('fontSize', size);
      return {
        fontSize
      };
    })();
  }
  get restAttributes() {
    const _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  componentWillUpdate(nextProps) {
    if (this.props.size !== nextProps.size) {
      this.__getterCache.cssStyles = undefined;
    }
  }
  render() {
    const {
      elementRef,
      cssStyles
    } = this;
    return createVNode(1, "span", "dx-checkbox-icon", null, 1, {
      "style": normalizeStyles(cssStyles)
    }, null, elementRef);
  }
}
CheckBoxIcon.defaultProps = defaultCheckBoxIconProps;
