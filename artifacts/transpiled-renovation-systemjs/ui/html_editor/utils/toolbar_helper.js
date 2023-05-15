!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/html_editor/utils/toolbar_helper.js"], ["../../../core/renderer","../../../localization/message","./table_helper","../../../core/utils/type","../../../core/utils/iterator","../../form","../../button_group","../../color_box","../../scroll_view","../../../core/utils/size","./image_uploader_helper","../../../core/utils/window","../quill_importer"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/html_editor/utils/toolbar_helper.js", ["../../../core/renderer", "../../../localization/message", "./table_helper", "../../../core/utils/type", "../../../core/utils/iterator", "../../form", "../../button_group", "../../color_box", "../../scroll_view", "../../../core/utils/size", "./image_uploader_helper", "../../../core/utils/window", "../quill_importer"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.ICON_MAP = void 0;
  exports.applyFormat = applyFormat;
  exports.getDefaultClickHandler = getDefaultClickHandler;
  exports.getFormatHandlers = getFormatHandlers;
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _message = _interopRequireDefault($__require("../../../localization/message"));
  var _table_helper = $__require("./table_helper");
  var _type = $__require("../../../core/utils/type");
  var _iterator = $__require("../../../core/utils/iterator");
  var _form = _interopRequireDefault($__require("../../form"));
  var _button_group = _interopRequireDefault($__require("../../button_group"));
  var _color_box = _interopRequireDefault($__require("../../color_box"));
  var _scroll_view = _interopRequireDefault($__require("../../scroll_view"));
  var _size = $__require("../../../core/utils/size");
  var _image_uploader_helper = $__require("./image_uploader_helper");
  var _window = $__require("../../../core/utils/window");
  var _quill_importer = $__require("../quill_importer");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];if (null != _i) {
      var _s,
          _e,
          _x,
          _r,
          _arr = [],
          _n = !0,
          _d = !1;try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;_n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }return _arr;
    }
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
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
  exports.ICON_MAP = ICON_MAP;
  function getFormatHandlers(module) {
    return {
      clear: function clear(_ref) {
        var event = _ref.event;
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
      undo: function undo(_ref2) {
        var event = _ref2.event;
        module.saveValueChangeEvent(event);
        module.quill.history.undo();
      },
      redo: function redo(_ref3) {
        var event = _ref3.event;
        module.saveValueChangeEvent(event);
        module.quill.history.redo();
      },
      increaseIndent: function increaseIndent(_ref4) {
        var event = _ref4.event;
        applyFormat(module, ['indent', '+1', USER_ACTION], event);
      },
      decreaseIndent: function decreaseIndent(_ref5) {
        var event = _ref5.event;
        applyFormat(module, ['indent', '-1', USER_ACTION], event);
      },
      superscript: prepareShortcutHandler(module, 'script', 'super'),
      subscript: prepareShortcutHandler(module, 'script', 'sub'),
      insertTable: prepareInsertTableHandler(module),
      insertHeaderRow: (0, _table_helper.getTableOperationHandler)(module.quill, 'insertHeaderRow'),
      insertRowAbove: (0, _table_helper.getTableOperationHandler)(module.quill, 'insertRowAbove'),
      insertRowBelow: (0, _table_helper.getTableOperationHandler)(module.quill, 'insertRowBelow'),
      insertColumnLeft: (0, _table_helper.getTableOperationHandler)(module.quill, 'insertColumnLeft'),
      insertColumnRight: (0, _table_helper.getTableOperationHandler)(module.quill, 'insertColumnRight'),
      deleteColumn: (0, _table_helper.getTableOperationHandler)(module.quill, 'deleteColumn'),
      deleteRow: (0, _table_helper.getTableOperationHandler)(module.quill, 'deleteRow'),
      deleteTable: (0, _table_helper.getTableOperationHandler)(module.quill, 'deleteTable'),
      cellProperties: prepareShowFormProperties(module, 'cell'),
      tableProperties: prepareShowFormProperties(module, 'table')
    };
  }
  function resetFormDialogOptions(editorInstance, _ref6) {
    var contentTemplate = _ref6.contentTemplate,
        title = _ref6.title,
        minHeight = _ref6.minHeight,
        minWidth = _ref6.minWidth,
        maxWidth = _ref6.maxWidth;
    editorInstance.formDialogOption({
      contentTemplate: contentTemplate,
      title: title,
      minHeight: minHeight !== null && minHeight !== void 0 ? minHeight : 0,
      minWidth: minWidth !== null && minWidth !== void 0 ? minWidth : 0,
      maxWidth: maxWidth !== null && maxWidth !== void 0 ? maxWidth : 'none'
    });
  }
  function prepareShowFormProperties(module, type) {
    return function ($element) {
      var _$element, _module$quill$getModu;
      if (!((_$element = $element) !== null && _$element !== void 0 && _$element.length)) {
        $element = (0, _renderer.default)(getTargetTableNode(module, type));
      }
      var _ref7 = (_module$quill$getModu = module.quill.getModule('table').getTable()) !== null && _module$quill$getModu !== void 0 ? _module$quill$getModu : [],
          _ref8 = _slicedToArray(_ref7, 2),
          tableBlot = _ref8[0],
          rowBlot = _ref8[1];
      var formats = module.quill.getFormat(module.editorInstance.getSelection(true));
      var tablePropertiesFormConfig = getFormConfigConstructor(type)(module, {
        $element: $element,
        formats: formats,
        tableBlot: tableBlot,
        rowBlot: rowBlot
      });
      var _module$editorInstanc = module.editorInstance._formDialog._popup.option(),
          contentTemplate = _module$editorInstanc.contentTemplate,
          title = _module$editorInstanc.title,
          minHeight = _module$editorInstanc.minHeight,
          minWidth = _module$editorInstanc.minWidth,
          maxWidth = _module$editorInstanc.maxWidth;
      var savedOptions = {
        contentTemplate: contentTemplate,
        title: title,
        minHeight: minHeight,
        minWidth: minWidth,
        maxWidth: maxWidth
      };
      var formInstance;
      module.editorInstance.formDialogOption({
        'contentTemplate': function contentTemplate(container) {
          var $content = (0, _renderer.default)('<div>').appendTo(container);
          var $form = (0, _renderer.default)('<div>').appendTo($content);
          module.editorInstance._createComponent($form, _form.default, tablePropertiesFormConfig.formOptions);
          module.editorInstance._createComponent($content, _scroll_view.default, {});
          formInstance = $form.dxForm('instance');
          return $content;
        },
        title: _message.default.format("dxHtmlEditor-".concat(type, "Properties")),
        minHeight: MIN_HEIGHT,
        minWidth: Math.min(800, (0, _size.getWidth)((0, _window.getWindow)()) * 0.9 - 1),
        maxWidth: (0, _size.getWidth)((0, _window.getWindow)()) * 0.9
      });
      var promise = module.editorInstance.showFormDialog();
      promise.done(function (formData, event) {
        module.saveValueChangeEvent(event);
        tablePropertiesFormConfig.applyHandler(formInstance);
        resetFormDialogOptions(module.editorInstance, savedOptions);
      });
      promise.fail(function () {
        module.quill.focus();
        resetFormDialogOptions(module.editorInstance, savedOptions);
      });
    };
  }
  function applyFormat(module, formatArgs, event) {
    var _module$quill;
    module.saveValueChangeEvent(event);
    (_module$quill = module.quill).format.apply(_module$quill, _toConsumableArray(formatArgs));
  }
  function getTargetTableNode(module, partName) {
    var currentSelectionParts = module.quill.getModule('table').getTable();
    return partName === 'table' ? currentSelectionParts[0].domNode : currentSelectionParts[2].domNode;
  }
  function getLinkRange(module, range) {
    var Quill = (0, _quill_importer.getQuill)();
    var LinkBlot = Quill.import('formats/link');
    var link;
    var linkOffset;
    var _module$quill$scroll$ = module.quill.scroll.descendant(LinkBlot, range.index);
    var _module$quill$scroll$2 = _slicedToArray(_module$quill$scroll$, 2);
    link = _module$quill$scroll$2[0];
    linkOffset = _module$quill$scroll$2[1];
    if (!link && range.length === 0) {
      // NOTE:
      // See T1157840
      // When a mouse pointer is placed on the link's right border, the quill.scroll.descendant method does not return information about the link.
      // In this case, we receive a necessary information from the previous index.
      var _module$quill$scroll$3 = module.quill.scroll.descendant(LinkBlot, range.index - 1);
      var _module$quill$scroll$4 = _slicedToArray(_module$quill$scroll$3, 2);
      link = _module$quill$scroll$4[0];
      linkOffset = _module$quill$scroll$4[1];
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
    return function () {
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
      var selectionHasEmbedContent = (0, _table_helper.hasEmbedContent)(module, selection);
      var formData = {
        href: href,
        text: selection && !selectionHasEmbedContent ? module.quill.getText(selection) : '',
        target: Object.prototype.hasOwnProperty.call(formats, 'target') ? !!formats.target : true
      };
      module.editorInstance.formDialogOption('title', _message.default.format(DIALOG_LINK_CAPTION));
      var promise = module.editorInstance.showFormDialog({
        formData: formData,
        items: getLinkFormItems(selectionHasEmbedContent)
      });
      promise.done(function (formData, event) {
        if (selection && !selectionHasEmbedContent) {
          var text = formData.text || formData.href;
          var _selection2 = selection,
              index = _selection2.index,
              length = _selection2.length;
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
      promise.fail(function () {
        module.quill.focus();
      });
    };
  }
  function prepareImageHandler(module, imageUploadOption) {
    var imageUploader = new _image_uploader_helper.ImageUploader(module, imageUploadOption);
    return function () {
      imageUploader.render();
    };
  }
  function getLinkFormItems(selectionHasEmbedContent) {
    return [{
      dataField: 'href',
      label: {
        text: _message.default.format(DIALOG_LINK_FIELD_URL)
      }
    }, {
      dataField: 'text',
      label: {
        text: _message.default.format(DIALOG_LINK_FIELD_TEXT)
      },
      visible: !selectionHasEmbedContent
    }, {
      dataField: 'target',
      editorType: 'dxCheckBox',
      editorOptions: {
        text: _message.default.format(DIALOG_LINK_FIELD_TARGET)
      },
      cssClass: DIALOG_LINK_FIELD_TARGET_CLASS,
      label: {
        visible: false
      }
    }];
  }
  function prepareColorClickHandler(module, name) {
    return function () {
      var formData = module.quill.getFormat();
      var caption = name === 'color' ? DIALOG_COLOR_CAPTION : DIALOG_BACKGROUND_CAPTION;
      module.editorInstance.formDialogOption('title', _message.default.format(caption));
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
      promise.done(function (formData, event) {
        applyFormat(module, [name, formData[name], USER_ACTION], event);
      });
      promise.fail(function () {
        module.quill.focus();
      });
    };
  }
  function prepareShortcutHandler(module, name, shortcutValue) {
    return function (_ref9) {
      var _getToolbarModule2;
      var event = _ref9.event;
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
    return function (_ref10) {
      var _getToolbarModule3;
      var event = _ref10.event;
      var formats = module.quill.getFormat();
      var value = formats[name];
      var newValue = !((0, _type.isBoolean)(value) ? value : (0, _type.isDefined)(value));
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
        text: _message.default.format(DIALOG_TABLE_FIELD_COLUMNS)
      }
    }, {
      dataField: 'rows',
      editorType: 'dxNumberBox',
      editorOptions: {
        min: 1
      },
      label: {
        text: _message.default.format(DIALOG_TABLE_FIELD_ROWS)
      }
    }];
  }
  function prepareInsertTableHandler(module) {
    return function () {
      var formats = module.quill.getFormat();
      var isTableFocused = module._tableFormats.some(function (format) {
        return Object.prototype.hasOwnProperty.call(formats, format);
      });
      var formData = {
        rows: 1,
        columns: 1
      };
      if (isTableFocused) {
        module.quill.focus();
        return;
      }
      module.editorInstance.formDialogOption('title', _message.default.format(DIALOG_TABLE_CAPTION));
      var promise = module.editorInstance.showFormDialog({
        formData: formData,
        items: insertTableFormItems()
      });
      promise.done(function (formData, event) {
        module.quill.focus();
        var table = module.quill.getModule('table');
        if (table) {
          module.saveValueChangeEvent(event);
          var columns = formData.columns,
              rows = formData.rows;
          table.insertTable(columns, rows);
        }
      }).always(function () {
        module.quill.focus();
      });
    };
  }
  function getTablePropertiesFormConfig(module, _ref11) {
    var $element = _ref11.$element,
        formats = _ref11.formats,
        tableBlot = _ref11.tableBlot;
    var window = (0, _window.getWindow)();
    var alignmentEditorInstance;
    var borderColorEditorInstance;
    var backgroundColorEditorInstance;
    var $table = $element;
    var editorInstance = module.editorInstance;
    var startTableWidth = parseInt(formats.tableWidth) || (0, _size.getOuterWidth)($table);
    var tableStyles = window.getComputedStyle($table.get(0));
    var startTextAlign = tableStyles.textAlign === 'start' ? 'left' : tableStyles.textAlign;
    var formOptions = {
      colCount: 2,
      formData: {
        width: startTableWidth,
        height: (0, _type.isDefined)(formats.tableHeight) ? parseInt(formats.tableHeight) : (0, _size.getOuterHeight)($table),
        backgroundColor: formats.tableBackgroundColor || tableStyles.backgroundColor,
        borderStyle: formats.tableBorderStyle || tableStyles.borderTopStyle,
        borderColor: formats.tableBorderColor || tableStyles.borderTopColor,
        borderWidth: parseInt((0, _type.isDefined)(formats.tableBorderWidth) ? formats.tableBorderWidth : tableStyles.borderTopWidth),
        alignment: formats.tableAlign || startTextAlign
      },
      items: [{
        itemType: 'group',
        caption: _message.default.format('dxHtmlEditor-border'),
        colCountByScreen: {
          xs: 2
        },
        colCount: 2,
        items: [{
          dataField: 'borderStyle',
          label: {
            text: _message.default.format('dxHtmlEditor-style')
          },
          editorType: 'dxSelectBox',
          editorOptions: {
            items: BORDER_STYLES,
            placeholder: 'Select style'
          }
        }, {
          dataField: 'borderWidth',
          label: {
            text: _message.default.format('dxHtmlEditor-borderWidth')
          },
          editorOptions: {
            placeholder: _message.default.format('dxHtmlEditor-pixels')
          }
        }, {
          itemType: 'simple',
          dataField: 'borderColor',
          label: {
            text: _message.default.format('dxHtmlEditor-borderColor')
          },
          colSpan: 2,
          template: function template(e) {
            var $content = (0, _renderer.default)('<div>');
            editorInstance._createComponent($content, _color_box.default, {
              editAlphaChannel: true,
              value: e.component.option('formData').borderColor,
              onInitialized: function onInitialized(e) {
                borderColorEditorInstance = e.component;
              }
            });
            return $content;
          }
        }]
      }, {
        itemType: 'group',
        caption: _message.default.format('dxHtmlEditor-dimensions'),
        colCountByScreen: {
          xs: 2
        },
        colCount: 2,
        items: [{
          dataField: 'width',
          label: {
            text: _message.default.format('dxHtmlEditor-width')
          },
          editorOptions: {
            min: 0,
            placeholder: _message.default.format('dxHtmlEditor-pixels')
          }
        }, {
          dataField: 'height',
          label: {
            text: _message.default.format('dxHtmlEditor-height')
          },
          editorOptions: {
            min: 0,
            placeholder: _message.default.format('dxHtmlEditor-pixels')
          }
        }]
      }, {
        itemType: 'group',
        caption: _message.default.format('dxHtmlEditor-tableBackground'),
        items: [{
          itemType: 'simple',
          dataField: 'backgroundColor',
          label: {
            text: _message.default.format('dxHtmlEditor-borderColor')
          },
          template: function template(e) {
            var $content = (0, _renderer.default)('<div>');
            editorInstance._createComponent($content, _color_box.default, {
              editAlphaChannel: true,
              value: e.component.option('formData').backgroundColor,
              onInitialized: function onInitialized(e) {
                backgroundColorEditorInstance = e.component;
              }
            });
            return $content;
          }
        }]
      }, {
        itemType: 'group',
        caption: _message.default.format('dxHtmlEditor-alignment'),
        items: [{
          itemType: 'simple',
          label: {
            text: _message.default.format('dxHtmlEditor-horizontal')
          },
          template: function template() {
            var $content = (0, _renderer.default)('<div>');
            editorInstance._createComponent($content, _button_group.default, {
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
              onInitialized: function onInitialized(e) {
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
    var applyHandler = function applyHandler(formInstance) {
      var formData = formInstance.option('formData');
      var newWidth = formData.width === startTableWidth ? undefined : formData.width;
      var newHeight = formData.height;
      applyTableDimensionChanges(module, {
        $table: $table,
        newHeight: newHeight,
        newWidth: newWidth,
        tableBlot: tableBlot
      });
      module.editorInstance.format('tableBorderStyle', formData.borderStyle);
      module.editorInstance.format('tableBorderWidth', formData.borderWidth + 'px');
      module.editorInstance.format('tableBorderColor', borderColorEditorInstance.option('value'));
      module.editorInstance.format('tableBackgroundColor', backgroundColorEditorInstance.option('value'));
      module.editorInstance.format('tableTextAlign', alignmentEditorInstance.option('selectedItemKeys')[0]);
    };
    return {
      formOptions: formOptions,
      applyHandler: applyHandler
    };
  }
  function getCellPropertiesFormConfig(module, _ref12) {
    var $element = _ref12.$element,
        formats = _ref12.formats,
        tableBlot = _ref12.tableBlot,
        rowBlot = _ref12.rowBlot;
    var window = (0, _window.getWindow)();
    var alignmentEditorInstance;
    var verticalAlignmentEditorInstance;
    var borderColorEditorInstance;
    var backgroundColorEditorInstance;
    var $cell = $element;
    var startCellWidth = (0, _type.isDefined)(formats.cellWidth) ? parseInt(formats.cellWidth) : (0, _size.getOuterWidth)($cell);
    var editorInstance = module.editorInstance;
    var cellStyles = window.getComputedStyle($cell.get(0));
    var startTextAlign = cellStyles.textAlign === 'start' ? 'left' : cellStyles.textAlign;
    var formOptions = {
      colCount: 2,
      formData: {
        width: startCellWidth,
        height: (0, _type.isDefined)(formats.cellHeight) ? parseInt(formats.cellHeight) : (0, _size.getOuterHeight)($cell),
        backgroundColor: getColorFromFormat(formats.cellBackgroundColor) || cellStyles.backgroundColor,
        borderStyle: formats.cellBorderStyle || cellStyles.borderTopStyle,
        borderColor: getColorFromFormat(formats.cellBorderColor) || cellStyles.borderTopColor,
        borderWidth: parseInt((0, _type.isDefined)(formats.cellBorderWidth) ? formats.cellBorderWidth : cellStyles.borderTopWidth),
        alignment: formats.cellTextAlign || startTextAlign,
        verticalAlignment: formats.cellVerticalAlign || cellStyles.verticalAlign,
        verticalPadding: parseInt((0, _type.isDefined)(formats.cellPaddingTop) ? formats.cellPaddingTop : cellStyles.paddingTop),
        horizontalPadding: parseInt((0, _type.isDefined)(formats.cellPaddingLeft) ? formats.cellPaddingLeft : cellStyles.paddingLeft)
      },
      items: [{
        itemType: 'group',
        caption: _message.default.format('dxHtmlEditor-border'),
        colCountByScreen: {
          xs: 2
        },
        colCount: 2,
        items: [{
          dataField: 'borderStyle',
          label: {
            text: _message.default.format('dxHtmlEditor-style')
          },
          editorType: 'dxSelectBox',
          editorOptions: {
            items: BORDER_STYLES
          }
        }, {
          dataField: 'borderWidth',
          label: {
            text: _message.default.format('dxHtmlEditor-borderWidth')
          },
          editorOptions: {
            placeholder: _message.default.format('dxHtmlEditor-pixels')
          }
        }, {
          itemType: 'simple',
          dataField: 'borderColor',
          colSpan: 2,
          label: {
            text: _message.default.format('dxHtmlEditor-borderColor')
          },
          template: function template(e) {
            var $content = (0, _renderer.default)('<div>');
            editorInstance._createComponent($content, _color_box.default, {
              editAlphaChannel: true,
              value: e.component.option('formData').borderColor,
              onInitialized: function onInitialized(e) {
                borderColorEditorInstance = e.component;
              }
            });
            return $content;
          }
        }]
      }, {
        itemType: 'group',
        caption: _message.default.format('dxHtmlEditor-dimensions'),
        colCount: 2,
        colCountByScreen: {
          xs: 2
        },
        items: [{
          dataField: 'width',
          label: {
            text: _message.default.format('dxHtmlEditor-width')
          },
          editorOptions: {
            min: 0,
            placeholder: _message.default.format('dxHtmlEditor-pixels')
          }
        }, {
          dataField: 'height',
          label: {
            text: _message.default.format('dxHtmlEditor-height')
          },
          editorOptions: {
            min: 0,
            placeholder: _message.default.format('dxHtmlEditor-pixels')
          }
        }, {
          dataField: 'verticalPadding',
          label: {
            text: _message.default.format('dxHtmlEditor-paddingVertical')
          },
          editorOptions: {
            placeholder: _message.default.format('dxHtmlEditor-pixels')
          }
        }, {
          label: {
            text: _message.default.format('dxHtmlEditor-paddingHorizontal')
          },
          dataField: 'horizontalPadding',
          editorOptions: {
            placeholder: _message.default.format('dxHtmlEditor-pixels')
          }
        }]
      }, {
        itemType: 'group',
        caption: _message.default.format('dxHtmlEditor-tableBackground'),
        items: [{
          itemType: 'simple',
          dataField: 'backgroundColor',
          label: {
            text: _message.default.format('dxHtmlEditor-borderColor')
          },
          template: function template(e) {
            var $content = (0, _renderer.default)('<div>');
            editorInstance._createComponent($content, _color_box.default, {
              editAlphaChannel: true,
              value: e.component.option('formData').backgroundColor,
              onInitialized: function onInitialized(e) {
                backgroundColorEditorInstance = e.component;
              }
            });
            return $content;
          }
        }]
      }, {
        itemType: 'group',
        caption: _message.default.format('dxHtmlEditor-alignment'),
        colCount: 2,
        items: [{
          itemType: 'simple',
          label: {
            text: _message.default.format('dxHtmlEditor-horizontal')
          },
          template: function template() {
            var $content = (0, _renderer.default)('<div>');
            editorInstance._createComponent($content, _button_group.default, {
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
              onInitialized: function onInitialized(e) {
                alignmentEditorInstance = e.component;
              }
            });
            return $content;
          }
        }, {
          itemType: 'simple',
          label: {
            text: _message.default.format('dxHtmlEditor-vertical')
          },
          template: function template() {
            var $content = (0, _renderer.default)('<div>');
            editorInstance._createComponent($content, _button_group.default, {
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
              onInitialized: function onInitialized(e) {
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
    var applyHandler = function applyHandler(formInstance) {
      var formData = formInstance.option('formData');
      var newWidth = formData.width === parseInt(startCellWidth) ? undefined : formData.width;
      var newHeight = formData.height;
      applyCellDimensionChanges(module, {
        $cell: $cell,
        newHeight: newHeight,
        newWidth: newWidth,
        tableBlot: tableBlot,
        rowBlot: rowBlot
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
      formOptions: formOptions,
      applyHandler: applyHandler
    };
  }
  function getFormConfigConstructor(type) {
    return type === 'cell' ? getCellPropertiesFormConfig : getTablePropertiesFormConfig;
  }
  function applyTableDimensionChanges(module, _ref13) {
    var $table = _ref13.$table,
        newHeight = _ref13.newHeight,
        newWidth = _ref13.newWidth,
        tableBlot = _ref13.tableBlot;
    if ((0, _type.isDefined)(newWidth)) {
      var autoWidthColumns = (0, _table_helper.getAutoSizedElements)($table);
      if (autoWidthColumns.length > 0) {
        module.editorInstance.format('tableWidth', newWidth + 'px');
      } else {
        var $columns = (0, _table_helper.getColumnElements)($table);
        var oldTableWidth = (0, _size.getOuterWidth)($table);
        (0, _table_helper.unfixTableWidth)($table, {
          tableBlot: tableBlot
        });
        (0, _iterator.each)($columns, function (i, element) {
          var $element = (0, _renderer.default)(element);
          var newElementWidth = newWidth / oldTableWidth * (0, _size.getOuterWidth)($element);
          var $lineElements = (0, _table_helper.getLineElements)($table, $element.index(), 'horizontal');
          (0, _table_helper.setLineElementsFormat)(module, {
            elements: $lineElements,
            property: 'width',
            value: newElementWidth
          });
        });
      }
    }
    var autoHeightRows = (0, _table_helper.getAutoSizedElements)($table, 'vertical');
    if ((autoHeightRows === null || autoHeightRows === void 0 ? void 0 : autoHeightRows.length) > 0) {
      tableBlot.format('tableHeight', newHeight + 'px');
    } else {
      var $rows = (0, _table_helper.getRowElements)($table);
      var oldTableHeight = (0, _size.getOuterHeight)($table);
      (0, _iterator.each)($rows, function (i, element) {
        var $element = (0, _renderer.default)(element);
        var newElementHeight = newHeight / oldTableHeight * (0, _size.getOuterHeight)($element);
        var $lineElements = (0, _table_helper.getLineElements)($table, i, 'vertical');
        (0, _table_helper.setLineElementsFormat)(module, {
          elements: $lineElements,
          property: 'height',
          value: newElementHeight
        });
      });
    }
  }
  function applyCellDimensionChanges(module, _ref14) {
    var $cell = _ref14.$cell,
        newHeight = _ref14.newHeight,
        newWidth = _ref14.newWidth,
        tableBlot = _ref14.tableBlot,
        rowBlot = _ref14.rowBlot;
    var $table = (0, _renderer.default)($cell.closest('table'));
    if ((0, _type.isDefined)(newWidth)) {
      var index = (0, _renderer.default)($cell).index();
      var $verticalCells = (0, _table_helper.getLineElements)($table, index);
      var widthDiff = newWidth - (0, _size.getOuterWidth)($cell);
      var tableWidth = (0, _size.getOuterWidth)($table);
      if (newWidth > tableWidth) {
        (0, _table_helper.unfixTableWidth)($table, {
          tableBlot: tableBlot
        });
      }
      (0, _table_helper.setLineElementsFormat)(module, {
        elements: $verticalCells,
        property: 'width',
        value: newWidth
      });
      var $nextColumnCell = $cell.next();
      var shouldUpdateNearestColumnWidth = (0, _table_helper.getAutoSizedElements)($table).length === 0;
      if (shouldUpdateNearestColumnWidth) {
        (0, _table_helper.unfixTableWidth)($table, {
          tableBlot: tableBlot
        });
        if ($nextColumnCell.length === 1) {
          $verticalCells = (0, _table_helper.getLineElements)($table, index + 1);
          var nextColumnWidth = (0, _size.getOuterWidth)($verticalCells.eq(0)) - widthDiff;
          (0, _table_helper.setLineElementsFormat)(module, {
            elements: $verticalCells,
            property: 'width',
            value: Math.max(nextColumnWidth, 0)
          });
        } else {
          var $prevColumnCell = $cell.prev();
          if ($prevColumnCell.length === 1) {
            $verticalCells = (0, _table_helper.getLineElements)($table, index - 1);
            var prevColumnWidth = (0, _size.getOuterWidth)($verticalCells.eq(0)) - widthDiff;
            (0, _table_helper.setLineElementsFormat)(module, {
              elements: $verticalCells,
              property: 'width',
              value: Math.max(prevColumnWidth, 0)
            });
          }
        }
      }
    }
    rowBlot.children.forEach(function (rowCell) {
      rowCell.format('cellHeight', newHeight + 'px');
    });
    var autoHeightRows = (0, _table_helper.getAutoSizedElements)($table, 'vertical');
    if (autoHeightRows.length === 0) {
      $table.css('height', 'auto');
    }
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/renderer","../../../localization/message","./table_helper","../../../core/utils/type","../../../core/utils/iterator","../../form","../../button_group","../../color_box","../../scroll_view","../../../core/utils/size","./image_uploader_helper","../../../core/utils/window","../quill_importer"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/renderer"), require("../../../localization/message"), require("./table_helper"), require("../../../core/utils/type"), require("../../../core/utils/iterator"), require("../../form"), require("../../button_group"), require("../../color_box"), require("../../scroll_view"), require("../../../core/utils/size"), require("./image_uploader_helper"), require("../../../core/utils/window"), require("../quill_importer"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=toolbar_helper.js.map