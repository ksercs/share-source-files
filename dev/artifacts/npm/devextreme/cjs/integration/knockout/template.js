/**
* DevExtreme (cjs/integration/knockout/template.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.KoTemplate = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _knockout = _interopRequireDefault(require("knockout"));
var _type = require("../../core/utils/type");
var _template_base = require("../../core/templates/template_base");
var _dom = require("../../core/utils/dom");
var _utils = require("./utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); } // eslint-disable-next-line no-restricted-imports
var getParentContext = function getParentContext(data) {
  var parentNode = _dom_adapter.default.createElement('div');
  _knockout.default.applyBindingsToNode(parentNode, null, data);
  var parentContext = _knockout.default.contextFor(parentNode);
  _knockout.default.cleanNode(parentNode);
  return parentContext;
};
var KoTemplate = /*#__PURE__*/function (_TemplateBase) {
  _inheritsLoose(KoTemplate, _TemplateBase);
  function KoTemplate(element) {
    var _this;
    _this = _TemplateBase.call(this) || this;
    _this._element = element;
    _this._template = (0, _renderer.default)('<div>').append((0, _dom.normalizeTemplateElement)(element));
    _this._registerKoTemplate();
    return _this;
  }
  var _proto = KoTemplate.prototype;
  _proto._registerKoTemplate = function _registerKoTemplate() {
    var template = this._template.get(0);
    new _knockout.default.templateSources.anonymousTemplate(template)['nodes'](template);
  };
  _proto._prepareDataForContainer = function _prepareDataForContainer(data, container) {
    if (container && container.length) {
      var node = (0, _utils.getClosestNodeWithContext)(container.get(0));
      var containerContext = _knockout.default.contextFor(node);
      data = data !== undefined ? data : _knockout.default.dataFor(node) || {};
      if (containerContext) {
        return data === containerContext.$data ? containerContext : containerContext.createChildContext(data);
      }
    }

    // workaround for https://github.com/knockout/knockout/pull/651
    return getParentContext(data).createChildContext(data);
  };
  _proto._renderCore = function _renderCore(options) {
    var model = this._prepareDataForContainer(options.model, (0, _renderer.default)(options.container));
    if ((0, _type.isDefined)(options.index)) {
      model.$index = options.index;
    }
    var $placeholder = (0, _renderer.default)('<div>').appendTo(options.container);
    var $result;
    _knockout.default.renderTemplate(this._template.get(0), model, {
      afterRender: function afterRender(nodes) {
        $result = (0, _renderer.default)(nodes);
      }
    }, $placeholder.get(0), 'replaceNode');
    return $result;
  };
  _proto.source = function source() {
    return (0, _renderer.default)(this._element).clone();
  };
  _proto.dispose = function dispose() {
    this._template.remove();
  };
  return KoTemplate;
}(_template_base.TemplateBase);
exports.KoTemplate = KoTemplate;
