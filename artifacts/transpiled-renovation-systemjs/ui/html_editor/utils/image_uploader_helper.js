!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/html_editor/utils/image_uploader_helper.js"], ["../../../core/renderer","../../../localization/message","../../../core/utils/iterator","../../../core/utils/extend","../../../core/utils/size","../../../core/devices","../../../core/utils/type","../../button_group","../../file_uploader","../../text_box"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/html_editor/utils/image_uploader_helper.js", ["../../../core/renderer", "../../../localization/message", "../../../core/utils/iterator", "../../../core/utils/extend", "../../../core/utils/size", "../../../core/devices", "../../../core/utils/type", "../../button_group", "../../file_uploader", "../../text_box"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.ImageUploader = void 0;
  exports.correctSlashesInUrl = correctSlashesInUrl;
  exports.getFileUploaderBaseOptions = getFileUploaderBaseOptions;
  exports.serverUpload = serverUpload;
  exports.urlUpload = urlUpload;
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _message = _interopRequireDefault($__require("../../../localization/message"));
  var _iterator = $__require("../../../core/utils/iterator");
  var _extend = $__require("../../../core/utils/extend");
  var _size = $__require("../../../core/utils/size");
  var _devices = _interopRequireDefault($__require("../../../core/devices"));
  var _type = $__require("../../../core/utils/type");
  var _button_group = _interopRequireDefault($__require("../../button_group"));
  var _file_uploader = _interopRequireDefault($__require("../../file_uploader"));
  var _text_box = _interopRequireDefault($__require("../../text_box"));
  var _excluded = ["imageSrc", "src"];
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
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];
      }
    }return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];
    }return target;
  }
  var isMobile = _devices.default.current().deviceType === 'phone';
  var DIALOG_IMAGE_CAPTION = 'dxHtmlEditor-dialogImageCaption';
  var DIALOG_UPDATE_IMAGE_CAPTION = 'dxHtmlEditor-dialogUpdateImageCaption';
  var DIALOG_IMAGE_FIELD_URL = 'dxHtmlEditor-dialogImageUrlField';
  var DIALOG_IMAGE_FIELD_ALT = 'dxHtmlEditor-dialogImageAltField';
  var DIALOG_IMAGE_FIELD_WIDTH = 'dxHtmlEditor-dialogImageWidthField';
  var DIALOG_IMAGE_FIELD_HEIGHT = 'dxHtmlEditor-dialogImageHeightField';
  var DIALOG_IMAGE_ADD_BUTTON = 'dxHtmlEditor-dialogImageAddButton';
  var DIALOG_IMAGE_UPDATE_BUTTON = 'dxHtmlEditor-dialogImageUpdateButton';
  var DIALOG_IMAGE_SPECIFY_URL = 'dxHtmlEditor-dialogImageSpecifyUrl';
  var DIALOG_IMAGE_SELECT_FILE = 'dxHtmlEditor-dialogImageSelectFile';
  var DIALOG_IMAGE_KEEP_ASPECT_RATIO = 'dxHtmlEditor-dialogImageKeepAspectRatio';
  var DIALOG_IMAGE_ENCODE_TO_BASE64 = 'dxHtmlEditor-dialogImageEncodeToBase64';
  var DIALOG_IMAGE_POPUP_CLASS = 'dx-htmleditor-add-image-popup';
  var DIALOG_IMAGE_POPUP_WITH_TABS_CLASS = 'dx-htmleditor-add-image-popup-with-tabs';
  var DIALOG_IMAGE_FIX_RATIO_CONTAINER = 'dx-fix-ratio-container';
  var FORM_DIALOG_CLASS = 'dx-formdialog';
  var USER_ACTION = 'user';
  var SILENT_ACTION = 'silent';
  var FILE_UPLOADER_NAME = 'dx-htmleditor-image';
  var ImageUploader = /*#__PURE__*/function () {
    function ImageUploader(module, config) {
      this.module = module;
      this.config = config !== null && config !== void 0 ? config : {};
      this.quill = this.module.quill;
      this.editorInstance = this.module.editorInstance;
    }
    var _proto = ImageUploader.prototype;
    _proto.render = function render() {
      var _this = this;
      if (this.editorInstance._formDialog) {
        this.editorInstance._formDialog.beforeAddButtonAction = function () {
          return _this.getCurrentTab().upload();
        };
      }
      this.tabPanelIndex = 0;
      this.formData = this.getFormData();
      this.isUpdating = this.isImageUpdating();
      this.tabsModel = this.createTabsModel(this.config.tabs);
      this.tabs = this.createTabs(this.formData);
      var formConfig = this.getFormConfig();
      this.updatePopupConfig();
      this.updateAddButtonState();
      this.editorInstance.showFormDialog(formConfig).done(function (formData, event) {
        _this.tabs[_this.getActiveTabIndex()].strategy.pasteImage(formData, event);
      }).always(function () {
        _this.resetDialogPopupOptions();
        _this.quill.focus();
      });
    };
    _proto.getCurrentTab = function getCurrentTab() {
      return this.tabs[this.tabPanelIndex];
    };
    _proto.updateAddButtonState = function updateAddButtonState() {
      var isDisabled = this.getCurrentTab().isDisableButton();
      this.setAddButtonDisabled(isDisabled);
    };
    _proto.setAddButtonDisabled = function setAddButtonDisabled(value) {
      this.editorInstance.formDialogOption({
        'toolbarItems[0].options.disabled': value
      });
    };
    _proto.getActiveTabIndex = function getActiveTabIndex() {
      return this.isUpdating ? 0 : this.tabPanelIndex;
    };
    _proto.getFormData = function getFormData() {
      return this.getUpdateDialogFormData(this.quill.getFormat());
    };
    _proto.getUpdateDialogFormData = function getUpdateDialogFormData(formData) {
      var imageSrc = formData.imageSrc,
          src = formData.src,
          props = _objectWithoutProperties(formData, _excluded);
      return _extends({
        src: imageSrc !== null && imageSrc !== void 0 ? imageSrc : src
      }, props);
    };
    _proto.createUrlTab = function createUrlTab(formData) {
      var _this2 = this;
      return new UrlTab(this.module, {
        config: this.config,
        formData: formData,
        isUpdating: this.isUpdating
      }, function () {
        return _this2.updateAddButtonState();
      });
    };
    _proto.createFileTab = function createFileTab() {
      var _this3 = this;
      return new FileTab(this.module, {
        config: this.config
      }, function () {
        return _this3.updateAddButtonState();
      });
    };
    _proto.createTabsModel = function createTabsModel() {
      var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      if (model.length === 0 || this.isUpdating) {
        return ['url'];
      }
      return model.map(function (tab) {
        return _typeof(tab) === 'object' ? tab.name : tab;
      });
    };
    _proto.createTabs = function createTabs(formData) {
      var _this4 = this;
      return this.tabsModel.map(function (tabName) {
        var isUrlTab = tabName === 'url';
        return isUrlTab ? _this4.createUrlTab(formData) : _this4.createFileTab();
      });
    };
    _proto.isImageUpdating = function isImageUpdating() {
      var _this$module$quill$ge;
      return Object.prototype.hasOwnProperty.call((_this$module$quill$ge = this.module.quill.getFormat()) !== null && _this$module$quill$ge !== void 0 ? _this$module$quill$ge : {}, 'imageSrc');
    };
    _proto.updatePopupConfig = function updatePopupConfig() {
      var wrapperClasses = "".concat(DIALOG_IMAGE_POPUP_CLASS, " ").concat(FORM_DIALOG_CLASS);
      if (this.useTabbedItems()) {
        wrapperClasses += " ".concat(DIALOG_IMAGE_POPUP_WITH_TABS_CLASS);
      }
      var titleKey = this.isUpdating ? DIALOG_UPDATE_IMAGE_CAPTION : DIALOG_IMAGE_CAPTION;
      var addButtonTextKey = this.isUpdating ? DIALOG_IMAGE_UPDATE_BUTTON : DIALOG_IMAGE_ADD_BUTTON;
      this.editorInstance.formDialogOption({
        title: _message.default.format(titleKey),
        'toolbarItems[0].options.text': _message.default.format(addButtonTextKey),
        'wrapperAttr': {
          class: wrapperClasses
        }
      });
    };
    _proto.resetDialogPopupOptions = function resetDialogPopupOptions() {
      this.editorInstance.formDialogOption({
        'toolbarItems[0].options.text': _message.default.format('OK'),
        'toolbarItems[0].options.visible': true,
        'toolbarItems[0].options.disabled': false,
        wrapperAttr: {
          class: FORM_DIALOG_CLASS
        }
      });
    };
    _proto.useTabbedItems = function useTabbedItems() {
      return this.tabsModel.length > 1;
    };
    _proto.getFormWidth = function getFormWidth() {
      return isMobile ? '100%' : 493;
    };
    _proto.getFormConfig = function getFormConfig() {
      return {
        formData: this.formData,
        width: this.getFormWidth(),
        labelLocation: 'top',
        colCount: this.useTabbedItems() ? 1 : 11,
        items: this.getItemsConfig()
      };
    };
    _proto.getItemsConfig = function getItemsConfig() {
      var _this5 = this;
      if (this.useTabbedItems()) {
        var tabsConfig = (0, _iterator.map)(this.tabs, function (tabController) {
          return {
            title: tabController.getTabName(),
            colCount: 11,
            items: tabController.getItemsConfig()
          };
        });
        return [{
          itemType: 'tabbed',
          tabPanelOptions: {
            onSelectionChanged: function onSelectionChanged(e) {
              _this5.tabPanelIndex = e.component.option('selectedIndex');
              _this5.updateAddButtonState();
            }
          },
          tabs: tabsConfig
        }];
      }
      return this.tabs[0].getItemsConfig();
    };
    return ImageUploader;
  }();
  exports.ImageUploader = ImageUploader;
  var BaseTab = /*#__PURE__*/function () {
    function BaseTab(module, _ref, onFileSelected) {
      var config = _ref.config,
          formData = _ref.formData,
          isUpdating = _ref.isUpdating;
      this.module = module;
      this.config = config;
      this.formData = formData;
      this.isUpdating = isUpdating;
      this.onFileSelected = onFileSelected;
      this.strategy = this.createStrategy();
    }
    var _proto2 = BaseTab.prototype;
    _proto2.getItemsConfig = function getItemsConfig() {
      return this.strategy.getItemsConfig();
    };
    _proto2.createStrategy = function createStrategy() {
      return this.isUpdating ? new UpdateUrlStrategy(this.module, this.config, this.formData) : new AddUrlStrategy(this.module, this.config, this.onFileSelected);
    };
    _proto2.isDisableButton = function isDisableButton() {
      return false;
    };
    _proto2.upload = function upload() {
      return this.strategy.upload();
    };
    return BaseTab;
  }();
  var UrlTab = /*#__PURE__*/function (_BaseTab) {
    _inheritsLoose(UrlTab, _BaseTab);
    function UrlTab() {
      return _BaseTab.apply(this, arguments) || this;
    }
    var _proto3 = UrlTab.prototype;
    _proto3.getTabName = function getTabName() {
      return _message.default.format(DIALOG_IMAGE_SPECIFY_URL);
    };
    return UrlTab;
  }(BaseTab);
  var FileTab = /*#__PURE__*/function (_BaseTab2) {
    _inheritsLoose(FileTab, _BaseTab2);
    function FileTab() {
      return _BaseTab2.apply(this, arguments) || this;
    }
    var _proto4 = FileTab.prototype;
    _proto4.getTabName = function getTabName() {
      return _message.default.format(DIALOG_IMAGE_SELECT_FILE);
    };
    _proto4.createStrategy = function createStrategy() {
      return new FileStrategy(this.module, this.config, this.onFileSelected);
    };
    _proto4.isDisableButton = function isDisableButton() {
      return !this.strategy.isValid();
    };
    return FileTab;
  }(BaseTab);
  var BaseStrategy = /*#__PURE__*/function () {
    function BaseStrategy(module, config) {
      this.module = module;
      this.config = config;
      this.editorInstance = module.editorInstance;
      this.quill = module.quill;
      this.selection = this.getQuillSelection();
    }
    var _proto5 = BaseStrategy.prototype;
    _proto5.getQuillSelection = function getQuillSelection() {
      var selection = this.quill.getSelection();
      return selection !== null && selection !== void 0 ? selection : {
        index: this.quill.getLength(),
        length: 0
      };
    };
    _proto5.pasteImage = function pasteImage() {};
    _proto5.isValid = function isValid() {
      return true;
    };
    _proto5.upload = function upload() {};
    return BaseStrategy;
  }();
  var AddUrlStrategy = /*#__PURE__*/function (_BaseStrategy) {
    _inheritsLoose(AddUrlStrategy, _BaseStrategy);
    function AddUrlStrategy(module, config, onFileSelected) {
      var _this6;
      _this6 = _BaseStrategy.call(this, module, config, onFileSelected) || this;
      _this6.shouldKeepAspectRatio = true;
      return _this6;
    }
    var _proto6 = AddUrlStrategy.prototype;
    _proto6.pasteImage = function pasteImage(formData, event) {
      this.module.saveValueChangeEvent(event);
      urlUpload(this.quill, this.selection.index, formData);
    };
    _proto6.keepAspectRatio = function keepAspectRatio(data, _ref2) {
      var dependentEditor = _ref2.dependentEditor,
          e = _ref2.e;
      var newValue = parseInt(e.value);
      var previousValue = parseInt(e.previousValue);
      var previousDependentEditorValue = parseInt(dependentEditor.option('value'));
      data.component.updateData(data.dataField, newValue);
      if (this.shouldKeepAspectRatio && previousDependentEditorValue && previousValue && !this.preventRecalculating) {
        this.preventRecalculating = true;
        dependentEditor.option('value', Math.round(newValue * previousDependentEditorValue / parseInt(previousValue)).toString());
      }
      this.preventRecalculating = false;
    };
    _proto6.createKeepAspectRatioEditor = function createKeepAspectRatioEditor($container, data, dependentEditorDataField) {
      var _this7 = this;
      return this.editorInstance._createComponent($container, _text_box.default, (0, _extend.extend)(true, data.editorOptions, {
        value: data.component.option('formData')[data.dataField],
        onEnterKey: data.component.option('onEditorEnterKey').bind(this.editorInstance._formDialog, data),
        onValueChanged: function onValueChanged(e) {
          _this7.keepAspectRatio(data, {
            dependentEditor: _this7[dependentEditorDataField + 'Editor'],
            e: e
          });
        }
      }));
    };
    _proto6.upload = function upload() {
      var result = this.editorInstance._formDialog._form.validate();
      return result.isValid;
    };
    _proto6.getItemsConfig = function getItemsConfig() {
      var _this8 = this;
      return [{
        dataField: 'src',
        colSpan: 11,
        label: {
          text: _message.default.format(DIALOG_IMAGE_FIELD_URL)
        },
        validationRules: [{
          type: 'required'
        }, {
          type: 'stringLength',
          min: 1
        }]
      }, {
        dataField: 'width',
        colSpan: 6,
        label: {
          text: _message.default.format(DIALOG_IMAGE_FIELD_WIDTH)
        },
        template: function template(data) {
          var $content = (0, _renderer.default)('<div>').addClass(DIALOG_IMAGE_FIX_RATIO_CONTAINER);
          var $widthEditor = (0, _renderer.default)('<div>').appendTo($content);
          _this8.widthEditor = _this8.createKeepAspectRatioEditor($widthEditor, data, 'height');
          var $ratioEditor = (0, _renderer.default)('<div>').appendTo($content);
          _this8.editorInstance._createComponent($ratioEditor, _button_group.default, {
            items: [{
              icon: 'imgarlock',
              value: 'keepRatio'
            }],
            hint: _message.default.format(DIALOG_IMAGE_KEEP_ASPECT_RATIO),
            focusStateEnabled: false,
            keyExpr: 'value',
            stylingMode: 'outlined',
            selectionMode: 'multiple',
            selectedItemKeys: ['keepRatio'],
            onSelectionChanged: function onSelectionChanged(e) {
              _this8.shouldKeepAspectRatio = !!e.component.option('selectedItems').length;
            }
          });
          return $content;
        }
      }, {
        dataField: 'height',
        colSpan: 5,
        label: {
          text: _message.default.format(DIALOG_IMAGE_FIELD_HEIGHT)
        },
        template: function template(data) {
          var $content = (0, _renderer.default)('<div>');
          _this8.heightEditor = _this8.createKeepAspectRatioEditor($content, data, 'width');
          return $content;
        }
      }, {
        dataField: 'alt',
        colSpan: 11,
        label: {
          text: _message.default.format(DIALOG_IMAGE_FIELD_ALT)
        }
      }];
    };
    return AddUrlStrategy;
  }(BaseStrategy);
  var UpdateUrlStrategy = /*#__PURE__*/function (_AddUrlStrategy) {
    _inheritsLoose(UpdateUrlStrategy, _AddUrlStrategy);
    function UpdateUrlStrategy(module, config, formData, onFileSelected) {
      var _this9;
      _this9 = _AddUrlStrategy.call(this, module, config, onFileSelected) || this;
      _this9.formData = formData;
      _this9.modifyFormData();
      return _this9;
    }
    var _proto7 = UpdateUrlStrategy.prototype;
    _proto7.modifyFormData = function modifyFormData() {
      var _this$quill$getFormat = this.quill.getFormat(this.selection.index - 1, 1),
          imageSrc = _this$quill$getFormat.imageSrc;
      if (!imageSrc || this.selection.index === 0) {
        this.selection = {
          index: this.selection.index + 1,
          length: 0
        };
        this.quill.setSelection(this.selection.index, this.selection.length, SILENT_ACTION);
      }
      var imgElement = this.quill.getLeaf(this.selection.index)[0].domNode;
      if (imgElement) {
        var _this$formData$width, _this$formData$height;
        this.formData.width = (_this$formData$width = this.formData.width) !== null && _this$formData$width !== void 0 ? _this$formData$width : (0, _size.getWidth)((0, _renderer.default)(imgElement));
        this.formData.height = (_this$formData$height = this.formData.height) !== null && _this$formData$height !== void 0 ? _this$formData$height : (0, _size.getHeight)((0, _renderer.default)(imgElement));
      }
    };
    _proto7.pasteImage = function pasteImage(formData, event) {
      this.quill.deleteText(this.embedFormatIndex(), 1, SILENT_ACTION);
      this.selection.index -= 1;
      _AddUrlStrategy.prototype.pasteImage.call(this, formData, event);
    };
    _proto7.embedFormatIndex = function embedFormatIndex() {
      var _this$selection;
      var selection = (_this$selection = this.selection) !== null && _this$selection !== void 0 ? _this$selection : this.quill.getSelection();
      if (selection) {
        if (selection.length) {
          return selection.index;
        } else {
          return selection.index - 1;
        }
      } else {
        return this.quill.getLength();
      }
    };
    return UpdateUrlStrategy;
  }(AddUrlStrategy);
  var FileStrategy = /*#__PURE__*/function (_BaseStrategy2) {
    _inheritsLoose(FileStrategy, _BaseStrategy2);
    function FileStrategy(module, config, onFileSelected) {
      var _this10;
      _this10 = _BaseStrategy2.call(this, module, config, onFileSelected) || this;
      _this10.useBase64 = !(0, _type.isDefined)(_this10.config.fileUploadMode) || _this10.config.fileUploadMode === 'base64';
      _this10.isValidInternal = false;
      _this10.onFileSelected = onFileSelected;
      _this10.data = null;
      return _this10;
    }
    var _proto8 = FileStrategy.prototype;
    _proto8.upload = function upload() {
      if (this.useBase64) {
        this.base64Upload(this.data);
      } else if (this.data.value.length) {
        this.data.component.upload();
      }
      return true;
    };
    _proto8.isValid = function isValid() {
      return this.isValidInternal;
    };
    _proto8.onUploaded = function onUploaded(data) {
      serverUpload(this.config.uploadDirectory, data.file.name, this.quill, this.selection.index);
    };
    _proto8.base64Upload = function base64Upload(data) {
      this.quill.getModule('uploader').upload(this.selection, data.value, true);
    };
    _proto8.pasteImage = function pasteImage(formData, event) {
      if (this.useBase64) {
        _BaseStrategy2.prototype.pasteImage.call(this, formData, event);
      }
    };
    _proto8.isBase64Editable = function isBase64Editable() {
      return this.config.fileUploadMode === 'both';
    };
    _proto8.validate = function validate(e) {
      var fileUploader = e.component;
      this.isValidInternal = !fileUploader._files.some(function (file) {
        return !file.isValid();
      });
      if (fileUploader._files.length === 0) {
        this.isValidInternal = false;
      }
    };
    _proto8.getFileUploaderOptions = function getFileUploaderOptions() {
      var _this11 = this;
      var fileUploaderOptions = {
        uploadUrl: this.config.uploadUrl,
        onValueChanged: function onValueChanged(data) {
          _this11.validate(data);
          _this11.data = data;
          _this11.onFileSelected();
        },
        onUploaded: function onUploaded(e) {
          return _this11.onUploaded(e);
        }
      };
      return (0, _extend.extend)({}, getFileUploaderBaseOptions(), fileUploaderOptions, this.config.fileUploaderOptions);
    };
    _proto8.getItemsConfig = function getItemsConfig() {
      var _this12 = this;
      return [{
        itemType: 'simple',
        dataField: 'files',
        colSpan: 11,
        label: {
          visible: false
        },
        template: function template() {
          var $content = (0, _renderer.default)('<div>');
          _this12.module.editorInstance._createComponent($content, _file_uploader.default, _this12.getFileUploaderOptions());
          return $content;
        }
      }, {
        itemType: 'simple',
        colSpan: 11,
        label: {
          visible: false
        },
        editorType: 'dxCheckBox',
        editorOptions: {
          value: this.useBase64,
          visible: this.isBase64Editable(),
          text: _message.default.format(DIALOG_IMAGE_ENCODE_TO_BASE64),
          onValueChanged: function onValueChanged(e) {
            if (_this12.isBase64Editable()) {
              _this12.useBase64 = e.value;
            }
          }
        }
      }];
    };
    return FileStrategy;
  }(BaseStrategy);
  function correctSlashesInUrl(url) {
    return url[url.length - 1] !== '/' ? url + '/' : url;
  }
  function getFileUploaderBaseOptions() {
    return {
      value: [],
      name: FILE_UPLOADER_NAME,
      accept: 'image/*',
      uploadMode: 'useButtons'
    };
  }
  function urlUpload(quill, index, attributes) {
    quill.insertEmbed(index, 'extendedImage', attributes, USER_ACTION);
    quill.setSelection(index + 1, 0, USER_ACTION);
  }
  function serverUpload(url, fileName, quill, pasteIndex) {
    if (url) {
      var imageUrl = correctSlashesInUrl(url) + fileName;
      urlUpload(quill, pasteIndex, {
        src: imageUrl
      });
    }
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/renderer","../../../localization/message","../../../core/utils/iterator","../../../core/utils/extend","../../../core/utils/size","../../../core/devices","../../../core/utils/type","../../button_group","../../file_uploader","../../text_box"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/renderer"), require("../../../localization/message"), require("../../../core/utils/iterator"), require("../../../core/utils/extend"), require("../../../core/utils/size"), require("../../../core/devices"), require("../../../core/utils/type"), require("../../button_group"), require("../../file_uploader"), require("../../text_box"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=image_uploader_helper.js.map