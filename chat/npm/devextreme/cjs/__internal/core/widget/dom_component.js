/**
* DevExtreme (cjs/__internal/core/widget/dom_component.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _short = require("../../../common/core/events/short");
var _config = _interopRequireDefault(require("../../../core/config"));
var _element = require("../../../core/element");
var _element_data = require("../../../core/element_data");
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _common = require("../../../core/utils/common");
var _extend = require("../../../core/utils/extend");
var _iterator = require("../../../core/utils/iterator");
var _public_component = require("../../../core/utils/public_component");
var _resize_callbacks = _interopRequireDefault(require("../../../core/utils/resize_callbacks"));
var _shadow_dom = require("../../../core/utils/shadow_dom");
var _type = require("../../../core/utils/type");
var _window = require("../../../core/utils/window");
var _license_validation = _interopRequireWildcard(require("../../core/license/license_validation"));
var _m_template_manager = _interopRequireDefault(require("../../core/m_template_manager"));
var _m_common = require("../../core/utils/m_common");
var _component = require("./component");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// @ts-expect-error

class DOMComponent extends _component.Component {
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
  static getInstance(element) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _public_component.getInstanceByElement)((0, _renderer.default)(element), this);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static defaultOptions(rule) {
    this._classCustomRules = Object.hasOwnProperty.bind(this)('_classCustomRules') && this._classCustomRules ? this._classCustomRules : [];
    this._classCustomRules.push(rule);
  }
  _getDefaultOptions() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _extend.extend)(super._getDefaultOptions(), {
      width: undefined,
      height: undefined,
      rtlEnabled: (0, _config.default)().rtlEnabled,
      elementAttr: {},
      disabled: false,
      integrationOptions: {}
    }, this._useTemplates() ? _m_template_manager.default.TemplateManager.createDefaultOptions() : {});
  }
  ctor(element, options) {
    this._customClass = null;
    this._createElement(element);
    (0, _public_component.attachInstanceToElement)(this._$element, this, this._dispose);
    super.ctor(options);
    const validationAlreadyPerformed = (0, _license_validation.peekValidationPerformed)();
    // @ts-expect-error
    _license_validation.default.validateLicense((0, _config.default)().licenseKey);
    if (!validationAlreadyPerformed && (0, _license_validation.peekValidationPerformed)()) {
      (0, _config.default)({
        licenseKey: ''
      });
    }
    _m_common.uiLayerInitialized.resolve();
  }
  _createElement(element) {
    this._$element = (0, _renderer.default)(element);
  }
  _getSynchronizableOptionsForCreateComponent() {
    // @ts-expect-error
    return ['rtlEnabled', 'disabled', 'templatesRenderAsynchronously'];
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _checkFunctionValueDeprecation(optionNames) {
    if (!this.option('_ignoreFunctionValueDeprecation')) {
      optionNames.forEach(optionName => {
        if ((0, _type.isFunction)(this.option(optionName))) {
          _errors.default.log('W0017', optionName);
        }
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _visibilityChanged(value) {}
  _dimensionChanged() {}
  _init() {
    super._init();
    this._checkFunctionValueDeprecation(['width', 'height', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'popupHeight', 'popupWidth']);
    this._attachWindowResizeCallback();
    this._initTemplateManager();
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _setOptionsByDevice(instanceCustomRules) {
    // @ts-expect-error
    // eslint-disable-next-line @stylistic/max-len
    super._setOptionsByDevice([].concat(this.constructor._classCustomRules || [], instanceCustomRules || []));
  }
  _isInitialOptionValue(name) {
    // @ts-expect-error
    const isCustomOption = this.constructor._classCustomRules
    // @ts-expect-error
    // eslint-disable-next-line @stylistic/max-len
    && Object.prototype.hasOwnProperty.call(this._convertRulesToOptions(this.constructor._classCustomRules), name);
    return !isCustomOption && super._isInitialOptionValue(name);
  }
  _attachWindowResizeCallback() {
    if (this._isDimensionChangeSupported()) {
      // eslint-disable-next-line no-multi-assign
      const windowResizeCallBack = this._windowResizeCallBack = this._dimensionChanged.bind(this);
      _resize_callbacks.default.add(windowResizeCallBack);
    }
  }
  _isDimensionChangeSupported() {
    return this._dimensionChanged !== DOMComponent.prototype._dimensionChanged;
  }
  _renderComponent() {
    (0, _shadow_dom.addShadowDomStyles)(this.$element());
    this._initMarkup();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (0, _window.hasWindow)() && this._render();
  }
  _initMarkup() {
    const {
      rtlEnabled
    } = this.option() || {};
    this._renderElementAttributes();
    this._toggleRTLDirection(rtlEnabled);
    this._renderVisibilityChange();
    this._renderDimensions();
  }
  _render() {
    this._attachVisibilityChangeHandlers();
  }
  _renderElementAttributes() {
    const {
      elementAttr
    } = this.option() || {};
    const attributes = (0, _extend.extend)({}, elementAttr);
    const classNames = attributes.class;
    delete attributes.class;
    // @ts-expect-error
    this.$element().attr(attributes)
    // @ts-expect-error
    .removeClass(this._customClass).addClass(classNames);
    this._customClass = classNames;
  }
  _renderVisibilityChange() {
    if (this._isDimensionChangeSupported()) {
      this._attachDimensionChangeHandlers();
    }
    if (this._isVisibilityChangeSupported()) {
      const $element = this.$element();
      $element.addClass('dx-visibility-change-handler');
    }
  }
  _renderDimensions() {
    const $element = this.$element();
    const element = $element.get(0);
    const width = this._getOptionValue('width', element);
    const height = this._getOptionValue('height', element);
    if (this._isCssUpdateRequired(element, height, width)) {
      $element.css({
        width: width === null ? '' : width,
        height: height === null ? '' : height
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _isCssUpdateRequired(element, height, width) {
    return !!((0, _type.isDefined)(width) || (0, _type.isDefined)(height) || element.style.width || element.style.height);
  }
  _attachDimensionChangeHandlers() {
    const $el = this.$element();
    const namespace = `${this.NAME}VisibilityChange`;
    _short.resize.off($el, {
      namespace
    });
    _short.resize.on($el, () => this._dimensionChanged(), {
      namespace
    });
  }
  _attachVisibilityChangeHandlers() {
    if (this._isVisibilityChangeSupported()) {
      const $el = this.$element();
      const namespace = `${this.NAME}VisibilityChange`;
      this._isHidden = !this._isVisible();
      _short.visibility.off($el, {
        namespace
      });
      _short.visibility.on($el, () => this._checkVisibilityChanged('shown'), () => this._checkVisibilityChanged('hiding'), {
        namespace
      });
    }
  }
  _isVisible() {
    const $element = this.$element();
    return $element.is(':visible');
  }
  _checkVisibilityChanged(action) {
    const isVisible = this._isVisible();
    if (isVisible) {
      if (action === 'hiding' && !this._isHidden) {
        this._visibilityChanged(false);
        this._isHidden = true;
      } else if (action === 'shown' && this._isHidden) {
        this._isHidden = false;
        this._visibilityChanged(true);
      }
    }
  }
  _isVisibilityChangeSupported() {
    return this._visibilityChanged !== DOMComponent.prototype._visibilityChanged && (0, _window.hasWindow)();
  }
  _clean() {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _modelByElement(element) {
    const {
      modelByElement
    } = this.option();
    const $element = this.$element();
    return modelByElement ? modelByElement($element) : undefined;
  }
  _invalidate() {
    if (this._isUpdateAllowed()) {
      throw _errors.default.Error('E0007');
    }
    this._requireRefresh = true;
  }
  _refresh() {
    this._clean();
    this._renderComponent();
  }
  _dispose() {
    // eslint-disable-next-line @stylistic/max-len
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain, @typescript-eslint/no-unused-expressions
    this._templateManager && this._templateManager.dispose();
    super._dispose();
    this._clean();
    this._detachWindowResizeCallback();
  }
  _detachWindowResizeCallback() {
    if (this._isDimensionChangeSupported()) {
      _resize_callbacks.default.remove(this._windowResizeCallBack);
    }
  }
  _toggleRTLDirection(rtl) {
    const $element = this.$element();
    $element.toggleClass('dx-rtl', rtl);
  }
  _createComponent(element, component,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentConfiguration) {
    const configuration = componentConfiguration ?? {};
    const synchronizableOptions = (0, _common.grep)(this._getSynchronizableOptionsForCreateComponent(), value => !(value in configuration));
    const {
      integrationOptions
    } = this.option();
    let {
      nestedComponentOptions
    } = this.option();
    nestedComponentOptions = nestedComponentOptions ?? _common.noop;
    const nestedComponentConfig = (0, _extend.extend)({
      integrationOptions
    }, nestedComponentOptions(this));
    synchronizableOptions.forEach(
    // eslint-disable-next-line no-return-assign
    optionName => nestedComponentConfig[optionName] = this.option(optionName));
    this._extendConfig(configuration, nestedComponentConfig);
    // eslint-disable-next-line no-void
    let instance = void 0;
    if ((0, _type.isString)(component)) {
      const $element = (0, _renderer.default)(element)[component](configuration);
      instance = $element[component]('instance');
    } else if (element) {
      // @ts-expect-error
      instance = component.getInstance(element);
      if (instance) {
        // @ts-expect-error
        instance.option(configuration);
      } else {
        // @ts-expect-error
        // eslint-disable-next-line new-cap
        instance = new component(element, configuration);
      }
    }
    if (instance) {
      const optionChangedHandler = _ref => {
        let {
          name,
          value
        } = _ref;
        if (synchronizableOptions.includes(name)) {
          // @ts-expect-error
          instance.option(name, value);
        }
      };
      this.on('optionChanged', optionChangedHandler);
      // @ts-expect-error
      instance.on('disposing', () => this.off('optionChanged', optionChangedHandler));
    }
    // @ts-expect-error
    return instance;
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _extendConfig(configuration, extendConfig) {
    (0, _iterator.each)(extendConfig, (key, value) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      !Object.prototype.hasOwnProperty.call(configuration, key) && (configuration[key] = value);
    });
  }
  _defaultActionConfig() {
    const $element = this.$element();
    const context = this._modelByElement($element);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _extend.extend)(super._defaultActionConfig(), {
      context
    });
  }
  _defaultActionArgs() {
    const $element = this.$element();
    const model = this._modelByElement($element);
    const element = this.element();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (0, _extend.extend)(super._defaultActionArgs(), {
      element,
      model
    });
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
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
        super._optionChanged(args);
        break;
    }
  }
  _removeAttributes(element) {
    const attrs = element.attributes;
    // eslint-disable-next-line no-plusplus
    for (let i = attrs.length - 1; i >= 0; i--) {
      const attr = attrs[i];
      if (attr) {
        const {
          name
        } = attr;
        // eslint-disable-next-line @typescript-eslint/prefer-includes
        if (!name.indexOf('aria-') || name.indexOf('dx-') !== -1 || name === 'role' || name === 'style' || name === 'tabindex') {
          element.removeAttribute(name);
        }
      }
    }
  }
  _removeClasses(element) {
    element.className = element.className.split(' ').filter(cssClass => cssClass.lastIndexOf('dx-', 0) !== 0).join(' ');
  }
  _updateDOMComponent(renderRequired) {
    if (renderRequired) {
      this._renderComponent();
    } else if (this._requireRefresh) {
      this._requireRefresh = false;
      this._refresh();
    }
  }
  endUpdate() {
    const renderRequired = this._isInitializingRequired();
    super.endUpdate();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this._isUpdateAllowed() && this._updateDOMComponent(renderRequired);
  }
  $element() {
    return this._$element;
  }
  element() {
    const $element = this.$element();
    return (0, _element.getPublicElement)($element);
  }
  dispose() {
    const element = this.$element().get(0);
    (0, _element_data.cleanDataRecursive)(element, true);
    element.textContent = '';
    this._removeAttributes(element);
    this._removeClasses(element);
  }
  resetOption(optionName) {
    super.resetOption(optionName);
    if (optionName === 'width' || optionName === 'height') {
      const initialOption = this.initialOption(optionName);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      !(0, _type.isDefined)(initialOption) && this.$element().css(optionName, '');
    }
  }
  _getAnonymousTemplateName() {
    // eslint-disable-next-line no-void
    return void 0;
  }
  _initTemplateManager() {
    // eslint-disable-next-line no-void
    if (this._templateManager || !this._useTemplates()) return void 0;
    const {
      integrationOptions = {}
    } = this.option();
    const {
      createTemplate
    } = integrationOptions;
    this._templateManager = new _m_template_manager.default.TemplateManager(createTemplate, this._getAnonymousTemplateName());
    this._initTemplates();
    return undefined;
  }
  _initTemplates() {
    const {
      templates,
      anonymousTemplateMeta
    } = this._templateManager.extractTemplates(this.$element());
    const anonymousTemplate = this.option(`integrationOptions.templates.${anonymousTemplateMeta.name}`);
    templates.forEach(_ref2 => {
      let {
        name,
        template
      } = _ref2;
      this._options.silent(`integrationOptions.templates.${name}`, template);
    });
    if (anonymousTemplateMeta.name && !anonymousTemplate) {
      this._options.silent(`integrationOptions.templates.${anonymousTemplateMeta.name}`, anonymousTemplateMeta.template);
      this._options.silent('_hasAnonymousTemplateContent', true);
    }
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
  _getTemplateByOption(optionName) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._getTemplate(this.option(optionName));
  }
  // eslint-disable-next-line @stylistic/max-len
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
  _getTemplate(templateSource) {
    const templates = this.option('integrationOptions.templates');
    const isAsyncTemplate = this.option('templatesRenderAsynchronously');
    const skipTemplates = this.option('integrationOptions.skipTemplates');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._templateManager.getTemplate(templateSource, templates, {
      isAsyncTemplate,
      skipTemplates
    }, this);
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  _saveTemplate(name, template) {
    this._setOptionWithoutOptionChange(`integrationOptions.templates.${name}`, this._templateManager._createTemplate(template));
  }
  _useTemplates() {
    return true;
  }
}
var _default = exports.default = DOMComponent;
