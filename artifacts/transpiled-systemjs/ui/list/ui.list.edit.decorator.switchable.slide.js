!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/list/ui.list.edit.decorator.switchable.slide.js"], ["../../core/utils/size","../../core/renderer","../../events/core/events_engine","../../core/utils/common","../../events/click","../../localization/message","../../animation/translator","../../events/utils/index","../../events/core/emitter.feedback","./ui.list.edit.decorator_menu_helper","./ui.list.edit.decorator_registry","./ui.list.edit.decorator.switchable","../../animation/fx","../themes","../action_sheet"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/list/ui.list.edit.decorator.switchable.slide.js", ["../../core/utils/size", "../../core/renderer", "../../events/core/events_engine", "../../core/utils/common", "../../events/click", "../../localization/message", "../../animation/translator", "../../events/utils/index", "../../events/core/emitter.feedback", "./ui.list.edit.decorator_menu_helper", "./ui.list.edit.decorator_registry", "./ui.list.edit.decorator.switchable", "../../animation/fx", "../themes", "../action_sheet"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _common = $__require("../../core/utils/common");
  var _click = $__require("../../events/click");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _translator = $__require("../../animation/translator");
  var _index = $__require("../../events/utils/index");
  var _emitter = $__require("../../events/core/emitter.feedback");
  var _uiListEdit = _interopRequireDefault($__require("./ui.list.edit.decorator_menu_helper"));
  var _uiListEdit2 = $__require("./ui.list.edit.decorator_registry");
  var _uiListEditDecorator = _interopRequireDefault($__require("./ui.list.edit.decorator.switchable"));
  var _fx = _interopRequireDefault($__require("../../animation/fx"));
  var _themes = $__require("../themes");
  var _action_sheet = _interopRequireDefault($__require("../action_sheet"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var LIST_EDIT_DECORATOR = 'dxListEditDecorator';
  var CLICK_EVENT_NAME = (0, _index.addNamespace)(_click.name, LIST_EDIT_DECORATOR);
  var ACTIVE_EVENT_NAME = (0, _index.addNamespace)(_emitter.active, LIST_EDIT_DECORATOR);
  var SLIDE_MENU_CLASS = 'dx-list-slide-menu';
  var SLIDE_MENU_WRAPPER_CLASS = 'dx-list-slide-menu-wrapper';
  var SLIDE_MENU_CONTENT_CLASS = 'dx-list-slide-menu-content';
  var SLIDE_MENU_BUTTONS_CONTAINER_CLASS = 'dx-list-slide-menu-buttons-container';
  var SLIDE_MENU_BUTTONS_CLASS = 'dx-list-slide-menu-buttons';
  var SLIDE_MENU_BUTTON_CLASS = 'dx-list-slide-menu-button';
  var SLIDE_MENU_BUTTON_MENU_CLASS = 'dx-list-slide-menu-button-menu';
  var SLIDE_MENU_BUTTON_DELETE_CLASS = 'dx-list-slide-menu-button-delete';
  var SLIDE_MENU_ANIMATION_DURATION = 400;
  var SLIDE_MENU_ANIMATION_EASING = 'cubic-bezier(0.075, 0.82, 0.165, 1)';
  (0, _uiListEdit2.register)('menu', 'slide', _uiListEditDecorator.default.inherit({
    _shouldHandleSwipe: true,
    _init: function _init() {
      this.callBase.apply(this, arguments);
      this._$buttonsContainer = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_BUTTONS_CONTAINER_CLASS);
      _events_engine.default.on(this._$buttonsContainer, ACTIVE_EVENT_NAME, _common.noop);
      this._$buttons = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_BUTTONS_CLASS).appendTo(this._$buttonsContainer);
      this._renderMenu();
      this._renderDeleteButton();
    },
    _renderMenu: function _renderMenu() {
      if (!this._menuEnabled()) {
        return;
      }
      var menuItems = this._menuItems();
      if (menuItems.length === 1) {
        var menuItem = menuItems[0];
        this._renderMenuButton(menuItem.text, function (e) {
          e.stopPropagation();
          this._fireAction(menuItem);
        }.bind(this));
      } else {
        var $menu = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_CLASS);
        this._menu = this._list._createComponent($menu, _action_sheet.default, {
          showTitle: false,
          items: menuItems,
          onItemClick: function (args) {
            this._fireAction(args.itemData);
          }.bind(this),
          integrationOptions: {}
        });
        $menu.appendTo(this._list.$element());
        var $menuButton = this._renderMenuButton(_message.default.format('dxListEditDecorator-more'), function (e) {
          e.stopPropagation();
          this._menu.show();
        }.bind(this));
        this._menu.option('target', $menuButton);
      }
    },
    _renderMenuButton: function _renderMenuButton(text, action) {
      var $menuButton = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_BUTTON_CLASS).addClass(SLIDE_MENU_BUTTON_MENU_CLASS).text(text);
      this._$buttons.append($menuButton);
      _events_engine.default.on($menuButton, CLICK_EVENT_NAME, action);
      return $menuButton;
    },
    _renderDeleteButton: function _renderDeleteButton() {
      if (!this._deleteEnabled()) {
        return;
      }
      var $deleteButton = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_BUTTON_CLASS).addClass(SLIDE_MENU_BUTTON_DELETE_CLASS).text((0, _themes.isMaterial)() ? '' : _message.default.format('dxListEditDecorator-delete'));
      _events_engine.default.on($deleteButton, CLICK_EVENT_NAME, function (e) {
        e.stopPropagation();
        this._deleteItem();
      }.bind(this));
      this._$buttons.append($deleteButton);
    },
    _fireAction: function _fireAction(menuItem) {
      this._fireMenuAction((0, _renderer.default)(this._cachedNode), menuItem.action);
      this._cancelDeleteReadyItem();
    },
    modifyElement: function modifyElement(config) {
      this.callBase.apply(this, arguments);
      var $itemElement = config.$itemElement;
      $itemElement.addClass(SLIDE_MENU_WRAPPER_CLASS);
      var $slideMenuContent = (0, _renderer.default)('<div>').addClass(SLIDE_MENU_CONTENT_CLASS);
      $itemElement.wrapInner($slideMenuContent);
    },
    _getDeleteButtonContainer: function _getDeleteButtonContainer() {
      return this._$buttonsContainer;
    },
    handleClick: function handleClick(_, e) {
      if ((0, _renderer.default)(e.target).closest('.' + SLIDE_MENU_CONTENT_CLASS).length) {
        return this.callBase.apply(this, arguments);
      }
      return false;
    },
    _swipeStartHandler: function _swipeStartHandler($itemElement) {
      this._enablePositioning($itemElement);
      this._cacheItemData($itemElement);
      this._setPositions(this._getPositions(0));
    },
    _swipeUpdateHandler: function _swipeUpdateHandler($itemElement, args) {
      var rtl = this._isRtlEnabled();
      var signCorrection = rtl ? -1 : 1;
      var isItemReadyToDelete = this._isReadyToDelete($itemElement);
      var moveJustStarted = this._getCurrentPositions().content === this._getStartPositions().content;
      if (moveJustStarted && !isItemReadyToDelete && args.offset * signCorrection > 0) {
        args.cancel = true;
        return;
      }
      var offset = this._cachedItemWidth * args.offset;
      var startOffset = isItemReadyToDelete ? -this._cachedButtonWidth * signCorrection : 0;
      var correctedOffset = (offset + startOffset) * signCorrection;
      var percent = correctedOffset < 0 ? Math.abs((offset + startOffset) / this._cachedButtonWidth) : 0;
      this._setPositions(this._getPositions(percent));
      return true;
    },
    _getStartPositions: function _getStartPositions() {
      var rtl = this._isRtlEnabled();
      var signCorrection = rtl ? -1 : 1;
      return {
        content: 0,
        buttonsContainer: rtl ? -this._cachedButtonWidth : this._cachedItemWidth,
        buttons: -this._cachedButtonWidth * signCorrection
      };
    },
    _getPositions: function _getPositions(percent) {
      var rtl = this._isRtlEnabled();
      var signCorrection = rtl ? -1 : 1;
      var startPositions = this._getStartPositions();
      return {
        content: startPositions.content - percent * this._cachedButtonWidth * signCorrection,
        buttonsContainer: startPositions.buttonsContainer - Math.min(percent, 1) * this._cachedButtonWidth * signCorrection,
        buttons: startPositions.buttons + Math.min(percent, 1) * this._cachedButtonWidth * signCorrection
      };
    },
    _getCurrentPositions: function _getCurrentPositions() {
      return {
        content: (0, _translator.locate)(this._$cachedContent).left,
        buttonsContainer: (0, _translator.locate)(this._$buttonsContainer).left,
        buttons: (0, _translator.locate)(this._$buttons).left
      };
    },
    _setPositions: function _setPositions(positions) {
      (0, _translator.move)(this._$cachedContent, {
        left: positions.content
      });
      (0, _translator.move)(this._$buttonsContainer, {
        left: positions.buttonsContainer
      });
      (0, _translator.move)(this._$buttons, {
        left: positions.buttons
      });
    },
    _cacheItemData: function _cacheItemData($itemElement) {
      if ($itemElement[0] === this._cachedNode) {
        return;
      }
      this._$cachedContent = $itemElement.find('.' + SLIDE_MENU_CONTENT_CLASS);
      this._cachedItemWidth = (0, _size.getOuterWidth)($itemElement);
      this._cachedButtonWidth = this._cachedButtonWidth || (0, _size.getOuterWidth)(this._$buttons);
      (0, _size.setWidth)(this._$buttonsContainer, this._cachedButtonWidth);
      if (this._$cachedContent.length) {
        this._cachedNode = $itemElement[0];
      }
    },
    _minButtonContainerLeftOffset: function _minButtonContainerLeftOffset() {
      return this._cachedItemWidth - this._cachedButtonWidth;
    },
    _swipeEndHandler: function _swipeEndHandler($itemElement, args) {
      this._cacheItemData($itemElement);
      var signCorrection = this._isRtlEnabled() ? 1 : -1;
      var offset = this._cachedItemWidth * args.offset;
      var endedAtReadyToDelete = !this._isReadyToDelete($itemElement) && offset * signCorrection > this._cachedButtonWidth * 0.2;
      var readyToDelete = args.targetOffset === signCorrection && endedAtReadyToDelete;
      this._toggleDeleteReady($itemElement, readyToDelete);
      return true;
    },
    _enablePositioning: function _enablePositioning($itemElement) {
      _fx.default.stop(this._$cachedContent, true);
      this.callBase.apply(this, arguments);
      this._$buttonsContainer.appendTo($itemElement);
    },
    _disablePositioning: function _disablePositioning() {
      this.callBase.apply(this, arguments);
      this._$buttonsContainer.detach();
    },
    _animatePrepareDeleteReady: function _animatePrepareDeleteReady() {
      return this._animateToPositions(this._getPositions(1));
    },
    _animateForgetDeleteReady: function _animateForgetDeleteReady($itemElement) {
      this._cacheItemData($itemElement);
      return this._animateToPositions(this._getPositions(0));
    },
    _animateToPositions: function _animateToPositions(positions) {
      var that = this;
      var currentPosition = this._getCurrentPositions();
      var durationTimePart = Math.min(Math.abs(currentPosition.content - positions.content) / this._cachedButtonWidth, 1);
      return _fx.default.animate(this._$cachedContent, {
        from: currentPosition,
        to: positions,
        easing: SLIDE_MENU_ANIMATION_EASING,
        duration: SLIDE_MENU_ANIMATION_DURATION * durationTimePart,
        strategy: 'frame',
        draw: function draw(positions) {
          that._setPositions(positions);
        }
      });
    },
    dispose: function dispose() {
      if (this._menu) {
        this._menu.$element().remove();
      }
      if (this._$buttonsContainer) {
        this._$buttonsContainer.remove();
      }
      this.callBase.apply(this, arguments);
    }
  }).include(_uiListEdit.default));
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../events/core/events_engine","../../core/utils/common","../../events/click","../../localization/message","../../animation/translator","../../events/utils/index","../../events/core/emitter.feedback","./ui.list.edit.decorator_menu_helper","./ui.list.edit.decorator_registry","./ui.list.edit.decorator.switchable","../../animation/fx","../themes","../action_sheet"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../events/core/events_engine"), require("../../core/utils/common"), require("../../events/click"), require("../../localization/message"), require("../../animation/translator"), require("../../events/utils/index"), require("../../events/core/emitter.feedback"), require("./ui.list.edit.decorator_menu_helper"), require("./ui.list.edit.decorator_registry"), require("./ui.list.edit.decorator.switchable"), require("../../animation/fx"), require("../themes"), require("../action_sheet"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.list.edit.decorator.switchable.slide.js.map