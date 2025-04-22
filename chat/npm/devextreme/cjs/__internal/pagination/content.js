/**
* DevExtreme (cjs/__internal/pagination/content.js)
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
exports.PaginationContentDefaultProps = exports.PaginationContent = void 0;
var _inferno = require("inferno");
var _index = require("../core/r1/runtime/inferno/index");
var _widget = require("../core/r1/widget");
var _accessibility = require("../../ui/shared/accessibility");
var _render_utils = require("../core/r1/utils/render_utils");
var _consts = require("./common/consts");
var _keyboard_action_context = require("./common/keyboard_action_context");
var _pagination_config_provider = require("./common/pagination_config_provider");
var _pagination_props = require("./common/pagination_props");
var _info = require("./info");
var _selector = require("./page_size/selector");
var _page_index_selector = require("./pages/page_index_selector");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PaginationContentDefaultProps = exports.PaginationContentDefaultProps = _extends({}, _pagination_props.PaginationDefaultProps, {
  infoTextVisible: true,
  isLargeDisplayMode: true
});
class PaginationContent extends _index.InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.refs = null;
    // eslint-disable-next-line @stylistic/max-len
    this.widgetElementRef = (0, _inferno.createRef)();
    // eslint-disable-next-line @stylistic/max-len
    this.widgetRootElementRef = (0, _inferno.createRef)();
    this.pagesRef = (0, _inferno.createRef)();
    this.infoTextRef = (0, _inferno.createRef)();
    this.__getterCache = {
      keyboardAction: undefined
    };
    this.state = {};
    this.__getterCache = {};
    this.setRootElementRef = this.setRootElementRef.bind(this);
    this.createFakeInstance = this.createFakeInstance.bind(this);
  }
  createEffects() {
    return [new _index.InfernoEffect(this.setRootElementRef, [])];
  }
  getChildContext() {
    return _extends({}, this.context, {
      [_keyboard_action_context.KeyboardActionContext.id]: this.getKeyboardAction() || _keyboard_action_context.KeyboardActionContext.defaultValue
    });
  }
  setRootElementRef() {
    const {
      rootElementRef
    } = this.props;
    if (rootElementRef && this.widgetRootElementRef) {
      rootElementRef.current = this.widgetRootElementRef.current;
    }
  }
  createFakeInstance() {
    return {
      option: () => false,
      element: () => {
        var _this$widgetRootEleme;
        return (_this$widgetRootEleme = this.widgetRootElementRef) === null || _this$widgetRootEleme === void 0 ? void 0 : _this$widgetRootEleme.current;
      },
      _createActionByOption: () => e => {
        var _this$props$onKeyDown, _this$props;
        (_this$props$onKeyDown = (_this$props = this.props).onKeyDown) === null || _this$props$onKeyDown === void 0 || _this$props$onKeyDown.call(_this$props, e);
      }
    };
  }
  getKeyboardAction() {
    return {
      registerKeyboardAction: (element, action) => {
        const fakePaginationInstance = this.createFakeInstance();
        return (0, _accessibility.registerKeyboardAction)('pager', fakePaginationInstance, element, undefined, action);
      }
    };
  }
  getInfoVisible() {
    const {
      infoTextVisible,
      showInfo
    } = this.props;
    return !!showInfo && infoTextVisible;
  }
  getPageIndexSelectorVisible() {
    return this.props.pageSize !== 0;
  }
  getNormalizedDisplayMode() {
    const {
      displayMode,
      lightModeEnabled
    } = this.props;
    if (displayMode === 'adaptive' && lightModeEnabled !== undefined) {
      return lightModeEnabled ? 'compact' : 'full';
    }
    return displayMode ?? 'adaptive';
  }
  getPagesContainerVisible() {
    return !!this.props.pagesNavigatorVisible && this.props.pageCount > 0;
  }
  getPagesContainerVisibility() {
    if (this.props.pagesNavigatorVisible === 'auto' && this.props.pageCount === 1 && this.props.hasKnownLastPage) {
      return 'hidden';
    }
    return undefined;
  }
  getIsLargeDisplayMode() {
    const displayMode = this.getNormalizedDisplayMode();
    let result = false;
    if (displayMode === 'adaptive') {
      result = this.props.isLargeDisplayMode;
    } else {
      result = displayMode === 'full';
    }
    return result;
  }
  getClasses() {
    const classesMap = {
      [`${this.props.className}`]: !!this.props.className,
      [_consts.PAGER_CLASS]: !!this.props.isGridCompatibilityMode,
      [_consts.PAGINATION_CLASS]: !this.props.isGridCompatibilityMode,
      [_consts.LIGHT_MODE_CLASS]: !this.getIsLargeDisplayMode()
    };
    return (0, _render_utils.combineClasses)(classesMap);
  }
  getAria() {
    return {
      role: 'navigation',
      label: this.props.label ?? ''
    };
  }
  componentWillUpdate(nextProps) {
    super.componentWillUpdate();
    if (this.props.onKeyDown !== nextProps.onKeyDown) {
      this.__getterCache.keyboardAction = undefined;
    }
  }
  render() {
    const {
      isGridCompatibilityMode,
      rtlEnabled,
      visible,
      showPageSizeSelector,
      allowedPageSizesRef,
      pageSize,
      pageSizeChangedInternal,
      allowedPageSizes,
      infoTextRef,
      infoText,
      pageCount,
      pageIndex,
      itemCount,
      pagesRef,
      hasKnownLastPage,
      maxPagesCount,
      pageIndexChangedInternal,
      pagesCountText,
      showNavigationButtons,
      style,
      width,
      height,
      elementAttr,
      hint,
      disabled,
      tabIndex,
      accessKey,
      activeStateEnabled,
      focusStateEnabled,
      hoverStateEnabled
    } = this.props;
    const content = (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
      "rootElementRef": this.widgetRootElementRef,
      "rtlEnabled": rtlEnabled,
      "classes": this.getClasses(),
      "visible": visible,
      "aria": this.getAria(),
      "style": style,
      "width": width,
      "height": height,
      "hint": hint,
      "disabled": disabled,
      "tabIndex": tabIndex,
      "accessKey": accessKey,
      "activeStateEnabled": activeStateEnabled,
      "focusStateEnabled": focusStateEnabled,
      "hoverStateEnabled": hoverStateEnabled
    }, elementAttr, {
      children: [showPageSizeSelector && (0, _inferno.createComponentVNode)(2, _selector.PageSizeSelector, {
        "rootElementRef": allowedPageSizesRef,
        "isLargeDisplayMode": this.getIsLargeDisplayMode(),
        "pageSize": pageSize,
        "pageSizeChangedInternal": pageSizeChangedInternal,
        "allowedPageSizes": allowedPageSizes
      }), this.getPagesContainerVisible() && (0, _inferno.createVNode)(1, "div", _consts.PAGINATION_PAGES_CLASS, [this.getInfoVisible() && (0, _inferno.createComponentVNode)(2, _info.InfoText, {
        "rootElementRef": infoTextRef,
        "infoText": infoText,
        "pageCount": pageCount,
        "pageIndex": pageIndex,
        "itemCount": itemCount
      }), this.getPageIndexSelectorVisible() && (0, _inferno.createVNode)(1, "div", _consts.PAGINATION_PAGE_INDEXES_CLASS, (0, _inferno.createComponentVNode)(2, _page_index_selector.PageIndexSelector, {
        "hasKnownLastPage": hasKnownLastPage,
        "isLargeDisplayMode": this.getIsLargeDisplayMode(),
        "maxPagesCount": maxPagesCount,
        "pageCount": pageCount,
        "pageIndex": pageIndex,
        "pageIndexChangedInternal": pageIndexChangedInternal,
        "pagesCountText": pagesCountText,
        "showNavigationButtons": showNavigationButtons,
        "itemCount": itemCount
      }), 2, null, null, pagesRef)], 0, {
        "style": {
          visibility: this.getPagesContainerVisibility()
        }
      })]
    })));
    return (0, _inferno.createComponentVNode)(2, _pagination_config_provider.PaginationConfigProvider, {
      "isGridCompatibilityMode": isGridCompatibilityMode,
      children: content
    });
  }
}
exports.PaginationContent = PaginationContent;
PaginationContent.defaultProps = PaginationContentDefaultProps;
