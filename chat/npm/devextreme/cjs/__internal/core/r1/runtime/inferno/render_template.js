/**
* DevExtreme (cjs/__internal/core/r1/runtime/inferno/render_template.js)
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
exports.hasTemplate = void 0;
exports.renderTemplate = renderTemplate;
var _inferno = require("inferno");
var _infernoCreateElement = require("inferno-create-element");
/* eslint-disable @stylistic/function-paren-newline */
/* eslint-disable @stylistic/member-delimiter-style */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable import/no-extraneous-dependencies */

const getContainer = props => {
  var _props$container, _props$item;
  return ((_props$container = props.container) === null || _props$container === void 0 ? void 0 : _props$container.get(0)) || ((_props$item = props.item) === null || _props$item === void 0 ? void 0 : _props$item.get(0));
};
function renderTemplate(template, props, _component) {
  setTimeout(() => {
    (0, _inferno.render)((0, _infernoCreateElement.createElement)(template, props), getContainer(props));
  }, 0);
}
const hasTemplate = (name, properties, _component) => {
  const value = properties[name];
  return !!value && typeof value !== 'string';
};
exports.hasTemplate = hasTemplate;
