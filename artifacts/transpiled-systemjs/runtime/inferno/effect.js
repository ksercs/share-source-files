"use strict";

System.register([], function (_export, _context) {
  "use strict";

  var InfernoEffect;
  function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  return {
    setters: [],
    execute: function () {
      _export("InfernoEffect", InfernoEffect = /*#__PURE__*/function () {
        function InfernoEffect(effect, dependency) {
          _classCallCheck(this, InfernoEffect);
          this.dependency = dependency;
          this.effect = effect;
          this.destroy = effect();
        }
        _createClass(InfernoEffect, [{
          key: "update",
          value: function update(dependency) {
            var currentDependency = this.dependency;
            if (dependency) {
              this.dependency = dependency;
            }
            if (!dependency || dependency.some(function (d, i) {
              return currentDependency[i] !== d;
            })) {
              this.dispose();
              this.destroy = this.effect();
            }
          }
        }, {
          key: "dispose",
          value: function dispose() {
            if (this.destroy) {
              this.destroy();
            }
          }
        }]);
        return InfernoEffect;
      }());
    }
  };
});