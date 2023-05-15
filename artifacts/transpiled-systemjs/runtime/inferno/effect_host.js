"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var InfernoEffectHost;
  return {
    setters: [],
    execute: function () {
      _export("InfernoEffectHost", InfernoEffectHost = {
        lockCount: 0,
        lock: function lock() {
          this.lockCount++;
        },
        callbacks: [],
        callEffects: function callEffects() {
          this.lockCount--;
          if (this.lockCount < 0) {
            throw new Error('Unexpected Effect Call');
          }
          if (this.lockCount === 0) {
            var effects = this.callbacks;
            this.callbacks = [];
            effects.forEach(function (callback) {
              return callback();
            });
          }
        }
      });
    }
  };
});