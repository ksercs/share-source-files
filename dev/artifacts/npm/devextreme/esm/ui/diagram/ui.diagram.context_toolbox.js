/**
* DevExtreme (esm/ui/diagram/ui.diagram.context_toolbox.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import Widget from '../widget/ui.widget';
import Popover from '../popover/ui.popover';
import { getDiagram } from './diagram.importer';
import { getWindow } from '../../core/utils/window';
var DIAGRAM_CONTEXT_TOOLBOX_TARGET_CLASS = 'dx-diagram-context-toolbox-target';
var DIAGRAM_CONTEXT_TOOLBOX_CLASS = 'dx-diagram-context-toolbox';
var DIAGRAM_TOUCH_CONTEXT_TOOLBOX_CLASS = 'dx-diagram-touch-context-toolbox';
var DIAGRAM_CONTEXT_TOOLBOX_CONTENT_CLASS = 'dx-diagram-context-toolbox-content';
var DIAGRAM_CONTEXT_TOOLBOX_MINHEIGHT = 150;
class DiagramContextToolbox extends Widget {
  _init() {
    super._init();
    this._onShownAction = this._createActionByOption('onShown');
    var window = getWindow();
    this._popoverPositionData = [{
      my: {
        x: 'center',
        y: 'top'
      },
      at: {
        x: 'center',
        y: 'bottom'
      },
      offset: {
        x: 0,
        y: 5
      },
      calcMaxHeight: rect => Math.max(DIAGRAM_CONTEXT_TOOLBOX_MINHEIGHT, window.innerHeight - rect.bottom - 6)
    }, {
      my: {
        x: 'right',
        y: 'center'
      },
      at: {
        x: 'left',
        y: 'center'
      },
      offset: {
        x: -5,
        y: 0
      },
      calcMaxHeight: rect => Math.max(DIAGRAM_CONTEXT_TOOLBOX_MINHEIGHT, Math.min(rect.top, window.innerHeight - rect.bottom) * 2 - 2)
    }, {
      my: {
        x: 'center',
        y: 'bottom'
      },
      at: {
        x: 'center',
        y: 'top'
      },
      offset: {
        x: 0,
        y: -5
      },
      calcMaxHeight: rect => Math.max(DIAGRAM_CONTEXT_TOOLBOX_MINHEIGHT, rect.top - 6)
    }, {
      my: {
        x: 'left',
        y: 'center'
      },
      at: {
        x: 'right',
        y: 'center'
      },
      offset: {
        x: 5,
        y: 0
      },
      calcMaxHeight: rect => Math.max(DIAGRAM_CONTEXT_TOOLBOX_MINHEIGHT, Math.min(rect.top, window.innerHeight - rect.bottom) * 2 - 2)
    }];
  }
  _initMarkup() {
    super._initMarkup();
    this._$popoverTargetElement = $('<div>').addClass(DIAGRAM_CONTEXT_TOOLBOX_TARGET_CLASS).appendTo(this.$element());
    var $popoverElement = $('<div>').addClass(DIAGRAM_CONTEXT_TOOLBOX_CLASS).appendTo(this.$element());
    if (this._isTouchMode()) {
      $popoverElement.addClass(DIAGRAM_TOUCH_CONTEXT_TOOLBOX_CLASS);
    }
    this._popoverInstance = this._createComponent($popoverElement, Popover, {
      hideOnOutsideClick: false,
      container: this.$element()
    });
  }
  _isTouchMode() {
    var {
      Browser
    } = getDiagram();
    return Browser.TouchUI;
  }
  _show(x, y, side, category, callback) {
    this._popoverInstance.hide();
    this._$popoverTargetElement.css({
      left: x + this._popoverPositionData[side].offset.x,
      top: y + this._popoverPositionData[side].offset.y
    }).show();

    // correct offset when parent has position absolute, relative, etc (T1010677)
    var window = getWindow();
    var targetDiv = this._$popoverTargetElement.get(0);
    this._$popoverTargetElement.css({
      left: targetDiv.offsetLeft - (targetDiv.getBoundingClientRect().left + window.scrollX - targetDiv.offsetLeft),
      top: targetDiv.offsetTop - (targetDiv.getBoundingClientRect().top + window.scrollY - targetDiv.offsetTop)
    });
    var posRect = targetDiv.getBoundingClientRect();
    this._popoverInstance.option({
      maxHeight: this._popoverPositionData[side].calcMaxHeight(posRect),
      width: this.option('toolboxWidth') !== undefined ? this.option('toolboxWidth') : undefined,
      position: {
        my: this._popoverPositionData[side].my,
        at: this._popoverPositionData[side].at,
        of: this._$popoverTargetElement
      },
      contentTemplate: () => {
        return $('<div>').append($('<div>').addClass(DIAGRAM_CONTEXT_TOOLBOX_CONTENT_CLASS)).dxScrollView({
          width: '100%',
          height: '100%'
        });
      },
      onContentReady: () => {
        var $element = this.$element().find('.' + DIAGRAM_CONTEXT_TOOLBOX_CONTENT_CLASS);
        this._onShownAction({
          category,
          callback,
          $element,
          hide: () => this._popoverInstance.hide()
        });
      }
    });
    this._popoverInstance.show();
  }
  _hide() {
    this._$popoverTargetElement.hide();
    this._popoverInstance.hide();
  }
}
export default DiagramContextToolbox;
