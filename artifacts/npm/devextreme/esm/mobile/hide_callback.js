/**
* DevExtreme (esm/mobile/hide_callback.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export var hideCallback = function () {
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
  };
}();
