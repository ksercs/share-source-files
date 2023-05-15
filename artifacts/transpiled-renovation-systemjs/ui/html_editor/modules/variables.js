!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/html_editor/modules/variables.js"], ["devextreme-quill","../../../core/renderer","../../../core/utils/position","./popup","./base","../formats/variable","../../../core/utils/extend"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/html_editor/modules/variables.js", ["devextreme-quill", "../../../core/renderer", "../../../core/utils/position", "./popup", "./base", "../formats/variable", "../../../core/utils/extend"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _devextremeQuill = _interopRequireDefault($__require("devextreme-quill"));
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _position = $__require("../../../core/utils/position");
  var _popup = _interopRequireDefault($__require("./popup"));
  var _base = _interopRequireDefault($__require("./base"));
  var _variable = _interopRequireDefault($__require("../formats/variable"));
  var _extend = $__require("../../../core/utils/extend");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return self;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var VariableModule = _base.default;
  if (_devextremeQuill.default) {
    var VARIABLE_FORMAT_CLASS = 'dx-variable-format';
    var ACTIVE_FORMAT_CLASS = 'dx-format-active';
    _devextremeQuill.default.register({
      'formats/variable': _variable.default
    }, true);
    VariableModule = /*#__PURE__*/function (_PopupModule) {
      _inheritsLoose(VariableModule, _PopupModule);
      var _proto = VariableModule.prototype;
      _proto._getDefaultOptions = function _getDefaultOptions() {
        var baseConfig = _PopupModule.prototype._getDefaultOptions.call(this);
        return (0, _extend.extend)(baseConfig, {
          escapeChar: ''
        });
      };
      function VariableModule(quill, options) {
        var _this;
        _this = _PopupModule.call(this, quill, options) || this;
        var toolbar = quill.getModule('toolbar');
        if (toolbar) {
          toolbar.addClickHandler('variable', _this.showPopup.bind(_assertThisInitialized(_this)));
        }
        quill.keyboard.addBinding({
          key: 'P',
          altKey: true
        }, _this.showPopup.bind(_assertThisInitialized(_this)));
        _this._popup.on('shown', function (e) {
          var $ofElement = (0, _renderer.default)(e.component.option('position').of);
          if ($ofElement.hasClass(VARIABLE_FORMAT_CLASS)) {
            $ofElement.addClass(ACTIVE_FORMAT_CLASS);
          }
        });
        return _this;
      }
      _proto.showPopup = function showPopup(event) {
        var selection = this.quill.getSelection(true);
        var position = selection ? selection.index : this.quill.getLength();
        this.savePosition(position);
        this._resetPopupPosition(event, position);
        _PopupModule.prototype.showPopup.call(this);
      };
      _proto._resetPopupPosition = function _resetPopupPosition(event, position) {
        if (event && event.element) {
          this._popup.option('position', {
            of: event.element,
            offset: {
              h: 0,
              v: 0
            },
            my: 'top center',
            at: 'bottom center',
            collision: 'fit'
          });
        } else {
          var mentionBounds = this.quill.getBounds(position);
          var rootRect = (0, _position.getBoundingRect)(this.quill.root);
          this._popup.option('position', {
            of: this.quill.root,
            offset: {
              h: mentionBounds.left,
              v: mentionBounds.bottom - rootRect.height
            },
            my: 'top center',
            at: 'bottom left',
            collision: 'fit flip'
          });
        }
      };
      _proto.insertEmbedContent = function insertEmbedContent(selectionChangedEvent) {
        var caretPosition = this.getPosition();
        var selectedItem = selectionChangedEvent.component.option('selectedItem');
        var variableData = (0, _extend.extend)({}, {
          value: selectedItem,
          escapeChar: this.options.escapeChar
        });
        setTimeout(function () {
          this.quill.insertEmbed(caretPosition, 'variable', variableData);
          this.quill.setSelection(caretPosition + 1);
        }.bind(this));
      };
      return VariableModule;
    }(_popup.default);
  }
  var _default = VariableModule;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["devextreme-quill","../../../core/renderer","../../../core/utils/position","./popup","./base","../formats/variable","../../../core/utils/extend"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("devextreme-quill"), require("../../../core/renderer"), require("../../../core/utils/position"), require("./popup"), require("./base"), require("../formats/variable"), require("../../../core/utils/extend"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=variables.js.map