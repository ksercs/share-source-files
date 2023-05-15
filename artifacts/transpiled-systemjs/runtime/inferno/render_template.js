"use strict";

System.register(["inferno", "inferno-create-element"], function (_export, _context) {
  "use strict";

  var render, createElement, getContainer, hasTemplate;
  function renderTemplate(template, props, _component) {
    setTimeout(function () {
      render(createElement(template, props), getContainer(props));
    }, 0);
  }
  _export("renderTemplate", renderTemplate);
  return {
    setters: [function (_inferno) {
      render = _inferno.render;
    }, function (_infernoCreateElement) {
      createElement = _infernoCreateElement.createElement;
    }],
    execute: function () {
      getContainer = function getContainer(props) {
        var _a, _b;
        return ((_a = props.container) === null || _a === void 0 ? void 0 : _a.get(0)) || ((_b = props.item) === null || _b === void 0 ? void 0 : _b.get(0));
      };
      _export("hasTemplate", hasTemplate = function hasTemplate(name, properties, _component) {
        var value = properties[name];
        return !!value && typeof value !== 'string';
      });
    }
  };
});