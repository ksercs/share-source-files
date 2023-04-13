"use strict";

exports.DiagnosticUtils = void 0;
var _window = require("../../core/utils/window");
var DiagnosticUtils = {
  resolveMap: function resolveMap() {
    var diagnosticWindow = (0, _window.getWindow)();
    if (!diagnosticWindow.dxDiagnostic) {
      diagnosticWindow.dxDiagnostic = {};
    }
    return diagnosticWindow.dxDiagnostic;
  },
  getDiagnostic: function getDiagnostic(key) {
    var diagnosticMap = DiagnosticUtils.resolveMap();
    if (!diagnosticMap[key]) {
      diagnosticMap[key] = {
        renderCount: 0
      };
    }
    return diagnosticMap[key];
  },
  incrementRenderCount: function incrementRenderCount(key) {
    var diagnostic = DiagnosticUtils.getDiagnostic(key);
    diagnostic.renderCount += 1;
  }
};
exports.DiagnosticUtils = DiagnosticUtils;