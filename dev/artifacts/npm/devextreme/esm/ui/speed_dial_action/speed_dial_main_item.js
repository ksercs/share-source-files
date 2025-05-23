/**
* DevExtreme (esm/ui/speed_dial_action/speed_dial_main_item.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getHeight } from '../../core/utils/size';
import $ from '../../core/renderer';
import config from '../../core/config';
import { extend } from '../../core/utils/extend';
import eventsEngine from '../../events/core/events_engine';
import errors from '../widget/ui.errors';
import swatchContainer from '../widget/swatch_container';
import SpeedDialItem from './speed_dial_item';
import { isMaterial, isCompact } from '../themes';
var {
  getSwatchContainer
} = swatchContainer;
var FAB_MAIN_CLASS = 'dx-fa-button-main';
var FAB_MAIN_CLASS_WITH_LABEL = 'dx-fa-button-with-label';
var FAB_MAIN_CLASS_WITHOUT_ICON = 'dx-fa-button-without-icon';
var FAB_CLOSE_ICON_CLASS = 'dx-fa-button-icon-close';
var INVISIBLE_STATE_CLASS = 'dx-state-invisible';
var speedDialMainItem = null;
var modifyActionOptions = action => {
  var {
    animation,
    actionComponent,
    actionVisible,
    actions,
    activeStateEnabled,
    direction,
    elementAttr,
    hint,
    hoverStateEnabled,
    icon,
    id,
    index,
    label,
    onClick,
    onContentReady,
    parentPosition,
    position,
    visible,
    zIndex
  } = action.option();
  return extend({}, {
    animation,
    actionComponent,
    actionVisible,
    actions,
    activeStateEnabled,
    direction,
    elementAttr,
    hint,
    hoverStateEnabled,
    icon,
    id,
    index,
    label,
    onClick,
    onContentReady,
    parentPosition,
    position,
    visible,
    zIndex,
    _ignoreElementAttrDeprecation: true
  }, {
    onInitialized: null,
    onDisposing: null
  });
};
class SpeedDialMainItem extends SpeedDialItem {
  _getDefaultOptions() {
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
      indent: isCompact() ? 49 : 55,
      childIndent: 40,
      childOffset: isCompact() ? 2 : 9,
      callOverlayRenderShading: true,
      hideOnOutsideClick: true
    };
    return extend(super._getDefaultOptions(), extend(defaultOptions, config().floatingActionButtonConfig, {
      shading: false
    }));
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return isMaterial() && !isCompact();
      },
      options: {
        indent: 72,
        childIndent: 56,
        childOffset: 8
      }
    }, {
      device() {
        return isMaterial() && isCompact();
      },
      options: {
        indent: 58,
        childIndent: 48,
        childOffset: 1
      }
    }]);
  }
  _render() {
    this.$element().addClass(FAB_MAIN_CLASS);
    super._render();
    this._moveToContainer();
    this._renderCloseIcon();
    this._renderClick();
  }
  _renderLabel() {
    super._renderLabel();
    this.$element().toggleClass(FAB_MAIN_CLASS_WITH_LABEL, !!this._$label);
  }
  _renderIcon() {
    super._renderIcon();
    this.$element().toggleClass(FAB_MAIN_CLASS_WITHOUT_ICON, !this.option('icon'));
  }
  _renderCloseIcon() {
    this._$closeIcon = this._renderButtonIcon(this._$closeIcon, this._options.silent('closeIcon'), FAB_CLOSE_ICON_CLASS);
    this._$closeIcon.addClass(INVISIBLE_STATE_CLASS);
  }
  _renderClick() {
    this._clickAction = this._getVisibleActions().length === 1 ? this._getActionComponent()._createActionByOption('onClick') : this._createAction(this._clickHandler.bind(this));
    this._setClickAction();
  }
  _getVisibleActions(actions) {
    var currentActions = actions || this.option('actions');
    return currentActions.filter(action => action.option('visible'));
  }
  _getCurrentOptions(actions) {
    var visibleActions = speedDialMainItem._getVisibleActions(actions);
    var defaultOptions = this._getDefaultOptions();
    delete defaultOptions.elementAttr;
    delete defaultOptions.closeOnOutsideClick;
    return visibleActions.length === 1 ? extend(modifyActionOptions(visibleActions[0]), {
      position: this._getPosition()
    }) : extend(defaultOptions, {
      visible: visibleActions.length !== 0
    });
  }
  _clickHandler() {
    var actions = this._actionItems.filter(action => action.option('actionVisible')).sort((action, nextAction) => action.option('index') - nextAction.option('index'));
    if (actions.length === 1) return;
    var lastActionIndex = actions.length - 1;
    for (var i = 0; i < actions.length; i++) {
      actions[i].option('animation', this._getActionAnimation(actions[i], i, lastActionIndex));
      actions[i].option('position', this._getActionPosition(actions, i));
      actions[i]._$wrapper.css('position', this._$wrapper.css('position'));
      actions[i].toggle();
    }
    if (config().floatingActionButtonConfig.shading) {
      this._isShadingShown = !this.option('shading');
      this.option('shading', this._isShadingShown);
    }
    this._$icon.toggleClass(INVISIBLE_STATE_CLASS);
    this._$closeIcon.toggleClass(INVISIBLE_STATE_CLASS);
  }
  _updateZIndexStackPosition() {
    super._updateZIndexStackPosition();
    var overlayStack = this._overlayStack();
    overlayStack.push(this);
  }
  _renderActions() {
    var actions = this.option('actions');
    var minActionButtonCount = 1;
    if (this._actionItems && this._actionItems.length) {
      this._actionItems.forEach(actionItem => {
        actionItem.dispose();
        actionItem.$element().remove();
      });
      this._actionItems = [];
    }
    this._actionItems = [];
    if (actions.length === minActionButtonCount) return;
    for (var i = 0; i < actions.length; i++) {
      var action = actions[i];
      var $actionElement = $('<div>').appendTo(getSwatchContainer(action.$element()));
      eventsEngine.off($actionElement, 'click');
      eventsEngine.on($actionElement, 'click', () => {
        this._clickHandler();
      });
      action._options.silent('actionComponent', action);
      action._options.silent('parentPosition', this._getPosition());
      action._options.silent('actionVisible', action._options.silent('visible'));
      this._actionItems.push(this._createComponent($actionElement, SpeedDialItem, extend({}, modifyActionOptions(action), {
        visible: false
      })));
    }
  }
  _getActionAnimation(action, index, lastActionIndex) {
    var actionAnimationDelay = 30;
    action._options.silent('animation.show.delay', actionAnimationDelay * index);
    action._options.silent('animation.hide.delay', actionAnimationDelay * (lastActionIndex - index));
    return action._options.silent('animation');
  }
  _getDirectionIndex(actions, direction) {
    var directionIndex = 1;
    if (direction === 'auto') {
      var contentHeight = getHeight(this.$content());
      var actionsHeight = this.initialOption('indent') + this.initialOption('childIndent') * actions.length - contentHeight;
      var offsetTop = this.$content().offset().top;
      if (actionsHeight < offsetTop) {
        return -directionIndex;
      } else {
        var offsetBottom = getHeight(this._positionController._$wrapperCoveredElement) - contentHeight - offsetTop;
        return offsetTop >= offsetBottom ? -directionIndex : directionIndex;
      }
    }
    return direction !== 'down' ? -directionIndex : directionIndex;
  }
  _getActionPosition(actions, index) {
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
  }
  _outsideClickHandler(e) {
    if (this._isShadingShown) {
      var isShadingClick = $(e.target)[0] === this._$wrapper[0];
      if (isShadingClick) {
        e.preventDefault();
        this._clickHandler();
      }
    }
  }
  _setPosition() {
    if (this.option('visible')) {
      this._hide();
      this._show();
    }
  }
  _getPosition() {
    return this._getDefaultOptions().position;
  }
  _getInkRippleContainer() {
    return this.$content();
  }
  _optionChanged(args) {
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
        super._optionChanged(args);
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
        super._optionChanged(args);
    }
  }
}
export function initAction(newAction) {
  // TODO: workaround for Angular/React/Vue
  newAction._options.silent('onInitializing', null);
  var isActionExist = false;
  if (!speedDialMainItem) {
    var $fabMainElement = $('<div>').appendTo(getSwatchContainer(newAction.$element()));
    speedDialMainItem = newAction._createComponent($fabMainElement, SpeedDialMainItem, extend({}, modifyActionOptions(newAction), {
      actions: [newAction]
    }));
  } else {
    var savedActions = speedDialMainItem.option('actions');
    savedActions.forEach(action => {
      if (action._options.silent('id') === newAction._options.silent('id')) {
        isActionExist = true;
        return newAction;
      }
    });
    delete speedDialMainItem._options.position;
    if (!isActionExist) {
      if (speedDialMainItem._getVisibleActions(savedActions).length >= speedDialMainItem.option('maxSpeedDialActionCount')) {
        newAction.dispose();
        errors.log('W1014');
        return;
      }
      savedActions.push(newAction);
      speedDialMainItem.option(extend(speedDialMainItem._getCurrentOptions(savedActions), {
        actions: savedActions
      }));
    } else if (savedActions.length === 1) {
      speedDialMainItem.option(extend({}, modifyActionOptions(savedActions[0]), {
        actions: savedActions,
        position: speedDialMainItem._getPosition()
      }));
    } else {
      speedDialMainItem.option(extend(speedDialMainItem._getCurrentOptions(savedActions), {
        actions: savedActions
      }));
    }
  }
}
export function disposeAction(actionId) {
  if (!speedDialMainItem) return;
  var savedActions = speedDialMainItem.option('actions');
  var savedActionsCount = savedActions.length;
  savedActions = savedActions.filter(action => {
    return action._options.silent('id') !== actionId;
  });
  if (savedActionsCount === savedActions.length) return;
  if (!savedActions.length) {
    speedDialMainItem.dispose();
    speedDialMainItem.$element().remove();
    speedDialMainItem = null;
  } else if (savedActions.length === 1) {
    speedDialMainItem.option(extend({}, modifyActionOptions(savedActions[0]), {
      actions: savedActions
    }));
  } else {
    speedDialMainItem.option({
      actions: savedActions
    });
  }
}
export function repaint() {
  if (!speedDialMainItem) return;
  var visibleActions = speedDialMainItem._getVisibleActions();
  var icon = visibleActions.length === 1 ? visibleActions[0].option('icon') : speedDialMainItem._getDefaultOptions().icon;
  var label = visibleActions.length === 1 ? visibleActions[0].option('label') : speedDialMainItem._getDefaultOptions().label;
  speedDialMainItem.option({
    actions: speedDialMainItem.option('actions'),
    icon,
    closeIcon: speedDialMainItem._getDefaultOptions().closeIcon,
    position: speedDialMainItem._getPosition(),
    label,
    maxSpeedDialActionCount: speedDialMainItem._getDefaultOptions().maxSpeedDialActionCount,
    direction: speedDialMainItem._getDefaultOptions().direction
  });
}
