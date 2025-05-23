/**
* DevExtreme (cjs/ui/shared/accessibility.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.hiddenFocus = hiddenFocus;
exports.registerKeyboardAction = registerKeyboardAction;
exports.restoreFocus = restoreFocus;
exports.saveFocusedElementInfo = saveFocusedElementInfo;
exports.selectView = selectView;
exports.setTabIndex = setTabIndex;
exports.subscribeVisibilityChange = subscribeVisibilityChange;
exports.unsubscribeVisibilityChange = unsubscribeVisibilityChange;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _index = require("../../events/utils/index");
var _extend = require("../../core/utils/extend");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _common = require("../../core/utils/common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var FOCUS_STATE_CLASS = 'dx-state-focused';
var FOCUS_DISABLED_CLASS = 'dx-cell-focus-disabled';
var FOCUSED_ROW_SELECTOR = '.dx-row-focused';
var GRID_ROW_SELECTOR = '.dx-datagrid-rowsview .dx-row';
var GRID_CELL_SELECTOR = "".concat(GRID_ROW_SELECTOR, " > td");
var TREELIST_ROW_SELECTOR = '.dx-treelist-rowsview .dx-row';
var TREELIST_CELL_SELECTOR = "".concat(TREELIST_ROW_SELECTOR, " > td");
var viewItemSelectorMap = {
  groupPanel: ['.dx-datagrid-group-panel .dx-group-panel-item[tabindex]'],
  columnHeaders: ['.dx-datagrid-headers .dx-header-row > td.dx-datagrid-action', '.dx-treelist-headers .dx-header-row > td.dx-treelist-action'],
  filterRow: ['.dx-datagrid-headers .dx-datagrid-filter-row .dx-editor-cell .dx-texteditor-input', '.dx-treelist-headers .dx-treelist-filter-row .dx-editor-cell .dx-texteditor-input'],
  rowsView: ["".concat(FOCUSED_ROW_SELECTOR), "".concat(GRID_ROW_SELECTOR, "[tabindex]"), "".concat(GRID_CELL_SELECTOR, "[tabindex]"), "".concat(GRID_CELL_SELECTOR), "".concat(TREELIST_ROW_SELECTOR, "[tabindex]"), "".concat(TREELIST_CELL_SELECTOR, "[tabindex]"), "".concat(TREELIST_CELL_SELECTOR)],
  footer: ['.dx-datagrid-total-footer .dx-datagrid-summary-item', '.dx-treelist-total-footer .dx-treelist-summary-item'],
  filterPanel: ['.dx-datagrid-filter-panel .dx-icon-filter', '.dx-treelist-filter-panel .dx-icon-filter'],
  pager: ['.dx-datagrid-pager [tabindex]', '.dx-treelist-pager [tabindex]']
};
var isMouseDown = false;
var isHiddenFocusing = false;
var focusedElementInfo = null;
function processKeyDown(viewName, instance, event, action, $mainElement, executeKeyDown) {
  var isHandled = fireKeyDownEvent(instance, event.originalEvent, executeKeyDown);
  if (isHandled) {
    return;
  }
  var keyName = (0, _index.normalizeKeyName)(event);
  if (keyName === 'enter' || keyName === 'space') {
    saveFocusedElementInfo(event.target, instance);
    action && action({
      event: event
    });
  } else if (keyName === 'tab') {
    $mainElement.addClass(FOCUS_STATE_CLASS);
  } else {
    selectView(viewName, instance, event);
  }
}
function saveFocusedElementInfo(target, instance) {
  var $target = (0, _renderer.default)(target);
  var ariaLabel = $target.attr('aria-label');
  var $activeElements = getActiveAccessibleElements(ariaLabel, instance.element());
  var targetIndex = $activeElements.index($target);
  focusedElementInfo = (0, _extend.extend)({}, {
    ariaLabel: ariaLabel,
    index: targetIndex
  }, {
    viewInstance: instance
  });
}
function getActiveAccessibleElements(ariaLabel, viewElement) {
  var $viewElement = (0, _renderer.default)(viewElement);
  var $activeElements;
  if (ariaLabel) {
    $activeElements = $viewElement.find("[aria-label=\"".concat(ariaLabel, "\"][tabindex]"));
  } else {
    $activeElements = $viewElement.find('[tabindex]');
  }
  return $activeElements;
}
function findFocusedViewElement(viewSelectors, element) {
  var root = (element === null || element === void 0 ? void 0 : element.getRootNode()) || _dom_adapter.default.getDocument();
  for (var index in viewSelectors) {
    var selector = viewSelectors[index];
    var $focusViewElement = (0, _renderer.default)(root).find(selector).first();
    if ($focusViewElement.length) {
      return $focusViewElement;
    }
  }
}
function fireKeyDownEvent(instance, event, executeAction) {
  var args = {
    event: event,
    handled: false
  };
  if (executeAction) {
    executeAction(args);
  } else {
    instance._createActionByOption('onKeyDown')(args);
  }
  return args.handled;
}
function onDocumentVisibilityChange() {
  isHiddenFocusing = _dom_adapter.default.getDocument().visibilityState === 'visible';
}
function subscribeVisibilityChange() {
  _events_engine.default.on(_dom_adapter.default.getDocument(), 'visibilitychange', onDocumentVisibilityChange);
}
function unsubscribeVisibilityChange() {
  _events_engine.default.off(_dom_adapter.default.getDocument(), 'visibilitychange', onDocumentVisibilityChange);
}
function hiddenFocus(element, preventScroll) {
  isHiddenFocusing = true;
  element.focus({
    preventScroll
  });
  isHiddenFocusing = false;
}
function registerKeyboardAction(viewName, instance, $element, selector, action, executeKeyDown) {
  if (instance.option('useLegacyKeyboardNavigation')) {
    return _common.noop;
  }
  var getMainElement = function getMainElement() {
    return (0, _renderer.default)(instance.element());
  };
  var keyDownHandler = function keyDownHandler(e) {
    return processKeyDown(viewName, instance, e, action, getMainElement(), executeKeyDown);
  };
  var mouseDownHandler = function mouseDownHandler() {
    isMouseDown = true;
    getMainElement().removeClass(FOCUS_STATE_CLASS);
  };
  var focusinHandler = function focusinHandler() {
    var needShowOverlay = !isMouseDown && !isHiddenFocusing;
    if (needShowOverlay) {
      getMainElement().addClass(FOCUS_STATE_CLASS);
    }
    isMouseDown = false;
  };
  _events_engine.default.on($element, 'keydown', selector, keyDownHandler);
  _events_engine.default.on($element, 'mousedown', selector, mouseDownHandler);
  _events_engine.default.on($element, 'focusin', selector, focusinHandler);
  return function () {
    _events_engine.default.off($element, 'keydown', selector, keyDownHandler);
    _events_engine.default.off($element, 'mousedown', selector, mouseDownHandler);
    _events_engine.default.off($element, 'focusin', selector, focusinHandler);
  };
}
function restoreFocus(instance) {
  if (!instance.option('useLegacyKeyboardNavigation') && focusedElementInfo) {
    var viewInstance = focusedElementInfo.viewInstance;
    if (viewInstance) {
      var $activeElements = getActiveAccessibleElements(focusedElementInfo.ariaLabel, viewInstance.element());
      var $targetElement = $activeElements.eq(focusedElementInfo.index);
      focusedElementInfo = null;
      _events_engine.default.trigger($targetElement, 'focus');
    }
  }
}
function selectView(viewName, instance, event) {
  var keyName = (0, _index.normalizeKeyName)(event);
  if (event.ctrlKey && (keyName === 'upArrow' || keyName === 'downArrow')) {
    var viewNames = Object.keys(viewItemSelectorMap);
    var viewItemIndex = viewNames.indexOf(viewName);
    while (viewItemIndex >= 0 && viewItemIndex < viewNames.length) {
      viewItemIndex = keyName === 'upArrow' ? --viewItemIndex : ++viewItemIndex;
      var _viewName = viewNames[viewItemIndex];
      var viewSelectors = viewItemSelectorMap[_viewName];
      var $focusViewElement = findFocusedViewElement(viewSelectors, event.target);
      if ($focusViewElement && $focusViewElement.length) {
        $focusViewElement.attr('tabindex', instance.option('tabindex') || 0);
        _events_engine.default.trigger($focusViewElement, 'focus');
        $focusViewElement.removeClass(FOCUS_DISABLED_CLASS);
        break;
      }
    }
  }
}
function setTabIndex(instance, $element) {
  if (!instance.option('useLegacyKeyboardnavigation')) {
    $element.attr('tabindex', instance.option('tabindex') || 0);
  }
}
