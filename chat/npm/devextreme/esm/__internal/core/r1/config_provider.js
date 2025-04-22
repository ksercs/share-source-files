/**
* DevExtreme (esm/__internal/core/r1/config_provider.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseInfernoComponent } from '../../core/r1/runtime/inferno/index';
import { ConfigContext } from './config_context';
export const ConfigProviderDefaultProps = {};
export class ConfigProvider extends BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.__getterCache = {};
  }
  get config() {
    if (this.__getterCache.config !== undefined) {
      return this.__getterCache.config;
    }
    // eslint-disable-next-line no-return-assign
    return this.__getterCache.config = (() => ({
      rtlEnabled: this.props.rtlEnabled
    }))();
  }
  componentWillUpdate(nextProps) {
    if (this.props.rtlEnabled !== nextProps.rtlEnabled) {
      this.__getterCache.config = undefined;
    }
  }
  getChildContext() {
    return _extends({}, this.context, {
      [ConfigContext.id]: this.config || ConfigContext.defaultValue
    });
  }
  render() {
    return this.props.children;
  }
}
ConfigProvider.defaultProps = ConfigProviderDefaultProps;
