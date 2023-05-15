"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editorFactoryModule = void 0;
var _size = require("../../../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _click = require("../../../../events/click");
var _pointer = _interopRequireDefault(require("../../../../events/pointer"));
var _position = _interopRequireDefault(require("../../../../animation/position"));
var _index = require("../../../../events/utils/index");
var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));
var _extend = require("../../../../core/utils/extend");
var _position2 = require("../../../../core/utils/position");
var _ui = _interopRequireDefault(require("../../../../ui/shared/ui.editor_factory_mixin"));
var _modules = _interopRequireDefault(require("../modules"));
var _module_utils = _interopRequireDefault(require("../module_utils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-check

var EDITOR_INLINE_BLOCK = 'dx-editor-inline-block';
var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
var FOCUS_OVERLAY_CLASS = 'focus-overlay';
var CONTENT_CLASS = 'content';
var FOCUSED_ELEMENT_CLASS = 'dx-focused';
var ROW_CLASS = 'dx-row';
var MODULE_NAMESPACE = 'dxDataGridEditorFactory';
var UPDATE_FOCUS_EVENTS = (0, _index.addNamespace)([_pointer.default.down, 'focusin', _click.name].join(' '), MODULE_NAMESPACE);
var DX_HIDDEN = 'dx-hidden';
var members = {
  _getFocusedElement: function _getFocusedElement($dataGridElement) {
    var rowSelector = this.option('focusedRowEnabled') ? 'tr[tabindex]:focus' : 'tr[tabindex]:not(.dx-data-row):focus';
    var focusedElementSelector = "td[tabindex]:focus, ".concat(rowSelector, ", input:focus, textarea:focus, .dx-lookup-field:focus, .dx-checkbox:focus, .dx-switch:focus, .dx-dropdownbutton .dx-buttongroup:focus, .dx-adaptive-item-text:focus");
    // T181706
    var $focusedElement = $dataGridElement.find(focusedElementSelector);
    return this.elementIsInsideGrid($focusedElement) && $focusedElement;
  },
  _getFocusCellSelector: function _getFocusCellSelector() {
    return '.dx-row > td';
  },
  _updateFocusCore: function _updateFocusCore() {
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
  },
  _needHideBorder: function _needHideBorder($element) {
    return $element.hasClass(EDITOR_INLINE_BLOCK);
  },
  _updateFocus: function _updateFocus(e) {
    var that = this;
    var isFocusOverlay = e && e.event && (0, _renderer.default)(e.event.target).hasClass(that.addWidgetPrefix(FOCUS_OVERLAY_CLASS));
    that._isFocusOverlay = that._isFocusOverlay || isFocusOverlay;
    clearTimeout(that._updateFocusTimeoutID);
    that._updateFocusTimeoutID = setTimeout(function () {
      delete that._updateFocusTimeoutID;
      if (!that._isFocusOverlay) {
        that._updateFocusCore();
      }
      that._isFocusOverlay = false;
    });
  },
  _updateFocusOverlaySize: function _updateFocusOverlaySize($element, position) {
    $element.hide();
    // @ts-expect-error
    var location = _position.default.calculate($element, (0, _extend.extend)({
      collision: 'fit'
    }, position));
    if (location.h.oversize > 0) {
      (0, _size.setOuterWidth)($element, (0, _size.getOuterWidth)($element) - location.h.oversize);
    }
    if (location.v.oversize > 0) {
      (0, _size.setOuterHeight)($element, (0, _size.getOuterHeight)($element) - location.v.oversize);
    }
    $element.show();
  },
  callbackNames: function callbackNames() {
    return ['focused'];
  },
  focus: function focus($element, isHideBorder) {
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
      that._focusTimeoutID = setTimeout(function () {
        delete that._focusTimeoutID;
        that.renderFocusOverlay($element, isHideBorder);
        $element.addClass(FOCUSED_ELEMENT_CLASS);
        that.focused.fire($element);
      });
    }
  },
  refocus: function refocus() {
    var $focus = this.focus();
    this.focus($focus);
  },
  renderFocusOverlay: function renderFocusOverlay($element, isHideBorder) {
    var that = this;
    if (!_module_utils.default.isElementInCurrentGrid(this, $element)) {
      return;
    }
    if (!that._$focusOverlay) {
      that._$focusOverlay = (0, _renderer.default)('<div>').addClass(that.addWidgetPrefix(FOCUS_OVERLAY_CLASS));
    }
    if (isHideBorder) {
      that._$focusOverlay.addClass(DX_HIDDEN);
    } else if ($element.length) {
      // align "right bottom" for Mozilla
      var align = _browser.default.mozilla ? 'right bottom' : 'left top';
      var $content = $element.closest(".".concat(that.addWidgetPrefix(CONTENT_CLASS)));
      var elemCoord = (0, _position2.getBoundingRect)($element.get(0));
      that._$focusOverlay.removeClass(DX_HIDDEN).appendTo($content);
      (0, _size.setOuterHeight)(that._$focusOverlay, elemCoord.bottom - elemCoord.top + 1);
      (0, _size.setOuterWidth)(that._$focusOverlay, elemCoord.right - elemCoord.left + 1);
      var focusOverlayPosition = {
        precise: true,
        my: align,
        at: align,
        of: $element,
        boundary: $content.length && $content
      };
      that._updateFocusOverlaySize(that._$focusOverlay, focusOverlayPosition);
      // @ts-expect-error
      _position.default.setup(that._$focusOverlay, focusOverlayPosition);
      that._$focusOverlay.css('visibility', 'visible'); // for ios
    }
  },
  resize: function resize() {
    var $focusedElement = this._$focusedElement;
    if ($focusedElement) {
      this.focus($focusedElement);
    }
  },
  loseFocus: function loseFocus() {
    this._$focusedElement && this._$focusedElement.removeClass(FOCUSED_ELEMENT_CLASS);
    this._$focusedElement = null;
    this._$focusOverlay && this._$focusOverlay.addClass(DX_HIDDEN);
  },
  init: function init() {
    this.createAction('onEditorPreparing', {
      excludeValidators: ['disabled', 'readOnly'],
      category: 'rendering'
    });
    this.createAction('onEditorPrepared', {
      excludeValidators: ['disabled', 'readOnly'],
      category: 'rendering'
    });
    this._updateFocusHandler = this._updateFocusHandler || this.createAction(this._updateFocus.bind(this));
    _events_engine.default.on(this._getContainerRoot(), UPDATE_FOCUS_EVENTS, this._updateFocusHandler);
    this._attachContainerEventHandlers();
  },
  _getContainerRoot: function _getContainerRoot() {
    var _a;
    var $container = (_a = this.component) === null || _a === void 0 ? void 0 : _a.$element();
    // @ts-expect-error
    var root = _dom_adapter.default.getRootNode($container === null || $container === void 0 ? void 0 : $container.get(0));
    // @ts-expect-error
    // NOTE: this condition is for the 'Row - Redundant validation messages should not be rendered in a detail grid when focused row is enabled (T950174)'
    // testcafe test. The detail grid is created inside document_fragment_node but it is not shadow dom
    // eslint-disable-next-line no-undef
    if (root.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !root.host) {
      return _dom_adapter.default.getDocument();
    }
    return root;
  },
  _attachContainerEventHandlers: function _attachContainerEventHandlers() {
    var that = this;
    var $container = that.component && that.component.$element();
    if ($container) {
      // T179518
      _events_engine.default.on($container, (0, _index.addNamespace)('keydown', MODULE_NAMESPACE), function (e) {
        if ((0, _index.normalizeKeyName)(e) === 'tab') {
          that._updateFocusHandler(e);
        }
      });
    }
  },
  dispose: function dispose() {
    clearTimeout(this._focusTimeoutID);
    clearTimeout(this._updateFocusTimeoutID);
    _events_engine.default.off(this._getContainerRoot(), UPDATE_FOCUS_EVENTS, this._updateFocusHandler);
  }
};
var EditorFactory = _modules.default.ViewController.inherit(_ui.default).inherit(members);
var editorFactoryModule = {
  defaultOptions: function defaultOptions() {
    return {};
  },
  controllers: {
    editorFactory: EditorFactory
  }
};
exports.editorFactoryModule = editorFactoryModule;