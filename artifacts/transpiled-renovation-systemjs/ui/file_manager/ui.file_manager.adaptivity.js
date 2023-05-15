!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.adaptivity.js"], ["../../core/utils/size","../../core/renderer","../../core/utils/extend","../../core/utils/type","../../core/utils/window","../widget/ui.widget","../drawer/ui.drawer","../splitter"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.adaptivity.js", ["../../core/utils/size", "../../core/renderer", "../../core/utils/extend", "../../core/utils/type", "../../core/utils/window", "../widget/ui.widget", "../drawer/ui.drawer", "../splitter"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _type = $__require("../../core/utils/type");
  var _window = $__require("../../core/utils/window");
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _ui2 = _interopRequireDefault($__require("../drawer/ui.drawer"));
  var _splitter = _interopRequireDefault($__require("../splitter"));
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
  var window = (0, _window.getWindow)();
  var ADAPTIVE_STATE_SCREEN_WIDTH = 573;
  var FILE_MANAGER_ADAPTIVITY_DRAWER_PANEL_CLASS = 'dx-filemanager-adaptivity-drawer-panel';
  var DRAWER_PANEL_CONTENT_INITIAL = 'dx-drawer-panel-content-initial';
  var DRAWER_PANEL_CONTENT_ADAPTIVE = 'dx-drawer-panel-content-adaptive';
  var FileManagerAdaptivityControl = /*#__PURE__*/function (_Widget) {
    _inheritsLoose(FileManagerAdaptivityControl, _Widget);
    function FileManagerAdaptivityControl() {
      return _Widget.apply(this, arguments) || this;
    }
    var _proto = FileManagerAdaptivityControl.prototype;
    _proto._initMarkup = function _initMarkup() {
      _Widget.prototype._initMarkup.call(this);
      this._initActions();
      this._isInAdaptiveState = false;
      var $drawer = (0, _renderer.default)('<div>').appendTo(this.$element());
      (0, _renderer.default)('<div>').addClass(FILE_MANAGER_ADAPTIVITY_DRAWER_PANEL_CLASS).appendTo($drawer);
      this._drawer = this._createComponent($drawer, _ui2.default);
      this._drawer.option({
        opened: true,
        template: this._createDrawerTemplate.bind(this)
      });
      (0, _renderer.default)(this._drawer.content()).addClass(DRAWER_PANEL_CONTENT_INITIAL);
      var $drawerContent = $drawer.find(".".concat(FILE_MANAGER_ADAPTIVITY_DRAWER_PANEL_CLASS)).first();
      var contentRenderer = this.option('contentTemplate');
      if ((0, _type.isFunction)(contentRenderer)) {
        contentRenderer($drawerContent);
      }
      this._updateDrawerMaxSize();
    };
    _proto._createDrawerTemplate = function _createDrawerTemplate(container) {
      this.option('drawerTemplate')(container);
      this._splitter = this._createComponent('<div>', _splitter.default, {
        container: this.$element(),
        leftElement: (0, _renderer.default)(this._drawer.content()),
        rightElement: (0, _renderer.default)(this._drawer.viewContent()),
        onApplyPanelSize: this._onApplyPanelSize.bind(this),
        onActiveStateChanged: this._onActiveStateChanged.bind(this)
      });
      this._splitter.$element().appendTo(container);
      this._splitter.disableSplitterCalculation(true);
    };
    _proto._render = function _render() {
      _Widget.prototype._render.call(this);
      this._checkAdaptiveState();
    };
    _proto._onApplyPanelSize = function _onApplyPanelSize(e) {
      if (!(0, _window.hasWindow)()) {
        return;
      }
      if (!this._splitter.isSplitterMoved()) {
        this._setDrawerWidth('');
        return;
      }
      (0, _renderer.default)(this._drawer.content()).removeClass(DRAWER_PANEL_CONTENT_INITIAL);
      this._setDrawerWidth(e.leftPanelWidth);
    };
    _proto._onActiveStateChanged = function _onActiveStateChanged(_ref) {
      var isActive = _ref.isActive;
      this._splitter.disableSplitterCalculation(!isActive);
      !isActive && this._splitter.$element().css('left', 'auto');
    };
    _proto._setDrawerWidth = function _setDrawerWidth(width) {
      (0, _renderer.default)(this._drawer.content()).css('width', width);
      this._updateDrawerMaxSize();
      this._drawer.resizeViewContent();
    };
    _proto._updateDrawerMaxSize = function _updateDrawerMaxSize() {
      this._drawer.option('maxSize', this._drawer.getRealPanelWidth());
    };
    _proto._dimensionChanged = function _dimensionChanged(dimension) {
      if (!dimension || dimension !== 'height') {
        this._checkAdaptiveState();
      }
    };
    _proto._checkAdaptiveState = function _checkAdaptiveState() {
      var oldState = this._isInAdaptiveState;
      this._isInAdaptiveState = this._isSmallScreen();
      if (oldState !== this._isInAdaptiveState) {
        this.toggleDrawer(!this._isInAdaptiveState, true);
        (0, _renderer.default)(this._drawer.content()).toggleClass(DRAWER_PANEL_CONTENT_ADAPTIVE, this._isInAdaptiveState);
        this._raiseAdaptiveStateChanged(this._isInAdaptiveState);
      }
      if (this._isInAdaptiveState && this._isDrawerOpened()) {
        this._updateDrawerMaxSize();
      }
    };
    _proto._isSmallScreen = function _isSmallScreen() {
      return (0, _size.getWidth)(window) <= ADAPTIVE_STATE_SCREEN_WIDTH;
    };
    _proto._isDrawerOpened = function _isDrawerOpened() {
      return this._drawer.option('opened');
    };
    _proto._initActions = function _initActions() {
      this._actions = {
        onAdaptiveStateChanged: this._createActionByOption('onAdaptiveStateChanged')
      };
    };
    _proto._raiseAdaptiveStateChanged = function _raiseAdaptiveStateChanged(enabled) {
      this._actions.onAdaptiveStateChanged({
        enabled: enabled
      });
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
        drawerTemplate: null,
        contentTemplate: null,
        onAdaptiveStateChanged: null
      });
    };
    _proto._optionChanged = function _optionChanged(args) {
      var name = args.name;
      switch (name) {
        case 'drawerTemplate':
        case 'contentTemplate':
          this.repaint();
          break;
        case 'onAdaptiveStateChanged':
          this._actions[name] = this._createActionByOption(name);
          break;
        default:
          _Widget.prototype._optionChanged.call(this, args);
      }
    };
    _proto.isInAdaptiveState = function isInAdaptiveState() {
      return this._isInAdaptiveState;
    };
    _proto.toggleDrawer = function toggleDrawer(showing, skipAnimation) {
      this._updateDrawerMaxSize();
      this._drawer.option('animationEnabled', !skipAnimation);
      this._drawer.toggle(showing);
      var isSplitterActive = this._isDrawerOpened() && !this.isInAdaptiveState();
      this._splitter.toggleDisabled(!isSplitterActive);
    };
    _proto.getSplitterElement = function getSplitterElement() {
      return this._splitter.getSplitterBorderElement().get(0);
    };
    return FileManagerAdaptivityControl;
  }(_ui.default);
  var _default = FileManagerAdaptivityControl;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/utils/extend","../../core/utils/type","../../core/utils/window","../widget/ui.widget","../drawer/ui.drawer","../splitter"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/utils/extend"), require("../../core/utils/type"), require("../../core/utils/window"), require("../widget/ui.widget"), require("../drawer/ui.drawer"), require("../splitter"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.file_manager.adaptivity.js.map