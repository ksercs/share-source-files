"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageDefaultProps = exports.Page = void 0;
var _inferno = require("inferno");
var _index = require("../../core/r1/runtime/inferno/index");
var _string = require("../../../core/utils/string");
var _render_utils = require("../../core/r1/utils/render_utils");
var _consts = require("../common/consts");
var _light_button = require("../common/light_button");
var _compatibility_utils = require("../utils/compatibility_utils");
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* istanbul ignore next: class has only props default */
const PageDefaultProps = exports.PageDefaultProps = {
  index: 0,
  selected: false,
  className: _consts.PAGINATION_PAGE_CLASS
};
class Page extends _index.BaseInfernoComponent {
  constructor() {
    super(...arguments);
    this.state = {};
    this.refs = null;
  }
  getLabel() {
    return (0, _string.format)((0, _compatibility_utils.getLocalizationMessage)(this.context, 'dxPagination-page'), this.getValue());
  }
  getValue() {
    return this.props.index + 1;
  }
  getClassName() {
    return (0, _render_utils.combineClasses)({
      [`${this.props.className}`]: !!this.props.className,
      [_consts.PAGINATION_SELECTION_CLASS]: !!this.props.selected
    });
  }
  render() {
    return (0, _inferno.createComponentVNode)(2, _light_button.LightButton, {
      "className": this.getClassName(),
      "label": this.getLabel(),
      "onClick": this.props.onClick,
      "selected": this.props.selected,
      children: this.getValue()
    });
  }
}
exports.Page = Page;
Page.defaultProps = PageDefaultProps;