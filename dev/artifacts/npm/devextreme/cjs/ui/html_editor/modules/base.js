/**
* DevExtreme (cjs/ui/html_editor/modules/base.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
var _empty = _interopRequireDefault(require("./empty"));
var _type = require("../../../core/utils/type");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var BaseModule = _empty.default;
if (_devextremeQuill.default) {
  var BaseQuillModule = _devextremeQuill.default.import('core/module');
  BaseModule = /*#__PURE__*/function (_BaseQuillModule) {
    _inheritsLoose(BaseHtmlEditorModule, _BaseQuillModule);
    function BaseHtmlEditorModule(quill, options) {
      var _this;
      _this = _BaseQuillModule.call(this, quill, options) || this;
      _this.editorInstance = options.editorInstance;
      return _this;
    }
    var _proto = BaseHtmlEditorModule.prototype;
    _proto.saveValueChangeEvent = function saveValueChangeEvent(event) {
      this.editorInstance._saveValueChangeEvent(event);
    };
    _proto.addCleanCallback = function addCleanCallback(callback) {
      this.editorInstance.addCleanCallback(callback);
    };
    _proto.handleOptionChangeValue = function handleOptionChangeValue(changes) {
      var _this2 = this;
      if ((0, _type.isObject)(changes)) {
        Object.entries(changes).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            name = _ref2[0],
            value = _ref2[1];
          return _this2.option(name, value);
        });
      } else if (!(0, _type.isDefined)(changes)) {
        this === null || this === void 0 ? void 0 : this.clean();
      }
    };
    return BaseHtmlEditorModule;
  }(BaseQuillModule);
}
var _default = BaseModule;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
