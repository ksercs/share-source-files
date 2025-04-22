/**
* DevExtreme (esm/__internal/ui/button/ink_ripple.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode, normalizeProps } from "inferno";
import { hideWave, initConfig, showWave } from '../../../ui/widget/utils.ink_ripple';
import { BaseInfernoComponent } from '../../core/r1/runtime/inferno/index';
export class InkRipple extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.__getterCache = {};
    this.state = {};
    this.hideWave = this.hideWave.bind(this);
    this.showWave = this.showWave.bind(this);
  }
  get getConfig() {
    if (this.__getterCache.getConfig !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.__getterCache.getConfig;
    }
    // eslint-disable-next-line no-return-assign
    return this.__getterCache.getConfig = (() => {
      const {
        config
      } = this.props;
      return initConfig(config);
    })();
  }
  get restAttributes() {
    const restProps = _extends({}, this.props);
    delete restProps.config;
    return restProps;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideWave(opts) {
    hideWave(this.getConfig, opts);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  showWave(opts) {
    showWave(this.getConfig, opts);
  }
  componentWillUpdate(nextProps) {
    if (this.props.config !== nextProps.config) {
      this.__getterCache.getConfig = undefined;
    }
  }
  render() {
    return normalizeProps(createVNode(1, "div", "dx-inkripple", null, 1, _extends({}, this.restAttributes)));
  }
}
InkRipple.defaultProps = {
  config: {}
};
