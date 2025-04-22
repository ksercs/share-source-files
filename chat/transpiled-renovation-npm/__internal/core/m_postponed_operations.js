"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostponedOperations = void 0;
var _deferred = require("../../core/utils/deferred");
var _type = require("../../core/utils/type");
class PostponedOperations {
  constructor() {
    this._postponedOperations = {};
  }
  add(key, fn, postponedPromise) {
    if (key in this._postponedOperations) {
      postponedPromise && this._postponedOperations[key].promises.push(postponedPromise);
    } else {
      // @ts-expect-error only void function can be called with new
      const completePromise = new _deferred.Deferred();
      this._postponedOperations[key] = {
        fn,
        completePromise,
        promises: postponedPromise ? [postponedPromise] : []
      };
    }
    return this._postponedOperations[key].completePromise.promise();
  }
  callPostponedOperations() {
    for (const key in this._postponedOperations) {
      const operation = this._postponedOperations[key];
      if ((0, _type.isDefined)(operation)) {
        if (operation.promises && operation.promises.length) {
          (0, _deferred.when)(...operation.promises).done(operation.fn).then(operation.completePromise.resolve);
        } else {
          operation.fn().done(operation.completePromise.resolve);
        }
      }
    }
    this._postponedOperations = {};
  }
}
exports.PostponedOperations = PostponedOperations;