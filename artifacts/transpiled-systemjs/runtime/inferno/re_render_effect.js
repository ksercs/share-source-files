"use strict";

System.register(["inferno", "./effect"], function (_export, _context) {
  "use strict";

  var reRender, InfernoEffect, createReRenderEffect;
  return {
    setters: [function (_inferno) {
      reRender = _inferno.rerender;
    }, function (_effect) {
      InfernoEffect = _effect.InfernoEffect;
    }],
    execute: function () {
      _export("createReRenderEffect", createReRenderEffect = function createReRenderEffect() {
        return new InfernoEffect(function () {
          reRender();
        }, []);
      });
    }
  };
});