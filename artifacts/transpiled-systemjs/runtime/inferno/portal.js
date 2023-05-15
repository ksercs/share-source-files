"use strict";

System.register(["inferno"], function (_export, _context) {
  "use strict";

  var createPortal, Portal;
  return {
    setters: [function (_inferno) {
      createPortal = _inferno.createPortal;
    }],
    execute: function () {
      _export("Portal", Portal = function Portal(_ref) {
        var container = _ref.container,
          children = _ref.children;
        if (container) {
          return createPortal(children, container);
        }
        return null;
      });
    }
  };
});