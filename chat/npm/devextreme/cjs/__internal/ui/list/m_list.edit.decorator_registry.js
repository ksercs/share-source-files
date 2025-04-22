/**
* DevExtreme (cjs/__internal/ui/list/m_list.edit.decorator_registry.js)
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
exports.register = register;
exports.registry = void 0;
var _extend = require("../../../core/utils/extend");
const registry = exports.registry = {};
function register(option, type, decoratorClass) {
  const decoratorsRegistry = registry;
  const decoratorConfig = {};
  decoratorConfig[option] = decoratorsRegistry[option] ? decoratorsRegistry[option] : {};
  decoratorConfig[option][type] = decoratorClass;
  (0, _extend.extend)(decoratorsRegistry, decoratorConfig);
}
