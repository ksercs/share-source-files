"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationConfigProviderDefaultProps = exports.PaginationConfigProvider = void 0;
var _index = require("../../core/r1/runtime/inferno/index");
var _pagination_config_context = require("./pagination_config_context");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-explicit-any */
const PaginationConfigProviderDefaultProps = exports.PaginationConfigProviderDefaultProps = {};
class PaginationConfigProvider extends _index.BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.state = {};
  }
  getConfig() {
    return {
      isGridCompatibilityMode: this.props.isGridCompatibilityMode
    };
  }
  getChildContext() {
    return _extends({}, this.context, {
      [_pagination_config_context.PaginationConfigContext.id]: this.getConfig() || _pagination_config_context.PaginationConfigContext.defaultValue
    });
  }
  render() {
    return this.props.children;
  }
}
exports.PaginationConfigProvider = PaginationConfigProvider;
PaginationConfigProvider.defaultProps = PaginationConfigProviderDefaultProps;