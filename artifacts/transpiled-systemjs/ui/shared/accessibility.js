!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/shared/accessibility.js"], ["../../core/renderer","../../events/core/events_engine","../../events/utils/index","../../core/utils/extend","../../core/dom_adapter","../../core/utils/common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/shared/accessibility.js", ["../../core/renderer", "../../events/core/events_engine", "../../events/utils/index", "../../core/utils/extend", "../../core/dom_adapter", "../../core/utils/common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.hiddenFocus = hiddenFocus;
  exports.registerKeyboardAction = registerKeyboardAction;
  exports.restoreFocus = restoreFocus;
  exports.saveFocusedElementInfo = saveFocusedElementInfo;
  exports.selectView = selectView;
  exports.setTabIndex = setTabIndex;
  exports.subscribeVisibilityChange = subscribeVisibilityChange;
  exports.unsubscribeVisibilityChange = unsubscribeVisibilityChange;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _index = $__require("../../events/utils/index");
  var _extend = $__require("../../core/utils/extend");
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _common = $__require("../../core/utils/common");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
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
  function hiddenFocus(element) {
    isHiddenFocusing = true;
    element.focus();
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../events/core/events_engine","../../events/utils/index","../../core/utils/extend","../../core/dom_adapter","../../core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../events/core/events_engine"), require("../../events/utils/index"), require("../../core/utils/extend"), require("../../core/dom_adapter"), require("../../core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=accessibility.js.map