import _extends from "@babel/runtime/helpers/esm/extends";
import { createComponentVNode, normalizeProps } from "inferno";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InfernoComponent, InfernoEffect } from '../core/r1/runtime/inferno/index';
import { createRef as infernoCreateRef } from 'inferno';
import resizeCallbacks from '../../core/utils/resize_callbacks';
import { isDefined } from '../../core/utils/type';
import { PaginationDefaultProps } from './common/pagination_props';
import { getElementContentWidth, getElementStyle, getElementWidth } from './utils/get_element_width';
export function calculateLargeDisplayMode(_ref) {
  let {
    parent: parentWidth,
    allowedPageSizes: pageSizesWidth,
    pages: pagesWidth
  } = _ref;
  return parentWidth - (pageSizesWidth + pagesWidth) > 0;
}
export function calculateInfoTextVisible(_ref2) {
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
  const parentWidth = getElementContentWidth(parent);
  const pageSizesWidth = getElementWidth(allowedPageSizes);
  const infoWidth = getElementWidth(info);
  const pagesHtmlWidth = getElementWidth(pages);
  return {
    parent: parentWidth,
    allowedPageSizes: pageSizesWidth,
    info: infoWidth + getElementStyle('marginLeft', info) + getElementStyle('marginRight', info),
    pages: pagesHtmlWidth
  };
}
export const ResizableContainerDefaultProps = {
  paginationProps: _extends({}, PaginationDefaultProps)
};
export class ResizableContainer extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {
      infoTextVisible: true,
      isLargeDisplayMode: true
    };
    this.refs = null;
    this.parentRef = infernoCreateRef();
    this.infoTextRef = infernoCreateRef();
    this.pagesRef = infernoCreateRef();
    // eslint-disable-next-line @stylistic/max-len
    this.allowedPageSizesRef = infernoCreateRef();
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
    return [new InfernoEffect(this.subscribeToResize, [this.state.infoTextVisible, this.state.isLargeDisplayMode]), new InfernoEffect(this.effectUpdateChildProps, [this.props, this.state.infoTextVisible, this.state.isLargeDisplayMode, this.props.paginationProps, this.props.contentTemplate])];
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
    resizeCallbacks.add(callback);
    return () => {
      resizeCallbacks.remove(callback);
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
    return (_this$parentRef = this.parentRef) !== null && _this$parentRef !== void 0 && _this$parentRef.current ? getElementWidth(this.parentRef.current) : 0;
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
    const isEmpty = !isDefined(this.elementsWidth);
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
    return normalizeProps(createComponentVNode(2, Content, _extends({
      "rootElementRef": this.parentRef,
      "allowedPageSizesRef": this.allowedPageSizesRef,
      "infoTextRef": this.infoTextRef,
      "pagesRef": this.pagesRef,
      "infoTextVisible": infoTextVisible,
      "isLargeDisplayMode": isLargeDisplayMode
    }, this.getContentAttributes())));
  }
}
ResizableContainer.defaultProps = ResizableContainerDefaultProps;