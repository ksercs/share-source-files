"use strict";
// @ts-check
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editorFactoryModule = void 0;
var size_1 = require("../../../../core/utils/size");
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var dom_adapter_1 = __importDefault(require("../../../../core/dom_adapter"));
var events_engine_1 = __importDefault(require("../../../../events/core/events_engine"));
var click_1 = require("../../../../events/click");
var pointer_1 = __importDefault(require("../../../../events/pointer"));
var position_1 = __importDefault(require("../../../../animation/position"));
var index_1 = require("../../../../events/utils/index");
var browser_1 = __importDefault(require("../../../../core/utils/browser"));
var extend_1 = require("../../../../core/utils/extend");
var position_2 = require("../../../../core/utils/position");
var ui_editor_factory_mixin_1 = __importDefault(require("../../../../ui/shared/ui.editor_factory_mixin"));
var modules_1 = __importDefault(require("../modules"));
var module_utils_1 = __importDefault(require("../module_utils"));
var EDITOR_INLINE_BLOCK = 'dx-editor-inline-block';
var CELL_FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
var FOCUS_OVERLAY_CLASS = 'focus-overlay';
var CONTENT_CLASS = 'content';
var FOCUSED_ELEMENT_CLASS = 'dx-focused';
var ROW_CLASS = 'dx-row';
var MODULE_NAMESPACE = 'dxDataGridEditorFactory';
var UPDATE_FOCUS_EVENTS = index_1.addNamespace([pointer_1.default.down, 'focusin', click_1.name].join(' '), MODULE_NAMESPACE);
var DX_HIDDEN = 'dx-hidden';
var members = {
    _getFocusedElement: function ($dataGridElement) {
        var rowSelector = this.option('focusedRowEnabled') ? 'tr[tabindex]:focus' : 'tr[tabindex]:not(.dx-data-row):focus';
        var focusedElementSelector = "td[tabindex]:focus, " + rowSelector + ", input:focus, textarea:focus, .dx-lookup-field:focus, .dx-checkbox:focus, .dx-switch:focus, .dx-dropdownbutton .dx-buttongroup:focus, .dx-adaptive-item-text:focus";
        // T181706
        var $focusedElement = $dataGridElement.find(focusedElementSelector);
        return this.elementIsInsideGrid($focusedElement) && $focusedElement;
    },
    _getFocusCellSelector: function () {
        return '.dx-row > td';
    },
    _updateFocusCore: function () {
        var $dataGridElement = this.component && this.component.$element();
        if ($dataGridElement) {
            // this selector is specific to IE
            var $focus = this._getFocusedElement($dataGridElement);
            if ($focus && $focus.length) {
                var isHideBorder = void 0;
                if (!$focus.hasClass(CELL_FOCUS_DISABLED_CLASS) && !$focus.hasClass(ROW_CLASS)) {
                    var $focusCell = $focus.closest(this._getFocusCellSelector() + ", ." + CELL_FOCUS_DISABLED_CLASS);
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
    _needHideBorder: function ($element) {
        return $element.hasClass(EDITOR_INLINE_BLOCK);
    },
    _updateFocus: function (e) {
        var that = this;
        var isFocusOverlay = e && e.event && renderer_1.default(e.event.target).hasClass(that.addWidgetPrefix(FOCUS_OVERLAY_CLASS));
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
    _updateFocusOverlaySize: function ($element, position) {
        $element.hide();
        // @ts-expect-error
        var location = position_1.default.calculate($element, extend_1.extend({ collision: 'fit' }, position));
        if (location.h.oversize > 0) {
            size_1.setOuterWidth($element, size_1.getOuterWidth($element) - location.h.oversize);
        }
        if (location.v.oversize > 0) {
            size_1.setOuterHeight($element, size_1.getOuterHeight($element) - location.v.oversize);
        }
        $element.show();
    },
    callbackNames: function () {
        return ['focused'];
    },
    focus: function ($element, isHideBorder) {
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
    refocus: function () {
        var $focus = this.focus();
        this.focus($focus);
    },
    renderFocusOverlay: function ($element, isHideBorder) {
        var that = this;
        if (!module_utils_1.default.isElementInCurrentGrid(this, $element)) {
            return;
        }
        if (!that._$focusOverlay) {
            that._$focusOverlay = renderer_1.default('<div>').addClass(that.addWidgetPrefix(FOCUS_OVERLAY_CLASS));
        }
        if (isHideBorder) {
            that._$focusOverlay.addClass(DX_HIDDEN);
        }
        else if ($element.length) {
            // align "right bottom" for Mozilla
            var align = browser_1.default.mozilla ? 'right bottom' : 'left top';
            var $content = $element.closest("." + that.addWidgetPrefix(CONTENT_CLASS));
            var elemCoord = position_2.getBoundingRect($element.get(0));
            that._$focusOverlay
                .removeClass(DX_HIDDEN)
                .appendTo($content);
            size_1.setOuterHeight(that._$focusOverlay, elemCoord.bottom - elemCoord.top + 1);
            size_1.setOuterWidth(that._$focusOverlay, elemCoord.right - elemCoord.left + 1);
            var focusOverlayPosition = {
                precise: true,
                my: align,
                at: align,
                of: $element,
                boundary: $content.length && $content,
            };
            that._updateFocusOverlaySize(that._$focusOverlay, focusOverlayPosition);
            // @ts-expect-error
            position_1.default.setup(that._$focusOverlay, focusOverlayPosition);
            that._$focusOverlay.css('visibility', 'visible'); // for ios
        }
    },
    resize: function () {
        var $focusedElement = this._$focusedElement;
        if ($focusedElement) {
            this.focus($focusedElement);
        }
    },
    loseFocus: function () {
        this._$focusedElement && this._$focusedElement.removeClass(FOCUSED_ELEMENT_CLASS);
        this._$focusedElement = null;
        this._$focusOverlay && this._$focusOverlay.addClass(DX_HIDDEN);
    },
    init: function () {
        this.createAction('onEditorPreparing', { excludeValidators: ['disabled', 'readOnly'], category: 'rendering' });
        this.createAction('onEditorPrepared', { excludeValidators: ['disabled', 'readOnly'], category: 'rendering' });
        this._updateFocusHandler = this._updateFocusHandler || this.createAction(this._updateFocus.bind(this));
        events_engine_1.default.on(this._getContainerRoot(), UPDATE_FOCUS_EVENTS, this._updateFocusHandler);
        this._attachContainerEventHandlers();
    },
    _getContainerRoot: function () {
        var _a;
        var $container = (_a = this.component) === null || _a === void 0 ? void 0 : _a.$element();
        // @ts-expect-error
        var root = dom_adapter_1.default.getRootNode($container === null || $container === void 0 ? void 0 : $container.get(0));
        // @ts-expect-error
        // NOTE: this condition is for the 'Row - Redundant validation messages should not be rendered in a detail grid when focused row is enabled (T950174)'
        // testcafe test. The detail grid is created inside document_fragment_node but it is not shadow dom
        // eslint-disable-next-line no-undef
        if (root.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !root.host) {
            return dom_adapter_1.default.getDocument();
        }
        return root;
    },
    _attachContainerEventHandlers: function () {
        var that = this;
        var $container = that.component && that.component.$element();
        if ($container) {
            // T179518
            events_engine_1.default.on($container, index_1.addNamespace('keydown', MODULE_NAMESPACE), function (e) {
                if (index_1.normalizeKeyName(e) === 'tab') {
                    that._updateFocusHandler(e);
                }
            });
        }
    },
    dispose: function () {
        clearTimeout(this._focusTimeoutID);
        clearTimeout(this._updateFocusTimeoutID);
        events_engine_1.default.off(this._getContainerRoot(), UPDATE_FOCUS_EVENTS, this._updateFocusHandler);
    },
};
var EditorFactory = modules_1.default.ViewController.inherit(members).include(ui_editor_factory_mixin_1.default);
exports.editorFactoryModule = {
    defaultOptions: function () {
        return {};
    },
    controllers: {
        editorFactory: EditorFactory,
    },
};