/**
* DevExtreme (esm/__internal/core/r1/runtime/inferno/effect.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/prefer-readonly */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
export class InfernoEffect {
  constructor(effect, dependency) {
    this.dependency = dependency;
    this.effect = effect;
    this.destroy = effect();
  }
  update(dependency) {
    const currentDependency = this.dependency;
    if (dependency) {
      this.dependency = dependency;
    }
    if (!dependency || dependency.some((d, i) => currentDependency[i] !== d)) {
      this.dispose();
      this.destroy = this.effect();
    }
  }
  dispose() {
    if (this.destroy) {
      this.destroy();
    }
  }
}
