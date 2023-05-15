!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/menu/ui.submenu.js"], ["../../core/utils/size","../../core/renderer","../../core/utils/common","../../core/element","../../animation/position","../../core/utils/extend","../context_menu"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/menu/ui.submenu.js", ["../../core/utils/size", "../../core/renderer", "../../core/utils/common", "../../core/element", "../../animation/position", "../../core/utils/extend", "../context_menu"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _common = $__require("../../core/utils/common");
  var _element = $__require("../../core/element");
  var _position = _interopRequireDefault($__require("../../animation/position"));
  var _extend = $__require("../../core/utils/extend");
  var _context_menu = _interopRequireDefault($__require("../context_menu"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var DX_CONTEXT_MENU_CONTENT_DELIMITER_CLASS = 'dx-context-menu-content-delimiter';
  var DX_SUBMENU_CLASS = 'dx-submenu';
  var Submenu = /*#__PURE__*/function (_ContextMenu) {
    _inheritsLoose(Submenu, _ContextMenu);
    function Submenu() {
      return _ContextMenu.apply(this, arguments) || this;
    }
    var _proto = Submenu.prototype;
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_ContextMenu.prototype._getDefaultOptions.call(this), {
        orientation: 'horizontal',
        tabIndex: null,
        onHoverStart: _common.noop
      });
    };
    _proto._initDataAdapter = function _initDataAdapter() {
      this._dataAdapter = this.option('_dataAdapter');
      if (!this._dataAdapter) {
        _ContextMenu.prototype._initDataAdapter.call(this);
      }
    };
    _proto._renderContentImpl = function _renderContentImpl() {
      this._renderContextMenuOverlay();
      _ContextMenu.prototype._renderContentImpl.call(this);
      var node = this._dataAdapter.getNodeByKey(this.option('_parentKey'));
      node && this._renderItems(this._getChildNodes(node));
      this._renderDelimiter();
    };
    _proto._renderDelimiter = function _renderDelimiter() {
      this.$contentDelimiter = (0, _renderer.default)('<div>').appendTo(this._itemContainer()).addClass(DX_CONTEXT_MENU_CONTENT_DELIMITER_CLASS);
    };
    _proto._getOverlayOptions = function _getOverlayOptions() {
      return (0, _extend.extend)(_ContextMenu.prototype._getOverlayOptions.call(this), {
        onPositioned: this._overlayPositionedActionHandler.bind(this)
      });
    };
    _proto._overlayPositionedActionHandler = function _overlayPositionedActionHandler(arg) {
      this._showDelimiter(arg);
    };
    _proto._hoverEndHandler = function _hoverEndHandler(e) {
      _ContextMenu.prototype._hoverEndHandler.call(this, e);
      this._toggleFocusClass(false, e.currentTarget);
    };
    _proto._isMenuHorizontal = function _isMenuHorizontal() {
      return this.option('orientation') === 'horizontal';
    };
    _proto._hoverStartHandler = function _hoverStartHandler(e) {
      var hoverStartAction = this.option('onHoverStart');
      hoverStartAction(e);
      _ContextMenu.prototype._hoverStartHandler.call(this, e);
      this._toggleFocusClass(true, e.currentTarget);
    };
    _proto._drawSubmenu = function _drawSubmenu($rootItem) {
      this._actions.onShowing({
        rootItem: (0, _element.getPublicElement)($rootItem),
        submenu: this
      });
      _ContextMenu.prototype._drawSubmenu.call(this, $rootItem);
      this._actions.onShown({
        rootItem: (0, _element.getPublicElement)($rootItem),
        submenu: this
      });
    };
    _proto._hideSubmenu = function _hideSubmenu($rootItem) {
      this._actions.onHiding({
        cancel: true,
        rootItem: (0, _element.getPublicElement)($rootItem),
        submenu: this
      });
      _ContextMenu.prototype._hideSubmenu.call(this, $rootItem);
      this._actions.onHidden({
        rootItem: (0, _element.getPublicElement)($rootItem),
        submenu: this
      });
    }

    // TODO: try to simplify it
    ;
    _proto._showDelimiter = function _showDelimiter(arg) {
      if (!this.$contentDelimiter) {
        return;
      }
      var $submenu = this._itemContainer().children(".".concat(DX_SUBMENU_CLASS)).eq(0);
      var $rootItem = this.option('position').of;
      var position = {
        of: $submenu
      };
      var containerOffset = arg.position;
      var vLocation = containerOffset.v.location;
      var hLocation = containerOffset.h.location;
      var rootOffset = $rootItem.offset();
      var offsetLeft = Math.round(rootOffset.left);
      var offsetTop = Math.round(rootOffset.top);
      var rootWidth = (0, _size.getWidth)($rootItem);
      var rootHeight = (0, _size.getHeight)($rootItem);
      var submenuWidth = (0, _size.getWidth)($submenu);
      var submenuHeight = (0, _size.getHeight)($submenu);
      this.$contentDelimiter.css('display', 'block');
      (0, _size.setWidth)(this.$contentDelimiter, this._isMenuHorizontal() ? rootWidth < submenuWidth ? rootWidth - 2 : submenuWidth : 2);
      (0, _size.setHeight)(this.$contentDelimiter, this._isMenuHorizontal() ? 2 : rootHeight < submenuHeight ? rootHeight - 2 : submenuHeight);
      if (this._isMenuHorizontal()) {
        if (vLocation > offsetTop) {
          if (Math.round(hLocation) === offsetLeft) {
            position.offset = '1 -1';
            position.at = position.my = 'left top';
          } else {
            position.offset = '-1 -1';
            position.at = position.my = 'right top';
          }
        } else {
          (0, _size.setHeight)(this.$contentDelimiter, 5);
          if (Math.round(hLocation) === offsetLeft) {
            position.offset = '1 4';
            position.at = position.my = 'left bottom';
          } else {
            position.offset = '-1 2';
            position.at = position.my = 'right bottom';
          }
        }
      } else {
        if (hLocation > offsetLeft) {
          if (Math.round(vLocation) === offsetTop) {
            position.offset = '-1 1';
            position.at = position.my = 'left top';
          } else {
            position.offset = '-1 -1';
            position.at = position.my = 'left bottom';
          }
        } else {
          if (Math.round(vLocation) === offsetTop) {
            position.offset = '1 1';
            position.at = position.my = 'right top';
          } else {
            position.offset = '1 -1';
            position.at = position.my = 'right bottom';
          }
        }
      }
      _position.default.setup(this.$contentDelimiter, position);
    };
    _proto._getContextMenuPosition = function _getContextMenuPosition() {
      return this.option('position');
    };
    _proto.isOverlayVisible = function isOverlayVisible() {
      return this._overlay.option('visible');
    };
    _proto.getOverlayContent = function getOverlayContent() {
      return this._overlay.$content();
    };
    return Submenu;
  }(_context_menu.default);
  var _default = Submenu;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/utils/common","../../core/element","../../animation/position","../../core/utils/extend","../context_menu"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/utils/common"), require("../../core/element"), require("../../animation/position"), require("../../core/utils/extend"), require("../context_menu"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.submenu.js.map