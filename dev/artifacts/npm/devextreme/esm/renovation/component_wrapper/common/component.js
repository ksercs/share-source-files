/**
* DevExtreme (esm/renovation/component_wrapper/common/component.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { createRef } from 'inferno';
import KeyboardProcessor from '../../../events/core/keyboard_processor';
import renderer from '../../../core/inferno_renderer';
import $ from '../../../core/renderer';
import domAdapter from '../../../core/dom_adapter';
import DOMComponent from '../../../core/dom_component';
import { extend } from '../../../core/utils/extend';
import { getPublicElement } from '../../../core/element';
import { isDefined, isRenderer, isString } from '../../../core/utils/type';
import { TemplateWrapper, buildTemplateArgs } from './template_wrapper';
import { updatePropsImmutable } from '../utils/update_props_immutable';
import '../../../events/click';
import '../../../events/core/emitter.feedback';
import '../../../events/hover';
var setDefaultOptionValue = (options, defaultValueGetter) => name => {
  if (Object.prototype.hasOwnProperty.call(options, name) && options[name] === undefined) {
    options[name] = defaultValueGetter(name);
  }
};
export default class ComponentWrapper extends DOMComponent {
  constructor(element, options) {
    super(element, options);
    this._shouldRaiseContentReady = false;
    this.validateKeyDownHandler();
  }
  get _propsInfo() {
    return {
      allowNull: [],
      twoWay: [],
      elements: [],
      templates: [],
      props: []
    };
  }
  validateKeyDownHandler() {
    var supportedKeyNames = this.getSupportedKeyNames();
    var hasComponentDefaultKeyHandlers = supportedKeyNames.length > 0;
    var hasComponentKeyDownMethod = typeof this._viewComponent.prototype.keyDown === 'function';
    if (hasComponentDefaultKeyHandlers && !hasComponentKeyDownMethod) {
      throw Error("Component's declaration must have 'keyDown' method.");
    }
  }
  get viewRef() {
    var _this$_viewRef;
    return (_this$_viewRef = this._viewRef) === null || _this$_viewRef === void 0 ? void 0 : _this$_viewRef.current;
  }
  _checkContentReadyOption(fullName) {
    var contentReadyOptions = this._getContentReadyOptions().reduce((options, name) => {
      options[name] = true;
      return options;
    }, {});
    this._checkContentReadyOption = optionName => !!contentReadyOptions[optionName];
    return this._checkContentReadyOption(fullName);
  }
  _getContentReadyOptions() {
    return ['rtlEnabled'];
  }
  _fireContentReady() {
    this._actionsMap.onContentReady({});
  }
  _getDefaultOptions() {
    var viewDefaultProps = this._getViewComponentDefaultProps();
    return extend(true, super._getDefaultOptions(), viewDefaultProps, this._propsInfo.twoWay.reduce((options, _ref) => {
      var [name, defaultName, eventName] = _ref;
      return _extends({}, options, {
        [name]: viewDefaultProps[defaultName],
        [eventName]: value => this.option(name, value)
      });
    }, {}), this._propsInfo.templates.reduce((options, name) => _extends({}, options, {
      [name]: null
    }), {}));
  }
  _getUnwrappedOption() {
    var unwrappedProps = {};
    Object.keys(this.option()).forEach(key => {
      unwrappedProps[key] = this.option(key);
    });
    return unwrappedProps;
  }
  _initializeComponent() {
    var _this$_templateManage;
    super._initializeComponent();
    (_this$_templateManage = this._templateManager) === null || _this$_templateManage === void 0 ? void 0 : _this$_templateManage.addDefaultTemplates(this.getDefaultTemplates());
    var optionProxy = this._getUnwrappedOption();
    this._props = this._optionsWithDefaultTemplates(optionProxy);
    this._propsInfo.templates.forEach(template => {
      this._componentTemplates[template] = this._createTemplateComponent(this._props[template]);
    });
    Object.keys(this._getActionConfigsFull()).forEach(name => this._addAction(name));
    this._viewRef = createRef();
    this.defaultKeyHandlers = this._createDefaultKeyHandlers();
  }
  _initMarkup() {
    var props = this.getProps();
    this._renderWrapper(props);
  }
  _renderWrapper(props) {
    var containerNode = this.$element()[0];
    if (!this._isNodeReplaced) {
      renderer.onPreRender();
    }
    renderer.render(this._viewComponent, props, containerNode, this._isNodeReplaced);
    if (!this._isNodeReplaced) {
      this._isNodeReplaced = true;
      renderer.onAfterRender();
      this._shouldRaiseContentReady = true;
    }
    if (this._shouldRaiseContentReady) {
      this._fireContentReady();
      this._shouldRaiseContentReady = false;
    }
  }
  _silent(name, value) {
    this._options.silent(name, value);
  }
  _render() {}
  _removeWidget() {
    renderer.remove(this.$element()[0]);
  }
  _dispose() {
    this._removeWidget();
    super._dispose();
  }
  get elementAttr() {
    var element = this.$element()[0];
    if (!this._elementAttr) {
      var {
        attributes
      } = element;
      var attrs = Array.from(attributes).filter(attr => {
        var _attributes$attr$name;
        return !this._propsInfo.templates.includes(attr.name) && ((_attributes$attr$name = attributes[attr.name]) === null || _attributes$attr$name === void 0 ? void 0 : _attributes$attr$name.specified);
      }).reduce((result, _ref2) => {
        var {
          name,
          value
        } = _ref2;
        var updatedAttributes = result;
        var isDomAttr = (name in element);
        updatedAttributes[name] = value === '' && isDomAttr ? element[name] : value;
        return updatedAttributes;
      }, {});
      this._elementAttr = attrs;
      this._storedClasses = element.getAttribute('class') || '';
    }
    var elemStyle = element.style;
    var style = {};
    for (var i = 0; i < elemStyle.length; i += 1) {
      style[elemStyle[i]] = elemStyle.getPropertyValue(elemStyle[i]);
    }
    this._elementAttr.style = style;
    this._elementAttr.class = this._storedClasses;
    return this._elementAttr;
  }
  _getAdditionalActionConfigs() {
    return {
      onContentReady: {
        excludeValidators: ['disabled', 'readOnly']
      }
    };
  }
  _getAdditionalProps() {
    return [];
  }
  _patchOptionValues(options) {
    var {
      allowNull,
      elements,
      props,
      twoWay
    } = this._propsInfo;
    var viewDefaultProps = this._getViewComponentDefaultProps();
    var defaultWidgetPropsKeys = Object.keys(viewDefaultProps);
    var defaultOptions = this._getDefaultOptions();
    var {
      children,
      onKeyboardHandled,
      ref
    } = options;
    var onKeyDown = onKeyboardHandled ? (_, event_options) => {
      onKeyboardHandled(event_options);
    } : undefined;
    var widgetProps = {
      ref,
      children,
      onKeyDown
    };
    [...props, ...this._getAdditionalProps()].forEach(propName => {
      if (Object.prototype.hasOwnProperty.call(options, propName)) {
        widgetProps[propName] = options[propName];
      }
    });
    allowNull.forEach(setDefaultOptionValue(widgetProps, () => null));
    defaultWidgetPropsKeys.forEach(setDefaultOptionValue(widgetProps, name => defaultOptions[name]));
    twoWay.forEach(_ref3 => {
      var [name, defaultName] = _ref3;
      setDefaultOptionValue(widgetProps, () => defaultOptions[defaultName])(name);
    });
    elements.forEach(name => {
      if (name in widgetProps) {
        var value = widgetProps[name];
        if (isRenderer(value)) {
          widgetProps[name] = this._patchElementParam(value);
        }
      }
    });
    return widgetProps;
  }
  getSupportedKeyNames() {
    return [];
  }
  prepareStyleProp(props) {
    if (typeof props.style === 'string') {
      return _extends({}, props, {
        style: {},
        cssText: props.style
      });
    }
    return props;
  }
  getProps() {
    var _this$elementAttr$cla, _elementAttr$class;
    var {
      elementAttr
    } = this.option();
    var options = this._patchOptionValues(_extends({}, this._props, {
      ref: this._viewRef,
      children: this._extractDefaultSlot(),
      aria: this._aria
    }));
    this._propsInfo.templates.forEach(template => {
      options[template] = this._componentTemplates[template];
    });
    return this.prepareStyleProp(_extends({}, options, this.elementAttr, elementAttr, {
      className: [...((_this$elementAttr$cla = this.elementAttr.class) !== null && _this$elementAttr$cla !== void 0 ? _this$elementAttr$cla : '').split(' '), ...((_elementAttr$class = elementAttr === null || elementAttr === void 0 ? void 0 : elementAttr.class) !== null && _elementAttr$class !== void 0 ? _elementAttr$class : '').split(' ')].filter((c, i, a) => c && a.indexOf(c) === i).join(' ').trim(),
      class: ''
    }, this._actionsMap));
  }
  _getActionConfigs() {
    return {};
  }
  _getActionConfigsFull() {
    return _extends({}, this._getActionConfigs(), this._getAdditionalActionConfigs());
  }
  getDefaultTemplates() {
    var defaultTemplates = Object.values(this._templatesInfo);
    var result = {};
    defaultTemplates.forEach(template => {
      result[template] = 'dx-renovation-template-mock';
    });
    return result;
  }
  get _templatesInfo() {
    return {};
  }
  _optionsWithDefaultTemplates(options) {
    var templateOptions = Object.entries(this._templatesInfo).reduce((result, _ref4) => {
      var _options$templateName;
      var [templateName, templateValue] = _ref4;
      return _extends({}, result, {
        [templateName]: (_options$templateName = options[templateName]) !== null && _options$templateName !== void 0 ? _options$templateName : templateValue
      });
    }, {});
    return _extends({}, options, templateOptions);
  }
  _init() {
    super._init();
    this.customKeyHandlers = {};
    this._actionsMap = {};
    this._aria = {};
    this._componentTemplates = {};
  }
  _createDefaultKeyHandlers() {
    var result = {};
    var keys = this.getSupportedKeyNames();
    keys.forEach(key => {
      result[key] = e => this.viewRef.keyDown(KeyboardProcessor.createKeyDownOptions(e));
    });
    return result;
  }
  _addAction(event, actionToAdd) {
    var action = actionToAdd;
    if (!action) {
      var actionByOption = this._createActionByOption(event, this._getActionConfigsFull()[event]);
      action = actArgs => {
        Object.keys(actArgs).forEach(name => {
          if (isDefined(actArgs[name]) && domAdapter.isNode(actArgs[name])) {
            actArgs[name] = getPublicElement($(actArgs[name]));
          }
        });
        return actionByOption(actArgs);
      };
    }
    this._actionsMap[event] = action;
  }
  _optionChanged(option) {
    var {
      fullName,
      name,
      previousValue,
      value
    } = option;
    updatePropsImmutable(this._props, this.option(), name, fullName);
    if (this._propsInfo.templates.includes(name) && value !== previousValue) {
      this._componentTemplates[name] = this._createTemplateComponent(value);
    }
    if (name && this._getActionConfigsFull()[name]) {
      this._addAction(name);
    }
    this._shouldRaiseContentReady = this._shouldRaiseContentReady || this._checkContentReadyOption(fullName);
    super._optionChanged(option);
    this._invalidate();
  }
  _extractDefaultSlot() {
    if (this.option('_hasAnonymousTemplateContent')) {
      return renderer.createElement(TemplateWrapper, {
        template: this._getTemplate(this._templateManager.anonymousTemplateName),
        transclude: true,
        renovated: true
      });
    }
    return null;
  }
  _createTemplateComponent(templateOption) {
    if (!templateOption) {
      return undefined;
    }
    var template = this._getTemplate(templateOption);
    if (isString(template) && template === 'dx-renovation-template-mock') {
      return undefined;
    }
    var templateWrapper = model => renderer.createElement(TemplateWrapper, buildTemplateArgs(model, template));
    return templateWrapper;
  }
  _wrapKeyDownHandler(initialHandler) {
    return options => {
      var {
        keyName,
        originalEvent,
        which
      } = options;
      var keys = this.customKeyHandlers;
      var func = keys[keyName] || keys[which];
      if (func !== undefined) {
        var handler = func.bind(this);
        var result = handler(originalEvent, options);
        if (!result) {
          originalEvent.cancel = true;
          return originalEvent;
        }
      }
      return initialHandler === null || initialHandler === void 0 ? void 0 : initialHandler(originalEvent, options);
    };
  }
  _toPublicElement(element) {
    return getPublicElement($(element));
  }
  _patchElementParam(value) {
    try {
      var result = $(value);
      var element = result === null || result === void 0 ? void 0 : result.get(0);
      return element !== null && element !== void 0 && element.nodeType ? element : value;
    } catch (error) {
      return value;
    }
  }
  repaint() {
    this._isNodeReplaced = false;
    this._shouldRaiseContentReady = true;
    this._removeWidget();
    this._refresh();
  }
  _supportedKeys() {
    return _extends({}, this.defaultKeyHandlers, this.customKeyHandlers);
  }
  registerKeyHandler(key, handler) {
    this.customKeyHandlers[key] = handler;
  }
  setAria(name, value) {
    this._aria[name] = value;
    this._initMarkup();
  }
  _getViewComponentDefaultProps() {
    return this._viewComponent.defaultProps || {};
  }
}
ComponentWrapper.IS_RENOVATED_WIDGET = false;
ComponentWrapper.IS_RENOVATED_WIDGET = true;
