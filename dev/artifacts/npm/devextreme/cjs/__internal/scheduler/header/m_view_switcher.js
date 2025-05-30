/**
* DevExtreme (cjs/__internal/scheduler/header/m_view_switcher.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getViewSwitcher = exports.getDropDownViewSwitcher = void 0;
var _m_utils = require("./m_utils");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
var VIEW_SWITCHER_CLASS = 'dx-scheduler-view-switcher';
var VIEW_SWITCHER_DROP_DOWN_BUTTON_CLASS = 'dx-scheduler-view-switcher-dropdown-button';
var VIEW_SWITCHER_DROP_DOWN_BUTTON_CONTENT_CLASS = 'dx-scheduler-view-switcher-dropdown-button-content';
var getViewsAndSelectedView = function getViewsAndSelectedView(header) {
  var views = (0, _m_utils.formatViews)(header.views);
  var selectedView = (0, _m_utils.getViewName)(header.currentView);
  var isSelectedViewInViews = views.some(function (view) {
    return view.name === selectedView;
  });
  selectedView = isSelectedViewInViews ? selectedView : undefined;
  return {
    selectedView,
    views
  };
};
var getViewSwitcher = function getViewSwitcher(header, item) {
  var _getViewsAndSelectedV = getViewsAndSelectedView(header),
    selectedView = _getViewsAndSelectedV.selectedView,
    views = _getViewsAndSelectedV.views;
  return _extends({
    widget: 'dxButtonGroup',
    locateInMenu: 'auto',
    cssClass: VIEW_SWITCHER_CLASS,
    options: {
      items: views,
      keyExpr: 'name',
      selectedItemKeys: [selectedView],
      stylingMode: 'contained',
      onItemClick: function onItemClick(e) {
        var view = e.itemData.view;
        header._updateCurrentView(view);
      },
      onContentReady: function onContentReady(e) {
        var viewSwitcher = e.component;
        header._addEvent('currentView', function (view) {
          viewSwitcher.option('selectedItemKeys', [(0, _m_utils.getViewName)(view)]);
        });
      }
    }
  }, item);
};
exports.getViewSwitcher = getViewSwitcher;
var getDropDownViewSwitcher = function getDropDownViewSwitcher(header, item) {
  var _getViewsAndSelectedV2 = getViewsAndSelectedView(header),
    selectedView = _getViewsAndSelectedV2.selectedView,
    views = _getViewsAndSelectedV2.views;
  var oneView = (0, _m_utils.isOneView)(views, selectedView);
  return _extends({
    widget: 'dxDropDownButton',
    locateInMenu: 'never',
    cssClass: VIEW_SWITCHER_CLASS,
    options: {
      items: views,
      useSelectMode: true,
      keyExpr: 'name',
      selectedItemKey: selectedView,
      displayExpr: 'text',
      showArrowIcon: !oneView,
      elementAttr: {
        class: VIEW_SWITCHER_DROP_DOWN_BUTTON_CLASS
      },
      onItemClick: function onItemClick(e) {
        var view = e.itemData.view;
        header._updateCurrentView(view);
      },
      onContentReady: function onContentReady(e) {
        var viewSwitcher = e.component;
        header._addEvent('currentView', function (view) {
          var views = (0, _m_utils.formatViews)(header.views);
          if ((0, _m_utils.isOneView)(views, view)) {
            header.repaint();
          }
          viewSwitcher.option('selectedItemKey', (0, _m_utils.getViewName)(view));
        });
      },
      dropDownOptions: {
        onShowing: function onShowing(e) {
          if (oneView) {
            e.cancel = true;
          }
        },
        width: 'max-content',
        _wrapperClassExternal: VIEW_SWITCHER_DROP_DOWN_BUTTON_CONTENT_CLASS
      }
    }
  }, item);
};
exports.getDropDownViewSwitcher = getDropDownViewSwitcher;
