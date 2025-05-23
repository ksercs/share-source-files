/**
* DevExtreme (esm/ui/text_box/ui.text_editor.clear.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import eventsEngine from '../../events/core/events_engine';
import TextEditorButton from './texteditor_button_collection/button';
import { addNamespace } from '../../events/utils/index';
import pointer from '../../events/pointer';
import { name as click } from '../../events/click';
var pointerDown = pointer.down;
var STATE_INVISIBLE_CLASS = 'dx-state-invisible';
var TEXTEDITOR_CLEAR_BUTTON_CLASS = 'dx-clear-button-area';
var TEXTEDITOR_CLEAR_ICON_CLASS = 'dx-icon-clear';
var TEXTEDITOR_ICON_CLASS = 'dx-icon';
var TEXTEDITOR_SHOW_CLEAR_BUTTON_CLASS = 'dx-show-clear-button';
export default class ClearButton extends TextEditorButton {
  _create() {
    var $element = $('<span>').addClass(TEXTEDITOR_CLEAR_BUTTON_CLASS).append($('<span>').addClass(TEXTEDITOR_ICON_CLASS).addClass(TEXTEDITOR_CLEAR_ICON_CLASS));
    this._addToContainer($element);
    this.update(true);
    return {
      instance: $element,
      $element
    };
  }
  _isVisible() {
    var {
      editor
    } = this;
    return editor._isClearButtonVisible();
  }
  _attachEvents(instance, $button) {
    var {
      editor
    } = this;
    var editorName = editor.NAME;
    eventsEngine.on($button, addNamespace(pointerDown, editorName), e => {
      e.preventDefault();
      if (e.pointerType !== 'mouse') {
        editor._clearValueHandler(e);
      }
    });
    eventsEngine.on($button, addNamespace(click, editorName), e => editor._clearValueHandler(e));
  }

  // TODO: get rid of it
  _legacyRender($editor, isVisible) {
    $editor.toggleClass(TEXTEDITOR_SHOW_CLEAR_BUTTON_CLASS, isVisible);
  }
  update() {
    var rendered = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    !rendered && super.update();
    var {
      editor,
      instance
    } = this;
    var $editor = editor.$element();
    var isVisible = this._isVisible();
    instance && instance.toggleClass(STATE_INVISIBLE_CLASS, !isVisible);
    this._legacyRender($editor, isVisible);
  }
}
