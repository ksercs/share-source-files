/**
* DevExtreme (esm/__internal/ui/m_text_area.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import eventsEngine from '../../common/core/events/core/events_engine';
import scrollEvents from '../../common/core/events/gesture/emitter.gesture.scroll';
import pointerEvents from '../../common/core/events/pointer';
import { addNamespace, eventData } from '../../common/core/events/utils/index';
import registerComponent from '../../core/component_registrator';
import $ from '../../core/renderer';
import { ensureDefined, noop } from '../../core/utils/common';
import { getElementBoxParams, getOuterHeight, getVerticalOffsets, parseHeight } from '../../core/utils/size';
import { isDefined } from '../../core/utils/type';
import { getWindow, hasWindow } from '../../core/utils/window';
import TextBox from '../ui/text_box/m_text_box';
import { allowScroll, prepareScrollData } from '../ui/text_box/m_utils.scroll';
const TEXTAREA_CLASS = 'dx-textarea';
const TEXTEDITOR_INPUT_CLASS_AUTO_RESIZE = 'dx-texteditor-input-auto-resize';
class TextArea extends TextBox {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      spellcheck: true,
      autoResizeEnabled: false
    });
  }
  _initMarkup() {
    this.$element().addClass(TEXTAREA_CLASS);
    super._initMarkup();
    this.setAria('multiline', 'true');
  }
  _renderContentImpl() {
    this._updateInputHeight();
    super._renderContentImpl();
  }
  _renderInput() {
    super._renderInput();
    this._renderScrollHandler();
  }
  _createInput() {
    const $input = $('<textarea>');
    this._applyInputAttributes($input, this.option('inputAttr'));
    this._updateInputAutoResizeAppearance($input);
    return $input;
  }
  _setInputMinHeight() {}
  _renderScrollHandler() {
    this._eventY = 0;
    const $input = this._input();
    const initScrollData = prepareScrollData($input, true);
    // @ts-expect-error ts-error
    eventsEngine.on($input, addNamespace(scrollEvents.init, this.NAME), initScrollData, noop);
    // @ts-expect-error ts-error
    eventsEngine.on($input, addNamespace(pointerEvents.down, this.NAME), this._pointerDownHandler.bind(this));
    // @ts-expect-error ts-error
    eventsEngine.on($input, addNamespace(pointerEvents.move, this.NAME), this._pointerMoveHandler.bind(this));
  }
  _pointerDownHandler(e) {
    this._eventY = eventData(e).y;
  }
  _pointerMoveHandler(e) {
    const currentEventY = eventData(e).y;
    const delta = this._eventY - currentEventY;
    if (allowScroll(this._input(), delta)) {
      e.isScrollingEvent = true;
      e.stopPropagation();
    }
    this._eventY = currentEventY;
  }
  _renderDimensions() {
    const $element = this.$element();
    const element = $element.get(0);
    const width = this._getOptionValue('width', element);
    const height = this._getOptionValue('height', element);
    const minHeight = this.option('minHeight');
    const maxHeight = this.option('maxHeight');
    $element.css({
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      minHeight: minHeight !== undefined ? minHeight : '',
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      maxHeight: maxHeight !== undefined ? maxHeight : '',
      width,
      height
    });
  }
  _resetDimensions() {
    this.$element().css({
      height: '',
      minHeight: '',
      maxHeight: ''
    });
  }
  _renderEvents() {
    if (this.option('autoResizeEnabled')) {
      // @ts-expect-error ts-error
      eventsEngine.on(this._input(), addNamespace('input paste', this.NAME), this._updateInputHeight.bind(this));
    }
    super._renderEvents();
  }
  _refreshEvents() {
    // @ts-expect-error ts-error
    eventsEngine.off(this._input(), addNamespace('input paste', this.NAME));
    super._refreshEvents();
  }
  _getHeightDifference($input) {
    return getVerticalOffsets(this.$element().get(0), false) + getVerticalOffsets(this._$textEditorContainer.get(0), false) + getVerticalOffsets(this._$textEditorInputContainer.get(0), true) + getElementBoxParams('height', getWindow().getComputedStyle($input.get(0))).margin;
  }
  _updateInputHeight() {
    if (!hasWindow()) {
      return;
    }
    const $input = this._input();
    const height = this.option('height');
    const autoHeightResizing = height === undefined && this.option('autoResizeEnabled');
    const shouldCalculateInputHeight = autoHeightResizing || height === undefined && this.option('minHeight');
    if (!shouldCalculateInputHeight) {
      $input.css('height', '');
      return;
    }
    this._resetDimensions();
    this.$element().css('height', getOuterHeight(this.$element()));
    $input.css('height', 0);
    const heightDifference = this._getHeightDifference($input);
    this._renderDimensions();
    const minHeight = this._getBoundaryHeight('minHeight');
    const maxHeight = this._getBoundaryHeight('maxHeight');
    let inputHeight = $input[0].scrollHeight;
    if (minHeight !== undefined) {
      inputHeight = Math.max(inputHeight, minHeight - heightDifference);
    }
    if (maxHeight !== undefined) {
      const adjustedMaxHeight = maxHeight - heightDifference;
      const needScroll = inputHeight > adjustedMaxHeight;
      inputHeight = Math.min(inputHeight, adjustedMaxHeight);
      this._updateInputAutoResizeAppearance($input, !needScroll);
    }
    $input.css('height', inputHeight);
    if (autoHeightResizing) {
      this.$element().css('height', 'auto');
    }
  }
  _getBoundaryHeight(optionName) {
    const boundaryValue = this.option(optionName);
    if (isDefined(boundaryValue)) {
      return typeof boundaryValue === 'number' ? boundaryValue : parseHeight(boundaryValue, this.$element().get(0).parentElement, this.$element().get(0));
    }
  }
  _renderInputType() {}
  _visibilityChanged(visible) {
    if (visible) {
      this._updateInputHeight();
    }
  }
  _updateInputAutoResizeAppearance($input, isAutoResizeEnabled) {
    if ($input) {
      const autoResizeEnabled = ensureDefined(isAutoResizeEnabled, this.option('autoResizeEnabled'));
      $input.toggleClass(TEXTEDITOR_INPUT_CLASS_AUTO_RESIZE, autoResizeEnabled);
    }
  }
  _dimensionChanged() {
    if (this.option('visible')) {
      this._updateInputHeight();
    }
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case 'autoResizeEnabled':
        this._updateInputAutoResizeAppearance(this._input(), value);
        this._refreshEvents();
        this._updateInputHeight();
        break;
      case 'value':
      case 'height':
        super._optionChanged(args);
        this._updateInputHeight();
        break;
      case 'minHeight':
      case 'maxHeight':
        this._renderDimensions();
        this._updateInputHeight();
        break;
      case 'visible':
        super._optionChanged(args);
        if (value) {
          this._updateInputHeight();
        }
        break;
      default:
        super._optionChanged(args);
    }
  }
}
registerComponent('dxTextArea', TextArea);
export default TextArea;
