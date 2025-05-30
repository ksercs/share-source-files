/**
* DevExtreme (esm/ui/html_editor/utils/toolbar_helper.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../core/renderer';
import localizationMessage from '../../../localization/message';
import { getTableOperationHandler, hasEmbedContent, unfixTableWidth, getColumnElements, getAutoSizedElements, setLineElementsFormat, getLineElements, getRowElements } from './table_helper';
import { isDefined, isBoolean } from '../../../core/utils/type';
import { each } from '../../../core/utils/iterator';
import Form from '../../form';
import ButtonGroup from '../../button_group';
import ColorBox from '../../color_box';
import ScrollView from '../../scroll_view';
import { getOuterHeight, getWidth, getOuterWidth } from '../../../core/utils/size';
import { ImageUploader } from './image_uploader_helper';
import { getWindow } from '../../../core/utils/window';
import { getQuill } from '../quill_importer';
var MIN_HEIGHT = 400;
var BORDER_STYLES = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
var USER_ACTION = 'user';
var SILENT_ACTION = 'silent';
var DIALOG_COLOR_CAPTION = 'dxHtmlEditor-dialogColorCaption';
var DIALOG_BACKGROUND_CAPTION = 'dxHtmlEditor-dialogBackgroundCaption';
var DIALOG_LINK_CAPTION = 'dxHtmlEditor-dialogLinkCaption';
var DIALOG_TABLE_CAPTION = 'dxHtmlEditor-dialogInsertTableCaption';
var DIALOG_LINK_FIELD_URL = 'dxHtmlEditor-dialogLinkUrlField';
var DIALOG_LINK_FIELD_TEXT = 'dxHtmlEditor-dialogLinkTextField';
var DIALOG_LINK_FIELD_TARGET = 'dxHtmlEditor-dialogLinkTargetField';
var DIALOG_LINK_FIELD_TARGET_CLASS = 'dx-formdialog-field-target';
var DIALOG_TABLE_FIELD_COLUMNS = 'dxHtmlEditor-dialogInsertTableRowsField';
var DIALOG_TABLE_FIELD_ROWS = 'dxHtmlEditor-dialogInsertTableColumnsField';
var ICON_MAP = {
  insertHeaderRow: 'header',
  clear: 'clearformat'
};
function getFormatHandlers(module) {
  return {
    clear: _ref => {
      var {
        event
      } = _ref;
      var range = module.quill.getSelection();
      if (range) {
        var _getToolbarModule;
        module.saveValueChangeEvent(event);
        module.quill.removeFormat(range);
        (_getToolbarModule = getToolbarModule(module)) === null || _getToolbarModule === void 0 ? void 0 : _getToolbarModule.updateFormatWidgets();
      }
    },
    link: prepareLinkHandler(module),
    image: prepareImageHandler(module, module.editorInstance.option('imageUpload')),
    color: prepareColorClickHandler(module, 'color'),
    background: prepareColorClickHandler(module, 'background'),
    orderedList: prepareShortcutHandler(module, 'list', 'ordered'),
    bulletList: prepareShortcutHandler(module, 'list', 'bullet'),
    alignLeft: prepareShortcutHandler(module, 'align', 'left'),
    alignCenter: prepareShortcutHandler(module, 'align', 'center'),
    alignRight: prepareShortcutHandler(module, 'align', 'right'),
    alignJustify: prepareShortcutHandler(module, 'align', 'justify'),
    codeBlock: getDefaultClickHandler(module, 'code-block'),
    undo: _ref2 => {
      var {
        event
      } = _ref2;
      module.saveValueChangeEvent(event);
      module.quill.history.undo();
    },
    redo: _ref3 => {
      var {
        event
      } = _ref3;
      module.saveValueChangeEvent(event);
      module.quill.history.redo();
    },
    increaseIndent: _ref4 => {
      var {
        event
      } = _ref4;
      applyFormat(module, ['indent', '+1', USER_ACTION], event);
    },
    decreaseIndent: _ref5 => {
      var {
        event
      } = _ref5;
      applyFormat(module, ['indent', '-1', USER_ACTION], event);
    },
    superscript: prepareShortcutHandler(module, 'script', 'super'),
    subscript: prepareShortcutHandler(module, 'script', 'sub'),
    insertTable: prepareInsertTableHandler(module),
    insertHeaderRow: getTableOperationHandler(module.quill, 'insertHeaderRow'),
    insertRowAbove: getTableOperationHandler(module.quill, 'insertRowAbove'),
    insertRowBelow: getTableOperationHandler(module.quill, 'insertRowBelow'),
    insertColumnLeft: getTableOperationHandler(module.quill, 'insertColumnLeft'),
    insertColumnRight: getTableOperationHandler(module.quill, 'insertColumnRight'),
    deleteColumn: getTableOperationHandler(module.quill, 'deleteColumn'),
    deleteRow: getTableOperationHandler(module.quill, 'deleteRow'),
    deleteTable: getTableOperationHandler(module.quill, 'deleteTable'),
    cellProperties: prepareShowFormProperties(module, 'cell'),
    tableProperties: prepareShowFormProperties(module, 'table')
  };
}
function resetFormDialogOptions(editorInstance, _ref6) {
  var {
    contentTemplate,
    title,
    minHeight,
    minWidth,
    maxWidth
  } = _ref6;
  editorInstance.formDialogOption({
    contentTemplate,
    title,
    minHeight: minHeight !== null && minHeight !== void 0 ? minHeight : 0,
    minWidth: minWidth !== null && minWidth !== void 0 ? minWidth : 0,
    maxWidth: maxWidth !== null && maxWidth !== void 0 ? maxWidth : 'none'
  });
}
function prepareShowFormProperties(module, type) {
  return $element => {
    var _$element, _module$quill$getModu;
    if (!((_$element = $element) !== null && _$element !== void 0 && _$element.length)) {
      $element = $(getTargetTableNode(module, type));
    }
    var [tableBlot, rowBlot] = (_module$quill$getModu = module.quill.getModule('table').getTable()) !== null && _module$quill$getModu !== void 0 ? _module$quill$getModu : [];
    var formats = module.quill.getFormat(module.editorInstance.getSelection(true));
    var tablePropertiesFormConfig = getFormConfigConstructor(type)(module, {
      $element,
      formats,
      tableBlot,
      rowBlot
    });
    var {
      contentTemplate,
      title,
      minHeight,
      minWidth,
      maxWidth
    } = module.editorInstance._formDialog._popup.option();
    var savedOptions = {
      contentTemplate,
      title,
      minHeight,
      minWidth,
      maxWidth
    };
    var formInstance;
    module.editorInstance.formDialogOption({
      'contentTemplate': container => {
        var $content = $('<div>').appendTo(container);
        var $form = $('<div>').appendTo($content);
        module.editorInstance._createComponent($form, Form, tablePropertiesFormConfig.formOptions);
        module.editorInstance._createComponent($content, ScrollView, {});
        formInstance = $form.dxForm('instance');
        return $content;
      },
      title: localizationMessage.format("dxHtmlEditor-".concat(type, "Properties")),
      minHeight: MIN_HEIGHT,
      minWidth: Math.min(800, getWidth(getWindow()) * 0.9 - 1),
      maxWidth: getWidth(getWindow()) * 0.9
    });
    var promise = module.editorInstance.showFormDialog();
    promise.done((formData, event) => {
      module.saveValueChangeEvent(event);
      tablePropertiesFormConfig.applyHandler(formInstance);
      resetFormDialogOptions(module.editorInstance, savedOptions);
    });
    promise.fail(() => {
      module.quill.focus();
      resetFormDialogOptions(module.editorInstance, savedOptions);
    });
  };
}
function applyFormat(module, formatArgs, event) {
  module.saveValueChangeEvent(event);
  module.quill.format(...formatArgs);
}
function getTargetTableNode(module, partName) {
  var currentSelectionParts = module.quill.getModule('table').getTable();
  return partName === 'table' ? currentSelectionParts[0].domNode : currentSelectionParts[2].domNode;
}
function getLinkRange(module, range) {
  var Quill = getQuill();
  var LinkBlot = Quill.import('formats/link');
  var link;
  var linkOffset;
  [link, linkOffset] = module.quill.scroll.descendant(LinkBlot, range.index);
  if (!link && range.length === 0) {
    // NOTE:
    // See T1157840
    // When a mouse pointer is placed on the link's right border, the quill.scroll.descendant method does not return information about the link.
    // In this case, we receive a necessary information from the previous index.
    [link, linkOffset] = module.quill.scroll.descendant(LinkBlot, range.index - 1);
    if (link) {
      linkOffset += 1;
    }
  }
  var result = !link ? null : {
    index: range.index - linkOffset,
    length: link.length()
  };
  return result;
}
function getColorFromFormat(value) {
  return Array.isArray(value) ? value[0] : value;
}
function prepareLinkHandler(module) {
  return () => {
    var _selection;
    module.quill.focus();
    var selection = module.quill.getSelection();
    var formats = selection ? module.quill.getFormat() : {};
    var isCursorAtLink = formats.link !== undefined && ((_selection = selection) === null || _selection === void 0 ? void 0 : _selection.length) === 0;
    var href = formats.link || '';
    if (isCursorAtLink) {
      var linkRange = getLinkRange(module, selection);
      if (linkRange) {
        selection = linkRange;
      } else {
        href = '';
      }
    }
    var selectionHasEmbedContent = hasEmbedContent(module, selection);
    var formData = {
      href,
      text: selection && !selectionHasEmbedContent ? module.quill.getText(selection) : '',
      target: Object.prototype.hasOwnProperty.call(formats, 'target') ? !!formats.target : true
    };
    module.editorInstance.formDialogOption('title', localizationMessage.format(DIALOG_LINK_CAPTION));
    var promise = module.editorInstance.showFormDialog({
      formData: formData,
      items: getLinkFormItems(selectionHasEmbedContent)
    });
    promise.done((formData, event) => {
      if (selection && !selectionHasEmbedContent) {
        var text = formData.text || formData.href;
        var {
          index,
          length
        } = selection;
        formData.text = undefined;
        module.saveValueChangeEvent(event);
        length && module.quill.deleteText(index, length, SILENT_ACTION);
        module.quill.insertText(index, text, 'link', formData, USER_ACTION);
        module.quill.setSelection(index + text.length, 0, USER_ACTION);
      } else {
        formData.text = !selection && !formData.text ? formData.href : formData.text;
        applyFormat(module, ['link', formData, USER_ACTION], event);
      }
    });
    promise.fail(() => {
      module.quill.focus();
    });
  };
}
function prepareImageHandler(module, imageUploadOption) {
  var imageUploader = new ImageUploader(module, imageUploadOption);
  return () => {
    imageUploader.render();
  };
}
function getLinkFormItems(selectionHasEmbedContent) {
  return [{
    dataField: 'href',
    label: {
      text: localizationMessage.format(DIALOG_LINK_FIELD_URL)
    }
  }, {
    dataField: 'text',
    label: {
      text: localizationMessage.format(DIALOG_LINK_FIELD_TEXT)
    },
    visible: !selectionHasEmbedContent
  }, {
    dataField: 'target',
    editorType: 'dxCheckBox',
    editorOptions: {
      text: localizationMessage.format(DIALOG_LINK_FIELD_TARGET)
    },
    cssClass: DIALOG_LINK_FIELD_TARGET_CLASS,
    label: {
      visible: false
    }
  }];
}
function prepareColorClickHandler(module, name) {
  return () => {
    var formData = module.quill.getFormat();
    var caption = name === 'color' ? DIALOG_COLOR_CAPTION : DIALOG_BACKGROUND_CAPTION;
    module.editorInstance.formDialogOption('title', localizationMessage.format(caption));
    var promise = module.editorInstance.showFormDialog({
      formData: formData,
      items: [{
        dataField: name,
        editorType: 'dxColorView',
        editorOptions: {
          focusStateEnabled: false
        },
        label: {
          visible: false
        }
      }]
    });
    promise.done((formData, event) => {
      applyFormat(module, [name, formData[name], USER_ACTION], event);
    });
    promise.fail(() => {
      module.quill.focus();
    });
  };
}
function prepareShortcutHandler(module, name, shortcutValue) {
  return _ref7 => {
    var _getToolbarModule2;
    var {
      event
    } = _ref7;
    var formats = module.quill.getFormat();
    var value = formats[name] === shortcutValue ? false : shortcutValue;
    applyFormat(module, [name, value, USER_ACTION], event);
    (_getToolbarModule2 = getToolbarModule(module)) === null || _getToolbarModule2 === void 0 ? void 0 : _getToolbarModule2.updateFormatWidgets(true);
  };
}
function getToolbarModule(module) {
  return module._updateFormatWidget ? module : module.quill.getModule('toolbar');
}
function getDefaultClickHandler(module, name) {
  return _ref8 => {
    var _getToolbarModule3;
    var {
      event
    } = _ref8;
    var formats = module.quill.getFormat();
    var value = formats[name];
    var newValue = !(isBoolean(value) ? value : isDefined(value));
    applyFormat(module, [name, newValue, USER_ACTION], event);
    (_getToolbarModule3 = getToolbarModule(module)) === null || _getToolbarModule3 === void 0 ? void 0 : _getToolbarModule3._updateFormatWidget(name, newValue, formats);
  };
}
function insertTableFormItems() {
  return [{
    dataField: 'columns',
    editorType: 'dxNumberBox',
    editorOptions: {
      min: 1
    },
    label: {
      text: localizationMessage.format(DIALOG_TABLE_FIELD_COLUMNS)
    }
  }, {
    dataField: 'rows',
    editorType: 'dxNumberBox',
    editorOptions: {
      min: 1
    },
    label: {
      text: localizationMessage.format(DIALOG_TABLE_FIELD_ROWS)
    }
  }];
}
function prepareInsertTableHandler(module) {
  return () => {
    var formats = module.quill.getFormat();
    var isTableFocused = module._tableFormats.some(format => Object.prototype.hasOwnProperty.call(formats, format));
    var formData = {
      rows: 1,
      columns: 1
    };
    if (isTableFocused) {
      module.quill.focus();
      return;
    }
    module.editorInstance.formDialogOption('title', localizationMessage.format(DIALOG_TABLE_CAPTION));
    var promise = module.editorInstance.showFormDialog({
      formData,
      items: insertTableFormItems()
    });
    promise.done((formData, event) => {
      module.quill.focus();
      var table = module.quill.getModule('table');
      if (table) {
        module.saveValueChangeEvent(event);
        var {
          columns,
          rows
        } = formData;
        table.insertTable(columns, rows);
      }
    }).always(() => {
      module.quill.focus();
    });
  };
}
function getTablePropertiesFormConfig(module, _ref9) {
  var {
    $element,
    formats,
    tableBlot
  } = _ref9;
  var window = getWindow();
  var alignmentEditorInstance;
  var borderColorEditorInstance;
  var backgroundColorEditorInstance;
  var $table = $element;
  var editorInstance = module.editorInstance;
  var startTableWidth = parseInt(formats.tableWidth) || getOuterWidth($table);
  var tableStyles = window.getComputedStyle($table.get(0));
  var startTextAlign = tableStyles.textAlign === 'start' ? 'left' : tableStyles.textAlign;
  var formOptions = {
    colCount: 2,
    formData: {
      width: startTableWidth,
      height: isDefined(formats.tableHeight) ? parseInt(formats.tableHeight) : getOuterHeight($table),
      backgroundColor: formats.tableBackgroundColor || tableStyles.backgroundColor,
      borderStyle: formats.tableBorderStyle || tableStyles.borderTopStyle,
      borderColor: formats.tableBorderColor || tableStyles.borderTopColor,
      borderWidth: parseInt(isDefined(formats.tableBorderWidth) ? formats.tableBorderWidth : tableStyles.borderTopWidth),
      alignment: formats.tableAlign || startTextAlign
    },
    items: [{
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-border'),
      colCountByScreen: {
        xs: 2
      },
      colCount: 2,
      items: [{
        dataField: 'borderStyle',
        label: {
          text: localizationMessage.format('dxHtmlEditor-style')
        },
        editorType: 'dxSelectBox',
        editorOptions: {
          items: BORDER_STYLES,
          placeholder: 'Select style'
        }
      }, {
        dataField: 'borderWidth',
        label: {
          text: localizationMessage.format('dxHtmlEditor-borderWidth')
        },
        editorOptions: {
          placeholder: localizationMessage.format('dxHtmlEditor-pixels')
        }
      }, {
        itemType: 'simple',
        dataField: 'borderColor',
        label: {
          text: localizationMessage.format('dxHtmlEditor-borderColor')
        },
        colSpan: 2,
        template: e => {
          var $content = $('<div>');
          editorInstance._createComponent($content, ColorBox, {
            editAlphaChannel: true,
            value: e.component.option('formData').borderColor,
            onInitialized: e => {
              borderColorEditorInstance = e.component;
            }
          });
          return $content;
        }
      }]
    }, {
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-dimensions'),
      colCountByScreen: {
        xs: 2
      },
      colCount: 2,
      items: [{
        dataField: 'width',
        label: {
          text: localizationMessage.format('dxHtmlEditor-width')
        },
        editorOptions: {
          min: 0,
          placeholder: localizationMessage.format('dxHtmlEditor-pixels')
        }
      }, {
        dataField: 'height',
        label: {
          text: localizationMessage.format('dxHtmlEditor-height')
        },
        editorOptions: {
          min: 0,
          placeholder: localizationMessage.format('dxHtmlEditor-pixels')
        }
      }]
    }, {
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-tableBackground'),
      items: [{
        itemType: 'simple',
        dataField: 'backgroundColor',
        label: {
          text: localizationMessage.format('dxHtmlEditor-borderColor')
        },
        template: e => {
          var $content = $('<div>');
          editorInstance._createComponent($content, ColorBox, {
            editAlphaChannel: true,
            value: e.component.option('formData').backgroundColor,
            onInitialized: e => {
              backgroundColorEditorInstance = e.component;
            }
          });
          return $content;
        }
      }]
    }, {
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-alignment'),
      items: [{
        itemType: 'simple',
        label: {
          text: localizationMessage.format('dxHtmlEditor-horizontal')
        },
        template: () => {
          var $content = $('<div>');
          editorInstance._createComponent($content, ButtonGroup, {
            items: [{
              value: 'left',
              icon: 'alignleft'
            }, {
              value: 'center',
              icon: 'aligncenter'
            }, {
              value: 'right',
              icon: 'alignright'
            }, {
              value: 'justify',
              icon: 'alignjustify'
            }],
            keyExpr: 'value',
            selectedItemKeys: [startTextAlign],
            onInitialized: e => {
              alignmentEditorInstance = e.component;
            }
          });
          return $content;
        }
      }]
    }],
    showColonAfterLabel: true,
    labelLocation: 'top',
    minColWidth: 400
  };
  var applyHandler = formInstance => {
    var formData = formInstance.option('formData');
    var newWidth = formData.width === startTableWidth ? undefined : formData.width;
    var newHeight = formData.height;
    applyTableDimensionChanges(module, {
      $table,
      newHeight,
      newWidth,
      tableBlot
    });
    module.editorInstance.format('tableBorderStyle', formData.borderStyle);
    module.editorInstance.format('tableBorderWidth', formData.borderWidth + 'px');
    module.editorInstance.format('tableBorderColor', borderColorEditorInstance.option('value'));
    module.editorInstance.format('tableBackgroundColor', backgroundColorEditorInstance.option('value'));
    module.editorInstance.format('tableTextAlign', alignmentEditorInstance.option('selectedItemKeys')[0]);
  };
  return {
    formOptions,
    applyHandler
  };
}
function getCellPropertiesFormConfig(module, _ref10) {
  var {
    $element,
    formats,
    tableBlot,
    rowBlot
  } = _ref10;
  var window = getWindow();
  var alignmentEditorInstance;
  var verticalAlignmentEditorInstance;
  var borderColorEditorInstance;
  var backgroundColorEditorInstance;
  var $cell = $element;
  var startCellWidth = isDefined(formats.cellWidth) ? parseInt(formats.cellWidth) : getOuterWidth($cell);
  var editorInstance = module.editorInstance;
  var cellStyles = window.getComputedStyle($cell.get(0));
  var startTextAlign = cellStyles.textAlign === 'start' ? 'left' : cellStyles.textAlign;
  var formOptions = {
    colCount: 2,
    formData: {
      width: startCellWidth,
      height: isDefined(formats.cellHeight) ? parseInt(formats.cellHeight) : getOuterHeight($cell),
      backgroundColor: getColorFromFormat(formats.cellBackgroundColor) || cellStyles.backgroundColor,
      borderStyle: formats.cellBorderStyle || cellStyles.borderTopStyle,
      borderColor: getColorFromFormat(formats.cellBorderColor) || cellStyles.borderTopColor,
      borderWidth: parseInt(isDefined(formats.cellBorderWidth) ? formats.cellBorderWidth : cellStyles.borderTopWidth),
      alignment: formats.cellTextAlign || startTextAlign,
      verticalAlignment: formats.cellVerticalAlign || cellStyles.verticalAlign,
      verticalPadding: parseInt(isDefined(formats.cellPaddingTop) ? formats.cellPaddingTop : cellStyles.paddingTop),
      horizontalPadding: parseInt(isDefined(formats.cellPaddingLeft) ? formats.cellPaddingLeft : cellStyles.paddingLeft)
    },
    items: [{
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-border'),
      colCountByScreen: {
        xs: 2
      },
      colCount: 2,
      items: [{
        dataField: 'borderStyle',
        label: {
          text: localizationMessage.format('dxHtmlEditor-style')
        },
        editorType: 'dxSelectBox',
        editorOptions: {
          items: BORDER_STYLES
        }
      }, {
        dataField: 'borderWidth',
        label: {
          text: localizationMessage.format('dxHtmlEditor-borderWidth')
        },
        editorOptions: {
          placeholder: localizationMessage.format('dxHtmlEditor-pixels')
        }
      }, {
        itemType: 'simple',
        dataField: 'borderColor',
        colSpan: 2,
        label: {
          text: localizationMessage.format('dxHtmlEditor-borderColor')
        },
        template: e => {
          var $content = $('<div>');
          editorInstance._createComponent($content, ColorBox, {
            editAlphaChannel: true,
            value: e.component.option('formData').borderColor,
            onInitialized: e => {
              borderColorEditorInstance = e.component;
            }
          });
          return $content;
        }
      }]
    }, {
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-dimensions'),
      colCount: 2,
      colCountByScreen: {
        xs: 2
      },
      items: [{
        dataField: 'width',
        label: {
          text: localizationMessage.format('dxHtmlEditor-width')
        },
        editorOptions: {
          min: 0,
          placeholder: localizationMessage.format('dxHtmlEditor-pixels')
        }
      }, {
        dataField: 'height',
        label: {
          text: localizationMessage.format('dxHtmlEditor-height')
        },
        editorOptions: {
          min: 0,
          placeholder: localizationMessage.format('dxHtmlEditor-pixels')
        }
      }, {
        dataField: 'verticalPadding',
        label: {
          text: localizationMessage.format('dxHtmlEditor-paddingVertical')
        },
        editorOptions: {
          placeholder: localizationMessage.format('dxHtmlEditor-pixels')
        }
      }, {
        label: {
          text: localizationMessage.format('dxHtmlEditor-paddingHorizontal')
        },
        dataField: 'horizontalPadding',
        editorOptions: {
          placeholder: localizationMessage.format('dxHtmlEditor-pixels')
        }
      }]
    }, {
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-tableBackground'),
      items: [{
        itemType: 'simple',
        dataField: 'backgroundColor',
        label: {
          text: localizationMessage.format('dxHtmlEditor-borderColor')
        },
        template: e => {
          var $content = $('<div>');
          editorInstance._createComponent($content, ColorBox, {
            editAlphaChannel: true,
            value: e.component.option('formData').backgroundColor,
            onInitialized: e => {
              backgroundColorEditorInstance = e.component;
            }
          });
          return $content;
        }
      }]
    }, {
      itemType: 'group',
      caption: localizationMessage.format('dxHtmlEditor-alignment'),
      colCount: 2,
      items: [{
        itemType: 'simple',
        label: {
          text: localizationMessage.format('dxHtmlEditor-horizontal')
        },
        template: () => {
          var $content = $('<div>');
          editorInstance._createComponent($content, ButtonGroup, {
            items: [{
              value: 'left',
              icon: 'alignleft'
            }, {
              value: 'center',
              icon: 'aligncenter'
            }, {
              value: 'right',
              icon: 'alignright'
            }, {
              value: 'justify',
              icon: 'alignjustify'
            }],
            keyExpr: 'value',
            selectedItemKeys: [startTextAlign],
            onInitialized: e => {
              alignmentEditorInstance = e.component;
            }
          });
          return $content;
        }
      }, {
        itemType: 'simple',
        label: {
          text: localizationMessage.format('dxHtmlEditor-vertical')
        },
        template: () => {
          var $content = $('<div>');
          editorInstance._createComponent($content, ButtonGroup, {
            items: [{
              value: 'top',
              icon: 'verticalaligntop'
            }, {
              value: 'middle',
              icon: 'verticalaligncenter'
            }, {
              value: 'bottom',
              icon: 'verticalalignbottom'
            }],
            keyExpr: 'value',
            selectedItemKeys: [cellStyles.verticalAlign],
            onInitialized: e => {
              verticalAlignmentEditorInstance = e.component;
            }
          });
          return $content;
        }
      }]
    }],
    showColonAfterLabel: true,
    labelLocation: 'top',
    minColWidth: 400
  };
  var applyHandler = formInstance => {
    var formData = formInstance.option('formData');
    var newWidth = formData.width === parseInt(startCellWidth) ? undefined : formData.width;
    var newHeight = formData.height;
    applyCellDimensionChanges(module, {
      $cell,
      newHeight,
      newWidth,
      tableBlot,
      rowBlot
    });
    module.editorInstance.format('cellBorderWidth', formData.borderWidth + 'px');
    module.editorInstance.format('cellBorderColor', borderColorEditorInstance.option('value'));
    module.editorInstance.format('cellBorderStyle', formData.borderStyle);
    module.editorInstance.format('cellBackgroundColor', backgroundColorEditorInstance.option('value'));
    module.editorInstance.format('cellTextAlign', alignmentEditorInstance.option('selectedItemKeys')[0]);
    module.editorInstance.format('cellVerticalAlign', verticalAlignmentEditorInstance.option('selectedItemKeys')[0]);
    module.editorInstance.format('cellPaddingLeft', formData.horizontalPadding + 'px');
    module.editorInstance.format('cellPaddingRight', formData.horizontalPadding + 'px');
    module.editorInstance.format('cellPaddingTop', formData.verticalPadding + 'px');
    module.editorInstance.format('cellPaddingBottom', formData.verticalPadding + 'px');
  };
  return {
    formOptions,
    applyHandler
  };
}
function getFormConfigConstructor(type) {
  return type === 'cell' ? getCellPropertiesFormConfig : getTablePropertiesFormConfig;
}
function applyTableDimensionChanges(module, _ref11) {
  var {
    $table,
    newHeight,
    newWidth,
    tableBlot
  } = _ref11;
  if (isDefined(newWidth)) {
    var autoWidthColumns = getAutoSizedElements($table);
    if (autoWidthColumns.length > 0) {
      module.editorInstance.format('tableWidth', newWidth + 'px');
    } else {
      var $columns = getColumnElements($table);
      var oldTableWidth = getOuterWidth($table);
      unfixTableWidth($table, {
        tableBlot
      });
      each($columns, (i, element) => {
        var $element = $(element);
        var newElementWidth = newWidth / oldTableWidth * getOuterWidth($element);
        var $lineElements = getLineElements($table, $element.index(), 'horizontal');
        setLineElementsFormat(module, {
          elements: $lineElements,
          property: 'width',
          value: newElementWidth
        });
      });
    }
  }
  var autoHeightRows = getAutoSizedElements($table, 'vertical');
  if ((autoHeightRows === null || autoHeightRows === void 0 ? void 0 : autoHeightRows.length) > 0) {
    tableBlot.format('tableHeight', newHeight + 'px');
  } else {
    var $rows = getRowElements($table);
    var oldTableHeight = getOuterHeight($table);
    each($rows, (i, element) => {
      var $element = $(element);
      var newElementHeight = newHeight / oldTableHeight * getOuterHeight($element);
      var $lineElements = getLineElements($table, i, 'vertical');
      setLineElementsFormat(module, {
        elements: $lineElements,
        property: 'height',
        value: newElementHeight
      });
    });
  }
}
function applyCellDimensionChanges(module, _ref12) {
  var {
    $cell,
    newHeight,
    newWidth,
    tableBlot,
    rowBlot
  } = _ref12;
  var $table = $($cell.closest('table'));
  if (isDefined(newWidth)) {
    var index = $($cell).index();
    var $verticalCells = getLineElements($table, index);
    var widthDiff = newWidth - getOuterWidth($cell);
    var tableWidth = getOuterWidth($table);
    if (newWidth > tableWidth) {
      unfixTableWidth($table, {
        tableBlot
      });
    }
    setLineElementsFormat(module, {
      elements: $verticalCells,
      property: 'width',
      value: newWidth
    });
    var $nextColumnCell = $cell.next();
    var shouldUpdateNearestColumnWidth = getAutoSizedElements($table).length === 0;
    if (shouldUpdateNearestColumnWidth) {
      unfixTableWidth($table, {
        tableBlot
      });
      if ($nextColumnCell.length === 1) {
        $verticalCells = getLineElements($table, index + 1);
        var nextColumnWidth = getOuterWidth($verticalCells.eq(0)) - widthDiff;
        setLineElementsFormat(module, {
          elements: $verticalCells,
          property: 'width',
          value: Math.max(nextColumnWidth, 0)
        });
      } else {
        var $prevColumnCell = $cell.prev();
        if ($prevColumnCell.length === 1) {
          $verticalCells = getLineElements($table, index - 1);
          var prevColumnWidth = getOuterWidth($verticalCells.eq(0)) - widthDiff;
          setLineElementsFormat(module, {
            elements: $verticalCells,
            property: 'width',
            value: Math.max(prevColumnWidth, 0)
          });
        }
      }
    }
  }
  rowBlot.children.forEach(rowCell => {
    rowCell.format('cellHeight', newHeight + 'px');
  });
  var autoHeightRows = getAutoSizedElements($table, 'vertical');
  if (autoHeightRows.length === 0) {
    $table.css('height', 'auto');
  }
}
export { getFormatHandlers, getDefaultClickHandler, ICON_MAP, applyFormat };
