"use strict";

exports.hideCallback = void 0;
var hideCallback = function () {
  var callbacks = [];
  return {
    add: function add(callback) {
      if (!callbacks.includes(callback)) {
        callbacks.push(callback);
      }
    },
    remove: function remove(callback) {
      var indexOfCallback = callbacks.indexOf(callback);
      if (indexOfCallback !== -1) {
        callbacks.splice(indexOfCallback, 1);
      }
    },
    fire: function fire() {
      var callback = callbacks.pop();
      var result = !!callback;
      if (result) {
        callback();
      }
      return result;
    },
    hasCallback: function hasCallback() {
      return callbacks.length > 0;
    }
    ///#DEBUG
    // eslint-disable-next-line comma-style
    ,
    reset: function reset() {
      callbacks = [];
    }
    ///#ENDDEBUG
  };
}();
exports.hideCallback = hideCallback;