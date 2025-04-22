/**
* DevExtreme (esm/__internal/ui/text_box/texteditor_button_collection/m_custom.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { name as clickEventName } from '../../../../common/core/events/click';
import eventsEngine from '../../../../common/core/events/core/events_engine';
import { end, start } from '../../../../common/core/events/hover';
import $ from '../../../../core/renderer';
import Button from '../../../../ui/button';
import TextEditorButton from './m_button';
const CUSTOM_BUTTON_HOVERED_CLASS = 'dx-custom-button-hovered';
export default class CustomButton extends TextEditorButton {
  _attachEvents(instance, $element) {
    const {
      editor
    } = this;
    eventsEngine.on($element, start, () => {
      editor.$element().addClass(CUSTOM_BUTTON_HOVERED_CLASS);
    });
    eventsEngine.on($element, end, () => {
      editor.$element().removeClass(CUSTOM_BUTTON_HOVERED_CLASS);
    });
    eventsEngine.on($element, clickEventName, e => {
      e.stopPropagation();
    });
  }
  _create() {
    const {
      editor
    } = this;
    const $element = $('<div>');
    this._addToContainer($element);
    const instance = editor._createComponent($element, Button, _extends({}, this.options, {
      ignoreParentReadOnly: true,
      disabled: this._isDisabled(),
      integrationOptions: this._prepareIntegrationOptions(editor)
    }));
    return {
      $element,
      instance
    };
  }
  // eslint-disable-next-line class-methods-use-this
  _prepareIntegrationOptions(editor) {
    return _extends({}, editor.option('integrationOptions'), {
      skipTemplates: ['content']
    });
  }
  update() {
    const isUpdated = super.update();
    if (this.instance) {
      this.instance.option('disabled', this._isDisabled());
    }
    return isUpdated;
  }
  _isVisible() {
    const {
      visible
    } = this.editor.option();
    return !!visible;
  }
  _isDisabled() {
    const isDefinedByUser = this.options.disabled !== undefined;
    if (isDefinedByUser) {
      if (this.instance) {
        return this.instance.option('disabled');
      }
      return this.options.disabled;
    }
    const {
      readOnly
    } = this.editor.option();
    return readOnly;
  }
}
