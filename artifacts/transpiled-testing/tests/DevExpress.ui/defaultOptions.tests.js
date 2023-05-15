!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui/defaultOptions.tests.js"], ["../../helpers/includeThemesLinks.js","jquery","core/utils/common","core/utils/browser","core/devices","ui/themes","core/utils/support","core/utils/public_component","core/options/utils","ui/action_sheet","ui/accordion","ui/button","ui/color_box","ui/data_grid","ui/date_box","ui/date_range_box","ui/dialog","ui/drop_down_editor/ui.drop_down_editor","ui/drop_down_box","ui/drop_down_button","ui/drop_down_editor/ui.drop_down_list","ui/toolbar/internal/ui.toolbar.menu","ui/text_box/ui.text_editor","ui/gallery","ui/lookup","ui/load_indicator","ui/load_panel","ui/list","ui/context_menu/ui.menu_base","ui/menu/ui.menu","ui/context_menu/ui.context_menu","ui/number_box","ui/widget/ui.widget","ui/overlay/ui.overlay","ui/popup","ui/popover","ui/tooltip","ui/radio_group","ui/resizable","ui/scheduler/ui.scheduler","ui/scroll_view/ui.scrollable","ui/scroll_view","ui/select_box","ui/slider/ui.slider_handle","ui/tabs","ui/tab_panel","ui/tag_box","ui/toast","ui/tree_list","ui/tree_view","ui/tile_view","ui/file_uploader","ui/form","ui/validation_message"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.ui/defaultOptions.tests.js', ['../../helpers/includeThemesLinks.js', 'jquery', 'core/utils/common', 'core/utils/browser', 'core/devices', 'ui/themes', 'core/utils/support', 'core/utils/public_component', 'core/options/utils', 'ui/action_sheet', 'ui/accordion', 'ui/button', 'ui/color_box', 'ui/data_grid', 'ui/date_box', 'ui/date_range_box', 'ui/dialog', 'ui/drop_down_editor/ui.drop_down_editor', 'ui/drop_down_box', 'ui/drop_down_button', 'ui/drop_down_editor/ui.drop_down_list', 'ui/toolbar/internal/ui.toolbar.menu', 'ui/text_box/ui.text_editor', 'ui/gallery', 'ui/lookup', 'ui/load_indicator', 'ui/load_panel', 'ui/list', 'ui/context_menu/ui.menu_base', 'ui/menu/ui.menu', 'ui/context_menu/ui.context_menu', 'ui/number_box', 'ui/widget/ui.widget', 'ui/overlay/ui.overlay', 'ui/popup', 'ui/popover', 'ui/tooltip', 'ui/radio_group', 'ui/resizable', 'ui/scheduler/ui.scheduler', 'ui/scroll_view/ui.scrollable', 'ui/scroll_view', 'ui/select_box', 'ui/slider/ui.slider_handle', 'ui/tabs', 'ui/tab_panel', 'ui/tag_box', 'ui/toast', 'ui/tree_list', 'ui/tree_view', 'ui/tile_view', 'ui/file_uploader', 'ui/form', 'ui/validation_message'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    $__require('../../helpers/includeThemesLinks.js');

    const $ = $__require('jquery');
    const noop = $__require('core/utils/common').noop;
    let browser = $__require('core/utils/browser');
    const devices = $__require('core/devices');
    const themes = $__require('ui/themes');
    const support = $__require('core/utils/support');
    const publicComponentUtils = $__require('core/utils/public_component');
    const getNestedOptionValue = $__require('core/options/utils').getNestedOptionValue;

    const ActionSheet = $__require('ui/action_sheet');
    const Accordion = $__require('ui/accordion');
    const Button = $__require('ui/button');
    const ColorBox = $__require('ui/color_box');
    const DataGrid = $__require('ui/data_grid');
    const DateBox = $__require('ui/date_box');
    const DateRangeBox = $__require('ui/date_range_box');
    const FakeDialogComponent = $__require('ui/dialog').FakeDialogComponent;
    const DropDownEditor = $__require('ui/drop_down_editor/ui.drop_down_editor');
    const DropDownBox = $__require('ui/drop_down_box');
    const DropDownButton = $__require('ui/drop_down_button');
    const DropDownList = $__require('ui/drop_down_editor/ui.drop_down_list');
    const DropDownMenu = $__require('ui/toolbar/internal/ui.toolbar.menu');
    const TextEditor = $__require('ui/text_box/ui.text_editor');
    const Gallery = $__require('ui/gallery');
    const Lookup = $__require('ui/lookup');
    const LoadIndicator = $__require('ui/load_indicator');
    const LoadPanel = $__require('ui/load_panel');
    const List = $__require('ui/list');
    const MenuBase = $__require('ui/context_menu/ui.menu_base');
    const Menu = $__require('ui/menu/ui.menu');
    const ContextMenu = $__require('ui/context_menu/ui.context_menu');
    const NumberBox = $__require('ui/number_box');
    const Widget = $__require('ui/widget/ui.widget');
    const Overlay = $__require('ui/overlay/ui.overlay');
    const Popup = $__require('ui/popup');
    const Popover = $__require('ui/popover');
    const Tooltip = $__require('ui/tooltip');
    const RadioGroup = $__require('ui/radio_group');
    const Resizable = $__require('ui/resizable');
    const Scheduler = $__require('ui/scheduler/ui.scheduler');
    const Scrollable = $__require('ui/scroll_view/ui.scrollable');
    const ScrollView = $__require('ui/scroll_view');
    const SelectBox = $__require('ui/select_box');
    const SliderHandle = $__require('ui/slider/ui.slider_handle');
    const Tabs = $__require('ui/tabs');
    const TabPanel = $__require('ui/tab_panel');
    const TagBox = $__require('ui/tag_box');
    const Toast = $__require('ui/toast');
    const TreeList = $__require('ui/tree_list');
    const TreeView = $__require('ui/tree_view');
    const TileView = $__require('ui/tile_view');
    const FileUploader = $__require('ui/file_uploader');
    const Form = $__require('ui/form');
    const ValidationMessage = $__require('ui/validation_message');

    themes.setDefaultTimeout(0);

    QUnit.testStart(function () {
        $('#qunit-fixture').html('<div id="cmp"></div>');
        return new Promise(resolve => themes.initialized(resolve));
    });

    QUnit.module('widgets defaults');

    const testComponentDefaults = function (componentClass, forcedDevices, options, before, after) {
        const componentName = publicComponentUtils.name(componentClass);

        forcedDevices = $.isArray(forcedDevices) ? forcedDevices : [forcedDevices];
        before = before || noop;
        after = after || noop;

        QUnit.test(componentName + ' default options', function (assert) {
            const originalDevice = devices._currentDevice;
            before.call(this);

            $.each(forcedDevices, function (_, device) {
                devices._currentDevice = device;
                if (componentClass.IS_RENOVATED_WIDGET) {
                    componentClass.defaultOptions({});
                }
                const component = new componentClass('#cmp');
                options = $.isFunction(options) ? options.call(component) : options;

                const defaults = component.option();
                checkOptions.apply(component, [options, defaults, JSON.stringify(device), assert]);
            });

            after.call(this);
            devices._currentDevice = originalDevice;
        });
    };

    const checkOptions = function (expectedOptions, resultOptions, deviceString, assert) {
        const that = this;

        $.each(expectedOptions, function (optionName, expectedValue) {
            let resultValue = getNestedOptionValue(resultOptions, optionName);

            resultValue = $.isFunction(resultValue) ? resultValue.call(that) : resultValue;

            if ($.isPlainObject(expectedValue)) {
                checkOptions(expectedValue, resultValue, null, assert);
            } else {
                assert.equal(resultValue, expectedValue, optionName + ' is configured on device ' + deviceString);
            }
        });
    };

    testComponentDefaults(ActionSheet, [{ platform: 'ios', tablet: true }], { usePopover: true });

    testComponentDefaults(Button, {}, {
        useInkRipple: true
    }, function () {
        this._originalIsMaterial = themes.isMaterial;
        themes.isMaterial = () => true;
    }, function () {
        themes.isMaterial = this._originalIsMaterial;
    });

    testComponentDefaults(Button, {}, {
        focusStateEnabled: true
    }, function () {
        this._originalRealDevice = devices.real();
        this._originalIsSimulator = devices.isSimulator;

        devices.real({ deviceType: 'desktop' });
        devices.isSimulator = () => false;
    }, function () {
        devices.real(this._originalRealDevice);
        devices.isSimulator = this._originalIsSimulator;
    });

    testComponentDefaults(NumberBox, {}, { useLargeSpinButtons: false }, function () {
        this._origDevice = devices.real();

        devices.real({ platform: 'generic', generic: true });
    }, function () {
        devices.real(this._origDevice);
    });

    testComponentDefaults(DateBox, {}, {
        useMaskBehavior: false,
        adaptivityEnabled: false
    });

    testComponentDefaults(DateRangeBox, {}, {
        activeStateEnabled: true,
        applyValueMode: 'instantly',
        deferRendering: true,
        disabled: false,
        endDateInputAttr: {},
        endDateLabel: 'End Date',
        endDateName: '',
        endDatePlaceholder: '',
        endDateText: '',
        focusStateEnabled: true,
        hoverStateEnabled: true,
        labelMode: 'static',
        onChange: null,
        onClosed: null,
        onCopy: null,
        onCut: null,
        onEnterKey: null,
        onInput: null,
        onKeyDown: null,
        onKeyUp: null,
        onOpened: null,
        onPaste: null,
        onValueChanged: null,
        openOnFieldClick: true,
        readOnly: false,
        startDateInputAttr: {},
        startDateLabel: 'Start Date',
        startDateName: '',
        startDatePlaceholder: '',
        startDateText: '',
        stylingMode: 'outlined',
        tabIndex: 0
    });

    testComponentDefaults(DateRangeBox, {}, {
        stylingMode: 'filled',
        labelMode: 'floating'
    }, function () {
        this.origIsMaterial = themes.isMaterial;
        themes.isMaterial = function () {
            return true;
        };
    }, function () {
        themes.isMaterial = this.origIsMaterial;
    });

    testComponentDefaults(DateRangeBox, { platform: 'android' }, {
        multiView: false
    }, function () {
        this._origDevice = devices.real();

        devices.real({ platform: 'android' });
    }, function () {
        devices.real(this._origDevice);
    });

    testComponentDefaults(DateRangeBox, { platform: 'ios' }, {
        multiView: false
    }, function () {
        this._origDevice = devices.real();

        devices.real({ platform: 'ios' });
    }, function () {
        devices.real(this._origDevice);
    });

    testComponentDefaults(DateRangeBox, { platform: 'generic', deviceType: 'desktop' }, {
        multiView: true
    }, function () {
        this._origDevice = devices.real();

        devices.real({ platform: 'generic', deviceType: 'desktop', phone: false });
    }, function () {
        devices.real(this._origDevice);
    });

    testComponentDefaults(DateBox, [{ platform: 'generic', deviceType: 'desktop' }], { pickerType: 'calendar' }, function () {
        this._origDevice = devices.real();

        devices.real({ platform: 'generic', deviceType: 'desktop', phone: false });
    }, function () {
        devices.real(this._origDevice);
    });

    testComponentDefaults(ValidationMessage, {}, {
        integrationOptions: {},
        templatesRenderAsynchronously: false,
        shading: false,
        width: 'auto',
        height: 'auto',
        hideOnOutsideClick: false,
        hideOnParentScroll: false,
        animation: null,
        visible: true,
        propagateOutsideClick: true,
        preventScrollEvents: false,
        _checkParentVisibility: false,
        rtlEnabled: false,
        contentTemplate: ValidationMessage._renderInnerHtml,
        maxWidth: '100%',

        mode: 'auto',
        validationErrors: undefined,
        positionSide: 'top',
        boundary: undefined,
        offset: { h: 0, v: 0 }
    });

    testComponentDefaults(FakeDialogComponent, [{ platform: 'ios' }], { width: 276 });

    testComponentDefaults(DropDownMenu, {}, {
        useInkRipple: true
    }, function () {
        this.origIsMaterial = themes.isMaterial;
        themes.isMaterial = function () {
            return true;
        };
    }, function () {
        themes.isMaterial = this.origIsMaterial;
    });

    testComponentDefaults(TextEditor, {}, {
        stylingMode: 'filled',
        labelMode: 'floating'
    }, function () {
        this.origIsMaterial = themes.isMaterial;
        themes.isMaterial = function () {
            return true;
        };
    }, function () {
        themes.isMaterial = this.origIsMaterial;
    });

    testComponentDefaults(TextEditor, {}, {
        showMaskMode: 'always'
    });

    testComponentDefaults(DropDownEditor, [{ platform: 'generic' }], {
        popupPosition: {
            offset: { h: 0, v: 0 },
            my: 'left top',
            at: 'left bottom',
            collision: 'flip flip'
        }
    });

    testComponentDefaults(DropDownBox, {}, {
        openOnFieldClick: true,
        acceptCustomValue: false,
        contentTemplate: 'content',
        valueChangeEvent: 'change'
    });

    testComponentDefaults(DropDownButton, {}, {
        dataSource: null,
        deferRendering: true,
        text: '',
        keyExpr: 'this',
        displayExpr: undefined,
        useSelectMode: false,
        wrapItemText: false,
        useItemTextAsTitle: true,
        opened: false,
        splitButton: false,
        showArrowIcon: true,
        selectedItemKey: null,
        focusStateEnabled: true,
        hoverStateEnabled: true,
        selectedItem: null,
        icon: undefined,
        grouped: false,
        itemTemplate: 'item',
        groupTemplate: 'group',
        buttonGroupOptions: {},
        dropDownOptions: {}
    });

    testComponentDefaults(DropDownList, {}, {
        groupTemplate: 'group',
        wrapItemText: false,
        useItemTextAsTitle: false,
        grouped: false
    });

    testComponentDefaults(List, {}, { useNativeScrolling: false }, function () {
        this._supportNativeScrolling = support.nativeScrolling;
        support.nativeScrolling = false;
    }, function () {
        support.nativeScrolling = this._supportNativeScrolling;
    });

    testComponentDefaults(TreeView, {}, { useNativeScrolling: false }, function () {
        this._supportNativeScrolling = support.nativeScrolling;
        support.nativeScrolling = false;
    }, function () {
        support.nativeScrolling = this._supportNativeScrolling;
    });

    testComponentDefaults(TileView, {}, { showScrollbar: 'onScroll' }, function () {
        this._supportNativeScrolling = support.nativeScrolling;
        support.nativeScrolling = true;
    }, function () {
        support.nativeScrolling = this._supportNativeScrolling;
    });

    testComponentDefaults(TileView, {}, { showScrollbar: 'never' }, function () {
        this._supportNativeScrolling = support.nativeScrolling;
        support.nativeScrolling = false;
    }, function () {
        support.nativeScrolling = this._supportNativeScrolling;
    });

    testComponentDefaults(List, { platform: 'ios' }, {
        itemDeleteMode: 'slideItem'
    });

    testComponentDefaults(List, { platform: 'android' }, {
        itemDeleteMode: 'swipe'
    });

    testComponentDefaults(List, { platform: 'generic' }, {
        itemDeleteMode: 'static',
        wrapItemText: false
    });

    testComponentDefaults(List, {}, {
        selectByClick: true
    });

    testComponentDefaults(List, { platform: 'generic', deviceType: 'desktop' }, {
        showScrollbar: 'onHover',
        pullRefreshEnabled: false,
        pageLoadMode: 'nextButton'
    }, function () {
        this._realDevice = devices.real();
        this._supportNativeScrolling = support.nativeScrolling;
        devices.real({ platform: 'generic', deviceType: 'desktop' });
        support.nativeScrolling = false;
    }, function () {
        devices.real(this._realDevice);
        support.nativeScrolling = this._supportNativeScrolling;
    });

    if (!/chrome/i.test(navigator.userAgent)) {
        testComponentDefaults(LoadIndicator, {}, { viaImage: true }, function () {
            this._originalRealDevice = devices.real();
            devices.real({ platform: 'android', version: [4, 0] });
        }, function () {
            devices.real(this._originalRealDevice);
        });
    }

    testComponentDefaults(Lookup, {}, {
        focusStateEnabled: true
    }, function () {
        this._origDevice = devices.real();

        devices.real({ deviceType: 'desktop' });
    }, function () {
        devices.real(this._origDevice);
    });

    testComponentDefaults(Lookup, [{ platform: 'ios', phone: true }], {
        'dropDownOptions.fullScreen': true
    });

    testComponentDefaults(Lookup, [{ platform: 'ios', tablet: true }, { platform: 'generic', deviceType: 'desktop' }], { usePopover: true }, function () {
        this._realDevice = devices.real();
        devices.real({ platform: 'generic', deviceType: 'desktop' });
    }, function () {
        devices.real(this._realDevice);
    });

    testComponentDefaults(Lookup, { platform: 'generic', deviceType: 'desktop' }, {
        pageLoadMode: 'scrollBottom'
    }, function () {
        this._realDevice = devices.real();
        this._supportNativeScrolling = support.nativeScrolling;
        devices.real({ platform: 'generic', deviceType: 'desktop' });
        support.nativeScrolling = false;
    }, function () {
        devices.real(this._realDevice);
        support.nativeScrolling = this._supportNativeScrolling;
    });

    testComponentDefaults(Lookup, {}, {
        usePopover: false,
        'dropDownOptions.hideOnOutsideClick': true,
        searchEnabled: false,
        showCancelButton: false,
        'dropDownOptions.showTitle': false,
        dropDownCentered: true
    }, function () {
        this.origIsMaterial = themes.isMaterial;
        themes.isMaterial = function () {
            return true;
        };
    }, function () {
        themes.isMaterial = this.origIsMaterial;
    });

    testComponentDefaults(Popup, {}, { focusStateEnabled: true }, function () {
        this._origDevice = devices.real();

        devices.real({ deviceType: 'desktop' });
    }, function () {
        devices.real(this._origDevice);
    });

    testComponentDefaults(Popup, [{ platform: 'ios' }], {
        animation: {
            show: {
                type: 'slide',
                duration: 400,
                from: {
                    position: {
                        my: 'top',
                        at: 'bottom'
                    }
                },
                to: {
                    position: {
                        my: 'center',
                        at: 'center'
                    }
                }
            },
            hide: {
                type: 'slide',
                duration: 400,
                from: {
                    opacity: 1,
                    position: {
                        my: 'center',
                        at: 'center'
                    }
                },
                to: {
                    opacity: 1,
                    position: {
                        my: 'top',
                        at: 'bottom'
                    }
                }
            }
        }
    });

    testComponentDefaults(Popup, [{ platform: 'android' }], function () {
        this.option('fullScreen', true);

        return {
            animation: {
                show: { type: 'slide', duration: 300, from: { top: '30%', opacity: 0 }, to: { top: 0, opacity: 1 } },
                hide: { type: 'slide', duration: 300, from: { top: 0, opacity: 1 }, to: { top: '30%', opacity: 0 } }
            }
        };
    });

    testComponentDefaults(Popup, [{ platform: 'android' }], {
        animation: {
            show: { type: 'fade', duration: 400, from: 0, to: 1 },
            hide: { type: 'fade', duration: 400, from: 1, to: 0 }
        }
    });

    testComponentDefaults(Popup, {}, {
        preventScrollEvents: false,
        enableBodyScroll: true
    });

    testComponentDefaults(Overlay, {}, {
        preventScrollEvents: true
    });

    testComponentDefaults(Widget, {}, {
        useResizeObserver: false
    }, function () {
        this.originalRealDevice = devices.real();
        devices.real({
            platform: 'ios',
            version: '13.3'
        });
    }, function () {
        devices.real(this.originalRealDevice);
    });

    testComponentDefaults(Popover, {}, {
        preventScrollEvents: false,
        enableBodyScroll: true,
        position: {
            at: 'bottom center',
            collision: 'fit flip',
            my: 'top center'
        },
        target: undefined,
        animation: {
            show: {
                type: 'fade',
                from: 0,
                to: 1
            },
            hide: {
                type: 'fade',
                from: 1,
                to: 0
            }
        }
    });

    testComponentDefaults(Tooltip, {}, {
        preventScrollEvents: false,
        enableBodyScroll: true
    });

    testComponentDefaults(RadioGroup, { tablet: true }, { layout: 'horizontal' });

    testComponentDefaults(Resizable, {}, { keepAspectRatio: true });

    testComponentDefaults(Gallery, {}, {
        loopItemFocus: false,
        selectOnFocus: true,
        selectionMode: 'single',
        selectionRequired: true,
        selectByClick: false
    });

    testComponentDefaults(Scrollable, {}, {
        useNative: false,
        // NOTE: useSimulatedScrollbar setting value doesn't affect on simulated strategy
        useSimulatedScrollbar: Scrollable.IS_RENOVATED_WIDGET ? false : true
    }, function () {
        this._supportNativeScrolling = support.nativeScrolling;
        support.nativeScrolling = false;
    }, function () {
        support.nativeScrolling = this._supportNativeScrolling;
    });

    testComponentDefaults(Scrollable, [{ platform: 'generic', deviceType: 'desktop' }], {
        scrollByThumb: true,
        scrollByContent: false,
        showScrollbar: 'onHover',
        bounceEnabled: false
    }, function () {
        this._supportNativeScrolling = support.nativeScrolling;
        support.nativeScrolling = false;
        this._supportTouch = support.touch;
        support.touch = false;
        this._originalRealDevice = devices.real();
        devices.real({ platform: 'generic', deviceType: 'desktop' });
    }, function () {
        support.nativeScrolling = this._supportNativeScrolling;
        support.touch = this._supportTouch;
        devices.real(this._originalRealDevice);
    });

    testComponentDefaults(Scrollable, {}, { useSimulatedScrollbar: !browser.mozilla }, function () {
        this._supportNativeScrolling = support.nativeScrolling;
        support.nativeScrolling = true;
        this._originalRealDevice = devices.real();
        devices.real({ platform: 'android', version: [4] });
    }, function () {
        support.nativeScrolling = this._supportNativeScrolling;
        devices.real(this._originalRealDevice);
    });

    testComponentDefaults(Scrollable, {}, {
        useNative: false
    }, function () {
        this._supportNativeScrolling = support.nativeScrolling;
        support.nativeScrolling = false;
    }, function () {
        support.nativeScrolling = this._supportNativeScrolling;
    });

    testComponentDefaults(Scrollable, {}, {
        useNative: true,
        useSimulatedScrollbar: false
    }, function () {
        this._supportNativeScrolling = support.nativeScrolling;
        this._originalRealDevice = devices.real();
        devices.real({ platform: 'generic' });
        support.nativeScrolling = true;
    }, function () {
        devices.real(this._originalRealDevice);
        support.nativeScrolling = this._supportNativeScrolling;
    });

    testComponentDefaults(Scrollable, {}, {
        useNative: true,
        useSimulatedScrollbar: !browser.mozilla
    }, function () {
        this._supportNativeScrolling = support.nativeScrolling;
        this._originalRealDevice = devices.real();
        devices.real({ platform: 'android' });
        support.nativeScrolling = true;
    }, function () {
        devices.real(this._originalRealDevice);
        support.nativeScrolling = this._supportNativeScrolling;
    });

    if (!Scrollable.IS_RENOVATED_WIDGET) {
        testComponentDefaults(ScrollView, {}, { refreshStrategy: 'swipeDown' }, function () {
            this._originalRealDevice = devices.real();
            devices.real({ platform: 'android' });
        }, function () {
            devices.real(this._originalRealDevice);
        });
    }

    testComponentDefaults(ScrollView, {}, {
        pullingDownText: '',
        pulledDownText: '',
        refreshingText: '',
        reachBottomText: ''
    }, function () {
        this.origIsMaterial = themes.isMaterial;
        themes.isMaterial = function () {
            return true;
        };
    }, function () {
        themes.isMaterial = this.origIsMaterial;
    });

    testComponentDefaults(TagBox, { platform: 'android' }, { showDropDownButton: false });

    testComponentDefaults(Toast, [{ platform: 'android' }], {
        position: {
            at: 'bottom left',
            my: 'bottom left',
            of: null,
            offset: '20 -20'
        },
        width: 'auto',
        animation: {
            show: {
                type: 'slide',
                duration: 200,
                from: {
                    position: {
                        my: 'top',
                        at: 'bottom',
                        of: window
                    }
                }
            },
            hide: {
                type: 'slide',
                duration: 200,
                to: {
                    position: {
                        my: 'top',
                        at: 'bottom',
                        of: window
                    }
                }
            }
        }
    });

    testComponentDefaults(Toast, { platform: 'android', deviceType: 'phone' }, {
        position: {
            my: 'bottom center',
            at: 'bottom center',
            offset: '0 0'
        }
    });

    testComponentDefaults(Toast, [{ platform: 'generic', deviceType: 'desktop' }, { platform: 'ios' }], {
        animation: {
            show: {
                type: 'fade',
                duration: 400,
                from: 0,
                to: 1
            },
            hide: {
                type: 'fade',
                duration: 400,
                from: 1,
                to: 0
            }
        }
    });

    testComponentDefaults(Toast, {}, {
        minWidth: 344,
        maxWidth: 568,
        displayTime: 4000
    }, function () {
        this.origIsMaterial = themes.isMaterial;
        themes.isMaterial = function () {
            return true;
        };
    }, function () {
        themes.isMaterial = this.origIsMaterial;
    });

    testComponentDefaults(TabPanel, { platform: 'generic' }, {
        animationEnabled: false
    });

    testComponentDefaults(LoadIndicator, {}, {
        _animatingSegmentCount: 2,
        _animatingSegmentInner: true
    }, function () {
        this.originalCurrentTheme = themes.current();
        themes.current('material');
    }, function () {
        themes.current(this.originalCurrentTheme);
    });

    testComponentDefaults(LoadIndicator, {}, {
        _animatingSegmentCount: 7,
        _animatingSegmentInner: false
    }, function () {
        this.originalCurrentTheme = themes.current();
        themes.current('generic');
    }, function () {
        themes.current(this.originalCurrentTheme);
    });

    testComponentDefaults(LoadPanel, {}, {
        width: 60,
        height: 60,
        maxWidth: 60,
        maxHeight: 60,
        message: ''
    }, function () {
        this.origIsMaterial = themes.isMaterial;
        themes.isMaterial = function () {
            return true;
        };
    }, function () {
        themes.isMaterial = this.origIsMaterial;
    });

    testComponentDefaults(LoadPanel, {}, {
        focusStateEnabled: false,
        propagateOutsideClick: true,
        preventScrollEvents: false
    });

    testComponentDefaults(ColorBox, {}, {
        valueChangeEvent: 'change'
    });

    testComponentDefaults(List, { platform: devices.current().platform }, {
        useInkRipple: true,
        pullingDownText: '',
        pulledDownText: '',
        refreshingText: '',
        pageLoadingText: ''
    }, function () {
        this.origIsMaterial = themes.isMaterial;
        themes.isMaterial = function () {
            return true;
        };
    }, function () {
        themes.isMaterial = this.origIsMaterial;
    });

    testComponentDefaults(TreeList, { platform: devices.current().platform }, {
        showRowLines: true,
        showColumnLines: false,
        headerFilter: {
            height: 315
        },
        editing: {
            useIcons: true
        }
    }, function () {
        this.origIsMaterial = themes.isMaterial;
        themes.isMaterial = function () {
            return true;
        };
    }, function () {
        themes.isMaterial = this.origIsMaterial;
    });

    testComponentDefaults(MenuBase, {}, {
        keyExpr: null
    });

    testComponentDefaults(Menu, {}, {
        keyExpr: null
    });

    testComponentDefaults(Menu, { platform: devices.current().platform }, { adaptivityEnabled: false });

    testComponentDefaults(ContextMenu, {}, {
        keyExpr: null
    });

    testComponentDefaults(TreeView, {}, {
        selectNodesRecursive: true,
        dataStructure: 'tree',
        expandAllEnabled: false,
        hasItemsExpr: 'hasItems',
        expandNodesRecursive: true,
        scrollDirection: 'vertical',
        virtualModeEnabled: false,
        rootValue: 0,
        searchValue: '',
        selectionMode: 'multiple',
        showCheckBoxesMode: 'none',
        selectByClick: false
    });

    testComponentDefaults(SelectBox, {}, {
        allowClearing: true
    });

    testComponentDefaults(SliderHandle, {}, {
        hoverStateEnabled: false,
        value: 0,
        tooltip: {
            enabled: false,
            position: 'top',
            showMode: 'onHover'
        }
    });

    testComponentDefaults(Tabs, {}, {
        useInkRipple: true,
        selectOnFocus: false
    }, function () {
        this.origIsMaterial = themes.isMaterial;
        themes.isMaterial = function () {
            return true;
        };
    }, function () {
        themes.isMaterial = this.origIsMaterial;
    });

    testComponentDefaults(Tabs, {}, {
        showNavButtons: true,
        selectOnFocus: true
    }, function () {
        this._origDevice = devices.real();

        devices.real({ platform: 'generic', generic: true, deviceType: 'desktop' });
    }, function () {
        devices.real(this._origDevice);
    });

    testComponentDefaults(Tabs, { platform: devices.current().platform }, {
        showNavButtons: false,
        selectOnFocus: true
    }, function () {
        this.originalRealDevice = devices.real();
        devices.real({
            platform: 'ios',
            deviceType: 'tablet'
        });
    }, function () {
        devices.real(this.originalRealDevice);
    });

    [{ name: 'chrome', version: '65.9', mode: 'number' }, { name: 'chrome', version: '66.0', mode: 'text' }, { name: 'safari', version: '11.9', mode: 'number' }, { name: 'safari', version: '12.0', mode: 'text' }].forEach(function (item) {
        testComponentDefaults(NumberBox, { browser: item.name, version: item.version, platform: 'ios', deviceType: 'phone' }, { mode: item.mode }, function () {
            this.originalRealDevice = devices.real();
            this._origBrowser = browser;

            delete browser.chrome;
            delete browser.safari;
            browser.version = item.version;
            browser[item.name] = true;

            devices.real({ platform: 'ios', deviceType: 'phone' });
        }, function () {
            browser = this._origBrowser;
            devices.real(this.originalRealDevice);
        });
    });

    testComponentDefaults(FileUploader, {}, { _uploadButtonType: 'default' }, function () {
        this.origIsMaterial = themes.isMaterial;
        themes.isMaterial = function () {
            return true;
        };
    }, function () {
        themes.isMaterial = this.origIsMaterial;
    });

    testComponentDefaults(Form, {}, {
        labelLocation: 'top',
        showColonAfterLabel: false
    }, function () {
        this.origIsMaterial = themes.isMaterial;
        themes.isMaterial = function () {
            return true;
        };
    }, function () {
        themes.isMaterial = this.origIsMaterial;
    });

    testComponentDefaults(DataGrid, {}, {
        showRowLines: true,
        showColumnLines: false,
        editing: { useIcons: true },
        selection: {
            showCheckBoxesMode: 'always'
        }
    }, function () {
        this.origIsMaterial = themes.isMaterial;
        themes.isMaterial = function () {
            return true;
        };
    }, function () {
        themes.isMaterial = this.origIsMaterial;
    });

    testComponentDefaults(DataGrid, {}, {
        grouping: { expandMode: 'rowClick' },
        showRowLines: true
    }, function () {
        this.originalRealDevice = devices.real();
        devices.real({
            platform: 'ios',
            deviceType: 'tablet'
        });
    }, function () {
        devices.real(this.originalRealDevice);
    });

    testComponentDefaults(Accordion, {}, {
        animationDuration: 200,
        _animationEasing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }, function () {
        this.origIsMaterial = themes.isMaterial;
        themes.isMaterial = function () {
            return true;
        };
    }, function () {
        themes.isMaterial = this.origIsMaterial;
    });

    testComponentDefaults(Scheduler, {}, {
        _appointmentTooltipOffset: { x: 0, y: 11 },
        _appointmentTooltipButtonsPosition: 'top',
        _appointmentTooltipOpenButtonText: null,
        _appointmentCountPerCell: 1,
        _collectorOffset: 20,
        _appointmentOffset: 30
    }, function () {
        this.origIsMaterial = themes.isMaterial;
        themes.isMaterial = function () {
            return true;
        };
    }, function () {
        themes.isMaterial = this.origIsMaterial;
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../helpers/includeThemesLinks.js","jquery","core/utils/common","core/utils/browser","core/devices","ui/themes","core/utils/support","core/utils/public_component","core/options/utils","ui/action_sheet","ui/accordion","ui/button","ui/color_box","ui/data_grid","ui/date_box","ui/date_range_box","ui/dialog","ui/drop_down_editor/ui.drop_down_editor","ui/drop_down_box","ui/drop_down_button","ui/drop_down_editor/ui.drop_down_list","ui/toolbar/internal/ui.toolbar.menu","ui/text_box/ui.text_editor","ui/gallery","ui/lookup","ui/load_indicator","ui/load_panel","ui/list","ui/context_menu/ui.menu_base","ui/menu/ui.menu","ui/context_menu/ui.context_menu","ui/number_box","ui/widget/ui.widget","ui/overlay/ui.overlay","ui/popup","ui/popover","ui/tooltip","ui/radio_group","ui/resizable","ui/scheduler/ui.scheduler","ui/scroll_view/ui.scrollable","ui/scroll_view","ui/select_box","ui/slider/ui.slider_handle","ui/tabs","ui/tab_panel","ui/tag_box","ui/toast","ui/tree_list","ui/tree_view","ui/tile_view","ui/file_uploader","ui/form","ui/validation_message"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../helpers/includeThemesLinks.js"), require("jquery"), require("core/utils/common"), require("core/utils/browser"), require("core/devices"), require("ui/themes"), require("core/utils/support"), require("core/utils/public_component"), require("core/options/utils"), require("ui/action_sheet"), require("ui/accordion"), require("ui/button"), require("ui/color_box"), require("ui/data_grid"), require("ui/date_box"), require("ui/date_range_box"), require("ui/dialog"), require("ui/drop_down_editor/ui.drop_down_editor"), require("ui/drop_down_box"), require("ui/drop_down_button"), require("ui/drop_down_editor/ui.drop_down_list"), require("ui/toolbar/internal/ui.toolbar.menu"), require("ui/text_box/ui.text_editor"), require("ui/gallery"), require("ui/lookup"), require("ui/load_indicator"), require("ui/load_panel"), require("ui/list"), require("ui/context_menu/ui.menu_base"), require("ui/menu/ui.menu"), require("ui/context_menu/ui.context_menu"), require("ui/number_box"), require("ui/widget/ui.widget"), require("ui/overlay/ui.overlay"), require("ui/popup"), require("ui/popover"), require("ui/tooltip"), require("ui/radio_group"), require("ui/resizable"), require("ui/scheduler/ui.scheduler"), require("ui/scroll_view/ui.scrollable"), require("ui/scroll_view"), require("ui/select_box"), require("ui/slider/ui.slider_handle"), require("ui/tabs"), require("ui/tab_panel"), require("ui/tag_box"), require("ui/toast"), require("ui/tree_list"), require("ui/tree_view"), require("ui/tile_view"), require("ui/file_uploader"), require("ui/form"), require("ui/validation_message"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=defaultOptions.tests.js.map