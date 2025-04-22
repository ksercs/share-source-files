"use strict";

var _knockout = _interopRequireDefault(require("knockout"));
var _variable_wrapper = _interopRequireDefault(require("../../core/utils/variable_wrapper"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line no-restricted-imports

if (_knockout.default) {
  _variable_wrapper.default.inject({
    isWrapped: _knockout.default.isObservable,
    isWritableWrapped: _knockout.default.isWritableObservable,
    wrap: _knockout.default.observable,
    unwrap: function (value) {
      if (_knockout.default.isObservable(value)) {
        return _knockout.default.utils.unwrapObservable(value);
      }
      return this.callBase(value);
    },
    assign: function (variable, value) {
      if (_knockout.default.isObservable(variable)) {
        variable(value);
      } else {
        this.callBase(variable, value);
      }
    }
  });
}