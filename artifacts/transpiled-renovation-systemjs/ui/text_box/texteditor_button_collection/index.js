!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/text_box/texteditor_button_collection/index.js"], ["../../../core/renderer","./custom","../../../core/utils/extend","../../widget/ui.errors"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/text_box/texteditor_button_collection/index.js", ["../../../core/renderer", "./custom", "../../../core/utils/extend", "../../widget/ui.errors"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _custom = _interopRequireDefault($__require("./custom"));
  var _extend = $__require("../../../core/utils/extend");
  var _ui = _interopRequireDefault($__require("../../widget/ui.errors"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  var TEXTEDITOR_BUTTONS_CONTAINER_CLASS = 'dx-texteditor-buttons-container';
  function checkButtonInfo(buttonInfo) {
    var checkButtonType = function checkButtonType() {
      if (!buttonInfo || _typeof(buttonInfo) !== 'object' || Array.isArray(buttonInfo)) {
        throw _ui.default.Error('E1053');
      }
    };
    var checkLocation = function checkLocation() {
      var location = buttonInfo.location;
      if ('location' in buttonInfo && location !== 'after' && location !== 'before') {
        buttonInfo.location = 'after';
      }
    };
    var checkNameIsDefined = function checkNameIsDefined() {
      if (!('name' in buttonInfo)) {
        throw _ui.default.Error('E1054');
      }
    };
    var checkNameIsString = function checkNameIsString() {
      var name = buttonInfo.name;
      if (typeof name !== 'string') {
        throw _ui.default.Error('E1055');
      }
    };
    checkButtonType();
    checkNameIsDefined();
    checkNameIsString();
    checkLocation();
  }
  function checkNamesUniqueness(existingNames, newName) {
    if (existingNames.indexOf(newName) !== -1) {
      throw _ui.default.Error('E1055', newName);
    }
    existingNames.push(newName);
  }
  function isPredefinedButtonName(name, predefinedButtonsInfo) {
    return !!predefinedButtonsInfo.find(function (info) {
      return info.name === name;
    });
  }
  var TextEditorButtonCollection = /*#__PURE__*/function () {
    function TextEditorButtonCollection(editor, defaultButtonsInfo) {
      this.buttons = [];
      this.defaultButtonsInfo = defaultButtonsInfo;
      this.editor = editor;
    }
    var _proto = TextEditorButtonCollection.prototype;
    _proto._compileButtonInfo = function _compileButtonInfo(buttons) {
      var _this = this;
      var names = [];
      return buttons.map(function (button) {
        var isStringButton = typeof button === 'string';
        if (!isStringButton) {
          checkButtonInfo(button);
        }
        var isDefaultButton = isStringButton || isPredefinedButtonName(button.name, _this.defaultButtonsInfo);
        if (isDefaultButton) {
          var defaultButtonInfo = _this.defaultButtonsInfo.find(function (_ref) {
            var name = _ref.name;
            return name === button || name === button.name;
          });
          if (!defaultButtonInfo) {
            throw _ui.default.Error('E1056', _this.editor.NAME, button);
          }
          checkNamesUniqueness(names, button);
          return defaultButtonInfo;
        } else {
          var name = button.name;
          checkNamesUniqueness(names, name);
          return (0, _extend.extend)(button, {
            Ctor: _custom.default
          });
        }
      });
    };
    _proto._createButton = function _createButton(buttonsInfo) {
      var Ctor = buttonsInfo.Ctor,
          options = buttonsInfo.options,
          name = buttonsInfo.name;
      var button = new Ctor(name, this.editor, options);
      this.buttons.push(button);
      return button;
    };
    _proto._renderButtons = function _renderButtons(buttons, $container, targetLocation) {
      var _this2 = this;
      var $buttonsContainer = null;
      var buttonsInfo = buttons ? this._compileButtonInfo(buttons) : this.defaultButtonsInfo;
      var getButtonsContainer = function getButtonsContainer() {
        $buttonsContainer = $buttonsContainer || (0, _renderer.default)('<div>').addClass(TEXTEDITOR_BUTTONS_CONTAINER_CLASS);
        targetLocation === 'before' ? $container.prepend($buttonsContainer) : $container.append($buttonsContainer);
        return $buttonsContainer;
      };
      buttonsInfo.forEach(function (buttonsInfo) {
        var _buttonsInfo$location = buttonsInfo.location,
            location = _buttonsInfo$location === void 0 ? 'after' : _buttonsInfo$location;
        if (location === targetLocation) {
          _this2._createButton(buttonsInfo).render(getButtonsContainer());
        }
      });
      return $buttonsContainer;
    };
    _proto.clean = function clean() {
      this.buttons.forEach(function (button) {
        return button.dispose();
      });
      this.buttons = [];
    };
    _proto.getButton = function getButton(buttonName) {
      var button = this.buttons.find(function (_ref2) {
        var name = _ref2.name;
        return name === buttonName;
      });
      return button && button.instance;
    };
    _proto.renderAfterButtons = function renderAfterButtons(buttons, $container) {
      return this._renderButtons(buttons, $container, 'after');
    };
    _proto.renderBeforeButtons = function renderBeforeButtons(buttons, $container) {
      return this._renderButtons(buttons, $container, 'before');
    };
    _proto.updateButtons = function updateButtons(names) {
      this.buttons.forEach(function (button) {
        if (!names || names.indexOf(button.name) !== -1) {
          button.update();
        }
      });
    };
    return TextEditorButtonCollection;
  }();
  exports.default = TextEditorButtonCollection;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/renderer","./custom","../../../core/utils/extend","../../widget/ui.errors"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/renderer"), require("./custom"), require("../../../core/utils/extend"), require("../../widget/ui.errors"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=index.js.map