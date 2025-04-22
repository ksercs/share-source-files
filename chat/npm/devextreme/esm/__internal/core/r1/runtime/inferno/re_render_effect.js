/**
* DevExtreme (esm/__internal/core/r1/runtime/inferno/re_render_effect.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable spellcheck/spell-checker */
import { rerender as reRender } from 'inferno';
import { InfernoEffect } from './effect';
export const createReRenderEffect = () => new InfernoEffect(() => {
  reRender();
}, []);
