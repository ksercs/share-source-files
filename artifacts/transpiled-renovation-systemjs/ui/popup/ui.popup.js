!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/popup/ui.popup.js"], ["../../core/component_registrator","../../core/devices","../../core/element","../../core/renderer","../../core/templates/empty_template","../../core/utils/browser","../../core/utils/common","../../core/utils/extend","../../core/utils/inflector","../../core/utils/iterator","../../core/utils/size","../../core/utils/position","../../core/utils/type","../../core/utils/version","../../core/utils/window","../../events/visibility_change","../../localization/message","./popup_drag","../resizable","../button","../overlay/ui.overlay","../themes","../toolbar/ui.toolbar.base","../../core/resize_observer","../overlay/z_index","./popup_position_controller","./popup_overflow_manager"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/popup/ui.popup.js", ["../../core/component_registrator", "../../core/devices", "../../core/element", "../../core/renderer", "../../core/templates/empty_template", "../../core/utils/browser", "../../core/utils/common", "../../core/utils/extend", "../../core/utils/inflector", "../../core/utils/iterator", "../../core/utils/size", "../../core/utils/position", "../../core/utils/type", "../../core/utils/version", "../../core/utils/window", "../../events/visibility_change", "../../localization/message", "./popup_drag", "../resizable", "../button", "../overlay/ui.overlay", "../themes", "../toolbar/ui.toolbar.base", "../../core/resize_observer", "../overlay/z_index", "./popup_position_controller", "./popup_overflow_manager"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  exports.default = void 0;
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _element = $__require("../../core/element");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _empty_template = $__require("../../core/templates/empty_template");
  var _browser = _interopRequireDefault($__require("../../core/utils/browser"));
  var _common = $__require("../../core/utils/common");
  var _extend = $__require("../../core/utils/extend");
  var _inflector = $__require("../../core/utils/inflector");
  var _iterator = $__require("../../core/utils/iterator");
  var _size = $__require("../../core/utils/size");
  var _position = $__require("../../core/utils/position");
  var _type = $__require("../../core/utils/type");
  var _version = $__require("../../core/utils/version");
  var _window = $__require("../../core/utils/window");
  var _visibility_change = $__require("../../events/visibility_change");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _popup_drag = _interopRequireDefault($__require("./popup_drag"));
  var _resizable = _interopRequireDefault($__require("../resizable"));
  var _button = _interopRequireDefault($__require("../button"));
  var _ui = _interopRequireDefault($__require("../overlay/ui.overlay"));
  var _themes = $__require("../themes");
  $__require("../toolbar/ui.toolbar.base");
  var _resize_observer = _interopRequireDefault($__require("../../core/resize_observer"));
  var zIndexPool = _interopRequireWildcard($__require("../overlay/z_index"));
  var _popup_position_controller = $__require("./popup_position_controller");
  var _popup_overflow_manager = $__require("./popup_overflow_manager");
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
      return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return { default: obj };
    }var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {
      return cache.get(obj);
    }var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }newObj.default = obj;if (cache) {
      cache.set(obj, newObj);
    }return newObj;
  }
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();

  // STYLE popup

  var POPUP_CLASS = 'dx-popup';
  var POPUP_WRAPPER_CLASS = 'dx-popup-wrapper';
  var POPUP_FULL_SCREEN_CLASS = 'dx-popup-fullscreen';
  var POPUP_FULL_SCREEN_WIDTH_CLASS = 'dx-popup-fullscreen-width';
  var POPUP_NORMAL_CLASS = 'dx-popup-normal';
  var POPUP_CONTENT_CLASS = 'dx-popup-content';
  var POPUP_CONTENT_SCROLLABLE_CLASS = 'dx-popup-content-scrollable';
  var DISABLED_STATE_CLASS = 'dx-state-disabled';
  var POPUP_DRAGGABLE_CLASS = 'dx-popup-draggable';
  var POPUP_TITLE_CLASS = 'dx-popup-title';
  var POPUP_TITLE_CLOSEBUTTON_CLASS = 'dx-closebutton';
  var POPUP_BOTTOM_CLASS = 'dx-popup-bottom';
  var POPUP_HAS_CLOSE_BUTTON_CLASS = 'dx-has-close-button';
  var TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
  var POPUP_CONTENT_FLEX_HEIGHT_CLASS = 'dx-popup-flex-height';
  var POPUP_CONTENT_INHERIT_HEIGHT_CLASS = 'dx-popup-inherit-height';
  var ALLOWED_TOOLBAR_ITEM_ALIASES = ['cancel', 'clear', 'done'];
  var BUTTON_DEFAULT_TYPE = 'default';
  var BUTTON_NORMAL_TYPE = 'normal';
  var BUTTON_TEXT_MODE = 'text';
  var BUTTON_CONTAINED_MODE = 'contained';
  var IS_OLD_SAFARI = _browser.default.safari && (0, _version.compare)(_browser.default.version, [11]) < 0;
  var HEIGHT_STRATEGIES = {
    static: '',
    inherit: POPUP_CONTENT_INHERIT_HEIGHT_CLASS,
    flex: POPUP_CONTENT_FLEX_HEIGHT_CLASS
  };
  var getButtonPlace = function getButtonPlace(name) {
    var device = _devices.default.current();
    var platform = device.platform;
    var toolbar = 'bottom';
    var location = 'before';
    if (platform === 'ios') {
      switch (name) {
        case 'cancel':
          toolbar = 'top';
          break;
        case 'clear':
          toolbar = 'top';
          location = 'after';
          break;
        case 'done':
          location = 'after';
          break;
      }
    } else if (platform === 'android') {
      switch (name) {
        case 'cancel':
          location = 'after';
          break;
        case 'done':
          location = 'after';
          break;
      }
    }
    return {
      toolbar: toolbar,
      location: location
    };
  };
  var Popup = _ui.default.inherit({
    _supportedKeys: function _supportedKeys() {
      var _this = this;
      return (0, _extend.extend)(this.callBase(), {
        upArrow: function upArrow(e) {
          var _this$_drag;
          (_this$_drag = _this._drag) === null || _this$_drag === void 0 ? void 0 : _this$_drag.moveUp(e);
        },
        downArrow: function downArrow(e) {
          var _this$_drag2;
          (_this$_drag2 = _this._drag) === null || _this$_drag2 === void 0 ? void 0 : _this$_drag2.moveDown(e);
        },
        leftArrow: function leftArrow(e) {
          var _this$_drag3;
          (_this$_drag3 = _this._drag) === null || _this$_drag3 === void 0 ? void 0 : _this$_drag3.moveLeft(e);
        },
        rightArrow: function rightArrow(e) {
          var _this$_drag4;
          (_this$_drag4 = _this._drag) === null || _this$_drag4 === void 0 ? void 0 : _this$_drag4.moveRight(e);
        }
      });
    },
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        fullScreen: false,
        title: '',
        showTitle: true,
        titleTemplate: 'title',
        onTitleRendered: null,
        dragOutsideBoundary: false,
        dragEnabled: false,
        dragAndResizeArea: undefined,
        enableBodyScroll: true,
        outsideDragFactor: 0,
        onResizeStart: null,
        onResize: null,
        onResizeEnd: null,
        resizeEnabled: false,
        toolbarItems: [],
        showCloseButton: false,
        bottomTemplate: 'bottom',
        useDefaultToolbarButtons: false,
        useFlatToolbarButtons: false,
        autoResizeEnabled: true
      });
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      var themeName = (0, _themes.current)();
      return this.callBase().concat([{
        device: {
          platform: 'ios'
        },
        options: {
          animation: this._iosAnimation
        }
      }, {
        device: {
          platform: 'android'
        },
        options: {
          animation: this._androidAnimation
        }
      }, {
        device: {
          platform: 'generic'
        },
        options: {
          showCloseButton: true
        }
      }, {
        device: function device(_device) {
          return _devices.default.real().deviceType === 'desktop' && _device.platform === 'generic';
        },
        options: {
          dragEnabled: true
        }
      }, {
        device: function device() {
          return _devices.default.real().deviceType === 'desktop' && !_devices.default.isSimulator();
        },
        options: {
          focusStateEnabled: true
        }
      }, {
        device: function device() {
          return (0, _themes.isMaterial)(themeName);
        },
        options: {
          useDefaultToolbarButtons: true,
          useFlatToolbarButtons: true,
          showCloseButton: false
        }
      }]);
    },
    _iosAnimation: {
      show: {
        type: 'slide',
        duration: 400,
        from: {
          position: {
            my: 'top',
            at: 'bottom'
          }
        },
        to: {
          position: {
            my: 'center',
            at: 'center'
          }
        }
      },
      hide: {
        type: 'slide',
        duration: 400,
        from: {
          opacity: 1,
          position: {
            my: 'center',
            at: 'center'
          }
        },
        to: {
          opacity: 1,
          position: {
            my: 'top',
            at: 'bottom'
          }
        }
      }
    },
    _androidAnimation: function _androidAnimation() {
      var fullScreenConfig = {
        show: {
          type: 'slide',
          duration: 300,
          from: {
            top: '30%',
            opacity: 0
          },
          to: {
            top: 0,
            opacity: 1
          }
        },
        hide: {
          type: 'slide',
          duration: 300,
          from: {
            top: 0,
            opacity: 1
          },
          to: {
            top: '30%',
            opacity: 0
          }
        }
      };
      var defaultConfig = {
        show: {
          type: 'fade',
          duration: 400,
          from: 0,
          to: 1
        },
        hide: {
          type: 'fade',
          duration: 400,
          from: 1,
          to: 0
        }
      };
      return this.option('fullScreen') ? fullScreenConfig : defaultConfig;
    },
    _init: function _init() {
      var popupWrapperClassExternal = this.option('_wrapperClassExternal');
      var popupWrapperClasses = popupWrapperClassExternal ? "".concat(POPUP_WRAPPER_CLASS, " ").concat(popupWrapperClassExternal) : POPUP_WRAPPER_CLASS;
      this.callBase();
      this._createBodyOverflowManager();
      this._updateResizeCallbackSkipCondition();
      this.$element().addClass(POPUP_CLASS);
      this.$wrapper().addClass(popupWrapperClasses);
      this._$popupContent = this._$content.wrapInner((0, _renderer.default)('<div>').addClass(POPUP_CONTENT_CLASS)).children().eq(0);
      this._toggleContentScrollClass();
      this.$overlayContent().attr('role', 'dialog');
    },
    _render: function _render() {
      var isFullscreen = this.option('fullScreen');
      this._toggleFullScreenClass(isFullscreen);
      this.callBase();
    },
    _createBodyOverflowManager: function _createBodyOverflowManager() {
      this._bodyOverflowManager = (0, _popup_overflow_manager.createBodyOverflowManager)();
    },
    _toggleFullScreenClass: function _toggleFullScreenClass(value) {
      this.$overlayContent().toggleClass(POPUP_FULL_SCREEN_CLASS, value).toggleClass(POPUP_NORMAL_CLASS, !value);
    },
    _initTemplates: function _initTemplates() {
      this.callBase();
      this._templateManager.addDefaultTemplates({
        title: new _empty_template.EmptyTemplate(),
        bottom: new _empty_template.EmptyTemplate()
      });
    },
    _getActionsList: function _getActionsList() {
      return this.callBase().concat(['onResizeStart', 'onResize', 'onResizeEnd']);
    },
    _contentResizeHandler: function _contentResizeHandler(entry) {
      if (!this._shouldSkipContentResize(entry)) {
        this._renderGeometry({
          shouldOnlyReposition: true
        });
      }
    },
    _doesShowAnimationChangeDimensions: function _doesShowAnimationChangeDimensions() {
      var animation = this.option('animation');
      return ['to', 'from'].some(function (prop) {
        var _animation$show;
        var config = animation === null || animation === void 0 ? void 0 : (_animation$show = animation.show) === null || _animation$show === void 0 ? void 0 : _animation$show[prop];
        return (0, _type.isObject)(config) && ('width' in config || 'height' in config);
      });
    },
    _updateResizeCallbackSkipCondition: function _updateResizeCallbackSkipCondition() {
      var _this2 = this;
      var doesShowAnimationChangeDimensions = this._doesShowAnimationChangeDimensions();
      this._shouldSkipContentResize = function (entry) {
        return doesShowAnimationChangeDimensions && _this2._showAnimationProcessing || _this2._areContentDimensionsRendered(entry);
      };
    },
    _observeContentResize: function _observeContentResize(shouldObserve) {
      var _this3 = this;
      if (!this.option('useResizeObserver')) {
        return;
      }
      var contentElement = this._$content.get(0);
      if (shouldObserve) {
        _resize_observer.default.observe(contentElement, function (entry) {
          _this3._contentResizeHandler(entry);
        });
      } else {
        _resize_observer.default.unobserve(contentElement);
      }
    },
    _areContentDimensionsRendered: function _areContentDimensionsRendered(entry) {
      var _entry$contentBoxSize, _this$_renderedDimens3, _this$_renderedDimens4;
      var contentBox = (_entry$contentBoxSize = entry.contentBoxSize) === null || _entry$contentBoxSize === void 0 ? void 0 : _entry$contentBoxSize[0];
      if (contentBox) {
        var _this$_renderedDimens, _this$_renderedDimens2;
        return parseInt(contentBox.inlineSize, 10) === ((_this$_renderedDimens = this._renderedDimensions) === null || _this$_renderedDimens === void 0 ? void 0 : _this$_renderedDimens.width) && parseInt(contentBox.blockSize, 10) === ((_this$_renderedDimens2 = this._renderedDimensions) === null || _this$_renderedDimens2 === void 0 ? void 0 : _this$_renderedDimens2.height);
      }
      var contentRect = entry.contentRect;
      return parseInt(contentRect.width, 10) === ((_this$_renderedDimens3 = this._renderedDimensions) === null || _this$_renderedDimens3 === void 0 ? void 0 : _this$_renderedDimens3.width) && parseInt(contentRect.height, 10) === ((_this$_renderedDimens4 = this._renderedDimensions) === null || _this$_renderedDimens4 === void 0 ? void 0 : _this$_renderedDimens4.height);
    },
    _renderContent: function _renderContent() {
      this.callBase();
      // NOTE: This observe should not be called before async showing is called. See T1130045.
      this._observeContentResize(true);
    },
    _renderContentImpl: function _renderContentImpl() {
      this._renderTitle();
      this.callBase();
      this._renderResize();
      this._renderBottom();
    },
    _renderTitle: function _renderTitle() {
      var items = this._getToolbarItems('top');
      var titleText = this.option('title');
      var showTitle = this.option('showTitle');
      if (showTitle && !!titleText) {
        items.unshift({
          location: _devices.default.current().ios ? 'center' : 'before',
          text: titleText
        });
      }
      if (showTitle || items.length > 0) {
        this._$title && this._$title.remove();
        var $title = (0, _renderer.default)('<div>').addClass(POPUP_TITLE_CLASS).insertBefore(this.$content());
        this._$title = this._renderTemplateByType('titleTemplate', items, $title).addClass(POPUP_TITLE_CLASS);
        this._renderDrag();
        this._executeTitleRenderAction(this._$title);
        this._$title.toggleClass(POPUP_HAS_CLOSE_BUTTON_CLASS, this._hasCloseButton());
      } else if (this._$title) {
        this._$title.detach();
      }
    },
    _renderTemplateByType: function _renderTemplateByType(optionName, data, $container, additionalToolbarOptions) {
      var _this$option = this.option(),
          rtlEnabled = _this$option.rtlEnabled,
          useDefaultToolbarButtons = _this$option.useDefaultToolbarButtons,
          useFlatToolbarButtons = _this$option.useFlatToolbarButtons,
          disabled = _this$option.disabled;
      var template = this._getTemplateByOption(optionName);
      var toolbarTemplate = template instanceof _empty_template.EmptyTemplate;
      if (toolbarTemplate) {
        var integrationOptions = (0, _extend.extend)({}, this.option('integrationOptions'), {
          skipTemplates: ['content', 'title']
        });
        var toolbarOptions = (0, _extend.extend)(additionalToolbarOptions, {
          items: data,
          rtlEnabled: rtlEnabled,
          useDefaultButtons: useDefaultToolbarButtons,
          useFlatButtons: useFlatToolbarButtons,
          disabled: disabled,
          integrationOptions: integrationOptions
        });
        this._getTemplate('dx-polymorph-widget').render({
          container: $container,
          model: {
            widget: this._getToolbarName(),
            options: toolbarOptions
          }
        });
        var $toolbar = $container.children('div');
        $container.replaceWith($toolbar);
        return $toolbar;
      } else {
        var $result = (0, _renderer.default)(template.render({
          container: (0, _element.getPublicElement)($container)
        }));
        if ($result.hasClass(TEMPLATE_WRAPPER_CLASS)) {
          $container.replaceWith($result);
          $container = $result;
        }
        return $container;
      }
    },
    _getToolbarName: function _getToolbarName() {
      return 'dxToolbarBase';
    },
    _renderVisibilityAnimate: function _renderVisibilityAnimate(visible) {
      return this.callBase(visible);
    },
    _hide: function _hide() {
      this._observeContentResize(false);
      return this.callBase();
    },
    _executeTitleRenderAction: function _executeTitleRenderAction($titleElement) {
      this._getTitleRenderAction()({
        titleElement: (0, _element.getPublicElement)($titleElement)
      });
    },
    _getTitleRenderAction: function _getTitleRenderAction() {
      return this._titleRenderAction || this._createTitleRenderAction();
    },
    _createTitleRenderAction: function _createTitleRenderAction() {
      return this._titleRenderAction = this._createActionByOption('onTitleRendered', {
        element: this.element(),
        excludeValidators: ['disabled', 'readOnly']
      });
    },
    _getCloseButton: function _getCloseButton() {
      return {
        toolbar: 'top',
        location: 'after',
        template: this._getCloseButtonRenderer()
      };
    },
    _getCloseButtonRenderer: function _getCloseButtonRenderer() {
      var _this4 = this;
      return function (_, __, container) {
        var $button = (0, _renderer.default)('<div>').addClass(POPUP_TITLE_CLOSEBUTTON_CLASS);
        _this4._createComponent($button, _button.default, {
          icon: 'close',
          onClick: _this4._createToolbarItemAction(undefined),
          stylingMode: 'text',
          integrationOptions: {}
        });
        (0, _renderer.default)(container).append($button);
      };
    },
    _getToolbarItems: function _getToolbarItems(toolbar) {
      var _this5 = this;
      var toolbarItems = this.option('toolbarItems');
      var toolbarsItems = [];
      this._toolbarItemClasses = [];
      var currentPlatform = _devices.default.current().platform;
      var index = 0;
      (0, _iterator.each)(toolbarItems, function (_, data) {
        var isShortcut = (0, _type.isDefined)(data.shortcut);
        var item = isShortcut ? getButtonPlace(data.shortcut) : data;
        if (isShortcut && currentPlatform === 'ios' && index < 2) {
          item.toolbar = 'top';
          index++;
        }
        item.toolbar = data.toolbar || item.toolbar || 'top';
        if (item && item.toolbar === toolbar) {
          if (isShortcut) {
            (0, _extend.extend)(item, {
              location: data.location
            }, _this5._getToolbarItemByAlias(data));
          }
          var isLTROrder = currentPlatform === 'generic';
          if (data.shortcut === 'done' && isLTROrder || data.shortcut === 'cancel' && !isLTROrder) {
            toolbarsItems.unshift(item);
          } else {
            toolbarsItems.push(item);
          }
        }
      });
      if (toolbar === 'top' && this._hasCloseButton()) {
        toolbarsItems.push(this._getCloseButton());
      }
      return toolbarsItems;
    },
    _hasCloseButton: function _hasCloseButton() {
      return this.option('showCloseButton') && this.option('showTitle');
    },
    _getLocalizationKey: function _getLocalizationKey(itemType) {
      return itemType.toLowerCase() === 'done' ? 'OK' : (0, _inflector.camelize)(itemType, true);
    },
    _getToolbarItemByAlias: function _getToolbarItemByAlias(data) {
      var that = this;
      var itemType = data.shortcut;
      if (!ALLOWED_TOOLBAR_ITEM_ALIASES.includes(itemType)) {
        return false;
      }
      var itemConfig = (0, _extend.extend)({
        text: _message.default.format(this._getLocalizationKey(itemType)),
        onClick: this._createToolbarItemAction(data.onClick),
        integrationOptions: {},
        type: that.option('useDefaultToolbarButtons') ? BUTTON_DEFAULT_TYPE : BUTTON_NORMAL_TYPE,
        stylingMode: that.option('useFlatToolbarButtons') ? BUTTON_TEXT_MODE : BUTTON_CONTAINED_MODE
      }, data.options || {});
      var itemClass = POPUP_CLASS + '-' + itemType;
      this._toolbarItemClasses.push(itemClass);
      return {
        template: function template(_, __, container) {
          var $toolbarItem = (0, _renderer.default)('<div>').addClass(itemClass).appendTo(container);
          that._createComponent($toolbarItem, _button.default, itemConfig);
        }
      };
    },
    _createToolbarItemAction: function _createToolbarItemAction(clickAction) {
      return this._createAction(clickAction, {
        afterExecute: function afterExecute(e) {
          e.component.hide();
        }
      });
    },
    _renderBottom: function _renderBottom() {
      var items = this._getToolbarItems('bottom');
      if (items.length) {
        this._$bottom && this._$bottom.remove();
        var $bottom = (0, _renderer.default)('<div>').addClass(POPUP_BOTTOM_CLASS).insertAfter(this.$content());
        this._$bottom = this._renderTemplateByType('bottomTemplate', items, $bottom, {
          compactMode: true
        }).addClass(POPUP_BOTTOM_CLASS);
        this._toggleClasses();
      } else {
        this._$bottom && this._$bottom.detach();
      }
    },
    _toggleDisabledState: function _toggleDisabledState(value) {
      this.callBase.apply(this, arguments);
      this.$content().toggleClass(DISABLED_STATE_CLASS, Boolean(value));
    },
    _toggleClasses: function _toggleClasses() {
      var _this6 = this;
      var aliases = ALLOWED_TOOLBAR_ITEM_ALIASES;
      (0, _iterator.each)(aliases, function (_, alias) {
        var className = POPUP_CLASS + '-' + alias;
        if (_this6._toolbarItemClasses.includes(className)) {
          _this6.$wrapper().addClass(className + '-visible');
          _this6._$bottom.addClass(className);
        } else {
          _this6.$wrapper().removeClass(className + '-visible');
          _this6._$bottom.removeClass(className);
        }
      });
    },
    _toggleFocusClass: function _toggleFocusClass(isFocused, $element) {
      this.callBase(isFocused, $element);
      if (isFocused && !zIndexPool.isLastZIndexInStack(this._zIndex)) {
        var zIndex = zIndexPool.create(this._zIndexInitValue());
        zIndexPool.remove(this._zIndex);
        this._zIndex = zIndex;
        this._$wrapper.css('zIndex', zIndex);
        this._$content.css('zIndex', zIndex);
      }
    },
    _toggleContentScrollClass: function _toggleContentScrollClass() {
      var isNativeScrollingEnabled = !this.option('preventScrollEvents');
      this.$content().toggleClass(POPUP_CONTENT_SCROLLABLE_CLASS, isNativeScrollingEnabled);
    },
    _getPositionControllerConfig: function _getPositionControllerConfig() {
      var _this$option2 = this.option(),
          fullScreen = _this$option2.fullScreen,
          forceApplyBindings = _this$option2.forceApplyBindings,
          dragOutsideBoundary = _this$option2.dragOutsideBoundary,
          dragAndResizeArea = _this$option2.dragAndResizeArea,
          outsideDragFactor = _this$option2.outsideDragFactor;
      return (0, _extend.extend)({}, this.callBase(), {
        fullScreen: fullScreen,
        forceApplyBindings: forceApplyBindings,
        dragOutsideBoundary: dragOutsideBoundary,
        dragAndResizeArea: dragAndResizeArea,
        outsideDragFactor: outsideDragFactor
      });
    },
    _initPositionController: function _initPositionController() {
      this._positionController = new _popup_position_controller.PopupPositionController(this._getPositionControllerConfig());
    },
    _getDragTarget: function _getDragTarget() {
      return this.topToolbar();
    },
    _renderGeometry: function _renderGeometry(options) {
      var _this$option3 = this.option(),
          visible = _this$option3.visible,
          useResizeObserver = _this$option3.useResizeObserver;
      if (visible && (0, _window.hasWindow)()) {
        var isAnimated = this._showAnimationProcessing;
        var shouldRepeatAnimation = isAnimated && !(options !== null && options !== void 0 && options.forceStopAnimation) && useResizeObserver;
        this._isAnimationPaused = shouldRepeatAnimation || undefined;
        this._stopAnimation();
        if (options !== null && options !== void 0 && options.shouldOnlyReposition) {
          this._renderPosition(false);
        } else {
          this._renderGeometryImpl(options === null || options === void 0 ? void 0 : options.isDimensionChange);
        }
        if (shouldRepeatAnimation) {
          this._animateShowing();
          this._isAnimationPaused = undefined;
        }
      }
    },
    _cacheDimensions: function _cacheDimensions() {
      if (!this.option('useResizeObserver')) {
        return;
      }
      this._renderedDimensions = {
        width: parseInt((0, _size.getWidth)(this._$content), 10),
        height: parseInt((0, _size.getHeight)(this._$content), 10)
      };
    },
    _renderGeometryImpl: function _renderGeometryImpl() {
      var isDimensionChange = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!isDimensionChange) {
        // NOTE: to save content scroll position T1113123
        // NOTE: for correct new position calculation
        this._resetContentHeight();
      }
      this.callBase();
      this._cacheDimensions();
      this._setContentHeight();
    },
    _resetContentHeight: function _resetContentHeight() {
      var height = this._getOptionValue('height');
      if (height === 'auto') {
        this.$content().css({
          height: 'auto',
          maxHeight: 'none'
        });
      }
    },
    _renderDrag: function _renderDrag() {
      var $dragTarget = this._getDragTarget();
      var dragEnabled = this.option('dragEnabled');
      if (!$dragTarget) {
        return;
      }
      var config = {
        dragEnabled: dragEnabled,
        handle: $dragTarget.get(0),
        draggableElement: this._$content.get(0),
        positionController: this._positionController
      };
      if (this._drag) {
        this._drag.init(config);
      } else {
        this._drag = new _popup_drag.default(config);
      }
      this.$overlayContent().toggleClass(POPUP_DRAGGABLE_CLASS, dragEnabled);
    },
    _renderResize: function _renderResize() {
      var _this7 = this;
      this._resizable = this._createComponent(this._$content, _resizable.default, {
        handles: this.option('resizeEnabled') ? 'all' : 'none',
        onResizeEnd: function onResizeEnd(e) {
          _this7._resizeEndHandler(e);
          _this7._observeContentResize(true);
        },
        onResize: function onResize(e) {
          _this7._setContentHeight();
          _this7._actions.onResize(e);
        },
        onResizeStart: function onResizeStart(e) {
          _this7._observeContentResize(false);
          _this7._actions.onResizeStart(e);
        },
        minHeight: 100,
        minWidth: 100,
        area: this._positionController.$dragResizeContainer,
        keepAspectRatio: false
      });
    },
    _resizeEndHandler: function _resizeEndHandler(e) {
      var width = this._resizable.option('width');
      var height = this._resizable.option('height');
      width && this._setOptionWithoutOptionChange('width', width);
      height && this._setOptionWithoutOptionChange('height', height);
      this._cacheDimensions();
      this._positionController.resizeHandled();
      this._positionController.detectVisualPositionChange(e.event);
      this._actions.onResizeEnd(e);
    },
    _setContentHeight: function _setContentHeight() {
      (this.option('forceApplyBindings') || _common.noop)();
      var overlayContent = this.$overlayContent().get(0);
      var currentHeightStrategyClass = this._chooseHeightStrategy(overlayContent);
      this.$content().css(this._getHeightCssStyles(currentHeightStrategyClass, overlayContent));
      this._setHeightClasses(this.$overlayContent(), currentHeightStrategyClass);
    },
    _heightStrategyChangeOffset: function _heightStrategyChangeOffset(currentHeightStrategyClass, popupVerticalPaddings) {
      return currentHeightStrategyClass === HEIGHT_STRATEGIES.flex ? -popupVerticalPaddings : 0;
    },
    _chooseHeightStrategy: function _chooseHeightStrategy(overlayContent) {
      var isAutoWidth = overlayContent.style.width === 'auto' || overlayContent.style.width === '';
      var currentHeightStrategyClass = HEIGHT_STRATEGIES.static;
      if (this._isAutoHeight() && this.option('autoResizeEnabled')) {
        if (isAutoWidth || IS_OLD_SAFARI) {
          currentHeightStrategyClass = HEIGHT_STRATEGIES.inherit;
        } else {
          currentHeightStrategyClass = HEIGHT_STRATEGIES.flex;
        }
      }
      return currentHeightStrategyClass;
    },
    _getHeightCssStyles: function _getHeightCssStyles(currentHeightStrategyClass, overlayContent) {
      var cssStyles = {};
      var contentMaxHeight = this._getOptionValue('maxHeight', overlayContent);
      var contentMinHeight = this._getOptionValue('minHeight', overlayContent);
      var popupHeightParts = this._splitPopupHeight();
      var toolbarsAndVerticalOffsetsHeight = popupHeightParts.header + popupHeightParts.footer + popupHeightParts.contentVerticalOffsets + popupHeightParts.popupVerticalOffsets + this._heightStrategyChangeOffset(currentHeightStrategyClass, popupHeightParts.popupVerticalPaddings);
      if (currentHeightStrategyClass === HEIGHT_STRATEGIES.static) {
        if (!this._isAutoHeight() || contentMaxHeight || contentMinHeight) {
          var overlayHeight = this.option('fullScreen') ? Math.min((0, _position.getBoundingRect)(overlayContent).height, (0, _window.getWindow)().innerHeight) : (0, _position.getBoundingRect)(overlayContent).height;
          var contentHeight = overlayHeight - toolbarsAndVerticalOffsetsHeight;
          cssStyles = {
            height: Math.max(0, contentHeight),
            minHeight: 'auto',
            maxHeight: 'auto'
          };
        }
      } else {
        var container = (0, _renderer.default)(this._positionController.$visualContainer).get(0);
        var maxHeightValue = (0, _size.addOffsetToMaxHeight)(contentMaxHeight, -toolbarsAndVerticalOffsetsHeight, container);
        var minHeightValue = (0, _size.addOffsetToMinHeight)(contentMinHeight, -toolbarsAndVerticalOffsetsHeight, container);
        cssStyles = {
          height: 'auto',
          minHeight: minHeightValue,
          maxHeight: maxHeightValue
        };
      }
      return cssStyles;
    },
    _setHeightClasses: function _setHeightClasses($container, currentClass) {
      var excessClasses = '';
      for (var name in HEIGHT_STRATEGIES) {
        if (HEIGHT_STRATEGIES[name] !== currentClass) {
          excessClasses += ' ' + HEIGHT_STRATEGIES[name];
        }
      }
      $container.removeClass(excessClasses).addClass(currentClass);
    },
    _isAutoHeight: function _isAutoHeight() {
      return this.$overlayContent().get(0).style.height === 'auto';
    },
    _splitPopupHeight: function _splitPopupHeight() {
      var topToolbar = this.topToolbar();
      var bottomToolbar = this.bottomToolbar();
      return {
        header: (0, _size.getVisibleHeight)(topToolbar && topToolbar.get(0)),
        footer: (0, _size.getVisibleHeight)(bottomToolbar && bottomToolbar.get(0)),
        contentVerticalOffsets: (0, _size.getVerticalOffsets)(this.$overlayContent().get(0), true),
        popupVerticalOffsets: (0, _size.getVerticalOffsets)(this.$content().get(0), true),
        popupVerticalPaddings: (0, _size.getVerticalOffsets)(this.$content().get(0), false)
      };
    },
    _isAllWindowCovered: function _isAllWindowCovered() {
      return this.callBase() || this.option('fullScreen');
    },
    _renderDimensions: function _renderDimensions() {
      if (this.option('fullScreen')) {
        this.$overlayContent().css({
          width: '100%',
          height: '100%',
          minWidth: '',
          maxWidth: '',
          minHeight: '',
          maxHeight: ''
        });
      } else {
        this.callBase();
      }
      if ((0, _window.hasWindow)()) {
        this._renderFullscreenWidthClass();
      }
    },
    _dimensionChanged: function _dimensionChanged() {
      this._renderGeometry({
        isDimensionChange: true
      });
    },
    _clean: function _clean() {
      this.callBase();
      this._observeContentResize(false);
    },
    _dispose: function _dispose() {
      this.callBase();
      this._toggleBodyScroll(true);
    },
    _renderFullscreenWidthClass: function _renderFullscreenWidthClass() {
      this.$overlayContent().toggleClass(POPUP_FULL_SCREEN_WIDTH_CLASS, (0, _size.getOuterWidth)(this.$overlayContent()) === (0, _size.getWidth)(window));
    },
    _toggleSafariScrolling: function _toggleSafariScrolling() {
      if (!this.option('enableBodyScroll')) {
        return;
      }
      this.callBase();
    },
    _toggleBodyScroll: function _toggleBodyScroll(enabled) {
      if (!this._bodyOverflowManager) {
        return;
      }
      var _this$_bodyOverflowMa = this._bodyOverflowManager,
          setOverflow = _this$_bodyOverflowMa.setOverflow,
          restoreOverflow = _this$_bodyOverflowMa.restoreOverflow;
      if (enabled) {
        restoreOverflow();
      } else {
        setOverflow();
      }
    },
    refreshPosition: function refreshPosition() {
      this._renderPosition();
    },
    _optionChanged: function _optionChanged(args) {
      var _this$_resizable2;
      var value = args.value,
          name = args.name;
      switch (name) {
        case 'disabled':
          this.callBase(args);
          this._renderTitle();
          this._renderBottom();
          break;
        case 'animation':
          this._updateResizeCallbackSkipCondition();
          break;
        case 'enableBodyScroll':
          this._toggleBodyScroll(value);
          break;
        case 'showTitle':
        case 'title':
        case 'titleTemplate':
          this._renderTitle();
          this._renderGeometry();
          (0, _visibility_change.triggerResizeEvent)(this.$overlayContent());
          break;
        case 'bottomTemplate':
          this._renderBottom();
          this._renderGeometry();
          (0, _visibility_change.triggerResizeEvent)(this.$overlayContent());
          break;
        case 'container':
          this.callBase(args);
          if (this.option('resizeEnabled')) {
            var _this$_resizable;
            (_this$_resizable = this._resizable) === null || _this$_resizable === void 0 ? void 0 : _this$_resizable.option('area', this._positionController.$dragResizeContainer);
          }
          break;
        case 'width':
        case 'height':
          this.callBase(args);
          (_this$_resizable2 = this._resizable) === null || _this$_resizable2 === void 0 ? void 0 : _this$_resizable2.option(name, value);
          break;
        case 'onTitleRendered':
          this._createTitleRenderAction(value);
          break;
        case 'toolbarItems':
        case 'useDefaultToolbarButtons':
        case 'useFlatToolbarButtons':
          {
            // NOTE: Geometry rendering after "toolbarItems" runtime change breaks the popup animation first appereance.
            // But geometry rendering for options connected to the popup position still should be called.
            var shouldRenderGeometry = !args.fullName.match(/^toolbarItems((\[\d+\])(\.(options|visible).*)?)?$/);
            this._renderTitle();
            this._renderBottom();
            if (shouldRenderGeometry) {
              this._renderGeometry();
              (0, _visibility_change.triggerResizeEvent)(this.$overlayContent());
            }
            break;
          }
        case 'dragEnabled':
          this._renderDrag();
          break;
        case 'dragAndResizeArea':
          this._positionController.dragAndResizeArea = value;
          if (this.option('resizeEnabled')) {
            this._resizable.option('area', this._positionController.$dragResizeContainer);
          }
          this._positionController.positionContent();
          break;
        case 'dragOutsideBoundary':
          this._positionController.dragOutsideBoundary = value;
          if (this.option('resizeEnabled')) {
            this._resizable.option('area', this._positionController.$dragResizeContainer);
          }
          break;
        case 'outsideDragFactor':
          this._positionController.outsideDragFactor = value;
          break;
        case 'resizeEnabled':
          this._renderResize();
          this._renderGeometry();
          break;
        case 'autoResizeEnabled':
          this._renderGeometry();
          (0, _visibility_change.triggerResizeEvent)(this.$overlayContent());
          break;
        case 'fullScreen':
          this._positionController.fullScreen = value;
          this._toggleFullScreenClass(value);
          this._toggleSafariScrolling();
          this._renderGeometry();
          (0, _visibility_change.triggerResizeEvent)(this.$overlayContent());
          break;
        case 'showCloseButton':
          this._renderTitle();
          break;
        case 'preventScrollEvents':
          this.callBase(args);
          this._toggleContentScrollClass();
          break;
        default:
          this.callBase(args);
      }
    },
    bottomToolbar: function bottomToolbar() {
      return this._$bottom;
    },
    topToolbar: function topToolbar() {
      return this._$title;
    },
    $content: function $content() {
      return this._$popupContent;
    },
    content: function content() {
      return (0, _element.getPublicElement)(this.$content());
    },
    $overlayContent: function $overlayContent() {
      return this._$content;
    }
  });
  (0, _component_registrator.default)('dxPopup', Popup);
  var _default = Popup;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/component_registrator","../../core/devices","../../core/element","../../core/renderer","../../core/templates/empty_template","../../core/utils/browser","../../core/utils/common","../../core/utils/extend","../../core/utils/inflector","../../core/utils/iterator","../../core/utils/size","../../core/utils/position","../../core/utils/type","../../core/utils/version","../../core/utils/window","../../events/visibility_change","../../localization/message","./popup_drag","../resizable","../button","../overlay/ui.overlay","../themes","../toolbar/ui.toolbar.base","../../core/resize_observer","../overlay/z_index","./popup_position_controller","./popup_overflow_manager"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/component_registrator"), require("../../core/devices"), require("../../core/element"), require("../../core/renderer"), require("../../core/templates/empty_template"), require("../../core/utils/browser"), require("../../core/utils/common"), require("../../core/utils/extend"), require("../../core/utils/inflector"), require("../../core/utils/iterator"), require("../../core/utils/size"), require("../../core/utils/position"), require("../../core/utils/type"), require("../../core/utils/version"), require("../../core/utils/window"), require("../../events/visibility_change"), require("../../localization/message"), require("./popup_drag"), require("../resizable"), require("../button"), require("../overlay/ui.overlay"), require("../themes"), require("../toolbar/ui.toolbar.base"), require("../../core/resize_observer"), require("../overlay/z_index"), require("./popup_position_controller"), require("./popup_overflow_manager"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.popup.js.map