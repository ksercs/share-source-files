/**
* DevExtreme (cjs/__internal/grids/grid_core/module_accessibility.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerKeyboardAction = void 0;
var accessibility = __importStar(require("../../../ui/shared/accessibility"));
var registerKeyboardAction = function (viewName, instance, $element, selector, action) {
    var keyboardController = instance.getController('keyboardNavigation');
    if (instance.option('useLegacyKeyboardNavigation') || (keyboardController && !keyboardController.isKeyboardEnabled())) {
        return;
    }
    var executeKeyDown = function (args) {
        instance.executeAction('onKeyDown', args);
    };
    instance.createAction('onKeyDown');
    accessibility.registerKeyboardAction(viewName, instance, $element, selector, action, executeKeyDown);
};
exports.registerKeyboardAction = registerKeyboardAction;
