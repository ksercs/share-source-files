/**
* DevExtreme (cjs/ui/validation_group.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _dom_component = _interopRequireDefault(require("../core/dom_component"));
var _validation_summary = _interopRequireDefault(require("./validation_summary"));
var _validation_engine = _interopRequireDefault(require("./validation_engine"));
var _validator = _interopRequireDefault(require("./validator"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var VALIDATION_ENGINE_CLASS = 'dx-validationgroup';
var VALIDATOR_CLASS = 'dx-validator';
var VALIDATION_SUMMARY_CLASS = 'dx-validationsummary';
var ValidationGroup = /*#__PURE__*/function (_DOMComponent) {
  _inheritsLoose(ValidationGroup, _DOMComponent);
  function ValidationGroup() {
    return _DOMComponent.apply(this, arguments) || this;
  }
  var _proto = ValidationGroup.prototype;
  _proto._getDefaultOptions = function _getDefaultOptions() {
    return _DOMComponent.prototype._getDefaultOptions.call(this);

    /**
    * @name dxValidationGroupOptions.rtlEnabled
    * @hidden
    */

    /**
    * @name dxValidationGroup.beginUpdate
    * @publicName beginUpdate()
    * @hidden
    */
    /**
    * @name dxValidationGroup.defaultOptions
    * @publicName defaultOptions(rule)
    * @hidden
    */
    /**
    * @name dxValidationGroup.endUpdate
    * @publicName endUpdate()
    * @hidden
    */
  };
  _proto._init = function _init() {
    _DOMComponent.prototype._init.call(this);
    _validation_engine.default.addGroup(this);
  };
  _proto._initMarkup = function _initMarkup() {
    var $element = this.$element();
    $element.addClass(VALIDATION_ENGINE_CLASS);
    $element.find(".".concat(VALIDATOR_CLASS)).each(function (_, validatorContainer) {
      _validator.default.getInstance((0, _renderer.default)(validatorContainer))._initGroupRegistration();
    });
    $element.find(".".concat(VALIDATION_SUMMARY_CLASS)).each(function (_, summaryContainer) {
      _validation_summary.default.getInstance((0, _renderer.default)(summaryContainer)).refreshValidationGroup();
    });
    _DOMComponent.prototype._initMarkup.call(this);
  };
  _proto.validate = function validate() {
    return _validation_engine.default.validateGroup(this);
  };
  _proto.reset = function reset() {
    return _validation_engine.default.resetGroup(this);
  };
  _proto._dispose = function _dispose() {
    _validation_engine.default.removeGroup(this);
    this.$element().removeClass(VALIDATION_ENGINE_CLASS);
    _DOMComponent.prototype._dispose.call(this);
  };
  _proto._useTemplates = function _useTemplates() {
    return false;
  };
  return ValidationGroup;
}(_dom_component.default);
(0, _component_registrator.default)('dxValidationGroup', ValidationGroup);
var _default = ValidationGroup;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
