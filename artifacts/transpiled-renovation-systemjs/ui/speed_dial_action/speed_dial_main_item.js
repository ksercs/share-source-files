!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/speed_dial_action/speed_dial_main_item.js"], ["../../core/utils/size","../../core/renderer","../../core/config","../../core/utils/extend","../../events/core/events_engine","../widget/ui.errors","../widget/swatch_container","./speed_dial_item","../themes"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/speed_dial_action/speed_dial_main_item.js", ["../../core/utils/size", "../../core/renderer", "../../core/config", "../../core/utils/extend", "../../events/core/events_engine", "../widget/ui.errors", "../widget/swatch_container", "./speed_dial_item", "../themes"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.disposeAction = disposeAction;
  exports.initAction = initAction;
  exports.repaint = repaint;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _config = _interopRequireDefault($__require("../../core/config"));
  var _extend = $__require("../../core/utils/extend");
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _ui = _interopRequireDefault($__require("../widget/ui.errors"));
  var _swatch_container = _interopRequireDefault($__require("../widget/swatch_container"));
  var _speed_dial_item = _interopRequireDefault($__require("./speed_dial_item"));
  var _themes = $__require("../themes");
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
  var getSwatchContainer = _swatch_container.default.getSwatchContainer;
  var FAB_MAIN_CLASS = 'dx-fa-button-main';
  var FAB_MAIN_CLASS_WITH_LABEL = 'dx-fa-button-with-label';
  var FAB_MAIN_CLASS_WITHOUT_ICON = 'dx-fa-button-without-icon';
  var FAB_CLOSE_ICON_CLASS = 'dx-fa-button-icon-close';
  var INVISIBLE_STATE_CLASS = 'dx-state-invisible';
  var speedDialMainItem = null;
  var modifyActionOptions = function modifyActionOptions(action) {
    var _action$option = action.option(),
        animation = _action$option.animation,
        actionComponent = _action$option.actionComponent,
        actionVisible = _action$option.actionVisible,
        actions = _action$option.actions,
        activeStateEnabled = _action$option.activeStateEnabled,
        direction = _action$option.direction,
        elementAttr = _action$option.elementAttr,
        hint = _action$option.hint,
        hoverStateEnabled = _action$option.hoverStateEnabled,
        icon = _action$option.icon,
        id = _action$option.id,
        index = _action$option.index,
        label = _action$option.label,
        onClick = _action$option.onClick,
        onContentReady = _action$option.onContentReady,
        parentPosition = _action$option.parentPosition,
        position = _action$option.position,
        visible = _action$option.visible,
        zIndex = _action$option.zIndex;
    return (0, _extend.extend)({}, {
      animation: animation,
      actionComponent: actionComponent,
      actionVisible: actionVisible,
      actions: actions,
      activeStateEnabled: activeStateEnabled,
      direction: direction,
      elementAttr: elementAttr,
      hint: hint,
      hoverStateEnabled: hoverStateEnabled,
      icon: icon,
      id: id,
      index: index,
      label: label,
      onClick: onClick,
      onContentReady: onContentReady,
      parentPosition: parentPosition,
      position: position,
      visible: visible,
      zIndex: zIndex,
      _ignoreElementAttrDeprecation: true
    }, {
      onInitialized: null,
      onDisposing: null
    });
  };
  var SpeedDialMainItem = /*#__PURE__*/function (_SpeedDialItem) {
    _inheritsLoose(SpeedDialMainItem, _SpeedDialItem);
    function SpeedDialMainItem() {
      return _SpeedDialItem.apply(this, arguments) || this;
    }
    var _proto = SpeedDialMainItem.prototype;
    _proto._getDefaultOptions = function _getDefaultOptions() {
      var defaultOptions = {
        icon: 'add',
        closeIcon: 'close',
        position: {
          at: 'right bottom',
          my: 'right bottom',
          offset: {
            x: -16,
            y: -16
          }
        },
        maxSpeedDialActionCount: 5,
        hint: '',
        label: '',
        direction: 'auto',
        actions: [],
        activeStateEnabled: true,
        hoverStateEnabled: true,
        indent: (0, _themes.isCompact)() ? 49 : 55,
        childIndent: 40,
        childOffset: (0, _themes.isCompact)() ? 2 : 9,
        callOverlayRenderShading: true,
        hideOnOutsideClick: true
      };
      return (0, _extend.extend)(_SpeedDialItem.prototype._getDefaultOptions.call(this), (0, _extend.extend)(defaultOptions, (0, _config.default)().floatingActionButtonConfig, {
        shading: false
      }));
    };
    _proto._defaultOptionsRules = function _defaultOptionsRules() {
      return _SpeedDialItem.prototype._defaultOptionsRules.call(this).concat([{
        device: function device() {
          return (0, _themes.isMaterial)() && !(0, _themes.isCompact)();
        },
        options: {
          indent: 72,
          childIndent: 56,
          childOffset: 8
        }
      }, {
        device: function device() {
          return (0, _themes.isMaterial)() && (0, _themes.isCompact)();
        },
        options: {
          indent: 58,
          childIndent: 48,
          childOffset: 1
        }
      }]);
    };
    _proto._render = function _render() {
      this.$element().addClass(FAB_MAIN_CLASS);
      _SpeedDialItem.prototype._render.call(this);
      this._moveToContainer();
      this._renderCloseIcon();
      this._renderClick();
    };
    _proto._renderLabel = function _renderLabel() {
      _SpeedDialItem.prototype._renderLabel.call(this);
      this.$element().toggleClass(FAB_MAIN_CLASS_WITH_LABEL, !!this._$label);
    };
    _proto._renderIcon = function _renderIcon() {
      _SpeedDialItem.prototype._renderIcon.call(this);
      this.$element().toggleClass(FAB_MAIN_CLASS_WITHOUT_ICON, !this.option('icon'));
    };
    _proto._renderCloseIcon = function _renderCloseIcon() {
      this._$closeIcon = this._renderButtonIcon(this._$closeIcon, this._options.silent('closeIcon'), FAB_CLOSE_ICON_CLASS);
      this._$closeIcon.addClass(INVISIBLE_STATE_CLASS);
    };
    _proto._renderClick = function _renderClick() {
      this._clickAction = this._getVisibleActions().length === 1 ? this._getActionComponent()._createActionByOption('onClick') : this._createAction(this._clickHandler.bind(this));
      this._setClickAction();
    };
    _proto._getVisibleActions = function _getVisibleActions(actions) {
      var currentActions = actions || this.option('actions');
      return currentActions.filter(function (action) {
        return action.option('visible');
      });
    };
    _proto._getCurrentOptions = function _getCurrentOptions(actions) {
      var visibleActions = speedDialMainItem._getVisibleActions(actions);
      var defaultOptions = this._getDefaultOptions();
      delete defaultOptions.elementAttr;
      delete defaultOptions.closeOnOutsideClick;
      return visibleActions.length === 1 ? (0, _extend.extend)(modifyActionOptions(visibleActions[0]), {
        position: this._getPosition()
      }) : (0, _extend.extend)(defaultOptions, {
        visible: visibleActions.length !== 0
      });
    };
    _proto._clickHandler = function _clickHandler() {
      var actions = this._actionItems.filter(function (action) {
        return action.option('actionVisible');
      }).sort(function (action, nextAction) {
        return action.option('index') - nextAction.option('index');
      });
      if (actions.length === 1) return;
      var lastActionIndex = actions.length - 1;
      for (var i = 0; i < actions.length; i++) {
        actions[i].option('animation', this._getActionAnimation(actions[i], i, lastActionIndex));
        actions[i].option('position', this._getActionPosition(actions, i));
        actions[i]._$wrapper.css('position', this._$wrapper.css('position'));
        actions[i].toggle();
      }
      if ((0, _config.default)().floatingActionButtonConfig.shading) {
        this._isShadingShown = !this.option('shading');
        this.option('shading', this._isShadingShown);
      }
      this._$icon.toggleClass(INVISIBLE_STATE_CLASS);
      this._$closeIcon.toggleClass(INVISIBLE_STATE_CLASS);
    };
    _proto._updateZIndexStackPosition = function _updateZIndexStackPosition() {
      _SpeedDialItem.prototype._updateZIndexStackPosition.call(this);
      var overlayStack = this._overlayStack();
      overlayStack.push(this);
    };
    _proto._renderActions = function _renderActions() {
      var _this = this;
      var actions = this.option('actions');
      var minActionButtonCount = 1;
      if (this._actionItems && this._actionItems.length) {
        this._actionItems.forEach(function (actionItem) {
          actionItem.dispose();
          actionItem.$element().remove();
        });
        this._actionItems = [];
      }
      this._actionItems = [];
      if (actions.length === minActionButtonCount) return;
      for (var i = 0; i < actions.length; i++) {
        var action = actions[i];
        var $actionElement = (0, _renderer.default)('<div>').appendTo(getSwatchContainer(action.$element()));
        _events_engine.default.off($actionElement, 'click');
        _events_engine.default.on($actionElement, 'click', function () {
          _this._clickHandler();
        });
        action._options.silent('actionComponent', action);
        action._options.silent('parentPosition', this._getPosition());
        action._options.silent('actionVisible', action._options.silent('visible'));
        this._actionItems.push(this._createComponent($actionElement, _speed_dial_item.default, (0, _extend.extend)({}, modifyActionOptions(action), {
          visible: false
        })));
      }
    };
    _proto._getActionAnimation = function _getActionAnimation(action, index, lastActionIndex) {
      var actionAnimationDelay = 30;
      action._options.silent('animation.show.delay', actionAnimationDelay * index);
      action._options.silent('animation.hide.delay', actionAnimationDelay * (lastActionIndex - index));
      return action._options.silent('animation');
    };
    _proto._getDirectionIndex = function _getDirectionIndex(actions, direction) {
      var directionIndex = 1;
      if (direction === 'auto') {
        var contentHeight = (0, _size.getHeight)(this.$content());
        var actionsHeight = this.initialOption('indent') + this.initialOption('childIndent') * actions.length - contentHeight;
        var offsetTop = this.$content().offset().top;
        if (actionsHeight < offsetTop) {
          return -directionIndex;
        } else {
          var offsetBottom = (0, _size.getHeight)(this._positionController._$wrapperCoveredElement) - contentHeight - offsetTop;
          return offsetTop >= offsetBottom ? -directionIndex : directionIndex;
        }
      }
      return direction !== 'down' ? -directionIndex : directionIndex;
    };
    _proto._getActionPosition = function _getActionPosition(actions, index) {
      var action = actions[index];
      var actionOffsetXValue = this.initialOption('childOffset');
      var actionOffsetX = action._options.silent('label') && !this._$label ? this._isPositionLeft(this._getPosition()) ? actionOffsetXValue : -actionOffsetXValue : 0;
      var actionOffsetYValue = this.initialOption('indent') + this.initialOption('childIndent') * index;
      var actionOffsetY = this._getDirectionIndex(actions, this.option('direction')) * actionOffsetYValue;
      var actionPositionAtMy = action._options.silent('label') ? this._isPositionLeft(this._getPosition()) ? 'left' : 'right' : 'center';
      return {
        of: this.$content(),
        at: actionPositionAtMy,
        my: actionPositionAtMy,
        offset: {
          x: actionOffsetX,
          y: actionOffsetY
        }
      };
    };
    _proto._outsideClickHandler = function _outsideClickHandler(e) {
      if (this._isShadingShown) {
        var isShadingClick = (0, _renderer.default)(e.target)[0] === this._$wrapper[0];
        if (isShadingClick) {
          e.preventDefault();
          this._clickHandler();
        }
      }
    };
    _proto._setPosition = function _setPosition() {
      if (this.option('visible')) {
        this._hide();
        this._show();
      }
    };
    _proto._getPosition = function _getPosition() {
      return this._getDefaultOptions().position;
    };
    _proto._getInkRippleContainer = function _getInkRippleContainer() {
      return this.$content();
    };
    _proto._optionChanged = function _optionChanged(args) {
      switch (args.name) {
        case 'actions':
          if (this._isVisible()) {
            this._renderIcon();
            this._renderLabel();
          }
          this._renderCloseIcon();
          this._renderClick();
          this._renderActions();
          break;
        case 'maxSpeedDialActionCount':
          this._renderActions();
          break;
        case 'closeIcon':
          this._renderCloseIcon();
          break;
        case 'position':
          _SpeedDialItem.prototype._optionChanged.call(this, args);
          this._setPosition();
          break;
        case 'label':
          if (this._isVisible()) this._renderLabel();
          this._setPosition();
          break;
        case 'icon':
          if (this._isVisible()) this._renderIcon();
          break;
        default:
          _SpeedDialItem.prototype._optionChanged.call(this, args);
      }
    };
    return SpeedDialMainItem;
  }(_speed_dial_item.default);
  function initAction(newAction) {
    // TODO: workaround for Angular/React/Vue
    newAction._options.silent('onInitializing', null);
    var isActionExist = false;
    if (!speedDialMainItem) {
      var $fabMainElement = (0, _renderer.default)('<div>').appendTo(getSwatchContainer(newAction.$element()));
      speedDialMainItem = newAction._createComponent($fabMainElement, SpeedDialMainItem, (0, _extend.extend)({}, modifyActionOptions(newAction), {
        actions: [newAction]
      }));
    } else {
      var savedActions = speedDialMainItem.option('actions');
      savedActions.forEach(function (action) {
        if (action._options.silent('id') === newAction._options.silent('id')) {
          isActionExist = true;
          return newAction;
        }
      });
      delete speedDialMainItem._options.position;
      if (!isActionExist) {
        if (speedDialMainItem._getVisibleActions(savedActions).length >= speedDialMainItem.option('maxSpeedDialActionCount')) {
          newAction.dispose();
          _ui.default.log('W1014');
          return;
        }
        savedActions.push(newAction);
        speedDialMainItem.option((0, _extend.extend)(speedDialMainItem._getCurrentOptions(savedActions), {
          actions: savedActions
        }));
      } else if (savedActions.length === 1) {
        speedDialMainItem.option((0, _extend.extend)({}, modifyActionOptions(savedActions[0]), {
          actions: savedActions,
          position: speedDialMainItem._getPosition()
        }));
      } else {
        speedDialMainItem.option((0, _extend.extend)(speedDialMainItem._getCurrentOptions(savedActions), {
          actions: savedActions
        }));
      }
    }
  }
  function disposeAction(actionId) {
    if (!speedDialMainItem) return;
    var savedActions = speedDialMainItem.option('actions');
    var savedActionsCount = savedActions.length;
    savedActions = savedActions.filter(function (action) {
      return action._options.silent('id') !== actionId;
    });
    if (savedActionsCount === savedActions.length) return;
    if (!savedActions.length) {
      speedDialMainItem.dispose();
      speedDialMainItem.$element().remove();
      speedDialMainItem = null;
    } else if (savedActions.length === 1) {
      speedDialMainItem.option((0, _extend.extend)({}, modifyActionOptions(savedActions[0]), {
        actions: savedActions
      }));
    } else {
      speedDialMainItem.option({
        actions: savedActions
      });
    }
  }
  function repaint() {
    if (!speedDialMainItem) return;
    var visibleActions = speedDialMainItem._getVisibleActions();
    var icon = visibleActions.length === 1 ? visibleActions[0].option('icon') : speedDialMainItem._getDefaultOptions().icon;
    var label = visibleActions.length === 1 ? visibleActions[0].option('label') : speedDialMainItem._getDefaultOptions().label;
    speedDialMainItem.option({
      actions: speedDialMainItem.option('actions'),
      icon: icon,
      closeIcon: speedDialMainItem._getDefaultOptions().closeIcon,
      position: speedDialMainItem._getPosition(),
      label: label,
      maxSpeedDialActionCount: speedDialMainItem._getDefaultOptions().maxSpeedDialActionCount,
      direction: speedDialMainItem._getDefaultOptions().direction
    });
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/config","../../core/utils/extend","../../events/core/events_engine","../widget/ui.errors","../widget/swatch_container","./speed_dial_item","../themes"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/config"), require("../../core/utils/extend"), require("../../events/core/events_engine"), require("../widget/ui.errors"), require("../widget/swatch_container"), require("./speed_dial_item"), require("../themes"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=speed_dial_main_item.js.map