/**
* DevExtreme (esm/renovation/utils/diagnostic.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getWindow } from '../../core/utils/window';
export var DiagnosticUtils = {
  resolveMap: () => {
    var diagnosticWindow = getWindow();
    if (!diagnosticWindow.dxDiagnostic) {
      diagnosticWindow.dxDiagnostic = {};
    }
    return diagnosticWindow.dxDiagnostic;
  },
  getDiagnostic: key => {
    var diagnosticMap = DiagnosticUtils.resolveMap();
    if (!diagnosticMap[key]) {
      diagnosticMap[key] = {
        renderCount: 0
      };
    }
    return diagnosticMap[key];
  },
  incrementRenderCount: key => {
    var diagnostic = DiagnosticUtils.getDiagnostic(key);
    diagnostic.renderCount += 1;
  }
};
