"use strict";

exports.HeaderPanel = void 0;
var _component = _interopRequireDefault(require("../common/component"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var HeaderPanel = /*#__PURE__*/function (_Component) {
  _inheritsLoose(HeaderPanel, _Component);
  function HeaderPanel() {
    return _Component.apply(this, arguments) || this;
  }
  var _proto = HeaderPanel.prototype;
  _proto._setOptionsByReference = function _setOptionsByReference() {
    _Component.prototype._setOptionsByReference.call(this);
    this._optionsByReference = _extends({}, this._optionsByReference, {
      dateHeaderData: true,
      resourceCellTemplate: true,
      dateCellTemplate: true,
      timeCellTemplate: true
    });
  };
  return HeaderPanel;
}(_component.default);
exports.HeaderPanel = HeaderPanel;