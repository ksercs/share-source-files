!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/text_box/ui.text_editor.label.js"], ["../../core/renderer","../../core/guid"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/text_box/ui.text_editor.label.js", ["../../core/renderer", "../../core/guid"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.TextEditorLabel = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _guid = _interopRequireDefault($__require("../../core/guid"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var TEXTEDITOR_LABEL_CLASS = 'dx-texteditor-label';
  var TEXTEDITOR_WITH_LABEL_CLASS = 'dx-texteditor-with-label';
  var TEXTEDITOR_WITH_FLOATING_LABEL_CLASS = 'dx-texteditor-with-floating-label';
  var TEXTEDITOR_WITH_BEFORE_BUTTONS_CLASS = 'dx-texteditor-with-before-buttons';
  var LABEL_BEFORE_CLASS = 'dx-label-before';
  var LABEL_CLASS = 'dx-label';
  var LABEL_AFTER_CLASS = 'dx-label-after';
  var TextEditorLabel = /*#__PURE__*/function () {
    function TextEditorLabel(_ref) {
      var $editor = _ref.$editor,
          text = _ref.text,
          mode = _ref.mode,
          mark = _ref.mark,
          containsButtonsBefore = _ref.containsButtonsBefore,
          containerWidth = _ref.containerWidth,
          beforeWidth = _ref.beforeWidth;
      this._props = {
        $editor: $editor,
        text: text,
        mode: mode,
        mark: mark,
        containsButtonsBefore: containsButtonsBefore,
        containerWidth: containerWidth,
        beforeWidth: beforeWidth
      };
      this._id = "".concat(TEXTEDITOR_LABEL_CLASS, "-").concat(new _guid.default());
      this._render();
      this._toggleMarkupVisibility();
    }
    var _proto = TextEditorLabel.prototype;
    _proto._isVisible = function _isVisible() {
      return !!this._props.text && this._props.mode !== 'hidden';
    };
    _proto._render = function _render() {
      this._$before = (0, _renderer.default)('<div>').addClass(LABEL_BEFORE_CLASS);
      this._$labelSpan = (0, _renderer.default)('<span>');
      this._$label = (0, _renderer.default)('<div>').addClass(LABEL_CLASS).append(this._$labelSpan);
      this._$after = (0, _renderer.default)('<div>').addClass(LABEL_AFTER_CLASS);
      this._$root = (0, _renderer.default)('<div>').addClass(TEXTEDITOR_LABEL_CLASS).attr('id', this._id).append(this._$before).append(this._$label).append(this._$after);
      this._updateMark();
      this._updateText();
      this._updateBeforeWidth();
      this._updateMaxWidth();
    };
    _proto._toggleMarkupVisibility = function _toggleMarkupVisibility() {
      var visible = this._isVisible();
      this._updateEditorBeforeButtonsClass(visible);
      this._updateEditorLabelClass(visible);
      visible ? this._$root.appendTo(this._props.$editor) : this._$root.detach();
    };
    _proto._updateEditorLabelClass = function _updateEditorLabelClass(visible) {
      this._props.$editor.removeClass(TEXTEDITOR_WITH_FLOATING_LABEL_CLASS).removeClass(TEXTEDITOR_WITH_LABEL_CLASS);
      if (visible) {
        var labelClass = this._props.mode === 'floating' ? TEXTEDITOR_WITH_FLOATING_LABEL_CLASS : TEXTEDITOR_WITH_LABEL_CLASS;
        this._props.$editor.addClass(labelClass);
      }
    };
    _proto._updateEditorBeforeButtonsClass = function _updateEditorBeforeButtonsClass() {
      var visible = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._isVisible();
      this._props.$editor.removeClass(TEXTEDITOR_WITH_BEFORE_BUTTONS_CLASS);
      if (visible) {
        var beforeButtonsClass = this._props.containsButtonsBefore ? TEXTEDITOR_WITH_BEFORE_BUTTONS_CLASS : '';
        this._props.$editor.addClass(beforeButtonsClass);
      }
    };
    _proto._updateMark = function _updateMark() {
      this._$labelSpan.attr('data-mark', this._props.mark);
    };
    _proto._updateText = function _updateText() {
      this._$labelSpan.text(this._props.text);
    };
    _proto._updateBeforeWidth = function _updateBeforeWidth() {
      this._$before.css({
        width: this._props.beforeWidth
      });
    };
    _proto._updateMaxWidth = function _updateMaxWidth() {
      this._$label.css({
        maxWidth: this._props.containerWidth
      });
    };
    _proto.$element = function $element() {
      return this._$root;
    };
    _proto.isVisible = function isVisible() {
      return this._isVisible();
    };
    _proto.getId = function getId() {
      if (this._isVisible()) return this._id;
    };
    _proto.updateMode = function updateMode(mode) {
      this._props.mode = mode;
      this._toggleMarkupVisibility();
    };
    _proto.updateText = function updateText(text) {
      this._props.text = text;
      this._updateText();
      this._toggleMarkupVisibility();
    };
    _proto.updateMark = function updateMark(mark) {
      this._props.mark = mark;
      this._updateMark();
    };
    _proto.updateContainsButtonsBefore = function updateContainsButtonsBefore(containsButtonsBefore) {
      this._props.containsButtonsBefore = containsButtonsBefore;
      this._updateEditorBeforeButtonsClass();
    };
    _proto.updateBeforeWidth = function updateBeforeWidth(beforeWidth) {
      this._props.beforeWidth = beforeWidth;
      this._updateBeforeWidth();
    };
    _proto.updateMaxWidth = function updateMaxWidth(containerWidth) {
      this._props.containerWidth = containerWidth;
      this._updateMaxWidth();
    };
    return TextEditorLabel;
  }();
  exports.TextEditorLabel = TextEditorLabel;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/guid"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/guid"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.text_editor.label.js.map