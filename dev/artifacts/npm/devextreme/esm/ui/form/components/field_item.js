/**
* DevExtreme (esm/ui/form/components/field_item.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import eventsEngine from '../../../events/core/events_engine';
import { name as clickEventName } from '../../../events/click';
import { getPublicElement } from '../../../core/element';
import { captionize } from '../../../core/utils/inflector';
import { format } from '../../../core/utils/string';
import { isMaterial } from '../../themes';
import errors from '../../widget/ui.errors';
import Validator from '../../validator';
import { FIELD_ITEM_CONTENT_CLASS } from '../constants';
export var FLEX_LAYOUT_CLASS = 'dx-flex-layout';
export var FIELD_ITEM_OPTIONAL_CLASS = 'dx-field-item-optional';
export var FIELD_ITEM_REQUIRED_CLASS = 'dx-field-item-required';
export var FIELD_ITEM_CONTENT_WRAPPER_CLASS = 'dx-field-item-content-wrapper';
export var FIELD_ITEM_CONTENT_LOCATION_CLASS = 'dx-field-item-content-location-';
export var FIELD_ITEM_LABEL_ALIGN_CLASS = 'dx-field-item-label-align';
export var FIELD_ITEM_HELP_TEXT_CLASS = 'dx-field-item-help-text';
export var LABEL_VERTICAL_ALIGNMENT_CLASS = 'dx-label-v-align';
export var LABEL_HORIZONTAL_ALIGNMENT_CLASS = 'dx-label-h-align';
export var TOGGLE_CONTROLS_PADDING_CLASS = 'dx-toggle-controls-paddings';
import { renderLabel } from './label';
var TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
var VALIDATION_TARGET_CLASS = 'dx-validation-target';
var INVALID_CLASS = 'dx-invalid';
export function renderFieldItem(_ref) {
  var {
    $parent,
    rootElementCssClassList,
    formOrLayoutManager,
    createComponentCallback,
    labelOptions,
    // TODO: move to 'item' ?
    labelNeedBaselineAlign,
    labelLocation,
    needRenderLabel,
    // TODO: move to 'labelOptions' ?
    formLabelLocation,
    // TODO: use 'labelOptions.location' insted ?

    item,
    // TODO: pass simple values instead of complex object
    editorOptions,
    isSimpleItem,
    isRequired,
    template,
    helpID,
    labelID,
    name,
    helpText,
    // TODO: move to 'item' ?

    requiredMessageTemplate,
    validationGroup
  } = _ref;
  var $rootElement = $('<div>').addClass(rootElementCssClassList.join(' ')).appendTo($parent);
  $rootElement.addClass(isRequired ? FIELD_ITEM_REQUIRED_CLASS : FIELD_ITEM_OPTIONAL_CLASS);
  if (isSimpleItem) {
    $rootElement.addClass(FLEX_LAYOUT_CLASS);
  }
  if (isSimpleItem && labelNeedBaselineAlign) {
    // TODO: label related code, execute ony if needRenderLabel ?
    $rootElement.addClass(FIELD_ITEM_LABEL_ALIGN_CLASS);
  }

  //
  // Setup field editor container:
  //

  var $fieldEditorContainer = $('<div>');
  $fieldEditorContainer.data('dx-form-item', item);
  var locationClassSuffix = {
    right: 'left',
    left: 'right',
    top: 'bottom'
  };
  $fieldEditorContainer.addClass(FIELD_ITEM_CONTENT_CLASS).addClass(FIELD_ITEM_CONTENT_LOCATION_CLASS + locationClassSuffix[formLabelLocation]);

  //
  // Setup $label:
  //

  var $label = null;
  if (needRenderLabel) {
    if (labelOptions.labelTemplate) {
      labelOptions.labelTemplateData = getTemplateData(item, editorOptions, formOrLayoutManager);
    }
    $label = renderLabel(labelOptions);
  }
  if ($label) {
    var {
      editorType
    } = item;
    $rootElement.append($label);
    if (labelLocation === 'top' || labelLocation === 'left') {
      $rootElement.append($fieldEditorContainer);
    }
    if (labelLocation === 'right') {
      $rootElement.prepend($fieldEditorContainer);
    }
    if (labelLocation === 'top') {
      $rootElement.addClass(LABEL_VERTICAL_ALIGNMENT_CLASS);
    } else {
      $rootElement.addClass(LABEL_HORIZONTAL_ALIGNMENT_CLASS);
    }
    if (editorType === 'dxCheckBox' || editorType === 'dxSwitch') {
      eventsEngine.on($label, clickEventName, function () {
        eventsEngine.trigger($fieldEditorContainer.children(), clickEventName);
      });
    }
    var toggleControls = ['dxCheckBox', 'dxSwitch', 'dxRadioGroup'];
    var isToggleControls = toggleControls.includes(editorType);
    var labelAlignment = labelOptions.alignment;
    var isLabelAlignmentLeft = labelAlignment === 'left' || !labelAlignment;
    var hasNotTemplate = !template;
    var isLabelOnTop = labelLocation === 'top';
    if (hasNotTemplate && isToggleControls && isLabelOnTop && isLabelAlignmentLeft) {
      $fieldEditorContainer.addClass(TOGGLE_CONTROLS_PADDING_CLASS);
    }
  } else {
    $rootElement.append($fieldEditorContainer);
  }

  //
  // Append field editor:
  //

  var widgetInstance;
  if (template) {
    template.render({
      container: getPublicElement($fieldEditorContainer),
      model: getTemplateData(item, editorOptions, formOrLayoutManager),
      onRendered() {
        var $validationTarget = getValidationTarget($fieldEditorContainer);
        var validationTargetInstance = tryGetValidationTargetInstance($validationTarget);
        subscribeWrapperInvalidClassToggle(validationTargetInstance);
      }
    });
  } else {
    var $div = $('<div>').appendTo($fieldEditorContainer);
    try {
      widgetInstance = createComponentCallback($div, item.editorType, editorOptions);
      widgetInstance.setAria('describedby', helpID);
      if (labelID) widgetInstance.setAria('labelledby', labelID);
      widgetInstance.setAria('required', isRequired);
    } catch (e) {
      errors.log('E1035', e.message);
    }
  }

  //
  // Setup $validation:
  //

  var $validationTarget = getValidationTarget($fieldEditorContainer);
  var validationTargetInstance = $validationTarget && $validationTarget.data(VALIDATION_TARGET_CLASS);
  if (validationTargetInstance) {
    var isItemHaveCustomLabel = item.label && item.label.text;
    var itemName = isItemHaveCustomLabel ? null : name;
    var fieldName = isItemHaveCustomLabel ? item.label.text : itemName && captionize(itemName);
    var validationRules;
    if (isSimpleItem) {
      if (item.validationRules) {
        validationRules = item.validationRules;
      } else {
        var requiredMessage = format(requiredMessageTemplate, fieldName || '');
        validationRules = item.isRequired ? [{
          type: 'required',
          message: requiredMessage
        }] : null;
      }
    }
    if (Array.isArray(validationRules) && validationRules.length) {
      createComponentCallback($validationTarget, Validator, {
        validationRules: validationRules,
        validationGroup: validationGroup,
        dataGetter: function dataGetter() {
          return {
            formItem: item
          };
        }
      });
    }
    subscribeWrapperInvalidClassToggle(validationTargetInstance);
  }

  //
  // Append help text elements:
  //

  if (helpText && isSimpleItem) {
    var $editorParent = $fieldEditorContainer.parent();

    // TODO: DOM hierarchy is changed here: new node is added between $editor and $editor.parent()
    $editorParent.append($('<div>').addClass(FIELD_ITEM_CONTENT_WRAPPER_CLASS).append($fieldEditorContainer).append($('<div>').addClass(FIELD_ITEM_HELP_TEXT_CLASS).attr('id', helpID).text(helpText)));
  }
  return {
    $fieldEditorContainer,
    $rootElement,
    widgetInstance
  };
}
function getValidationTarget($fieldEditorContainer) {
  var $editor = $fieldEditorContainer.children().first();
  return $editor.hasClass(TEMPLATE_WRAPPER_CLASS) ? $editor.children().first() : $editor;
}
function tryGetValidationTargetInstance($validationTarget) {
  var _$validationTarget$pa, _$validationTarget$pa2;
  return ($validationTarget === null || $validationTarget === void 0 ? void 0 : $validationTarget.data(VALIDATION_TARGET_CLASS)) || ($validationTarget === null || $validationTarget === void 0 ? void 0 : (_$validationTarget$pa = $validationTarget.parent) === null || _$validationTarget$pa === void 0 ? void 0 : (_$validationTarget$pa2 = _$validationTarget$pa.call($validationTarget)) === null || _$validationTarget$pa2 === void 0 ? void 0 : _$validationTarget$pa2.data(VALIDATION_TARGET_CLASS));
}
function subscribeWrapperInvalidClassToggle(validationTargetInstance) {
  if (validationTargetInstance && isMaterial()) {
    var wrapperClass = ".".concat(FIELD_ITEM_CONTENT_WRAPPER_CLASS);
    var toggleInvalidClass = _ref2 => {
      var {
        element,
        component
      } = _ref2;
      var {
        isValid,
        validationMessageMode
      } = component.option();
      $(element).parents(wrapperClass).toggleClass(INVALID_CLASS, isValid === false && (component._isFocused() || validationMessageMode === 'always'));
    };
    validationTargetInstance.on('optionChanged', e => {
      if (e.name !== 'isValid') return;
      toggleInvalidClass(e);
    });
    validationTargetInstance.on('focusIn', toggleInvalidClass).on('focusOut', toggleInvalidClass).on('enterKey', toggleInvalidClass);
  }
}
function getTemplateData(item, editorOptions, formOrLayoutManager) {
  return {
    dataField: item.dataField,
    editorType: item.editorType,
    editorOptions,
    component: formOrLayoutManager,
    name: item.name
  };
}
