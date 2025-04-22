/**
* DevExtreme (cjs/__internal/core/r1/config_provider.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigProviderDefaultProps = exports.ConfigProvider = void 0;
var _index = require("../../core/r1/runtime/inferno/index");
var _config_context = require("./config_context");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-unsafe-return */ /* eslint-disable @typescript-eslint/no-explicit-any */
const ConfigProviderDefaultProps = exports.ConfigProviderDefaultProps = {};
class ConfigProvider extends _index.BaseInfernoComponent {
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
      [_config_context.ConfigContext.id]: this.config || _config_context.ConfigContext.defaultValue
    });
  }
  render() {
    return this.props.children;
  }
}
exports.ConfigProvider = ConfigProvider;
ConfigProvider.defaultProps = ConfigProviderDefaultProps;
