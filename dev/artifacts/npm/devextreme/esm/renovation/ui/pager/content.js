/**
* DevExtreme (esm/renovation/ui/pager/content.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["className", "displayMode", "gridCompatibility", "hasKnownLastPage", "infoText", "infoTextRef", "infoTextVisible", "isLargeDisplayMode", "label", "lightModeEnabled", "maxPagesCount", "onKeyDown", "pageCount", "pageIndex", "pageIndexChange", "pageSize", "pageSizeChange", "pageSizes", "pageSizesRef", "pagesCountText", "pagesNavigatorVisible", "pagesRef", "rootElementRef", "rtlEnabled", "showInfo", "showNavigationButtons", "showPageSizes", "totalCount", "visible"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent } from '@devextreme/runtime/inferno';
import { normalizeStyles } from '@devextreme/runtime/inferno';
import { InfoText } from './info';
import { PageIndexSelector } from './pages/page_index_selector';
import { PageSizeSelector } from './page_size/selector';
import { PAGER_PAGES_CLASS, PAGER_PAGE_INDEXES_CLASS, LIGHT_MODE_CLASS, PAGER_CLASS } from './common/consts';
import { InternalPagerProps } from './common/pager_props';
import { combineClasses } from '../../utils/combine_classes';
import { Widget } from '../common/widget';
import { registerKeyboardAction as _registerKeyboardAction } from '../../../ui/shared/accessibility';
import { KeyboardActionContext } from './common/keyboard_action_context';
export var viewFunction = _ref => {
  var {
    aria,
    classes,
    infoVisible,
    isLargeDisplayMode,
    pageIndexSelectorVisible,
    pagesContainerVisibility,
    pagesContainerVisible,
    props: {
      hasKnownLastPage,
      infoText,
      infoTextRef,
      maxPagesCount,
      pageCount,
      pageIndex,
      pageIndexChange,
      pageSize,
      pageSizeChange,
      pageSizes,
      pageSizesRef,
      pagesCountText,
      pagesRef,
      rtlEnabled,
      showNavigationButtons,
      showPageSizes,
      totalCount,
      visible
    },
    restAttributes,
    widgetRootElementRef
  } = _ref;
  return normalizeProps(createComponentVNode(2, Widget, _extends({
    "rootElementRef": widgetRootElementRef,
    "rtlEnabled": rtlEnabled,
    "classes": classes,
    "visible": visible,
    "aria": aria
  }, restAttributes, {
    children: [showPageSizes && createComponentVNode(2, PageSizeSelector, {
      "rootElementRef": pageSizesRef,
      "isLargeDisplayMode": isLargeDisplayMode,
      "pageSize": pageSize,
      "pageSizeChange": pageSizeChange,
      "pageSizes": pageSizes
    }), pagesContainerVisible && createVNode(1, "div", PAGER_PAGES_CLASS, [infoVisible && createComponentVNode(2, InfoText, {
      "rootElementRef": infoTextRef,
      "infoText": infoText,
      "pageCount": pageCount,
      "pageIndex": pageIndex,
      "totalCount": totalCount
    }), pageIndexSelectorVisible && createVNode(1, "div", PAGER_PAGE_INDEXES_CLASS, createComponentVNode(2, PageIndexSelector, {
      "hasKnownLastPage": hasKnownLastPage,
      "isLargeDisplayMode": isLargeDisplayMode,
      "maxPagesCount": maxPagesCount,
      "pageCount": pageCount,
      "pageIndex": pageIndex,
      "pageIndexChange": pageIndexChange,
      "pagesCountText": pagesCountText,
      "showNavigationButtons": showNavigationButtons,
      "totalCount": totalCount
    }), 2, null, null, pagesRef)], 0, {
      "style": normalizeStyles({
        visibility: pagesContainerVisibility
      })
    })]
  })));
};
export var PagerContentProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(InternalPagerProps), Object.getOwnPropertyDescriptors({
  infoTextVisible: true,
  isLargeDisplayMode: true
})));
import { createRef as infernoCreateRef } from 'inferno';
export class PagerContent extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.widgetRootElementRef = infernoCreateRef();
    this.__getterCache = {};
    this.setRootElementRef = this.setRootElementRef.bind(this);
    this.createFakeInstance = this.createFakeInstance.bind(this);
  }
  createEffects() {
    return [new InfernoEffect(this.setRootElementRef, [])];
  }
  getChildContext() {
    return _extends({}, this.context, {
      [KeyboardActionContext.id]: this.keyboardAction || KeyboardActionContext.defaultValue
    });
  }
  setRootElementRef() {
    var {
      rootElementRef
    } = this.props;
    if (rootElementRef) {
      rootElementRef.current = this.widgetRootElementRef.current;
    }
  }
  createFakeInstance() {
    return {
      option: () => false,
      element: () => this.widgetRootElementRef.current,
      _createActionByOption: () => e => {
        var _this$props$onKeyDown, _this$props;
        (_this$props$onKeyDown = (_this$props = this.props).onKeyDown) === null || _this$props$onKeyDown === void 0 ? void 0 : _this$props$onKeyDown.call(_this$props, e);
      }
    };
  }
  get keyboardAction() {
    if (this.__getterCache['keyboardAction'] !== undefined) {
      return this.__getterCache['keyboardAction'];
    }
    return this.__getterCache['keyboardAction'] = (() => {
      return {
        registerKeyboardAction: (element, action) => {
          var fakePagerInstance = this.createFakeInstance();
          return _registerKeyboardAction('pager', fakePagerInstance, element, undefined, action);
        }
      };
    })();
  }
  get infoVisible() {
    var {
      infoTextVisible,
      showInfo
    } = this.props;
    return showInfo && infoTextVisible;
  }
  get pageIndexSelectorVisible() {
    return this.props.pageSize !== 0;
  }
  get normalizedDisplayMode() {
    var {
      displayMode,
      lightModeEnabled
    } = this.props;
    if (displayMode === 'adaptive' && lightModeEnabled !== undefined) {
      return lightModeEnabled ? 'compact' : 'full';
    }
    return displayMode;
  }
  get pagesContainerVisible() {
    return !!this.props.pagesNavigatorVisible && this.props.pageCount > 0;
  }
  get pagesContainerVisibility() {
    if (this.props.pagesNavigatorVisible === 'auto' && this.props.pageCount === 1 && this.props.hasKnownLastPage) {
      return 'hidden';
    }
    return undefined;
  }
  get isLargeDisplayMode() {
    var displayMode = this.normalizedDisplayMode;
    var result = false;
    if (displayMode === 'adaptive') {
      result = this.props.isLargeDisplayMode;
    } else {
      result = displayMode === 'full';
    }
    return result;
  }
  get classes() {
    var classesMap = {
      ["".concat(this.props.className)]: !!this.props.className,
      [PAGER_CLASS]: true,
      [LIGHT_MODE_CLASS]: !this.isLargeDisplayMode
    };
    return combineClasses(classesMap);
  }
  get aria() {
    return {
      role: 'navigation',
      label: this.props.label
    };
  }
  get restAttributes() {
    var _this$props2 = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props2, _excluded);
    return restProps;
  }
  componentWillUpdate(nextProps, nextState, context) {
    super.componentWillUpdate();
    if (this.props['onKeyDown'] !== nextProps['onKeyDown']) {
      this.__getterCache['keyboardAction'] = undefined;
    }
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      widgetRootElementRef: this.widgetRootElementRef,
      keyboardAction: this.keyboardAction,
      infoVisible: this.infoVisible,
      pageIndexSelectorVisible: this.pageIndexSelectorVisible,
      pagesContainerVisible: this.pagesContainerVisible,
      pagesContainerVisibility: this.pagesContainerVisibility,
      isLargeDisplayMode: this.isLargeDisplayMode,
      classes: this.classes,
      aria: this.aria,
      restAttributes: this.restAttributes
    });
  }
}
PagerContent.defaultProps = PagerContentProps;
