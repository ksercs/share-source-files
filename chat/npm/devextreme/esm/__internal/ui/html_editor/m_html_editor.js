/**
* DevExtreme (esm/__internal/ui/html_editor/m_html_editor.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import '../../ui/html_editor/converters/m_delta';
// @ts-expect-error ts-error
import { Event as dxEvent } from '../../../common/core/events';
import eventsEngine from '../../../common/core/events/core/events_engine';
import scrollEvents from '../../../common/core/events/gesture/emitter.gesture.scroll';
import pointerEvents from '../../../common/core/events/pointer';
import { addNamespace } from '../../../common/core/events/utils/index';
import registerComponent from '../../../core/component_registrator';
import config from '../../../core/config';
import devices from '../../../core/devices';
import { getPublicElement } from '../../../core/element';
import $ from '../../../core/renderer';
import { EmptyTemplate } from '../../../core/templates/empty_template';
import Callbacks from '../../../core/utils/callbacks';
import { deferRender,
// @ts-expect-error ts-error
executeAsync, noop } from '../../../core/utils/common';
import { Deferred } from '../../../core/utils/deferred';
import { extend } from '../../../core/utils/extend';
import { isDefined, isFunction } from '../../../core/utils/type';
import Editor from '../../ui/editor/editor';
import ConverterController from '../../ui/html_editor/m_converterController';
import { getQuill } from '../../ui/html_editor/m_quill_importer';
import QuillRegistrator from '../../ui/html_editor/m_quill_registrator';
import getWordMatcher from '../../ui/html_editor/matchers/m_wordLists';
import FormDialog from '../../ui/html_editor/ui/m_formDialog';
import { prepareScrollData } from '../../ui/text_box/m_utils.scroll';
import AIDialog from './ui/aiDialog';
const HTML_EDITOR_CLASS = 'dx-htmleditor';
const QUILL_CONTAINER_CLASS = 'dx-quill-container';
const QUILL_CLIPBOARD_CLASS = 'ql-clipboard';
const HTML_EDITOR_SUBMIT_ELEMENT_CLASS = 'dx-htmleditor-submit-element';
const HTML_EDITOR_CONTENT_CLASS = 'dx-htmleditor-content';
const ANONYMOUS_TEMPLATE_NAME = 'htmlContent';
const isIos = devices.current().platform === 'ios';
let editorsCount = 0;
class HtmlEditor extends Editor {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      focusStateEnabled: true,
      placeholder: '',
      // @ts-expect-error ts-error
      toolbar: null,
      // @ts-expect-error ts-error
      variables: null,
      // @ts-expect-error ts-error
      mediaResizing: null,
      // @ts-expect-error ts-error
      tableResizing: null,
      // @ts-expect-error ts-error
      mentions: null,
      // @ts-expect-error ts-error
      customizeModules: null,
      // @ts-expect-error ts-error
      tableContextMenu: null,
      allowSoftLineBreak: false,
      formDialogOptions: null,
      // @ts-expect-error ts-error
      imageUpload: null,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      stylingMode: config().editorStylingMode || 'outlined',
      // @ts-expect-error ts-error
      converter: null
    });
  }
  _init() {
    this._mentionKeyInTemplateStorage = editorsCount++;
    super._init();
    this._cleanCallback = Callbacks();
    this._contentInitializedCallback = Callbacks();
    this._prepareHtmlConverter();
  }
  _prepareHtmlConverter() {
    const {
      converter
    } = this.option();
    if (converter) {
      this._htmlConverter = converter;
    }
  }
  _getAnonymousTemplateName() {
    return ANONYMOUS_TEMPLATE_NAME;
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      [ANONYMOUS_TEMPLATE_NAME]: new EmptyTemplate()
    });
    super._initTemplates();
  }
  _focusTarget() {
    return this._getContent();
  }
  _getContent() {
    return this.$element().find(`.${HTML_EDITOR_CONTENT_CLASS}`);
  }
  // @ts-expect-error ts-error
  _focusInHandler(_ref) {
    let {
      relatedTarget
    } = _ref;
    if (this._shouldSkipFocusEvent(relatedTarget)) {
      return;
    }
    this._toggleFocusClass(true, this.$element());
    // @ts-expect-error ts-error
    super._focusInHandler.apply(this, arguments);
  }
  // @ts-expect-error ts-error
  _focusOutHandler(_ref2) {
    let {
      relatedTarget
    } = _ref2;
    if (this._shouldSkipFocusEvent(relatedTarget)) {
      return;
    }
    this._toggleFocusClass(false, this.$element());
    // @ts-expect-error ts-error
    super._focusOutHandler.apply(this, arguments);
  }
  _shouldSkipFocusEvent(relatedTarget) {
    return $(relatedTarget).hasClass(QUILL_CLIPBOARD_CLASS);
  }
  _initMarkup() {
    this._$htmlContainer = $('<div>').addClass(QUILL_CONTAINER_CLASS);
    this.$element().attr('role', 'application').addClass(HTML_EDITOR_CLASS).wrapInner(this._$htmlContainer);
    this._renderStylingMode();
    const template = this._getTemplate(ANONYMOUS_TEMPLATE_NAME);
    const transclude = true;
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    this._$templateResult = template && template.render({
      container: getPublicElement(this._$htmlContainer),
      noModel: true,
      transclude
    });
    this._renderSubmitElement();
    super._initMarkup();
    this._updateContainerMarkup();
  }
  _renderValidationState() {
    const $content = this._getContent();
    if ($content.length === 1) {
      super._renderValidationState();
    }
  }
  _renderSubmitElement() {
    this._$submitElement = $('<textarea>').addClass(HTML_EDITOR_SUBMIT_ELEMENT_CLASS).attr('hidden', true).appendTo(this.$element());
    this._setSubmitValue(this.option('value'));
  }
  _setSubmitValue(value) {
    this._getSubmitElement().val(value);
  }
  _getSubmitElement() {
    return this._$submitElement;
  }
  _createNoScriptFrame() {
    return $('<iframe>').css('display', 'none')
    // @ts-expect-error
    .attr({
      // eslint-disable-next-line spellcheck/spell-checker
      srcdoc: '',
      id: 'xss-frame',
      sandbox: 'allow-same-origin'
    });
  }
  _removeXSSVulnerableHtml(value) {
    // NOTE: Script tags and inline handlers are removed to prevent XSS attacks.
    // "Blocked script execution in 'about:blank' because the document's frame is sandboxed and the 'allow-scripts' permission is not set."
    // error can be logged to the console if the html value is XSS vulnerable.
    const $frame = this._createNoScriptFrame()
    // @ts-expect-error ts-error
    .appendTo('body');
    const frame = $frame.get(0);
    // @ts-expect-error ts-error
    const frameWindow = frame.contentWindow;
    const frameDocument = frameWindow.document;
    const frameDocumentBody = frameDocument.body;
    const quill = getQuill();
    // NOTE: Operations with style attribute is required
    // to prevent a 'unsafe-inline' CSP error in DOMParser.
    const valueWithoutStyles = quill.replaceStyleAttribute(value);
    frameDocumentBody.innerHTML = valueWithoutStyles;
    const removeInlineHandlers = element => {
      if (element.attributes) {
        for (let i = 0; i < element.attributes.length; i++) {
          const {
            name
          } = element.attributes[i];
          if (name.startsWith('on')) {
            element.removeAttribute(name);
          }
        }
      }
      if (element.childNodes) {
        for (let i = 0; i < element.childNodes.length; i++) {
          removeInlineHandlers(element.childNodes[i]);
        }
      }
    };
    removeInlineHandlers(frameDocumentBody);
    // NOTE: Do not use jQuery to prevent an excess "Blocked script execution" error in Safari.
    frameDocumentBody.querySelectorAll('script').forEach(scriptNode => {
      scriptNode.remove();
    });
    const sanitizedHtml = frameDocumentBody.innerHTML;
    $frame.remove();
    return sanitizedHtml;
  }
  _convertToHtml(value) {
    var _this$_htmlConverter;
    const result = isFunction((_this$_htmlConverter = this._htmlConverter) === null || _this$_htmlConverter === void 0 ? void 0 : _this$_htmlConverter.toHtml) ? String(this._htmlConverter.toHtml(value ?? '') ?? '') : value;
    return result;
  }
  _convertFromHtml(value) {
    var _this$_htmlConverter2;
    const result = isFunction((_this$_htmlConverter2 = this._htmlConverter) === null || _this$_htmlConverter2 === void 0 ? void 0 : _this$_htmlConverter2.fromHtml) ? String(this._htmlConverter.fromHtml(value) ?? '') : value;
    return result;
  }
  _updateContainerMarkup() {
    const {
      value
    } = this.option();
    const html = this._convertToHtml(value);
    if (!html) {
      return;
    }
    const sanitizedHtml = this._removeXSSVulnerableHtml(html);
    this._$htmlContainer.html(sanitizedHtml);
  }
  _render() {
    this._prepareConverters();
    super._render();
    this._toggleReadOnlyState();
  }
  _prepareQuillRegistrator() {
    if (!this._quillRegistrator) {
      this._quillRegistrator = new QuillRegistrator();
    }
  }
  _getRegistrator() {
    this._prepareQuillRegistrator();
    return this._quillRegistrator;
  }
  _prepareConverters() {
    if (!this._deltaConverter) {
      const DeltaConverter = ConverterController.getConverter('delta');
      if (DeltaConverter) {
        this._deltaConverter = new DeltaConverter();
      }
    }
  }
  // @ts-expect-error ts-error
  _renderContentImpl() {
    this._contentRenderedDeferred = Deferred();
    const renderContentPromise = this._contentRenderedDeferred.promise();
    super._renderContentImpl();
    this._renderHtmlEditor();
    this._renderFormDialog();
    this._renderAIDialog();
    this._addKeyPressHandler();
    return renderContentPromise;
  }
  _pointerMoveHandler(e) {
    if (isIos) {
      e.stopPropagation();
    }
  }
  _attachFocusEvents() {
    deferRender(super._attachFocusEvents.bind(this));
  }
  _addKeyPressHandler() {
    const keyDownEvent = addNamespace('keydown', `${this.NAME}TextChange`);
    eventsEngine.on(this._$htmlContainer, keyDownEvent, this._keyDownHandler.bind(this));
  }
  _keyDownHandler(e) {
    this._saveValueChangeEvent(e);
  }
  _renderHtmlEditor() {
    const customizeModules = this.option('customizeModules');
    const modulesConfig = this._getModulesConfig();
    if (isFunction(customizeModules)) {
      customizeModules(modulesConfig);
    }
    this._quillInstance = this._getRegistrator().createEditor(this._$htmlContainer[0], {
      placeholder: this.option('placeholder'),
      readOnly: this.option('readOnly') || this.option('disabled'),
      modules: modulesConfig,
      theme: 'basic'
    });
    this._renderValidationState();
    this._deltaConverter.setQuillInstance(this._quillInstance);
    this._textChangeHandlerWithContext = this._textChangeHandler.bind(this);
    this._quillInstance.on('text-change', this._textChangeHandlerWithContext);
    this._renderScrollHandler();
    if (this._hasTranscludedContent()) {
      this._updateContentTask = executeAsync(() => {
        this._applyTranscludedContent();
      });
    } else {
      this._finalizeContentRendering();
    }
  }
  _renderScrollHandler() {
    const $scrollContainer = this._getContent();
    const initScrollData = prepareScrollData($scrollContainer);
    // @ts-expect-error ts-error
    eventsEngine.on($scrollContainer, addNamespace(scrollEvents.init, this.NAME), initScrollData, noop);
    // @ts-expect-error ts-error
    eventsEngine.on($scrollContainer, addNamespace(pointerEvents.move, this.NAME), this._pointerMoveHandler.bind(this));
  }
  _applyTranscludedContent() {
    const valueOption = this.option('value');
    if (!isDefined(valueOption)) {
      const html = this._deltaConverter.toHtml();
      const newDelta = this._quillInstance.clipboard.convert({
        html
      });
      if (newDelta.ops.length) {
        this._quillInstance.setContents(newDelta);
        return;
      }
    }
    this._finalizeContentRendering();
  }
  _hasTranscludedContent() {
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    return this._$templateResult && this._$templateResult.length;
  }
  _getModulesConfig() {
    const quill = this._getRegistrator().getQuill();
    const wordListMatcher = getWordMatcher(quill);
    const modulesConfig = extend({}, {
      table: true,
      toolbar: this._getModuleConfigByOption('toolbar'),
      variables: this._getModuleConfigByOption('variables'),
      // TODO: extract some IE11 tweaks for the Quill uploader module
      // dropImage: this._getBaseModuleConfig(),
      resizing: this._getModuleConfigByOption('mediaResizing'),
      tableResizing: this._getModuleConfigByOption('tableResizing'),
      tableContextMenu: this._getModuleConfigByOption('tableContextMenu'),
      imageUpload: this._getModuleConfigByOption('imageUpload'),
      imageCursor: this._getBaseModuleConfig(),
      mentions: this._getModuleConfigByOption('mentions'),
      uploader: {
        onDrop: e => this._saveValueChangeEvent(dxEvent(e)),
        imageBlot: 'extendedImage'
      },
      keyboard: {
        onKeydown: e => this._saveValueChangeEvent(dxEvent(e))
      },
      clipboard: {
        onPaste: e => this._saveValueChangeEvent(dxEvent(e)),
        onCut: e => this._saveValueChangeEvent(dxEvent(e)),
        matchers: [['p.MsoListParagraphCxSpFirst', wordListMatcher], ['p.MsoListParagraphCxSpMiddle', wordListMatcher], ['p.MsoListParagraphCxSpLast', wordListMatcher]]
      },
      multiline: Boolean(this.option('allowSoftLineBreak'))
    }, this._getCustomModules());
    return modulesConfig;
  }
  _getModuleConfigByOption(userOptionName) {
    const optionValue = this.option(userOptionName);
    let config = {};
    if (!isDefined(optionValue)) {
      return undefined;
    }
    if (Array.isArray(optionValue)) {
      config[userOptionName] = optionValue;
    } else {
      config = optionValue;
    }
    return extend(this._getBaseModuleConfig(), config);
  }
  _getBaseModuleConfig() {
    return {
      editorInstance: this
    };
  }
  _getCustomModules() {
    const modules = {};
    const moduleNames = this._getRegistrator().getRegisteredModuleNames();
    moduleNames.forEach(modulePath => {
      modules[modulePath] = this._getBaseModuleConfig();
    });
    return modules;
  }
  _textChangeHandler() {
    const {
      value: currentValue
    } = this.option();
    const html = this._deltaConverter.toHtml();
    const convertedValue = this._convertFromHtml(html);
    if (currentValue !== convertedValue && !this._isNullValueConverted(currentValue, convertedValue)) {
      this._isEditorUpdating = true;
      this.option('value', convertedValue);
    }
    this._finalizeContentRendering();
  }
  _isNullValueConverted(currentValue, convertedValue) {
    return currentValue === null && convertedValue === '';
  }
  _finalizeContentRendering() {
    if (this._contentRenderedDeferred) {
      this.clearHistory();
      this._contentInitializedCallback.fire();
      this._contentRenderedDeferred.resolve();
      this._contentRenderedDeferred = undefined;
    }
  }
  _resetEnabledState() {
    if (this._quillInstance) {
      const isEnabled = !(this.option('readOnly') || this.option('disabled'));
      this._quillInstance.enable(isEnabled);
    }
  }
  _renderFormDialog() {
    const userOptions = extend(true, {
      width: 'auto',
      height: 'auto',
      hideOnOutsideClick: true
    }, this.option('formDialogOptions'));
    this._formDialog = new FormDialog(this.$element(), userOptions);
  }
  _renderAIDialog() {
    const {
      aiIntegration
    } = this.option();
    if (!aiIntegration) {
      return;
    }
    this._aiDialog = new AIDialog(this.$element(), aiIntegration);
  }
  _getStylingModePrefix() {
    return 'dx-htmleditor-';
  }
  _getQuillContainer() {
    return this._$htmlContainer;
  }
  _prepareModuleOptions(args) {
    var _args$fullName;
    const optionData = (_args$fullName = args.fullName) === null || _args$fullName === void 0 ? void 0 : _args$fullName.split('.');
    let {
      value
    } = args;
    const optionName = optionData.length >= 2 ? optionData[1] : args.name;
    if (optionData.length === 3) {
      value = {
        [optionData[2]]: value
      };
    }
    return [optionName, value];
  }
  _moduleOptionChanged(moduleName, args) {
    const moduleInstance = this.getModule(moduleName);
    const shouldPassOptionsToModule = Boolean(moduleInstance);
    if (shouldPassOptionsToModule) {
      moduleInstance.option(...this._prepareModuleOptions(args));
    } else {
      this._invalidate();
    }
  }
  _processHtmlContentUpdating(value) {
    if (this._quillInstance) {
      if (this._isEditorUpdating) {
        this._isEditorUpdating = false;
      } else {
        const html = this._convertToHtml(value);
        this._suppressValueChangeAction();
        this._updateHtmlContent(html);
        this._resumeValueChangeAction();
      }
    } else {
      this._$htmlContainer.html(value);
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'converter':
        {
          this._htmlConverter = args.value;
          const {
            value
          } = this.option();
          this._processHtmlContentUpdating(value);
          break;
        }
      case 'value':
        {
          this._processHtmlContentUpdating(args.value);
          // NOTE: value can be optimized by Quill
          const value = this.option('value');
          if (value !== args.previousValue) {
            this._setSubmitValue(value);
            super._optionChanged(_extends({}, args, {
              value
            }));
          }
          break;
        }
      case 'placeholder':
      case 'variables':
      case 'toolbar':
      case 'mentions':
      case 'customizeModules':
      case 'allowSoftLineBreak':
        this._invalidate();
        break;
      case 'tableResizing':
        this._moduleOptionChanged('tableResizing', args);
        break;
      case 'stylingMode':
        this._renderStylingMode();
        break;
      case 'readOnly':
      case 'disabled':
        super._optionChanged(args);
        this._resetEnabledState();
        break;
      case 'formDialogOptions':
        this._renderFormDialog();
        break;
      case 'tableContextMenu':
        this._moduleOptionChanged('tableContextMenu', args);
        break;
      case 'mediaResizing':
        this._moduleOptionChanged('resizing', args);
        break;
      case 'width':
        super._optionChanged(args);
        this._repaintToolbar();
        break;
      case 'imageUpload':
        this._moduleOptionChanged('imageUpload', args);
        break;
      default:
        super._optionChanged(args);
    }
  }
  _repaintToolbar() {
    this._applyToolbarMethod('repaint');
  }
  _updateHtmlContent(html) {
    const newDelta = this._quillInstance.clipboard.convert({
      html
    });
    this._quillInstance.setContents(newDelta);
  }
  _clean() {
    if (this._quillInstance) {
      eventsEngine.off(this._getContent(), `.${this.NAME}`);
      this._quillInstance.off('text-change', this._textChangeHandlerWithContext);
      this._cleanCallback.fire();
    }
    this._abortUpdateContentTask();
    this._cleanCallback.empty();
    this._contentInitializedCallback.empty();
    super._clean();
  }
  _abortUpdateContentTask() {
    if (this._updateContentTask) {
      // @ts-expect-error ts-error
      this._updateContentTask.abort();
      this._updateContentTask = undefined;
    }
  }
  _applyQuillMethod(methodName, args) {
    if (this._quillInstance) {
      return this._quillInstance[methodName].apply(this._quillInstance, args);
    }
  }
  _applyQuillHistoryMethod(methodName) {
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    if (this._quillInstance && this._quillInstance.history) {
      this._quillInstance.history[methodName]();
    }
  }
  _applyToolbarMethod(methodName) {
    var _this$getModule;
    (_this$getModule = this.getModule('toolbar')) === null || _this$getModule === void 0 || _this$getModule[methodName]();
  }
  addCleanCallback(callback) {
    this._cleanCallback.add(callback);
  }
  addContentInitializedCallback(callback) {
    this._contentInitializedCallback.add(callback);
  }
  register(components) {
    this._getRegistrator().registerModules(components);
    if (this._quillInstance) {
      this.repaint();
    }
  }
  get(modulePath) {
    return this._getRegistrator().getQuill().import(modulePath);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getModule(moduleName) {
    return this._applyQuillMethod('getModule', arguments);
  }
  getQuillInstance() {
    return this._quillInstance;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getSelection(focus) {
    return this._applyQuillMethod('getSelection', arguments);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSelection(index, length) {
    this._applyQuillMethod('setSelection', arguments);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getText(index, length) {
    return this._applyQuillMethod('getText', arguments);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  format(formatName, formatValue) {
    this._applyQuillMethod('format', arguments);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formatText(index, length, formatName, formatValue) {
    this._applyQuillMethod('formatText', arguments);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formatLine(index, length, formatName, formatValue) {
    this._applyQuillMethod('formatLine', arguments);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getFormat(index, length) {
    return this._applyQuillMethod('getFormat', arguments);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeFormat(index, length) {
    return this._applyQuillMethod('removeFormat', arguments);
  }
  clearHistory() {
    this._applyQuillHistoryMethod('clear');
    this._applyToolbarMethod('updateHistoryWidgets');
  }
  undo() {
    this._applyQuillHistoryMethod('undo');
  }
  redo() {
    this._applyQuillHistoryMethod('redo');
  }
  getLength() {
    return this._applyQuillMethod('getLength');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getBounds(index, length) {
    return this._applyQuillMethod('getBounds', arguments);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(index, length) {
    this._applyQuillMethod('deleteText', arguments);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  insertText(index, text, formats) {
    this._applyQuillMethod('insertText', arguments);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  insertEmbed(index, type, config) {
    this._applyQuillMethod('insertEmbed', arguments);
  }
  showFormDialog(formConfig) {
    return this._formDialog.show(formConfig);
  }
  showAIDialog(payload) {
    var _this$_aiDialog;
    return (_this$_aiDialog = this._aiDialog) === null || _this$_aiDialog === void 0 ? void 0 : _this$_aiDialog.show(payload);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  formDialogOption(optionName, optionValue) {
    // @ts-expect-error ts-error
    return this._formDialog.popupOption.apply(this._formDialog, arguments);
  }
  focus() {
    super.focus();
    this._applyQuillMethod('focus');
  }
  blur() {
    this._applyQuillMethod('blur');
  }
  getMentionKeyInTemplateStorage() {
    return this._mentionKeyInTemplateStorage;
  }
}
registerComponent('dxHtmlEditor', HtmlEditor);
export default HtmlEditor;
