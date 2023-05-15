!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/core/dom_component.js"], ["../core/renderer","./config","./errors","../core/utils/resize_callbacks","./component","./template_manager","./utils/public_component","./utils/shadow_dom","./element_data","./utils/iterator","./utils/extend","../core/element","./utils/common","./utils/type","../core/utils/window","../events/short"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/core/dom_component.js", ["../core/renderer", "./config", "./errors", "../core/utils/resize_callbacks", "./component", "./template_manager", "./utils/public_component", "./utils/shadow_dom", "./element_data", "./utils/iterator", "./utils/extend", "../core/element", "./utils/common", "./utils/type", "../core/utils/window", "../events/short"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _config = _interopRequireDefault($__require("./config"));
  var _errors = _interopRequireDefault($__require("./errors"));
  var _resize_callbacks = _interopRequireDefault($__require("../core/utils/resize_callbacks"));
  var _component = $__require("./component");
  var _template_manager = $__require("./template_manager");
  var _public_component = $__require("./utils/public_component");
  var _shadow_dom = $__require("./utils/shadow_dom");
  var _element_data = $__require("./element_data");
  var _iterator = $__require("./utils/iterator");
  var _extend = $__require("./utils/extend");
  var _element = $__require("../core/element");
  var _common = $__require("./utils/common");
  var _type = $__require("./utils/type");
  var _window = $__require("../core/utils/window");
  var _short = $__require("../events/short");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var abstract = _component.Component.abstract;
  var DOMComponent = _component.Component.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        width: undefined,
        height: undefined,
        rtlEnabled: (0, _config.default)().rtlEnabled,
        elementAttr: {},
        disabled: false,
        integrationOptions: {}
      }, this._useTemplates() ? _template_manager.TemplateManager.createDefaultOptions() : {});
    },
    /**
    * @name DOMComponent.ctor
    * @publicName ctor(element,options)
    * @param1 element:Element|JQuery
    * @param2 options:DOMComponentOptions|undefined
    * @hidden
    */
    ctor: function ctor(element, options) {
      this._customClass = null;
      this._createElement(element);
      (0, _public_component.attachInstanceToElement)(this._$element, this, this._dispose);
      this.callBase(options);
    },
    _createElement: function _createElement(element) {
      this._$element = (0, _renderer.default)(element);
    },
    _getSynchronizableOptionsForCreateComponent: function _getSynchronizableOptionsForCreateComponent() {
      return ['rtlEnabled', 'disabled', 'templatesRenderAsynchronously'];
    },
    _checkFunctionValueDeprecation: function _checkFunctionValueDeprecation(optionNames) {
      var _this = this;
      if (!this.option('_ignoreFunctionValueDeprecation')) {
        optionNames.forEach(function (optionName) {
          if ((0, _type.isFunction)(_this.option(optionName))) {
            _errors.default.log('W0017', optionName);
          }
        });
      }
    },
    _visibilityChanged: abstract,
    _dimensionChanged: abstract,
    _init: function _init() {
      this.callBase();
      this._checkFunctionValueDeprecation(['width', 'height', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'popupHeight', 'popupWidth']);
      this._attachWindowResizeCallback();
      this._initTemplateManager();
    },
    _setOptionsByDevice: function _setOptionsByDevice(instanceCustomRules) {
      this.callBase([].concat(this.constructor._classCustomRules || [], instanceCustomRules || []));
    },
    _isInitialOptionValue: function _isInitialOptionValue(name) {
      var isCustomOption = this.constructor._classCustomRules && Object.prototype.hasOwnProperty.call(this._convertRulesToOptions(this.constructor._classCustomRules), name);
      return !isCustomOption && this.callBase(name);
    },
    _attachWindowResizeCallback: function _attachWindowResizeCallback() {
      if (this._isDimensionChangeSupported()) {
        var windowResizeCallBack = this._windowResizeCallBack = this._dimensionChanged.bind(this);
        _resize_callbacks.default.add(windowResizeCallBack);
      }
    },
    _isDimensionChangeSupported: function _isDimensionChangeSupported() {
      return this._dimensionChanged !== abstract;
    },
    _renderComponent: function _renderComponent() {
      this._initMarkup();
      (0, _window.hasWindow)() && this._render();
    },
    _initMarkup: function _initMarkup() {
      var _ref = this.option() || {},
          rtlEnabled = _ref.rtlEnabled;
      this._renderElementAttributes();
      this._toggleRTLDirection(rtlEnabled);
      this._renderVisibilityChange();
      this._renderDimensions();
    },
    _render: function _render() {
      this._attachVisibilityChangeHandlers();
      (0, _shadow_dom.addShadowDomStyles)(this.$element());
    },
    _renderElementAttributes: function _renderElementAttributes() {
      var _ref2 = this.option() || {},
          elementAttr = _ref2.elementAttr;
      var attributes = (0, _extend.extend)({}, elementAttr);
      var classNames = attributes.class;
      delete attributes.class;
      this.$element().attr(attributes).removeClass(this._customClass).addClass(classNames);
      this._customClass = classNames;
    },
    _renderVisibilityChange: function _renderVisibilityChange() {
      if (this._isDimensionChangeSupported()) {
        this._attachDimensionChangeHandlers();
      }
      if (this._isVisibilityChangeSupported()) {
        var $element = this.$element();
        $element.addClass('dx-visibility-change-handler');
      }
    },
    _renderDimensions: function _renderDimensions() {
      var $element = this.$element();
      var element = $element.get(0);
      var width = this._getOptionValue('width', element);
      var height = this._getOptionValue('height', element);
      if (this._isCssUpdateRequired(element, height, width)) {
        $element.css({
          width: width === null ? '' : width,
          height: height === null ? '' : height
        });
      }
    },
    _isCssUpdateRequired: function _isCssUpdateRequired(element, height, width) {
      return !!((0, _type.isDefined)(width) || (0, _type.isDefined)(height) || element.style.width || element.style.height);
    },
    _attachDimensionChangeHandlers: function _attachDimensionChangeHandlers() {
      var _this2 = this;
      var $el = this.$element();
      var namespace = "".concat(this.NAME, "VisibilityChange");
      _short.resize.off($el, {
        namespace: namespace
      });
      _short.resize.on($el, function () {
        return _this2._dimensionChanged();
      }, {
        namespace: namespace
      });
    },
    _attachVisibilityChangeHandlers: function _attachVisibilityChangeHandlers() {
      var _this3 = this;
      if (this._isVisibilityChangeSupported()) {
        var $el = this.$element();
        var namespace = "".concat(this.NAME, "VisibilityChange");
        this._isHidden = !this._isVisible();
        _short.visibility.off($el, {
          namespace: namespace
        });
        _short.visibility.on($el, function () {
          return _this3._checkVisibilityChanged('shown');
        }, function () {
          return _this3._checkVisibilityChanged('hiding');
        }, {
          namespace: namespace
        });
      }
    },
    _isVisible: function _isVisible() {
      var $element = this.$element();
      return $element.is(':visible');
    },
    _checkVisibilityChanged: function _checkVisibilityChanged(action) {
      var isVisible = this._isVisible();
      if (isVisible) {
        if (action === 'hiding' && !this._isHidden) {
          this._visibilityChanged(false);
          this._isHidden = true;
        } else if (action === 'shown' && this._isHidden) {
          this._isHidden = false;
          this._visibilityChanged(true);
        }
      }
    },
    _isVisibilityChangeSupported: function _isVisibilityChangeSupported() {
      return this._visibilityChanged !== abstract && (0, _window.hasWindow)();
    },
    _clean: _common.noop,
    _modelByElement: function _modelByElement() {
      var _this$option = this.option(),
          modelByElement = _this$option.modelByElement;
      var $element = this.$element();
      return modelByElement ? modelByElement($element) : undefined;
    },
    _invalidate: function _invalidate() {
      if (this._isUpdateAllowed()) {
        throw _errors.default.Error('E0007');
      }
      this._requireRefresh = true;
    },
    _refresh: function _refresh() {
      this._clean();
      this._renderComponent();
    },
    _dispose: function _dispose() {
      this._templateManager && this._templateManager.dispose();
      this.callBase();
      this._clean();
      this._detachWindowResizeCallback();
    },
    _detachWindowResizeCallback: function _detachWindowResizeCallback() {
      if (this._isDimensionChangeSupported()) {
        _resize_callbacks.default.remove(this._windowResizeCallBack);
      }
    },
    _toggleRTLDirection: function _toggleRTLDirection(rtl) {
      var $element = this.$element();
      $element.toggleClass('dx-rtl', rtl);
    },
    _createComponent: function _createComponent(element, component) {
      var _this4 = this;
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var synchronizableOptions = (0, _common.grep)(this._getSynchronizableOptionsForCreateComponent(), function (value) {
        return !(value in config);
      });
      var _this$option2 = this.option(),
          integrationOptions = _this$option2.integrationOptions;
      var _this$option3 = this.option(),
          nestedComponentOptions = _this$option3.nestedComponentOptions;
      nestedComponentOptions = nestedComponentOptions || _common.noop;
      var nestedComponentConfig = (0, _extend.extend)({
        integrationOptions: integrationOptions
      }, nestedComponentOptions(this));
      synchronizableOptions.forEach(function (optionName) {
        return nestedComponentConfig[optionName] = _this4.option(optionName);
      });
      this._extendConfig(config, nestedComponentConfig);
      var instance = void 0;
      if ((0, _type.isString)(component)) {
        var $element = (0, _renderer.default)(element)[component](config);
        instance = $element[component]('instance');
      } else if (element) {
        instance = component.getInstance(element);
        if (instance) {
          instance.option(config);
        } else {
          instance = new component(element, config);
        }
      }
      if (instance) {
        var optionChangedHandler = function optionChangedHandler(_ref3) {
          var name = _ref3.name,
              value = _ref3.value;
          if (synchronizableOptions.includes(name)) {
            instance.option(name, value);
          }
        };
        this.on('optionChanged', optionChangedHandler);
        instance.on('disposing', function () {
          return _this4.off('optionChanged', optionChangedHandler);
        });
      }
      return instance;
    },
    _extendConfig: function _extendConfig(config, extendConfig) {
      (0, _iterator.each)(extendConfig, function (key, value) {
        !Object.prototype.hasOwnProperty.call(config, key) && (config[key] = value);
      });
    },
    _defaultActionConfig: function _defaultActionConfig() {
      var $element = this.$element();
      var context = this._modelByElement($element);
      return (0, _extend.extend)(this.callBase(), {
        context: context
      });
    },
    _defaultActionArgs: function _defaultActionArgs() {
      var $element = this.$element();
      var model = this._modelByElement($element);
      var element = this.element();
      return (0, _extend.extend)(this.callBase(), {
        element: element,
        model: model
      });
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'width':
        case 'height':
          this._renderDimensions();
          break;
        case 'rtlEnabled':
          this._invalidate();
          break;
        case 'elementAttr':
          this._renderElementAttributes();
          break;
        case 'disabled':
        case 'integrationOptions':
          break;
        default:
          this.callBase(args);
          break;
      }
    },
    _removeAttributes: function _removeAttributes(element) {
      var attrs = element.attributes;
      for (var i = attrs.length - 1; i >= 0; i--) {
        var attr = attrs[i];
        if (attr) {
          var name = attr.name;
          if (!name.indexOf('aria-') || name.indexOf('dx-') !== -1 || name === 'role' || name === 'style' || name === 'tabindex') {
            element.removeAttribute(name);
          }
        }
      }
    },
    _removeClasses: function _removeClasses(element) {
      element.className = element.className.split(' ').filter(function (cssClass) {
        return cssClass.lastIndexOf('dx-', 0) !== 0;
      }).join(' ');
    },
    _updateDOMComponent: function _updateDOMComponent(renderRequired) {
      if (renderRequired) {
        this._renderComponent();
      } else if (this._requireRefresh) {
        this._requireRefresh = false;
        this._refresh();
      }
    },
    endUpdate: function endUpdate() {
      var renderRequired = this._isInitializingRequired();
      this.callBase();
      this._isUpdateAllowed() && this._updateDOMComponent(renderRequired);
    },
    $element: function $element() {
      return this._$element;
    },
    element: function element() {
      var $element = this.$element();
      return (0, _element.getPublicElement)($element);
    },
    dispose: function dispose() {
      var element = this.$element().get(0);
      (0, _element_data.cleanDataRecursive)(element, true);
      element.textContent = '';
      this._removeAttributes(element);
      this._removeClasses(element);
    },
    resetOption: function resetOption(optionName) {
      this.callBase(optionName);
      if (optionName === 'width' || optionName === 'height') {
        var initialOption = this.initialOption(optionName);
        !(0, _type.isDefined)(initialOption) && this.$element().css(optionName, '');
      }
    },
    _getAnonymousTemplateName: function _getAnonymousTemplateName() {
      return void 0;
    },
    _initTemplateManager: function _initTemplateManager() {
      if (this._templateManager || !this._useTemplates()) return void 0;
      var _this$option4 = this.option(),
          _this$option4$integra = _this$option4.integrationOptions,
          integrationOptions = _this$option4$integra === void 0 ? {} : _this$option4$integra;
      var createTemplate = integrationOptions.createTemplate;
      this._templateManager = new _template_manager.TemplateManager(createTemplate, this._getAnonymousTemplateName());
      this._initTemplates();
    },
    _initTemplates: function _initTemplates() {
      var _this5 = this;
      var _this$_templateManage = this._templateManager.extractTemplates(this.$element()),
          templates = _this$_templateManage.templates,
          anonymousTemplateMeta = _this$_templateManage.anonymousTemplateMeta;
      var anonymousTemplate = this.option("integrationOptions.templates.".concat(anonymousTemplateMeta.name));
      templates.forEach(function (_ref4) {
        var name = _ref4.name,
            template = _ref4.template;
        _this5._options.silent("integrationOptions.templates.".concat(name), template);
      });
      if (anonymousTemplateMeta.name && !anonymousTemplate) {
        this._options.silent("integrationOptions.templates.".concat(anonymousTemplateMeta.name), anonymousTemplateMeta.template);
        this._options.silent('_hasAnonymousTemplateContent', true);
      }
    },
    _getTemplateByOption: function _getTemplateByOption(optionName) {
      return this._getTemplate(this.option(optionName));
    },
    _getTemplate: function _getTemplate(templateSource) {
      var templates = this.option('integrationOptions.templates');
      var isAsyncTemplate = this.option('templatesRenderAsynchronously');
      var skipTemplates = this.option('integrationOptions.skipTemplates');
      return this._templateManager.getTemplate(templateSource, templates, {
        isAsyncTemplate: isAsyncTemplate,
        skipTemplates: skipTemplates
      }, this);
    },
    _saveTemplate: function _saveTemplate(name, template) {
      this._setOptionWithoutOptionChange('integrationOptions.templates.' + name, this._templateManager._createTemplate(template));
    },
    _useTemplates: function _useTemplates() {
      return true;
    }
  });
  DOMComponent.getInstance = function (element) {
    return (0, _public_component.getInstanceByElement)((0, _renderer.default)(element), this);
  };
  DOMComponent.defaultOptions = function (rule) {
    this._classCustomRules = this._classCustomRules || [];
    this._classCustomRules.push(rule);
  };
  var _default = DOMComponent;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/renderer","./config","./errors","../core/utils/resize_callbacks","./component","./template_manager","./utils/public_component","./utils/shadow_dom","./element_data","./utils/iterator","./utils/extend","../core/element","./utils/common","./utils/type","../core/utils/window","../events/short"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/renderer"), require("./config"), require("./errors"), require("../core/utils/resize_callbacks"), require("./component"), require("./template_manager"), require("./utils/public_component"), require("./utils/shadow_dom"), require("./element_data"), require("./utils/iterator"), require("./utils/extend"), require("../core/element"), require("./utils/common"), require("./utils/type"), require("../core/utils/window"), require("../events/short"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dom_component.js.map