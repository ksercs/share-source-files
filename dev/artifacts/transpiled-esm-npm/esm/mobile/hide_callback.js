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