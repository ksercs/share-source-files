!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/renovation/component_wrapper/button.js"], ["../../ui/validation_engine","./common/component","../../core/utils/icon"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/renovation/component_wrapper/button.js", ["../../ui/validation_engine", "./common/component", "../../core/utils/icon"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  exports.default = void 0;
  var _validation_engine = _interopRequireDefault($__require("../../ui/validation_engine"));
  var _component = _interopRequireDefault($__require("./common/component"));
  var _icon = $__require("../../core/utils/icon");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var ButtonWrapper = /*#__PURE__*/function (_Component) {
    _inheritsLoose(ButtonWrapper, _Component);
    function ButtonWrapper() {
      return _Component.apply(this, arguments) || this;
    }
    var _proto = ButtonWrapper.prototype;
    _proto.getDefaultTemplateNames = function getDefaultTemplateNames() {
      return ['content'];
    };
    _proto.getSupportedKeyNames = function getSupportedKeyNames() {
      return ['space', 'enter'];
    };
    _proto.getProps = function getProps() {
      var _this = this;
      var props = _Component.prototype.getProps.call(this);
      props.onClick = function (_ref) {
        var event = _ref.event;
        _this._clickAction({
          event: event,
          validationGroup: _this._validationGroupConfig
        });
      };
      var iconType = (0, _icon.getImageSourceType)(props.icon);
      if (iconType === 'svg') {
        props.iconTemplate = this._createTemplateComponent(function () {
          return props.icon;
        });
      }
      return props;
    };
    _proto._toggleActiveState = function _toggleActiveState(_, value) {
      var button = this.viewRef;
      value ? button.activate() : button.deactivate();
    };
    _proto._getSubmitAction = function _getSubmitAction() {
      var _this2 = this;
      var needValidate = true;
      var validationStatus = 'valid';
      return this._createAction(function (_ref2) {
        var event = _ref2.event,
            submitInput = _ref2.submitInput;
        if (needValidate) {
          var validationGroup = _this2._validationGroupConfig;
          if (validationGroup !== undefined && validationGroup !== '') {
            var validationResult = validationGroup.validate();
            validationStatus = validationResult.status;
            if (validationResult.status === 'pending') {
              needValidate = false;
              _this2.option('disabled', true);
              validationResult.complete.then(function (_ref3) {
                var status = _ref3.status;
                _this2.option('disabled', false);
                validationStatus = status;
                validationStatus === 'valid' && submitInput.click();
                needValidate = true;
              });
            }
          }
        }
        validationStatus !== 'valid' && event.preventDefault();
        event.stopPropagation();
      });
    };
    _proto._initializeComponent = function _initializeComponent() {
      _Component.prototype._initializeComponent.call(this);
      this._addAction('onSubmit', this._getSubmitAction());
      this._clickAction = this._createClickAction();
    };
    _proto._initMarkup = function _initMarkup() {
      _Component.prototype._initMarkup.call(this);
      var $content = this.$element().find('.dx-button-content');
      var $template = $content.children().filter('.dx-template-wrapper');
      var $input = $content.children().filter('.dx-button-submit-input');
      if ($template.length) {
        $template.addClass('dx-button-content');
        $template.append($input);
        $content.replaceWith($template);
      }
    };
    _proto._patchOptionValues = function _patchOptionValues(options) {
      return _Component.prototype._patchOptionValues.call(this, _extends({}, options, {
        templateData: options._templateData
      }));
    };
    _proto._findGroup = function _findGroup() {
      var $element = this.$element();
      var validationGroup = this.option('validationGroup');
      return validationGroup !== undefined && validationGroup !== '' ? validationGroup : _validation_engine.default.findGroup($element, this._modelByElement($element));
    };
    _proto._createClickAction = function _createClickAction() {
      return this._createActionByOption('onClick', {
        excludeValidators: ['readOnly']
      });
    };
    _proto._optionChanged = function _optionChanged(option) {
      switch (option.name) {
        case 'onClick':
          this._clickAction = this._createClickAction();
          break;
        default:
          break;
      }
      _Component.prototype._optionChanged.call(this, option);
    };
    _createClass(ButtonWrapper, [{
      key: "_validationGroupConfig",
      get: function get() {
        return _validation_engine.default.getGroupConfig(this._findGroup());
      }
    }, {
      key: "_templatesInfo",
      get: function get() {
        return {
          template: 'content'
        };
      }
    }]);
    return ButtonWrapper;
  }(_component.default);
  exports.default = ButtonWrapper;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../ui/validation_engine","./common/component","../../core/utils/icon"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../ui/validation_engine"), require("./common/component"), require("../../core/utils/icon"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=button.js.map