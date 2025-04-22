"use strict";

Object.defineProperty(exports, "getCurrentTemplateEngine", {
  enumerable: true,
  get: function () {
    return _m_template_engine_registry.getCurrentTemplateEngine;
  }
});
Object.defineProperty(exports, "registerTemplateEngine", {
  enumerable: true,
  get: function () {
    return _m_template_engine_registry.registerTemplateEngine;
  }
});
Object.defineProperty(exports, "setTemplateEngine", {
  enumerable: true,
  get: function () {
    return _m_template_engine_registry.setTemplateEngine;
  }
});
var _m_template_engine_registry = require("../../__internal/core/templates/m_template_engine_registry");