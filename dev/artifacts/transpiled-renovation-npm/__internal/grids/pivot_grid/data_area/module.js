"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataArea = void 0;
var renderer_1 = __importDefault(require("../../../../core/renderer"));
var support_1 = require("../../../../core/utils/support");
var module_1 = require("../area_item/module");
var module_widget_utils_1 = require("../module_widget_utils");
var PIVOTGRID_AREA_CLASS = 'dx-pivotgrid-area';
var PIVOTGRID_AREA_DATA_CLASS = 'dx-pivotgrid-area-data';
var PIVOTGRID_TOTAL_CLASS = 'dx-total';
var PIVOTGRID_GRAND_TOTAL_CLASS = 'dx-grandtotal';
var PIVOTGRID_ROW_TOTAL_CLASS = 'dx-row-total';
var DataArea = module_1.AreaItem.inherit({
    _getAreaName: function () {
        return 'data';
    },
    _createGroupElement: function () {
        return renderer_1.default('<div>')
            .addClass(PIVOTGRID_AREA_CLASS)
            .addClass(PIVOTGRID_AREA_DATA_CLASS)
            .css('borderTopWidth', 0);
    },
    _applyCustomStyles: function (options) {
        var cell = options.cell;
        var classArray = options.classArray;
        if (cell.rowType === 'T' || cell.columnType === 'T') {
            classArray.push(PIVOTGRID_TOTAL_CLASS);
        }
        if (cell.rowType === 'GT' || cell.columnType === 'GT') {
            classArray.push(PIVOTGRID_GRAND_TOTAL_CLASS);
        }
        if (cell.rowType === 'T' || cell.rowType === 'GT') {
            classArray.push(PIVOTGRID_ROW_TOTAL_CLASS);
        }
        if (options.rowIndex === options.rowsCount - 1) {
            options.cssArray.push('border-bottom: 0px');
        }
        this.callBase(options);
    },
    _moveFakeTable: function (scrollPos) {
        this._moveFakeTableHorizontally(scrollPos.x);
        this._moveFakeTableTop(scrollPos.y);
        this.callBase();
    },
    renderScrollable: function () {
        this._groupElement.dxScrollable({
            useNative: this.getUseNativeValue(),
            useSimulatedScrollbar: false,
            rtlEnabled: this.component.option('rtlEnabled'),
            bounceEnabled: false,
            updateManually: true,
        });
    },
    getUseNativeValue: function () {
        var useNative = this.component.option('scrolling').useNative;
        return useNative === 'auto'
            ? !!support_1.nativeScrolling
            : !!useNative;
    },
    getScrollbarWidth: function () {
        return this.getUseNativeValue() ? module_widget_utils_1.calculateScrollbarWidth() : 0;
    },
    updateScrollableOptions: function (_a) {
        var direction = _a.direction, rtlEnabled = _a.rtlEnabled;
        var scrollable = this._getScrollable();
        scrollable.option('useNative', this.getUseNativeValue());
        scrollable.option({ direction: direction, rtlEnabled: rtlEnabled });
    },
    getScrollableDirection: function (horizontal, vertical) {
        if (horizontal && !vertical) {
            return 'horizontal';
        }
        if (!horizontal && vertical) {
            return 'vertical';
        }
        return 'both';
    },
    reset: function () {
        this.callBase();
        if (this._virtualContent) {
            this._virtualContent.parent().css('height', 'auto');
        }
    },
    setVirtualContentParams: function (params) {
        this.callBase(params);
        this._virtualContent.parent().css('height', params.height);
        this._setTableCss({
            top: params.top,
            left: params.left,
        });
    },
});
exports.DataArea = DataArea;
exports.default = { DataArea: DataArea };