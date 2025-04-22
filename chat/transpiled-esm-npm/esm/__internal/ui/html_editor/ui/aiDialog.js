import _extends from "@babel/runtime/helpers/esm/extends";
import localizationMessage from '../../../../common/core/localization/message';
import $ from '../../../../core/renderer';
import { extend } from '../../../../core/utils/extend';
import SelectBox from '../../../../ui/select_box';
import TextArea from '../../../../ui/text_area';
import BaseDialog from './m_baseDialog';
const AI_DIALOG_COMMANDS_WITH_OPTIONS = ['translate', 'changeStyle', 'changeTone', 'custom'];
const AI_DIALOG_CLASS = 'dx-aidialog';
const AI_DIALOG_CONTROLS_CLASS = 'dx-aidialog-controls';
const AI_DIALOG_CONTENT_CLASS = 'dx-aidialog-content';
const AI_DIALOG_TITLE_CLASS = 'dx-aidialog-title';
const AI_DIALOG_TITLE_TEXT_CLASS = 'dx-aidialog-title-text';
const ICON_CLASS = 'dx-icon';
const ICON_SPARKLE_CLASS = 'dx-icon-sparkle';
const POPUP_MIN_WIDTH = 288;
const POPUP_MAX_WIDTH = 460;
const REPLACE_DROPDOWN_WIDTH = 150;
const TEXT_AREA_MIN_HEIGHT = 64;
const TEXT_AREA_MAX_HEIGHT = 128;
var DialogState;
(function (DialogState) {
  DialogState["Initial"] = "initial";
  DialogState["Asking"] = "asking";
  DialogState["Generating"] = "generating";
  DialogState["ResultReady"] = "resultReady";
  DialogState["Error"] = "error";
})(DialogState || (DialogState = {}));
var ReplaceButtonActions;
(function (ReplaceButtonActions) {
  ReplaceButtonActions["Replace"] = "replace";
  ReplaceButtonActions["InsertAbove"] = "insertAbove";
  ReplaceButtonActions["InsertBelow"] = "insertBelow";
})(ReplaceButtonActions || (ReplaceButtonActions = {}));
export default class AIDialog extends BaseDialog {
  constructor($container, aiIntegration, popupConfig) {
    super($container, popupConfig);
    this._dialogState = DialogState.Initial;
    this._isAskAICommandSelected = false;
    this._commandsMap = {};
    this._resultText = '';
    this._askAIPrompt = '';
    this._commandChangeSuppressed = false;
    this._aiIntegration = aiIntegration;
  }
  _getPopupConfig() {
    const baseConfig = super._getPopupConfig();
    return extend(true, {}, baseConfig, _extends({
      minWidth: POPUP_MIN_WIDTH,
      maxWidth: POPUP_MAX_WIDTH,
      height: 'auto',
      shading: true,
      shadingColor: 'transparent',
      dragEnabled: true,
      dragAndResizeArea: this._$container,
      toolbarItems: this._getToolbarItems(),
      hideOnOutsideClick: true,
      focusStateEnabled: true,
      showCloseButton: true,
      position: {
        my: 'center',
        at: 'center',
        of: this._$container
      }
    }, this._popupUserConfig));
  }
  _renderCommandSelectBox($container) {
    const $commandSelectBox = $('<div>').appendTo($container);
    this._commandSelectBox = new SelectBox($commandSelectBox.get(0), {
      value: this._currentCommand,
      displayExpr: 'text',
      valueExpr: 'name',
      onValueChanged: e => {
        var _this$_commandsMap$e$, _this$_commandOptions;
        if (this._commandChangeSuppressed) {
          return;
        }
        this._currentCommand = e.value;
        this._commandOptionsList = ((_this$_commandsMap$e$ = this._commandsMap[e.value]) === null || _this$_commandsMap$e$ === void 0 ? void 0 : _this$_commandsMap$e$.options) ?? [];
        this._currentOption = (_this$_commandOptions = this._commandOptionsList) === null || _this$_commandOptions === void 0 ? void 0 : _this$_commandOptions[0];
        this._isAskAICommandSelected = e.value === 'askAI';
        this._askAIPrompt = '';
        this._setDialogState(this._getInitialDialogState());
      }
    });
  }
  _renderOptionSelectBox($container) {
    var _this$_commandOptions2;
    const $optionSelectBox = $('<div>').appendTo($container);
    this._optionSelectBox = new SelectBox($optionSelectBox.get(0), {
      items: this._commandOptionsList,
      value: this._currentOption ?? ((_this$_commandOptions2 = this._commandOptionsList) === null || _this$_commandOptions2 === void 0 ? void 0 : _this$_commandOptions2[0]),
      visible: this._isCommandWithOptionsSelected(),
      onValueChanged: e => {
        this._currentOption = e.value;
      }
    });
  }
  _renderPromptTextArea($container) {
    const $textArea = $('<div>').appendTo($container);
    this._promptTextArea = new TextArea($textArea.get(0), {
      value: this._askAIPrompt,
      minHeight: TEXT_AREA_MIN_HEIGHT,
      maxHeight: TEXT_AREA_MAX_HEIGHT,
      autoResizeEnabled: true,
      width: '100%',
      placeholder: localizationMessage.format('dxHtmlEditor-aiAskPlaceholder'),
      onValueChanged: e => {
        this._askAIPrompt = e.value;
      }
    });
  }
  _renderResultTextArea($container) {
    const $textArea = $('<div>').appendTo($container);
    this._resultTextArea = new TextArea($textArea.get(0), {
      value: this._resultText,
      minHeight: TEXT_AREA_MIN_HEIGHT,
      maxHeight: TEXT_AREA_MAX_HEIGHT,
      autoResizeEnabled: true,
      width: '100%',
      readOnly: true,
      onValueChanged: e => {
        this._resultText = e.value;
      }
    });
  }
  _renderContent($contentElem) {
    $contentElem.addClass(AI_DIALOG_CONTENT_CLASS);
    const $controls = $('<div>').addClass(AI_DIALOG_CONTROLS_CLASS).appendTo($contentElem);
    this._renderCommandSelectBox($controls);
    this._renderOptionSelectBox($controls);
    this._renderPromptTextArea($contentElem);
    this._renderResultTextArea($contentElem);
  }
  _getPopupClass() {
    return AI_DIALOG_CLASS;
  }
  _getTitleItem() {
    return {
      toolbar: 'top',
      location: 'before',
      template: (data, index, titleElement) => {
        const $titleContainer = $('<div>').addClass(AI_DIALOG_TITLE_CLASS);
        const $icon = $('<i>').addClass(`${ICON_CLASS} ${ICON_SPARKLE_CLASS}`);
        const $text = $('<span>').addClass(AI_DIALOG_TITLE_TEXT_CLASS).text(localizationMessage.format('dxHtmlEditor-aiDialogTitle'));
        $titleContainer.append($icon).append($text);
        $(titleElement).append($titleContainer);
      }
    };
  }
  _getReplaceButtonItem(config) {
    return _extends({
      toolbar: 'bottom',
      location: 'before',
      widget: 'dxDropDownButton',
      options: {
        text: localizationMessage.format('dxHtmlEditor-aiReplace'),
        stylingMode: 'contained',
        type: 'default',
        items: [{
          id: ReplaceButtonActions.Replace,
          text: localizationMessage.format('dxHtmlEditor-aiReplace')
        }, {
          id: ReplaceButtonActions.InsertAbove,
          text: localizationMessage.format('dxHtmlEditor-aiInsertAbove')
        }, {
          id: ReplaceButtonActions.InsertBelow,
          text: localizationMessage.format('dxHtmlEditor-aiInsertBelow')
        }],
        dropDownOptions: {
          width: REPLACE_DROPDOWN_WIDTH
        },
        onItemClick: e => this.replaceButtonAction(e)
      }
    }, config);
  }
  _getCopyButtonItem(config) {
    return _extends({
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: localizationMessage.format('dxHtmlEditor-aiCopy'),
        onClick: async () => {
          var _navigator;
          await ((_navigator = navigator) === null || _navigator === void 0 || (_navigator = _navigator.clipboard) === null || _navigator === void 0 ? void 0 : _navigator.writeText(this._resultText));
        }
      }
    }, config);
  }
  _getTryAgainButtonItem() {
    return {
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: localizationMessage.format('dxHtmlEditor-aiTryAgain'),
        onClick: () => this._retryAIRequest()
      }
    };
  }
  _getGenerateButtonItem(config) {
    return _extends({
      toolbar: 'bottom',
      location: 'before',
      widget: 'dxButton',
      options: {
        text: localizationMessage.format('dxHtmlEditor-aiGenerate'),
        type: 'default',
        stylingMode: 'contained',
        onClick: () => this._generateAIResponse()
      }
    }, config);
  }
  _getStopButtonItem(config) {
    return _extends({
      toolbar: 'bottom',
      location: 'after',
      widget: 'dxButton',
      options: {
        text: localizationMessage.format('dxHtmlEditor-aiStop'),
        onClick: () => this._stopGeneration()
      }
    }, config);
  }
  _getToolbarItems() {
    const items = [this._getTitleItem()];
    switch (this._dialogState) {
      case DialogState.Initial:
      case DialogState.ResultReady:
        items.push(this._getReplaceButtonItem(), this._getTryAgainButtonItem(), this._getCopyButtonItem());
        break;
      case DialogState.Asking:
        items.push(this._getGenerateButtonItem(), this._getStopButtonItem({
          disabled: true
        }));
        break;
      case DialogState.Generating:
        items.push(this._getReplaceButtonItem({
          disabled: true
        }), this._getCopyButtonItem({
          disabled: true
        }), this._getStopButtonItem());
        break;
      case DialogState.Error:
        break;
      default:
        break;
    }
    return items;
  }
  _setDialogState(newState) {
    this._dialogState = newState;
    this._syncDialogWithState();
  }
  _syncDialogWithState() {
    this._refreshCommandSelectBox();
    this._refreshOptionSelectBox();
    this._refreshTextAreas();
    this._refreshToolbarItems();
  }
  _refreshToolbarItems() {
    this._popup.option('toolbarItems', this._getToolbarItems());
  }
  _retryAIRequest() {
    this._generateAIResponse();
  }
  _generateAIResponse() {
    // TODO: implement with AI integration
    this._setDialogState(DialogState.Generating);
    this._setDialogState(DialogState.ResultReady);
  }
  _stopGeneration() {
    // TODO: implement actual cancellation of AI request
    this._setDialogState(this._getInitialDialogState());
  }
  _isCommandWithOptionsSelected() {
    return AI_DIALOG_COMMANDS_WITH_OPTIONS.includes(this._currentCommand ?? '');
  }
  _refreshCommandSelectBox() {
    const commandsList = Object.entries(this._commandsMap).map(_ref => {
      let [name, config] = _ref;
      return {
        name,
        text: config.text
      };
    });
    this._commandChangeSuppressed = true;
    this._commandSelectBox.option({
      dataSource: commandsList,
      value: this._currentCommand
    });
    this._commandChangeSuppressed = false;
  }
  _refreshOptionSelectBox() {
    var _this$_commandOptions3;
    const hasOptions = this._isCommandWithOptionsSelected();
    this._optionSelectBox.option({
      visible: hasOptions,
      items: this._commandOptionsList ?? [],
      value: this._currentOption ?? ((_this$_commandOptions3 = this._commandOptionsList) === null || _this$_commandOptions3 === void 0 ? void 0 : _this$_commandOptions3[0])
    });
  }
  _refreshTextAreas() {
    switch (this._dialogState) {
      case DialogState.Initial:
        this._promptTextArea.option({
          visible: false
        });
        this._resultTextArea.option({
          visible: true,
          value: this._resultText
        });
        break;
      case DialogState.Asking:
        this._promptTextArea.option({
          visible: true,
          value: this._askAIPrompt,
          readOnly: false
        });
        this._resultTextArea.option({
          visible: false
        });
        break;
      case DialogState.Generating:
        this._promptTextArea.option({
          readOnly: true
        });
        this._resultTextArea.option({
          visible: true,
          value: this._resultText
        });
        break;
      case DialogState.ResultReady:
        this._resultTextArea.option({
          visible: true,
          value: this._resultText
        });
        break;
      case DialogState.Error:
        // TODO Implement with adding errors UI
        break;
      default:
        break;
    }
  }
  _getInitialDialogState() {
    return this._isAskAICommandSelected ? DialogState.Asking : DialogState.Initial;
  }
  replaceButtonAction(event) {
    this.hide(this._resultText, event);
  }
  show(_ref2) {
    var _commandsMap$currentC;
    let {
      currentCommand,
      currentCommandOption,
      commandsMap,
      text,
      prompt
    } = _ref2;
    this._commandsMap = commandsMap;
    this._currentCommand = currentCommand;
    this._resultText = text ?? '';
    this._commandOptionsList = ((_commandsMap$currentC = commandsMap[currentCommand]) === null || _commandsMap$currentC === void 0 ? void 0 : _commandsMap$currentC.options) ?? [];
    this._currentOption = currentCommandOption;
    this._getCustomCommandPrompt = prompt;
    this._isAskAICommandSelected = currentCommand === 'askAI';
    this._askAIPrompt = '';
    this._setDialogState(this._getInitialDialogState());
    return super.show();
  }
  hide(resultText, event) {
    var _this$deferred;
    (_this$deferred = this.deferred) === null || _this$deferred === void 0 || _this$deferred.resolve({
      resultText,
      event
    });
    super.hide();
  }
}