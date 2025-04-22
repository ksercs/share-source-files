"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionTemplate = void 0;
var _template_base = require("../../../core/templates/template_base");
var _dom = require("../../../core/utils/dom");
class FunctionTemplate extends _template_base.TemplateBase {
  constructor(render) {
    super();
    this._render = render;
  }
  // @ts-expect-error need type overload
  _renderCore(options) {
    return (0, _dom.normalizeTemplateElement)(this._render(options));
  }
}
exports.FunctionTemplate = FunctionTemplate;