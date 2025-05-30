/**
* DevExtreme (esm/renovation/viz/sparklines/bullet.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["canvas", "canvasChange", "children", "className", "classes", "color", "defaultCanvas", "disabled", "endScaleValue", "margin", "onTooltipHidden", "onTooltipShown", "pointerEvents", "rtlEnabled", "showTarget", "showZeroLevel", "size", "startScaleValue", "target", "targetColor", "targetWidth", "tooltip", "value"];
import { createFragment, createComponentVNode, normalizeProps } from "inferno";
import { Fragment } from 'inferno';
import { InfernoEffect, InfernoWrapperComponent } from '@devextreme/runtime/inferno';
import { combineClasses } from '../../utils/combine_classes';
import { resolveRtlEnabled } from '../../utils/resolve_rtl';
import { getElementOffset } from '../../utils/get_element_offset';
import { BaseWidgetProps } from '../common/base_props';
import { BaseWidget } from '../common/base_widget';
import { createAxis, generateCustomizeTooltipCallback } from './utils';
import { ConfigContext } from '../../common/config_context';
import { PathSvgElement } from '../common/renderers/svg_path';
import { Tooltip as TooltipComponent, TooltipProps } from '../common/tooltip';
import { getFormatValue, pointInCanvas } from '../common/utils';
import eventsEngine from '../../../events/core/events_engine';
import { addNamespace } from '../../../events/utils/index';
import pointerEvents from '../../../events/pointer';
import domAdapter from '../../../core/dom_adapter';
var TARGET_MIN_Y = 0.02;
var TARGET_MAX_Y = 0.98;
var BAR_VALUE_MIN_Y = 0.1;
var BAR_VALUE_MAX_Y = 0.9;
var DEFAULT_CANVAS_WIDTH = 300;
var DEFAULT_CANVAS_HEIGHT = 30;
var DEFAULT_HORIZONTAL_MARGIN = 1;
var DEFAULT_VERTICAL_MARGIN = 2;
var DEFAULT_OFFSET = {
  top: 0,
  left: 0
};
var EVENT_NS = 'sparkline-tooltip';
var POINTER_ACTION = addNamespace([pointerEvents.down, pointerEvents.move], EVENT_NS);
var inCanvas = (canvas, x, y) => {
  var {
    height,
    width
  } = canvas;
  return pointInCanvas({
    left: 0,
    top: 0,
    right: width,
    bottom: height,
    width,
    height
  }, x, y);
};
var getCssClasses = _ref => {
  var {
    classes
  } = _ref;
  var rootClassesMap = {
    dxb: true,
    'dxb-bullet': true,
    [String(classes)]: !!classes
  };
  return combineClasses(rootClassesMap);
};
var getContainerCssClasses = _ref2 => {
  var {
    className
  } = _ref2;
  var rootClassesMap = {
    'dx-bullet': true,
    [String(className)]: !!className
  };
  return combineClasses(rootClassesMap);
};
export var viewFunction = viewModel => {
  var {
    color,
    disabled,
    margin,
    size,
    targetColor,
    targetWidth
  } = viewModel.props;
  var {
    barValueShape,
    customizedTooltipProps,
    isValidBulletScale,
    isValidTarget,
    isValidZeroLevel,
    targetShape,
    zeroLevelShape
  } = viewModel;
  return createFragment([normalizeProps(createComponentVNode(2, BaseWidget, _extends({
    "rootElementRef": viewModel.widgetRootRef,
    "classes": viewModel.cssClasses,
    "className": viewModel.cssClassName,
    "size": size,
    "margin": margin,
    "defaultCanvas": viewModel.defaultCanvas,
    "disabled": disabled,
    "rtlEnabled": viewModel.rtlEnabled,
    "canvasChange": viewModel.onCanvasChange,
    "pointerEvents": "visible"
  }, viewModel.restAttributes, {
    children: isValidBulletScale ? createFragment([createComponentVNode(2, PathSvgElement, {
      "type": "line",
      "points": barValueShape,
      "className": "dxb-bar-value",
      "strokeLineCap": "square",
      "fill": color
    }), isValidTarget && createComponentVNode(2, PathSvgElement, {
      "type": "line",
      "points": targetShape,
      "className": "dxb-target",
      "sharp": true,
      "strokeLineCap": "square",
      "stroke": targetColor,
      "strokeWidth": targetWidth
    }), isValidZeroLevel && createComponentVNode(2, PathSvgElement, {
      "type": "line",
      "points": zeroLevelShape,
      "className": "dxb-zero-level",
      "sharp": true,
      "strokeLineCap": "square",
      "stroke": targetColor,
      "strokeWidth": 1
    })], 0) : undefined
  }), null, viewModel.widgetRef)), customizedTooltipProps.enabled && normalizeProps(createComponentVNode(2, TooltipComponent, _extends({
    "rootWidget": viewModel.widgetRootRef
  }, customizedTooltipProps, {
    "visible": viewModel.tooltipVisible
  }), null, viewModel.tooltipRef))], 0);
};
export var BulletProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(BaseWidgetProps), Object.getOwnPropertyDescriptors({
  value: 0,
  color: '#e8c267',
  target: 0,
  targetColor: '#666666',
  targetWidth: 4,
  showTarget: true,
  showZeroLevel: true,
  startScaleValue: 0,
  tooltip: Object.freeze(TooltipProps)
})));
import { createReRenderEffect } from '@devextreme/runtime/inferno';
import { createRef as infernoCreateRef } from 'inferno';
export class Bullet extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.widgetRef = infernoCreateRef();
    this.tooltipRef = infernoCreateRef();
    this.widgetRootRef = infernoCreateRef();
    this.__getterCache = {};
    this.state = {
      argumentAxis: createAxis(true),
      valueAxis: createAxis(false),
      canvasState: {
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
      offsetState: DEFAULT_OFFSET,
      tooltipVisible: false,
      canvas: this.props.canvas !== undefined ? this.props.canvas : this.props.defaultCanvas
    };
    this.tooltipEffect = this.tooltipEffect.bind(this);
    this.tooltipOutEffect = this.tooltipOutEffect.bind(this);
    this.onCanvasChange = this.onCanvasChange.bind(this);
    this.prepareScaleProps = this.prepareScaleProps.bind(this);
    this.getRange = this.getRange.bind(this);
    this.getSimpleShape = this.getSimpleShape.bind(this);
    this.pointerHandler = this.pointerHandler.bind(this);
    this.pointerOutHandler = this.pointerOutHandler.bind(this);
  }
  get config() {
    if (this.context[ConfigContext.id]) {
      return this.context[ConfigContext.id];
    }
    return ConfigContext.defaultValue;
  }
  createEffects() {
    return [new InfernoEffect(this.tooltipEffect, [this.props.disabled, this.props.onTooltipHidden, this.props.onTooltipShown, this.props.tooltip, this.props.value, this.props.target, this.props.rtlEnabled, this.config, this.state.canvasState, this.state.offsetState]), new InfernoEffect(this.tooltipOutEffect, [this.state.tooltipVisible, this.state.offsetState, this.state.canvasState]), createReRenderEffect()];
  }
  updateEffects() {
    var _this$_effects$, _this$_effects$2;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.disabled, this.props.onTooltipHidden, this.props.onTooltipShown, this.props.tooltip, this.props.value, this.props.target, this.props.rtlEnabled, this.config, this.state.canvasState, this.state.offsetState]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.state.tooltipVisible, this.state.offsetState, this.state.canvasState]);
  }
  tooltipEffect() {
    var {
      disabled
    } = this.props;
    if (!disabled && this.customizedTooltipProps.enabled) {
      var _this$widgetRef$curre;
      var svg = (_this$widgetRef$curre = this.widgetRef.current) === null || _this$widgetRef$curre === void 0 ? void 0 : _this$widgetRef$curre.svg();
      eventsEngine.on(svg, POINTER_ACTION, this.pointerHandler);
      return () => {
        eventsEngine.off(svg, POINTER_ACTION, this.pointerHandler);
      };
    }
    return undefined;
  }
  tooltipOutEffect() {
    if (this.state.tooltipVisible) {
      var document = domAdapter.getDocument();
      eventsEngine.on(document, POINTER_ACTION, this.pointerOutHandler);
      return () => {
        eventsEngine.off(document, POINTER_ACTION, this.pointerOutHandler);
      };
    }
    return undefined;
  }
  get cssClasses() {
    var {
      classes
    } = this.props;
    return getCssClasses({
      classes
    });
  }
  get cssClassName() {
    var {
      className
    } = this.props;
    return getContainerCssClasses({
      className
    });
  }
  get rtlEnabled() {
    var {
      rtlEnabled
    } = this.props;
    return resolveRtlEnabled(rtlEnabled, this.config);
  }
  get tooltipEnabled() {
    return !(this.props.value === undefined && this.props.target === undefined);
  }
  get tooltipData() {
    if (this.__getterCache['tooltipData'] !== undefined) {
      return this.__getterCache['tooltipData'];
    }
    return this.__getterCache['tooltipData'] = (() => {
      var {
        target,
        tooltip,
        value
      } = this.props;
      var valueText = getFormatValue(value, undefined, {
        format: tooltip === null || tooltip === void 0 ? void 0 : tooltip.format
      });
      var targetText = getFormatValue(target, undefined, {
        format: tooltip === null || tooltip === void 0 ? void 0 : tooltip.format
      });
      return {
        originalValue: value,
        originalTarget: target,
        value: valueText,
        target: targetText,
        valueTexts: ['Actual Value:', valueText, 'Target Value:', targetText]
      };
    })();
  }
  get tooltipCoords() {
    if (this.__getterCache['tooltipCoords'] !== undefined) {
      return this.__getterCache['tooltipCoords'];
    }
    return this.__getterCache['tooltipCoords'] = (() => {
      var canvas = this.state.canvasState;
      var rootOffset = this.state.offsetState;
      return {
        x: canvas.width / 2 + rootOffset.left,
        y: canvas.height / 2 + rootOffset.top
      };
    })();
  }
  get customizedTooltipProps() {
    var {
      onTooltipHidden,
      onTooltipShown,
      tooltip
    } = this.props;
    var customProps = _extends({
      enabled: this.tooltipEnabled,
      eventData: {
        component: this.widgetRef
      },
      onTooltipHidden,
      onTooltipShown,
      customizeTooltip: generateCustomizeTooltipCallback(tooltip.customizeTooltip, tooltip.font, this.rtlEnabled),
      data: this.tooltipData
    }, this.tooltipCoords);
    return _extends({}, tooltip, customProps, {
      enabled: tooltip.enabled && this.tooltipEnabled
    });
  }
  get defaultCanvas() {
    return {
      width: DEFAULT_CANVAS_WIDTH,
      height: DEFAULT_CANVAS_HEIGHT,
      left: DEFAULT_HORIZONTAL_MARGIN,
      right: DEFAULT_HORIZONTAL_MARGIN,
      top: DEFAULT_VERTICAL_MARGIN,
      bottom: DEFAULT_VERTICAL_MARGIN
    };
  }
  get scaleProps() {
    if (this.__getterCache['scaleProps'] !== undefined) {
      return this.__getterCache['scaleProps'];
    }
    return this.__getterCache['scaleProps'] = (() => {
      var props = this.prepareScaleProps();
      var canvas = this.state.canvasState;
      var ranges = this.getRange(props);
      this.state.argumentAxis.update(ranges.arg, canvas, undefined);
      this.state.valueAxis.update(ranges.val, canvas, undefined);
      return props;
    })();
  }
  get isValidBulletScale() {
    var {
      endScaleValue,
      startScaleValue,
      target,
      value
    } = this.props;
    var isValidBounds = startScaleValue !== endScaleValue;
    var isValidMin = Number.isFinite(startScaleValue);
    var isValidMax = Number.isFinite(endScaleValue);
    var isValidValue = Number.isFinite(value);
    var isValidTarget = Number.isFinite(target);
    return isValidBounds && isValidMax && isValidMin && isValidTarget && isValidValue;
  }
  get targetShape() {
    return this.getSimpleShape(this.scaleProps.target);
  }
  get zeroLevelShape() {
    return this.getSimpleShape(0);
  }
  get isValidTarget() {
    var {
      showTarget
    } = this.props;
    return !(this.scaleProps.target > this.scaleProps.endScaleValue || this.scaleProps.target < this.scaleProps.startScaleValue || !showTarget);
  }
  get isValidZeroLevel() {
    var {
      showZeroLevel
    } = this.props;
    return !(this.scaleProps.endScaleValue < 0 || this.scaleProps.startScaleValue > 0 || !showZeroLevel);
  }
  get barValueShape() {
    var translatorX = this.state.argumentAxis.getTranslator();
    var translatorY = this.state.valueAxis.getTranslator();
    var y2 = translatorY.translate(BAR_VALUE_MIN_Y);
    var y1 = translatorY.translate(BAR_VALUE_MAX_Y);
    var x1 = Number.NaN;
    var x2 = Number.NaN;
    if (this.scaleProps.value > 0) {
      x1 = Math.max(0, this.scaleProps.startScaleValue);
      x2 = this.scaleProps.value >= this.scaleProps.endScaleValue ? this.scaleProps.endScaleValue : Math.max(this.scaleProps.value, x1);
    } else {
      x1 = Math.min(0, this.scaleProps.endScaleValue);
      x2 = this.scaleProps.value < this.scaleProps.startScaleValue ? this.scaleProps.startScaleValue : Math.min(this.scaleProps.value, x1);
    }
    x1 = translatorX.translate(x1);
    x2 = translatorX.translate(x2);
    return [x1, y1, x2, y1, x2, y2, x1, y2];
  }
  onCanvasChange(canvas) {
    var _this$widgetRef$curre2, _this$widgetRef$curre3;
    this.setState(__state_argument => ({
      canvasState: canvas
    }));
    var svgElement = (_this$widgetRef$curre2 = (_this$widgetRef$curre3 = this.widgetRef.current) === null || _this$widgetRef$curre3 === void 0 ? void 0 : _this$widgetRef$curre3.svg()) !== null && _this$widgetRef$curre2 !== void 0 ? _this$widgetRef$curre2 : undefined;
    this.setState(__state_argument => ({
      offsetState: getElementOffset(svgElement)
    }));
  }
  prepareScaleProps() {
    var {
      endScaleValue,
      startScaleValue,
      target,
      value
    } = this.props;
    var tmpProps = {
      inverted: false,
      value,
      target,
      startScaleValue: startScaleValue === undefined ? Math.min(target, value, 0) : startScaleValue,
      endScaleValue: endScaleValue === undefined ? Math.max(target, value) : endScaleValue
    };
    if (tmpProps.endScaleValue < tmpProps.startScaleValue) {
      var level = tmpProps.endScaleValue;
      tmpProps.endScaleValue = tmpProps.startScaleValue;
      tmpProps.startScaleValue = level;
      tmpProps.inverted = true;
    }
    return tmpProps;
  }
  getRange(scaleProps) {
    var {
      endScaleValue,
      inverted,
      startScaleValue
    } = scaleProps;
    return {
      arg: {
        invert: this.rtlEnabled ? !inverted : inverted,
        min: startScaleValue,
        max: endScaleValue,
        axisType: 'continuous',
        dataType: 'numeric'
      },
      val: {
        min: 0,
        max: 1,
        axisType: 'continuous',
        dataType: 'numeric'
      }
    };
  }
  getSimpleShape(value) {
    var translatorY = this.state.valueAxis.getTranslator();
    var x = this.state.argumentAxis.getTranslator().translate(value);
    return [x, translatorY.translate(TARGET_MIN_Y), x, translatorY.translate(TARGET_MAX_Y)];
  }
  pointerHandler() {
    this.setState(__state_argument => ({
      tooltipVisible: true
    }));
  }
  pointerOutHandler(_ref3) {
    var {
      pageX,
      pageY
    } = _ref3;
    var {
      left,
      top
    } = this.state.offsetState;
    var x = Math.floor(pageX - left);
    var y = Math.floor(pageY - top);
    if (!inCanvas(this.state.canvasState, x, y)) {
      this.setState(__state_argument => ({
        tooltipVisible: false
      }));
    }
  }
  get restAttributes() {
    var _this$props$canvas = _extends({}, this.props, {
        canvas: this.props.canvas !== undefined ? this.props.canvas : this.state.canvas
      }),
      restProps = _objectWithoutPropertiesLoose(_this$props$canvas, _excluded);
    return restProps;
  }
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate();
    if (this.props['target'] !== nextProps['target'] || this.props['tooltip'] !== nextProps['tooltip'] || this.props['value'] !== nextProps['value']) {
      this.__getterCache['tooltipData'] = undefined;
    }
    if (this.state['canvasState'] !== nextState['canvasState'] || this.state['offsetState'] !== nextState['offsetState']) {
      this.__getterCache['tooltipCoords'] = undefined;
    }
    if (this.props['endScaleValue'] !== nextProps['endScaleValue'] || this.props['startScaleValue'] !== nextProps['startScaleValue'] || this.props['target'] !== nextProps['target'] || this.props['value'] !== nextProps['value'] || this.state['canvasState'] !== nextState['canvasState'] || this.props['rtlEnabled'] !== nextProps['rtlEnabled'] || this.context[ConfigContext.id] !== context[ConfigContext.id] || this.state['argumentAxis'] !== nextState['argumentAxis'] || this.state['valueAxis'] !== nextState['valueAxis']) {
      this.__getterCache['scaleProps'] = undefined;
    }
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        canvas: this.props.canvas !== undefined ? this.props.canvas : this.state.canvas
      }),
      argumentAxis: this.state.argumentAxis,
      valueAxis: this.state.valueAxis,
      canvasState: this.state.canvasState,
      offsetState: this.state.offsetState,
      tooltipVisible: this.state.tooltipVisible,
      widgetRootRef: this.widgetRootRef,
      widgetRef: this.widgetRef,
      tooltipRef: this.tooltipRef,
      config: this.config,
      cssClasses: this.cssClasses,
      cssClassName: this.cssClassName,
      rtlEnabled: this.rtlEnabled,
      tooltipEnabled: this.tooltipEnabled,
      tooltipData: this.tooltipData,
      tooltipCoords: this.tooltipCoords,
      customizedTooltipProps: this.customizedTooltipProps,
      defaultCanvas: this.defaultCanvas,
      scaleProps: this.scaleProps,
      isValidBulletScale: this.isValidBulletScale,
      targetShape: this.targetShape,
      zeroLevelShape: this.zeroLevelShape,
      isValidTarget: this.isValidTarget,
      isValidZeroLevel: this.isValidZeroLevel,
      barValueShape: this.barValueShape,
      onCanvasChange: this.onCanvasChange,
      prepareScaleProps: this.prepareScaleProps,
      getRange: this.getRange,
      getSimpleShape: this.getSimpleShape,
      pointerHandler: this.pointerHandler,
      pointerOutHandler: this.pointerOutHandler,
      restAttributes: this.restAttributes
    });
  }
}
Bullet.defaultProps = BulletProps;
