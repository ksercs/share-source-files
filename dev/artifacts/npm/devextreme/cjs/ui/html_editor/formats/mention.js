/**
* DevExtreme (cjs/ui/html_editor/formats/mention.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _templates_storage = _interopRequireDefault(require("../utils/templates_storage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var Mention = {};
if (_devextremeQuill.default) {
  var Embed = _devextremeQuill.default.import('blots/embed');
  var MENTION_CLASS = 'dx-mention';
  Mention = /*#__PURE__*/function (_Embed) {
    _inheritsLoose(Mention, _Embed);
    function Mention() {
      return _Embed.apply(this, arguments) || this;
    }
    Mention.create = function create(data) {
      var node = _Embed.create.call(this);
      node.setAttribute('spellcheck', false);
      node.dataset.marker = data.marker;
      node.dataset.mentionValue = data.value;
      node.dataset.id = data.id;
      this.renderContent(node, data);
      return node;
    };
    Mention.value = function value(node) {
      return {
        marker: node.dataset.marker,
        id: node.dataset.id,
        value: node.dataset.mentionValue
      };
    };
    Mention.renderContent = function renderContent(node, data) {
      var template = this._templatesStorage.get({
        editorKey: data.keyInTemplateStorage,
        marker: data.marker
      });
      if (template) {
        template.render({
          model: data,
          container: node
        });
      } else {
        this.baseContentRender(node, data);
      }
    };
    Mention.baseContentRender = function baseContentRender(node, data) {
      var $marker = (0, _renderer.default)('<span>').text(data.marker);
      (0, _renderer.default)(node).append($marker).append(data.value);
    };
    Mention.addTemplate = function addTemplate(data, template) {
      this._templatesStorage.set(data, template);
    };
    Mention.removeTemplate = function removeTemplate(data) {
      this._templatesStorage.delete(data);
    };
    return Mention;
  }(Embed);
  Mention.blotName = 'mention';
  Mention.tagName = 'span';
  Mention.className = MENTION_CLASS;
  Mention._templatesStorage = new _templates_storage.default();
}
var _default = Mention;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
