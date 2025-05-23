/**
* DevExtreme (esm/__internal/grids/grid_core/editor_factory/m_editor_factory.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import positionUtils from '../../../../animation/position';
import domAdapter from '../../../../core/dom_adapter';
import $ from '../../../../core/renderer';
import browser from '../../../../core/utils/browser';
import { extend } from '../../../../core/utils/extend';
import { getBoundingRect } from '../../../../core/utils/position';
import { getOuterHeight, getOuterWidth, setOuterHeight, setOuterWidth } from '../../../../core/utils/size';
import { name as clickEventName } from '../../../../events/click';
import eventsEngine from '../../../../events/core/events_engine';
import pointerEvents from '../../../../events/pointer';
import { addNamespace, normalizeKeyName } from '../../../../events/utils/index';
import EditorFactoryMixin from '../../../../ui/shared/ui.editor_factory_mixin';
import modules from '../m_modules';
import gridCoreUtils from '../m_utils';
var EDITOR_INLINE_BLOCK = 'dx-editor-inline-block';
var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
var FOCUS_OVERLAY_CLASS = 'focus-overlay';
var CONTENT_CLASS = 'content';
var FOCUSED_ELEMENT_CLASS = 'dx-focused';
var ROW_CLASS = 'dx-row';
var MODULE_NAMESPACE = 'dxDataGridEditorFactory';
var UPDATE_FOCUS_EVENTS = addNamespace([pointerEvents.down, 'focusin', clickEventName].join(' '), MODULE_NAMESPACE);
var DX_HIDDEN = 'dx-hidden';
var ViewControllerWithMixin = modules.ViewController.inherit(EditorFactoryMixin);
export class EditorFactory extends ViewControllerWithMixin {
  _getFocusedElement($dataGridElement) {
    var rowSelector = this.option('focusedRowEnabled') ? 'tr[tabindex]:focus' : 'tr[tabindex]:not(.dx-data-row):focus';
    var focusedElementSelector = "td[tabindex]:focus, ".concat(rowSelector, ", input:focus, textarea:focus, .dx-lookup-field:focus, .dx-checkbox:focus, .dx-switch:focus, .dx-dropdownbutton .dx-buttongroup:focus, .dx-adaptive-item-text:focus");
    // T181706
    var $focusedElement = $dataGridElement.find(focusedElementSelector);
    return this.elementIsInsideGrid($focusedElement) && $focusedElement;
  }
  _getFocusCellSelector() {
    return '.dx-row > td';
  }
  _updateFocusCore() {
    var $dataGridElement = this.component && this.component.$element();
    if ($dataGridElement) {
      // this selector is specific to IE
      var $focus = this._getFocusedElement($dataGridElement);
      if ($focus && $focus.length) {
        var isHideBorder;
        if (!$focus.hasClass(CELL_FOCUS_DISABLED_CLASS) && !$focus.hasClass(ROW_CLASS)) {
          var $focusCell = $focus.closest("".concat(this._getFocusCellSelector(), ", .").concat(CELL_FOCUS_DISABLED_CLASS));
          if ($focusCell.get(0) !== $focus.get(0)) {
            isHideBorder = this._needHideBorder($focusCell);
            $focus = $focusCell;
          }
        }
        if ($focus.length && !$focus.hasClass(CELL_FOCUS_DISABLED_CLASS)) {
          this.focus($focus, isHideBorder);
          return;
        }
      }
    }
    this.loseFocus();
  }
  _needHideBorder($element) {
    return $element.hasClass(EDITOR_INLINE_BLOCK);
  }
  _updateFocus(e) {
    var that = this;
    var isFocusOverlay = e && e.event && $(e.event.target).hasClass(that.addWidgetPrefix(FOCUS_OVERLAY_CLASS));
    that._isFocusOverlay = that._isFocusOverlay || isFocusOverlay;
    clearTimeout(that._updateFocusTimeoutID);
    that._updateFocusTimeoutID = setTimeout(() => {
      delete that._updateFocusTimeoutID;
      if (!that._isFocusOverlay) {
        that._updateFocusCore();
      }
      that._isFocusOverlay = false;
    });
  }
  _updateFocusOverlaySize($element, position) {
    $element.hide();
    // @ts-expect-error
    var location = positionUtils.calculate($element, extend({
      collision: 'fit'
    }, position));
    if (location.h.oversize > 0) {
      setOuterWidth($element, getOuterWidth($element) - location.h.oversize);
    }
    if (location.v.oversize > 0) {
      setOuterHeight($element, getOuterHeight($element) - location.v.oversize);
    }
    $element.show();
  }
  callbackNames() {
    return ['focused'];
  }
  focus($element, isHideBorder) {
    var that = this;
    if ($element === undefined) {
      return that._$focusedElement;
    }
    if ($element) {
      // To prevent overlay flicking
      if (!$element.is(that._$focusedElement)) {
        // TODO: this code should be before timeout else focus is not will move to adaptive form by shift + tab key
        that._$focusedElement && that._$focusedElement.removeClass(FOCUSED_ELEMENT_CLASS);
      }
      that._$focusedElement = $element;
      clearTimeout(that._focusTimeoutID);
      that._focusTimeoutID = setTimeout(() => {
        delete that._focusTimeoutID;
        that.renderFocusOverlay($element, isHideBorder);
        $element.addClass(FOCUSED_ELEMENT_CLASS);
        that.focused.fire($element);
      });
    }
  }
  refocus() {
    var $focus = this.focus();
    this.focus($focus);
  }
  renderFocusOverlay($element, isHideBorder) {
    var that = this;
    if (!gridCoreUtils.isElementInCurrentGrid(this, $element)) {
      return;
    }
    if (!that._$focusOverlay) {
      that._$focusOverlay = $('<div>').addClass(that.addWidgetPrefix(FOCUS_OVERLAY_CLASS));
    }
    if (isHideBorder) {
      that._$focusOverlay.addClass(DX_HIDDEN);
    } else if ($element.length) {
      // align "right bottom" for Mozilla
      var align = browser.mozilla ? 'right bottom' : 'left top';
      var $content = $element.closest(".".concat(that.addWidgetPrefix(CONTENT_CLASS)));
      var elemCoord = getBoundingRect($element.get(0));
      that._$focusOverlay.removeClass(DX_HIDDEN).appendTo($content);
      setOuterHeight(that._$focusOverlay, elemCoord.bottom - elemCoord.top + 1);
      setOuterWidth(that._$focusOverlay, elemCoord.right - elemCoord.left + 1);
      var focusOverlayPosition = {
        precise: true,
        my: align,
        at: align,
        of: $element,
        boundary: $content.length && $content
      };
      that._updateFocusOverlaySize(that._$focusOverlay, focusOverlayPosition);
      // @ts-expect-error
      positionUtils.setup(that._$focusOverlay, focusOverlayPosition);
      that._$focusOverlay.css('visibility', 'visible'); // for ios
    }
  }

  resize() {
    var $focusedElement = this._$focusedElement;
    if ($focusedElement) {
      this.focus($focusedElement);
    }
  }
  loseFocus() {
    this._$focusedElement && this._$focusedElement.removeClass(FOCUSED_ELEMENT_CLASS);
    this._$focusedElement = null;
    this._$focusOverlay && this._$focusOverlay.addClass(DX_HIDDEN);
  }
  init() {
    this.createAction('onEditorPreparing', {
      excludeValidators: ['disabled', 'readOnly'],
      category: 'rendering'
    });
    this.createAction('onEditorPrepared', {
      excludeValidators: ['disabled', 'readOnly'],
      category: 'rendering'
    });
    this._updateFocusHandler = this._updateFocusHandler || this.createAction(this._updateFocus.bind(this));
    this._subscribedContainerRoot = this._getContainerRoot();
    eventsEngine.on(this._subscribedContainerRoot, UPDATE_FOCUS_EVENTS, this._updateFocusHandler);
    this._attachContainerEventHandlers();
  }
  _getContainerRoot() {
    var _a;
    var $container = (_a = this.component) === null || _a === void 0 ? void 0 : _a.$element();
    // @ts-expect-error
    var root = domAdapter.getRootNode($container === null || $container === void 0 ? void 0 : $container.get(0));
    // @ts-expect-error
    // NOTE: this condition is for the 'Row - Redundant validation messages should not be rendered in a detail grid when focused row is enabled (T950174)'
    // testcafe test. The detail grid is created inside document_fragment_node but it is not shadow dom
    // eslint-disable-next-line no-undef
    if (root.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !root.host) {
      return domAdapter.getDocument();
    }
    return root;
  }
  _attachContainerEventHandlers() {
    var that = this;
    var $container = that.component && that.component.$element();
    if ($container) {
      // T179518
      eventsEngine.on($container, addNamespace('keydown', MODULE_NAMESPACE), e => {
        if (normalizeKeyName(e) === 'tab') {
          that._updateFocusHandler(e);
        }
      });
    }
  }
  dispose() {
    clearTimeout(this._focusTimeoutID);
    clearTimeout(this._updateFocusTimeoutID);
    eventsEngine.off(this._subscribedContainerRoot, UPDATE_FOCUS_EVENTS, this._updateFocusHandler);
  }
}
export var editorFactoryModule = {
  defaultOptions() {
    return {};
  },
  controllers: {
    editorFactory: EditorFactory
  }
};
