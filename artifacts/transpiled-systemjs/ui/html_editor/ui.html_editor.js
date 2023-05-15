!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/html_editor/ui.html_editor.js"], ["../../core/renderer","../../core/utils/extend","../../core/utils/type","../../core/element","../../core/utils/common","../../core/component_registrator","../../core/templates/empty_template","../editor/editor","../widget/ui.errors","../../core/utils/callbacks","../../core/utils/deferred","../../events/core/events_engine","../../events/utils/index","../../events/index","../../events/gesture/emitter.gesture.scroll","../text_box/utils.scroll","../../events/pointer","../../core/devices","./quill_registrator","./converters/delta","./converterController","./matchers/wordLists","./ui/formDialog","../../core/config"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/html_editor/ui.html_editor.js", ["../../core/renderer", "../../core/utils/extend", "../../core/utils/type", "../../core/element", "../../core/utils/common", "../../core/component_registrator", "../../core/templates/empty_template", "../editor/editor", "../widget/ui.errors", "../../core/utils/callbacks", "../../core/utils/deferred", "../../events/core/events_engine", "../../events/utils/index", "../../events/index", "../../events/gesture/emitter.gesture.scroll", "../text_box/utils.scroll", "../../events/pointer", "../../core/devices", "./quill_registrator", "./converters/delta", "./converterController", "./matchers/wordLists", "./ui/formDialog", "../../core/config"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _type = $__require("../../core/utils/type");
  var _element = $__require("../../core/element");
  var _common = $__require("../../core/utils/common");
  var _component_registrator = _interopRequireDefault($__require("../../core/component_registrator"));
  var _empty_template = $__require("../../core/templates/empty_template");
  var _editor = _interopRequireDefault($__require("../editor/editor"));
  var _ui = _interopRequireDefault($__require("../widget/ui.errors"));
  var _callbacks = _interopRequireDefault($__require("../../core/utils/callbacks"));
  var _deferred = $__require("../../core/utils/deferred");
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _index = $__require("../../events/utils/index");
  var _index2 = $__require("../../events/index");
  var _emitterGesture = _interopRequireDefault($__require("../../events/gesture/emitter.gesture.scroll"));
  var _utils = $__require("../text_box/utils.scroll");
  var _pointer = _interopRequireDefault($__require("../../events/pointer"));
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _quill_registrator = _interopRequireDefault($__require("./quill_registrator"));
  $__require("./converters/delta");
  var _converterController = _interopRequireDefault($__require("./converterController"));
  var _wordLists = _interopRequireDefault($__require("./matchers/wordLists"));
  var _formDialog = _interopRequireDefault($__require("./ui/formDialog"));
  var _config = _interopRequireDefault($__require("../../core/config"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }return target;
    };return _extends.apply(this, arguments);
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);if (key in obj) {
      Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }return obj;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  // STYLE htmlEditor

  var HTML_EDITOR_CLASS = 'dx-htmleditor';
  var QUILL_CONTAINER_CLASS = 'dx-quill-container';
  var QUILL_CLIPBOARD_CLASS = 'ql-clipboard';
  var HTML_EDITOR_SUBMIT_ELEMENT_CLASS = 'dx-htmleditor-submit-element';
  var HTML_EDITOR_CONTENT_CLASS = 'dx-htmleditor-content';
  var MARKDOWN_VALUE_TYPE = 'markdown';
  var ANONYMOUS_TEMPLATE_NAME = 'htmlContent';
  var isIos = _devices.default.current().platform === 'ios';
  var editorsCount = 0;
  var HtmlEditor = _editor.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        focusStateEnabled: true,
        valueType: 'html',
        placeholder: '',
        toolbar: null,
        variables: null,
        mediaResizing: null,
        tableResizing: null,
        mentions: null,
        customizeModules: null,
        tableContextMenu: null,
        allowSoftLineBreak: false,
        formDialogOptions: null,
        imageUpload: null,
        stylingMode: (0, _config.default)().editorStylingMode || 'outlined'
      });
    },
    _init: function _init() {
      this._mentionKeyInTemplateStorage = editorsCount++;
      this.callBase();
      this._cleanCallback = (0, _callbacks.default)();
      this._contentInitializedCallback = (0, _callbacks.default)();
    },
    _getAnonymousTemplateName: function _getAnonymousTemplateName() {
      return ANONYMOUS_TEMPLATE_NAME;
    },
    _initTemplates: function _initTemplates() {
      this._templateManager.addDefaultTemplates(_defineProperty({}, ANONYMOUS_TEMPLATE_NAME, new _empty_template.EmptyTemplate()));
      this.callBase();
    },
    _focusTarget: function _focusTarget() {
      return this._getContent();
    },
    _getContent: function _getContent() {
      return this.$element().find(".".concat(HTML_EDITOR_CONTENT_CLASS));
    },
    _focusInHandler: function _focusInHandler(_ref) {
      var relatedTarget = _ref.relatedTarget;
      if (this._shouldSkipFocusEvent(relatedTarget)) {
        return;
      }
      this._toggleFocusClass(true, this.$element());
      this.callBase.apply(this, arguments);
    },
    _focusOutHandler: function _focusOutHandler(_ref2) {
      var relatedTarget = _ref2.relatedTarget;
      if (this._shouldSkipFocusEvent(relatedTarget)) {
        return;
      }
      this._toggleFocusClass(false, this.$element());
      this.callBase.apply(this, arguments);
    },
    _shouldSkipFocusEvent: function _shouldSkipFocusEvent(relatedTarget) {
      return (0, _renderer.default)(relatedTarget).hasClass(QUILL_CLIPBOARD_CLASS);
    },
    _initMarkup: function _initMarkup() {
      this._$htmlContainer = (0, _renderer.default)('<div>').addClass(QUILL_CONTAINER_CLASS);
      this.$element().attr('role', 'application').addClass(HTML_EDITOR_CLASS).wrapInner(this._$htmlContainer);
      this._renderStylingMode();
      var template = this._getTemplate(ANONYMOUS_TEMPLATE_NAME);
      var transclude = true;
      this._$templateResult = template && template.render({
        container: (0, _element.getPublicElement)(this._$htmlContainer),
        noModel: true,
        transclude: transclude
      });
      this._renderSubmitElement();
      this.callBase();
      this._updateContainerMarkup();
    },
    _renderSubmitElement: function _renderSubmitElement() {
      this._$submitElement = (0, _renderer.default)('<textarea>').addClass(HTML_EDITOR_SUBMIT_ELEMENT_CLASS).attr('hidden', true).appendTo(this.$element());
      this._setSubmitValue(this.option('value'));
    },
    _setSubmitValue: function _setSubmitValue(value) {
      this._getSubmitElement().val(value);
    },
    _getSubmitElement: function _getSubmitElement() {
      return this._$submitElement;
    },
    _createNoScriptFrame: function _createNoScriptFrame() {
      return (0, _renderer.default)('<iframe>').css('display', 'none').attr({
        // eslint-disable-next-line spellcheck/spell-checker
        srcdoc: '',
        // NOTE: srcdoc is used to prevent an excess "Blocked script execution" error in Opera. See T1150911.
        id: 'xss-frame',
        sandbox: 'allow-same-origin'
      });
    },
    _removeXSSVulnerableHtml: function _removeXSSVulnerableHtml(value) {
      // NOTE: Script tags and inline handlers are removed to prevent XSS attacks.
      // "Blocked script execution in 'about:blank' because the document's frame is sandboxed and the 'allow-scripts' permission is not set."
      // error can be logged to the console if the html value is XSS vulnerable.

      var $frame = this._createNoScriptFrame().appendTo('body');
      var frame = $frame.get(0);
      var frameWindow = frame.contentWindow;
      var frameDocument = frameWindow.document;
      var frameDocumentBody = frameDocument.body;
      frameDocumentBody.innerHTML = value;
      var removeInlineHandlers = function removeInlineHandlers(element) {
        if (element.attributes) {
          for (var i = 0; i < element.attributes.length; i++) {
            var name = element.attributes[i].name;
            if (name.startsWith('on')) {
              element.removeAttribute(name);
            }
          }
        }
        if (element.childNodes) {
          for (var _i = 0; _i < element.childNodes.length; _i++) {
            removeInlineHandlers(element.childNodes[_i]);
          }
        }
      };
      removeInlineHandlers(frameDocumentBody);

      // NOTE: Do not use jQuery to prevent an excess "Blocked script execution" error in Safari.
      frameDocumentBody.querySelectorAll('script').forEach(function (scriptNode) {
        scriptNode.remove();
      });
      var sanitizedHtml = frameDocumentBody.innerHTML;
      $frame.remove();
      return sanitizedHtml;
    },
    _updateContainerMarkup: function _updateContainerMarkup() {
      var markup = this.option('value');
      if (this._isMarkdownValue()) {
        this._prepareMarkdownConverter();
        markup = this._markdownConverter.toHtml(markup);
      }
      if (markup) {
        var sanitizedMarkup = this._removeXSSVulnerableHtml(markup);
        this._$htmlContainer.html(sanitizedMarkup);
      }
    },
    _prepareMarkdownConverter: function _prepareMarkdownConverter() {
      var MarkdownConverter = _converterController.default.getConverter('markdown');
      if (MarkdownConverter) {
        this._markdownConverter = new MarkdownConverter();
      } else {
        throw _ui.default.Error('E1051', 'markdown');
      }
    },
    _render: function _render() {
      this._prepareConverters();
      this.callBase();
    },
    _prepareQuillRegistrator: function _prepareQuillRegistrator() {
      if (!this._quillRegistrator) {
        this._quillRegistrator = new _quill_registrator.default();
      }
    },
    _getRegistrator: function _getRegistrator() {
      this._prepareQuillRegistrator();
      return this._quillRegistrator;
    },
    _prepareConverters: function _prepareConverters() {
      if (!this._deltaConverter) {
        var DeltaConverter = _converterController.default.getConverter('delta');
        if (DeltaConverter) {
          this._deltaConverter = new DeltaConverter();
        }
      }
      if (this.option('valueType') === MARKDOWN_VALUE_TYPE && !this._markdownConverter) {
        this._prepareMarkdownConverter();
      }
    },
    _renderContentImpl: function _renderContentImpl() {
      this._contentRenderedDeferred = new _deferred.Deferred();
      var renderContentPromise = this._contentRenderedDeferred.promise();
      this.callBase();
      this._renderHtmlEditor();
      this._renderFormDialog();
      this._addKeyPressHandler();
      return renderContentPromise;
    },
    _pointerMoveHandler: function _pointerMoveHandler(e) {
      if (isIos) {
        e.stopPropagation();
      }
    },
    _attachFocusEvents: function _attachFocusEvents() {
      (0, _common.deferRender)(this.callBase.bind(this));
    },
    _addKeyPressHandler: function _addKeyPressHandler() {
      var keyDownEvent = (0, _index.addNamespace)('keydown', "".concat(this.NAME, "TextChange"));
      _events_engine.default.on(this._$htmlContainer, keyDownEvent, this._keyDownHandler.bind(this));
    },
    _keyDownHandler: function _keyDownHandler(e) {
      this._saveValueChangeEvent(e);
    },
    _renderHtmlEditor: function _renderHtmlEditor() {
      var _this = this;
      var customizeModules = this.option('customizeModules');
      var modulesConfig = this._getModulesConfig();
      if ((0, _type.isFunction)(customizeModules)) {
        customizeModules(modulesConfig);
      }
      this._quillInstance = this._getRegistrator().createEditor(this._$htmlContainer[0], {
        placeholder: this.option('placeholder'),
        readOnly: this.option('readOnly') || this.option('disabled'),
        modules: modulesConfig,
        theme: 'basic'
      });
      this._deltaConverter.setQuillInstance(this._quillInstance);
      this._textChangeHandlerWithContext = this._textChangeHandler.bind(this);
      this._quillInstance.on('text-change', this._textChangeHandlerWithContext);
      this._renderScrollHandler();
      if (this._hasTranscludedContent()) {
        this._updateContentTask = (0, _common.executeAsync)(function () {
          _this._applyTranscludedContent();
        });
      } else {
        this._finalizeContentRendering();
      }
    },
    _renderScrollHandler: function _renderScrollHandler() {
      var $scrollContainer = this._getContent();
      var initScrollData = (0, _utils.prepareScrollData)($scrollContainer);
      _events_engine.default.on($scrollContainer, (0, _index.addNamespace)(_emitterGesture.default.init, this.NAME), initScrollData, _common.noop);
      _events_engine.default.on($scrollContainer, (0, _index.addNamespace)(_pointer.default.move, this.NAME), this._pointerMoveHandler.bind(this));
    },
    _applyTranscludedContent: function _applyTranscludedContent() {
      var valueOption = this.option('value');
      if (!(0, _type.isDefined)(valueOption)) {
        var html = this._deltaConverter.toHtml();
        var newDelta = this._quillInstance.clipboard.convert({
          html: html
        });
        if (newDelta.ops.length) {
          this._quillInstance.setContents(newDelta);
          return;
        }
      }
      this._finalizeContentRendering();
    },
    _hasTranscludedContent: function _hasTranscludedContent() {
      return this._$templateResult && this._$templateResult.length;
    },
    _getModulesConfig: function _getModulesConfig() {
      var _this2 = this;
      var quill = this._getRegistrator().getQuill();
      var wordListMatcher = (0, _wordLists.default)(quill);
      var modulesConfig = (0, _extend.extend)({}, {
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
          onDrop: function onDrop(e) {
            return _this2._saveValueChangeEvent((0, _index2.Event)(e));
          },
          imageBlot: 'extendedImage'
        },
        keyboard: {
          onKeydown: function onKeydown(e) {
            return _this2._saveValueChangeEvent((0, _index2.Event)(e));
          }
        },
        clipboard: {
          onPaste: function onPaste(e) {
            return _this2._saveValueChangeEvent((0, _index2.Event)(e));
          },
          onCut: function onCut(e) {
            return _this2._saveValueChangeEvent((0, _index2.Event)(e));
          },
          matchers: [['p.MsoListParagraphCxSpFirst', wordListMatcher], ['p.MsoListParagraphCxSpMiddle', wordListMatcher], ['p.MsoListParagraphCxSpLast', wordListMatcher]]
        },
        multiline: Boolean(this.option('allowSoftLineBreak'))
      }, this._getCustomModules());
      return modulesConfig;
    },
    _getModuleConfigByOption: function _getModuleConfigByOption(userOptionName) {
      var optionValue = this.option(userOptionName);
      var config = {};
      if (!(0, _type.isDefined)(optionValue)) {
        return undefined;
      }
      if (Array.isArray(optionValue)) {
        config[userOptionName] = optionValue;
      } else {
        config = optionValue;
      }
      return (0, _extend.extend)(this._getBaseModuleConfig(), config);
    },
    _getBaseModuleConfig: function _getBaseModuleConfig() {
      return {
        editorInstance: this
      };
    },
    _getCustomModules: function _getCustomModules() {
      var _this3 = this;
      var modules = {};
      var moduleNames = this._getRegistrator().getRegisteredModuleNames();
      moduleNames.forEach(function (modulePath) {
        modules[modulePath] = _this3._getBaseModuleConfig();
      });
      return modules;
    },
    _textChangeHandler: function _textChangeHandler(newDelta, oldDelta, source) {
      var htmlMarkup = this._deltaConverter.toHtml();
      var convertedValue = this._isMarkdownValue() ? this._updateValueByType(MARKDOWN_VALUE_TYPE, htmlMarkup) : htmlMarkup;
      var currentValue = this.option('value');
      if (currentValue !== convertedValue && !this._isNullValueConverted(currentValue, convertedValue)) {
        this._isEditorUpdating = true;
        this.option('value', convertedValue);
      }
      this._finalizeContentRendering();
    },
    _isNullValueConverted: function _isNullValueConverted(currentValue, convertedValue) {
      return currentValue === null && convertedValue === '';
    },
    _finalizeContentRendering: function _finalizeContentRendering() {
      if (this._contentRenderedDeferred) {
        this.clearHistory();
        this._contentInitializedCallback.fire();
        this._contentRenderedDeferred.resolve();
        this._contentRenderedDeferred = undefined;
      }
    },
    _updateValueByType: function _updateValueByType(valueType, value) {
      var converter = this._markdownConverter;
      if (!(0, _type.isDefined)(converter)) {
        return;
      }
      var currentValue = (0, _common.ensureDefined)(value, this.option('value'));
      return valueType === MARKDOWN_VALUE_TYPE ? converter.toMarkdown(currentValue) : converter.toHtml(currentValue);
    },
    _isMarkdownValue: function _isMarkdownValue() {
      return this.option('valueType') === MARKDOWN_VALUE_TYPE;
    },
    _resetEnabledState: function _resetEnabledState() {
      if (this._quillInstance) {
        var isEnabled = !(this.option('readOnly') || this.option('disabled'));
        this._quillInstance.enable(isEnabled);
      }
    },
    _renderFormDialog: function _renderFormDialog() {
      var userOptions = (0, _extend.extend)(true, {
        width: 'auto',
        height: 'auto',
        hideOnOutsideClick: true
      }, this.option('formDialogOptions'));
      this._formDialog = new _formDialog.default(this, userOptions);
    },
    _getStylingModePrefix: function _getStylingModePrefix() {
      return 'dx-htmleditor-';
    },
    _getQuillContainer: function _getQuillContainer() {
      return this._$htmlContainer;
    },
    _prepareModuleOptions: function _prepareModuleOptions(args) {
      var _args$fullName;
      var optionData = (_args$fullName = args.fullName) === null || _args$fullName === void 0 ? void 0 : _args$fullName.split('.');
      var value = args.value;
      var optionName = optionData.length >= 2 ? optionData[1] : args.name;
      if (optionData.length === 3) {
        value = _defineProperty({}, optionData[2], value);
      }
      return [optionName, value];
    },
    _moduleOptionChanged: function _moduleOptionChanged(moduleName, args) {
      var moduleInstance = this.getModule(moduleName);
      var shouldPassOptionsToModule = Boolean(moduleInstance);
      if (shouldPassOptionsToModule) {
        moduleInstance.option.apply(moduleInstance, _toConsumableArray(this._prepareModuleOptions(args)));
      } else {
        this._invalidate();
      }
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'value':
          {
            if (this._quillInstance) {
              if (this._isEditorUpdating) {
                this._isEditorUpdating = false;
              } else {
                var updatedValue = this._isMarkdownValue() ? this._updateValueByType('HTML', args.value) : args.value;
                this._suppressValueChangeAction();
                this._updateHtmlContent(updatedValue);
                this._resumeValueChangeAction();
              }
            } else {
              this._$htmlContainer.html(args.value);
            }

            // NOTE: value can be optimized by Quill
            var value = this.option('value');
            if (value !== args.previousValue) {
              this._setSubmitValue(value);
              this.callBase(_extends({}, args, {
                value: value
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
        case 'valueType':
          {
            this._prepareConverters();
            var newValue = this._updateValueByType(args.value);
            if (args.value === 'html' && this._quillInstance) {
              this._updateHtmlContent(newValue);
            } else {
              this.option('value', newValue);
            }
            break;
          }
        case 'stylingMode':
          this._renderStylingMode();
          break;
        case 'readOnly':
        case 'disabled':
          this.callBase(args);
          this._resetEnabledState();
          break;
        case 'formDialogOptions':
          this._renderFormDialog();
          break;
        case 'tableContextMenu':
          this._moduleOptionChanged('tableContextMenu', args);
          break;
        case 'mediaResizing':
          if (!args.previousValue || !args.value) {
            this._invalidate();
          } else {
            this.getModule('resizing').option(args.name, args.value);
          }
          break;
        case 'width':
          this.callBase(args);
          this._repaintToolbar();
          break;
        case 'imageUpload':
          this._moduleOptionChanged('imageUpload', args);
          break;
        default:
          this.callBase(args);
      }
    },
    _repaintToolbar: function _repaintToolbar() {
      this._applyToolbarMethod('repaint');
    },
    _updateHtmlContent: function _updateHtmlContent(html) {
      var newDelta = this._quillInstance.clipboard.convert({
        html: html
      });
      this._quillInstance.setContents(newDelta);
    },
    _clean: function _clean() {
      if (this._quillInstance) {
        _events_engine.default.off(this._getContent(), ".".concat(this.NAME));
        this._quillInstance.off('text-change', this._textChangeHandlerWithContext);
        this._cleanCallback.fire();
      }
      this._abortUpdateContentTask();
      this._cleanCallback.empty();
      this._contentInitializedCallback.empty();
      this.callBase();
    },
    _abortUpdateContentTask: function _abortUpdateContentTask() {
      if (this._updateContentTask) {
        this._updateContentTask.abort();
        this._updateContentTask = undefined;
      }
    },
    _applyQuillMethod: function _applyQuillMethod(methodName, args) {
      if (this._quillInstance) {
        return this._quillInstance[methodName].apply(this._quillInstance, args);
      }
    },
    _applyQuillHistoryMethod: function _applyQuillHistoryMethod(methodName) {
      if (this._quillInstance && this._quillInstance.history) {
        this._quillInstance.history[methodName]();
      }
    },
    _applyToolbarMethod: function _applyToolbarMethod(methodName) {
      var _this$getModule;
      (_this$getModule = this.getModule('toolbar')) === null || _this$getModule === void 0 ? void 0 : _this$getModule[methodName]();
    },
    addCleanCallback: function addCleanCallback(callback) {
      this._cleanCallback.add(callback);
    },
    addContentInitializedCallback: function addContentInitializedCallback(callback) {
      this._contentInitializedCallback.add(callback);
    },
    register: function register(components) {
      this._getRegistrator().registerModules(components);
      if (this._quillInstance) {
        this.repaint();
      }
    },
    get: function get(modulePath) {
      return this._getRegistrator().getQuill().import(modulePath);
    },
    getModule: function getModule(moduleName) {
      return this._applyQuillMethod('getModule', arguments);
    },
    getQuillInstance: function getQuillInstance() {
      return this._quillInstance;
    },
    getSelection: function getSelection(focus) {
      return this._applyQuillMethod('getSelection', arguments);
    },
    setSelection: function setSelection(index, length) {
      this._applyQuillMethod('setSelection', arguments);
    },
    getText: function getText(index, length) {
      return this._applyQuillMethod('getText', arguments);
    },
    format: function format(formatName, formatValue) {
      this._applyQuillMethod('format', arguments);
    },
    formatText: function formatText(index, length, formatName, formatValue) {
      this._applyQuillMethod('formatText', arguments);
    },
    formatLine: function formatLine(index, length, formatName, formatValue) {
      this._applyQuillMethod('formatLine', arguments);
    },
    getFormat: function getFormat(index, length) {
      return this._applyQuillMethod('getFormat', arguments);
    },
    removeFormat: function removeFormat(index, length) {
      return this._applyQuillMethod('removeFormat', arguments);
    },
    clearHistory: function clearHistory() {
      this._applyQuillHistoryMethod('clear');
      this._applyToolbarMethod('updateHistoryWidgets');
    },
    undo: function undo() {
      this._applyQuillHistoryMethod('undo');
    },
    redo: function redo() {
      this._applyQuillHistoryMethod('redo');
    },
    getLength: function getLength() {
      return this._applyQuillMethod('getLength');
    },
    getBounds: function getBounds(index, length) {
      return this._applyQuillMethod('getBounds', arguments);
    },
    delete: function _delete(index, length) {
      this._applyQuillMethod('deleteText', arguments);
    },
    insertText: function insertText(index, text, formats) {
      this._applyQuillMethod('insertText', arguments);
    },
    insertEmbed: function insertEmbed(index, type, config) {
      this._applyQuillMethod('insertEmbed', arguments);
    },
    showFormDialog: function showFormDialog(formConfig) {
      return this._formDialog.show(formConfig);
    },
    formDialogOption: function formDialogOption(optionName, optionValue) {
      return this._formDialog.popupOption.apply(this._formDialog, arguments);
    },
    focus: function focus() {
      this.callBase();
      this._applyQuillMethod('focus');
    },
    blur: function blur() {
      this._applyQuillMethod('blur');
    },
    getMentionKeyInTemplateStorage: function getMentionKeyInTemplateStorage() {
      return this._mentionKeyInTemplateStorage;
    }
  });
  (0, _component_registrator.default)('dxHtmlEditor', HtmlEditor);
  var _default = HtmlEditor;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/extend","../../core/utils/type","../../core/element","../../core/utils/common","../../core/component_registrator","../../core/templates/empty_template","../editor/editor","../widget/ui.errors","../../core/utils/callbacks","../../core/utils/deferred","../../events/core/events_engine","../../events/utils/index","../../events/index","../../events/gesture/emitter.gesture.scroll","../text_box/utils.scroll","../../events/pointer","../../core/devices","./quill_registrator","./converters/delta","./converterController","./matchers/wordLists","./ui/formDialog","../../core/config"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/extend"), require("../../core/utils/type"), require("../../core/element"), require("../../core/utils/common"), require("../../core/component_registrator"), require("../../core/templates/empty_template"), require("../editor/editor"), require("../widget/ui.errors"), require("../../core/utils/callbacks"), require("../../core/utils/deferred"), require("../../events/core/events_engine"), require("../../events/utils/index"), require("../../events/index"), require("../../events/gesture/emitter.gesture.scroll"), require("../text_box/utils.scroll"), require("../../events/pointer"), require("../../core/devices"), require("./quill_registrator"), require("./converters/delta"), require("./converterController"), require("./matchers/wordLists"), require("./ui/formDialog"), require("../../core/config"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.html_editor.js.map