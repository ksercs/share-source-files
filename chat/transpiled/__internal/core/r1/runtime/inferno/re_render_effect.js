"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReRenderEffect = void 0;
var _inferno = require("inferno");
var _effect = require("./effect");
/* eslint-disable spellcheck/spell-checker */

const createReRenderEffect = () => new _effect.InfernoEffect(() => {
  (0, _inferno.rerender)();
}, []);
exports.createReRenderEffect = createReRenderEffect;