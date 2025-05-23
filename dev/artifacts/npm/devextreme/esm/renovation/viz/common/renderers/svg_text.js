/**
* DevExtreme (esm/renovation/viz/common/renderers/svg_text.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["align", "className", "dashStyle", "encodeHtml", "fill", "opacity", "rotate", "rotateX", "rotateY", "scaleX", "scaleY", "sharp", "sharpDirection", "stroke", "strokeOpacity", "strokeWidth", "styles", "text", "textsAlignment", "translateX", "translateY", "x", "y"];
import { createVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent } from '@devextreme/runtime/inferno';
import { normalizeStyles } from '@devextreme/runtime/inferno';
import SvgGraphicsProps from './base_graphics_props';
import { removeExtraAttrs, parseHTML, parseMultiline, getTextWidth, setTextNodeAttribute, getItemLineHeight, getLineHeight, convertAlignmentToAnchor, getGraphicExtraProps } from './utils';
import { isDefined } from '../../../../core/utils/type';
import { ConfigContext } from '../../../common/config_context';
var KEY_STROKE = 'stroke';
export var viewFunction = _ref => {
  var {
    computedProps,
    isStroked,
    styles,
    textAnchor,
    textItems,
    textRef
  } = _ref;
  var texts = textItems !== null && textItems !== void 0 ? textItems : [];
  var {
    fill,
    opacity,
    stroke,
    strokeOpacity,
    strokeWidth,
    text,
    x,
    y
  } = computedProps;
  return normalizeProps(createVNode(32, "text", null, [texts.length ? isStroked && texts.map((_ref2, index) => {
    var {
      className,
      style,
      value
    } = _ref2;
    return createVNode(32, "tspan", className, value, 0, {
      "style": normalizeStyles(style)
    }, index);
  }) : null, texts.length ? texts.map((_ref3, index) => {
    var {
      className,
      style,
      value
    } = _ref3;
    return createVNode(32, "tspan", className, value, 0, {
      "style": normalizeStyles(style)
    }, index);
  }) : null, !texts.length && text], 0, _extends({
    "x": x,
    "y": y,
    "style": normalizeStyles(styles),
    "text-anchor": textAnchor,
    "fill": fill,
    "stroke": stroke,
    "stroke-width": strokeWidth,
    "stroke-opacity": strokeOpacity,
    "opacity": opacity
  }, getGraphicExtraProps(computedProps, x, y)), null, textRef));
};
export var TextSvgElementProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(SvgGraphicsProps), Object.getOwnPropertyDescriptors({
  text: '',
  x: 0,
  y: 0,
  align: 'center',
  encodeHtml: true
})));
import { createRef as infernoCreateRef } from 'inferno';
export class TextSvgElement extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.textRef = infernoCreateRef();
    this.__getterCache = {};
    this.effectUpdateText = this.effectUpdateText.bind(this);
    this.parseTspanElements = this.parseTspanElements.bind(this);
    this.alignTextNodes = this.alignTextNodes.bind(this);
    this.locateTextNodes = this.locateTextNodes.bind(this);
    this.strokeTextNodes = this.strokeTextNodes.bind(this);
  }
  get config() {
    if (this.context[ConfigContext.id]) {
      return this.context[ConfigContext.id];
    }
    return ConfigContext.defaultValue;
  }
  createEffects() {
    return [new InfernoEffect(this.effectUpdateText, [this.props.text, this.props.encodeHtml, this.props.stroke, this.props.strokeWidth, this.props.textsAlignment, this.props.x, this.props.y, this.props.styles, this.props.strokeOpacity])];
  }
  updateEffects() {
    var _this$_effects$;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.text, this.props.encodeHtml, this.props.stroke, this.props.strokeWidth, this.props.textsAlignment, this.props.x, this.props.y, this.props.styles, this.props.strokeOpacity]);
  }
  effectUpdateText() {
    var texts = this.textItems;
    if (texts) {
      var items = this.parseTspanElements(texts);
      this.alignTextNodes(items);
      if (this.props.x !== undefined || this.props.y !== undefined) {
        this.locateTextNodes(items);
      }
      this.strokeTextNodes(items);
    }
  }
  get styles() {
    var _this$props$styles;
    var style = (_this$props$styles = this.props.styles) !== null && _this$props$styles !== void 0 ? _this$props$styles : {};
    return _extends({
      whiteSpace: 'pre'
    }, style);
  }
  get textItems() {
    if (this.__getterCache['textItems'] !== undefined) {
      return this.__getterCache['textItems'];
    }
    return this.__getterCache['textItems'] = (() => {
      var items;
      var parsedHtml = '';
      var {
        text
      } = this.props;
      if (!text) return;
      if (!this.props.encodeHtml && (/<[a-z][\s\S]*>/i.test(text) || text.includes('&'))) {
        parsedHtml = removeExtraAttrs(text);
        items = parseHTML(parsedHtml);
      } else if (/\n/g.test(text)) {
        items = parseMultiline(text);
      } else if (this.isStroked) {
        items = [{
          value: text.trim(),
          height: 0
        }];
      }
      return items;
    })();
  }
  get isStroked() {
    return isDefined(this.props.stroke) && isDefined(this.props.strokeWidth);
  }
  get textAnchor() {
    var _this$config;
    return convertAlignmentToAnchor(this.props.align, (_this$config = this.config) === null || _this$config === void 0 ? void 0 : _this$config.rtlEnabled);
  }
  get computedProps() {
    return this.props;
  }
  parseTspanElements(texts) {
    var items = [...texts];
    var textElements = this.textRef.current.children;
    var strokeLength = !this.isStroked ? 0 : items.length;
    for (var i = 0; i < textElements.length; i++) {
      if (i < strokeLength) {
        items[i].stroke = textElements[i];
      } else {
        items[i % items.length].tspan = textElements[i];
      }
    }
    return items;
  }
  alignTextNodes(items) {
    var alignment = this.props.textsAlignment;
    if (!items || !alignment || alignment === 'center') {
      return;
    }
    var direction = alignment === 'left' ? -1 : 1;
    var maxTextWidth = Math.max(...items.map(t => getTextWidth(t)));
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var textWidth = getTextWidth(item);
      if (maxTextWidth !== 0 && maxTextWidth !== textWidth) {
        var value = direction * (Math.round((maxTextWidth - textWidth) / 2 * 10) / 10);
        setTextNodeAttribute(item, 'dx', String(value));
      }
    }
  }
  locateTextNodes(items) {
    var {
      styles,
      x,
      y
    } = this.props;
    var lineHeight = getLineHeight(styles !== null && styles !== void 0 ? styles : {});
    var item = items[0];
    setTextNodeAttribute(item, 'x', String(x));
    setTextNodeAttribute(item, 'y', String(y));
    for (var i = 1, ii = items.length; i < ii; ++i) {
      item = items[i];
      if (isDefined(item.height) && item.height >= 0) {
        setTextNodeAttribute(item, 'x', String(x));
        var height = getItemLineHeight(item, lineHeight);
        setTextNodeAttribute(item, 'dy', String(height));
      }
    }
  }
  strokeTextNodes(items) {
    if (!this.isStroked) return;
    var {
      stroke,
      strokeWidth
    } = this.props;
    var strokeOpacity = Number(this.props.strokeOpacity) || 1;
    for (var i = 0, ii = items.length; i < ii; ++i) {
      var tspan = items[i].stroke;
      if (tspan) {
        tspan.setAttribute(KEY_STROKE, String(stroke));
        tspan.setAttribute('stroke-width', String(strokeWidth));
        tspan.setAttribute('stroke-opacity', String(strokeOpacity));
        tspan.setAttribute('stroke-linejoin', 'round');
      }
    }
  }
  get restAttributes() {
    var _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate();
    if (this.props['text'] !== nextProps['text'] || this.props['encodeHtml'] !== nextProps['encodeHtml'] || this.props['stroke'] !== nextProps['stroke'] || this.props['strokeWidth'] !== nextProps['strokeWidth']) {
      this.__getterCache['textItems'] = undefined;
    }
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      textRef: this.textRef,
      config: this.config,
      styles: this.styles,
      textItems: this.textItems,
      isStroked: this.isStroked,
      textAnchor: this.textAnchor,
      computedProps: this.computedProps,
      parseTspanElements: this.parseTspanElements,
      alignTextNodes: this.alignTextNodes,
      locateTextNodes: this.locateTextNodes,
      strokeTextNodes: this.strokeTextNodes,
      restAttributes: this.restAttributes
    });
  }
}
TextSvgElement.defaultProps = TextSvgElementProps;
