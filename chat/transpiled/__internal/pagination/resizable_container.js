"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResizableContainerDefaultProps = exports.ResizableContainer = void 0;
exports.calculateInfoTextVisible = calculateInfoTextVisible;
exports.calculateLargeDisplayMode = calculateLargeDisplayMode;
var _inferno = require("inferno");
var _index = require("../core/r1/runtime/inferno/index");
var _resize_callbacks = _interopRequireDefault(require("../../core/utils/resize_callbacks"));
var _type = require("../../core/utils/type");
var _pagination_props = require("./common/pagination_props");
var _get_element_width = require("./utils/get_element_width");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
function calculateLargeDisplayMode(_ref) {
  let {
    parent: parentWidth,
    allowedPageSizes: pageSizesWidth,
    pages: pagesWidth
  } = _ref;
  return parentWidth - (pageSizesWidth + pagesWidth) > 0;
}
function calculateInfoTextVisible(_ref2) {
  let {
    parent: parentWidth,
    allowedPageSizes: pageSizesWidth,
    pages: pagesWidth,
    info: infoWidth
  } = _ref2;
  const minimalWidth = pageSizesWidth + pagesWidth + infoWidth;
  return parentWidth - minimalWidth > 0;
}
function getElementsWidth(_ref3) {
  let {
    parent,
    allowedPageSizes,
    pages,
    info
  } = _ref3;
  const parentWidth = (0, _get_element_width.getElementContentWidth)(parent);
  const pageSizesWidth = (0, _get_element_width.getElementWidth)(allowedPageSizes);
  const infoWidth = (0, _get_element_width.getElementWidth)(info);
  const pagesHtmlWidth = (0, _get_element_width.getElementWidth)(pages);
  return {
    parent: parentWidth,
    allowedPageSizes: pageSizesWidth,
    info: infoWidth + (0, _get_element_width.getElementStyle)('marginLeft', info) + (0, _get_element_width.getElementStyle)('marginRight', info),
    pages: pagesHtmlWidth
  };
}
const ResizableContainerDefaultProps = exports.ResizableContainerDefaultProps = {
  paginationProps: _extends({}, _pagination_props.PaginationDefaultProps)
};
class ResizableContainer extends _index.InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {
      infoTextVisible: true,
      isLargeDisplayMode: true
    };
    this.refs = null;
    this.parentRef = (0, _inferno.createRef)();
    this.infoTextRef = (0, _inferno.createRef)();
    this.pagesRef = (0, _inferno.createRef)();
    // eslint-disable-next-line @stylistic/max-len
    this.allowedPageSizesRef = (0, _inferno.createRef)();
    this.elementsWidth = {};
    this.actualIsLargeDisplayMode = true;
    this.actualInfoTextVisible = true;
    this.subscribeToResize = this.subscribeToResize.bind(this);
    this.effectUpdateChildProps = this.effectUpdateChildProps.bind(this);
    this.updateAdaptivityProps = this.updateAdaptivityProps.bind(this);
  }
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate(nextProps, nextState, context);
  }
  createEffects() {
    return [new _index.InfernoEffect(this.subscribeToResize, [this.state.infoTextVisible, this.state.isLargeDisplayMode]), new _index.InfernoEffect(this.effectUpdateChildProps, [this.props, this.state.infoTextVisible, this.state.isLargeDisplayMode, this.props.paginationProps, this.props.contentTemplate])];
  }
  updateEffects() {
    var _this$_effects$, _this$_effects$2;
    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 || _this$_effects$.update([this.state.infoTextVisible, this.state.isLargeDisplayMode]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 || _this$_effects$2.update([this.props, this.state.infoTextVisible, this.state.isLargeDisplayMode, this.props.paginationProps, this.props.contentTemplate]);
  }
  subscribeToResize() {
    const callback = () => {
      if (this.getParentWidth() > 0) {
        this.updateAdaptivityProps();
      }
    };
    _resize_callbacks.default.add(callback);
    return () => {
      _resize_callbacks.default.remove(callback);
    };
  }
  effectUpdateChildProps() {
    if (this.getParentWidth() > 0) {
      this.updateAdaptivityProps();
    }
  }
  getContentAttributes() {
    const {
      className,
      displayMode,
      isGridCompatibilityMode,
      hasKnownLastPage,
      infoText,
      label,
      lightModeEnabled,
      maxPagesCount,
      onKeyDown,
      pageCount,
      pageIndex,
      pageIndexChangedInternal,
      pageSize,
      pageSizeChangedInternal,
      allowedPageSizes,
      pagesCountText,
      pagesNavigatorVisible,
      rtlEnabled,
      showInfo,
      showNavigationButtons,
      showPageSizeSelector,
      itemCount,
      visible,
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
    } = this.props.paginationProps;
    return {
      pageSize,
      pageIndex,
      pageIndexChangedInternal,
      pageSizeChangedInternal,
      isGridCompatibilityMode,
      className,
      showInfo,
      infoText,
      lightModeEnabled,
      displayMode,
      maxPagesCount,
      pageCount,
      pagesCountText,
      visible,
      hasKnownLastPage,
      pagesNavigatorVisible,
      showPageSizeSelector,
      allowedPageSizes,
      rtlEnabled,
      showNavigationButtons,
      itemCount,
      onKeyDown,
      label,
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
    };
  }
  getParentWidth() {
    var _this$parentRef;
    return (_this$parentRef = this.parentRef) !== null && _this$parentRef !== void 0 && _this$parentRef.current ? (0, _get_element_width.getElementWidth)(this.parentRef.current) : 0;
  }
  updateAdaptivityProps() {
    var _this$parentRef2, _this$allowedPageSize, _this$infoTextRef, _this$pagesRef;
    const currentElementsWidth = getElementsWidth({
      parent: (_this$parentRef2 = this.parentRef) === null || _this$parentRef2 === void 0 ? void 0 : _this$parentRef2.current,
      allowedPageSizes: (_this$allowedPageSize = this.allowedPageSizesRef) === null || _this$allowedPageSize === void 0 ? void 0 : _this$allowedPageSize.current,
      info: (_this$infoTextRef = this.infoTextRef) === null || _this$infoTextRef === void 0 ? void 0 : _this$infoTextRef.current,
      pages: (_this$pagesRef = this.pagesRef) === null || _this$pagesRef === void 0 ? void 0 : _this$pagesRef.current
    });
    if (this.actualInfoTextVisible !== this.state.infoTextVisible || this.actualIsLargeDisplayMode !== this.state.isLargeDisplayMode) {
      return;
    }
    const isEmpty = !(0, _type.isDefined)(this.elementsWidth);
    if (isEmpty) {
      this.elementsWidth = {};
    }
    if (isEmpty || this.state.isLargeDisplayMode) {
      this.elementsWidth.allowedPageSizes = currentElementsWidth.allowedPageSizes;
      this.elementsWidth.pages = currentElementsWidth.pages;
    }
    if (isEmpty || this.state.infoTextVisible) {
      this.elementsWidth.info = currentElementsWidth.info;
    }
    this.actualIsLargeDisplayMode = calculateLargeDisplayMode({
      parent: currentElementsWidth.parent,
      allowedPageSizes: this.elementsWidth.allowedPageSizes,
      pages: this.elementsWidth.pages
    });
    this.actualInfoTextVisible = calculateInfoTextVisible(_extends({}, currentElementsWidth, {
      info: this.elementsWidth.info
    }));
    this.setState(() => ({
      infoTextVisible: this.actualInfoTextVisible
    }));
    this.setState(() => ({
      isLargeDisplayMode: this.actualIsLargeDisplayMode
    }));
  }
  render() {
    const {
      infoTextVisible,
      isLargeDisplayMode
    } = this.state;
    const {
      props: {
        contentTemplate: Content
      }
    } = this;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, Content, _extends({
      "rootElementRef": this.parentRef,
      "allowedPageSizesRef": this.allowedPageSizesRef,
      "infoTextRef": this.infoTextRef,
      "pagesRef": this.pagesRef,
      "infoTextVisible": infoTextVisible,
      "isLargeDisplayMode": isLargeDisplayMode
    }, this.getContentAttributes())));
  }
}
exports.ResizableContainer = ResizableContainer;
ResizableContainer.defaultProps = ResizableContainerDefaultProps;