"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
var _icon = require("../../core/utils/icon");
var _message = _interopRequireDefault(require("../../localization/message"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _progress_bar = _interopRequireDefault(require("../progress_bar"));
var _button = _interopRequireDefault(require("../button"));
var _scroll_view = _interopRequireDefault(require("../scroll_view"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var FILE_MANAGER_PROGRESS_PANEL_CLASS = 'dx-filemanager-progress-panel';
var FILE_MANAGER_PROGRESS_PANEL_CONTAINER_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-container");
var FILE_MANAGER_PROGRESS_PANEL_TITLE_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-title");
var FILE_MANAGER_PROGRESS_PANEL_TITLE_TEXT_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-title-text");
var FILE_MANAGER_PROGRESS_PANEL_CLOSE_BUTTON_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-close-button");
var FILE_MANAGER_PROGRESS_PANEL_INFOS_CONTAINER_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-infos-container");
var FILE_MANAGER_PROGRESS_PANEL_SEPARATOR_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-separator");
var FILE_MANAGER_PROGRESS_PANEL_INFO_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-info");
var FILE_MANAGER_PROGRESS_PANEL_COMMON_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-common");
var FILE_MANAGER_PROGRESS_PANEL_INFO_WITH_DETAILS_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-info-with-details");
var FILE_MANAGER_PROGRESS_PANEL_DETAILS_CLASS = "".concat(FILE_MANAGER_PROGRESS_PANEL_CLASS, "-details");
var FILE_MANAGER_PROGRESS_BOX_CLASS = 'dx-filemanager-progress-box';
var FILE_MANAGER_PROGRESS_BOX_ERROR_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-error");
var FILE_MANAGER_PROGRESS_BOX_WITHOUT_CLOSE_BUTTON_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-without-close-button");
var FILE_MANAGER_PROGRESS_BOX_IMAGE_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-image");
var FILE_MANAGER_PROGRESS_BOX_WRAPPER_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-wrapper");
var FILE_MANAGER_PROGRESS_BOX_COMMON_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-common");
var FILE_MANAGER_PROGRESS_BOX_PROGRESS_BAR_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-progress-bar");
var FILE_MANAGER_PROGRESS_BOX_CLOSE_BUTTON_CLASS = "".concat(FILE_MANAGER_PROGRESS_BOX_CLASS, "-close-button");
var DX_CARD_CLASS = 'dx-card';
var FileManagerProgressPanel = /*#__PURE__*/function (_Widget) {
  _inheritsLoose(FileManagerProgressPanel, _Widget);
  function FileManagerProgressPanel() {
    return _Widget.apply(this, arguments) || this;
  }
  var _proto = FileManagerProgressPanel.prototype;
  _proto._initMarkup = function _initMarkup() {
    var _this = this;
    _Widget.prototype._initMarkup.call(this);
    this._initActions();
    this._operationCount = 0;
    this.$element().addClass(FILE_MANAGER_PROGRESS_PANEL_CLASS);
    var $scrollView = (0, _renderer.default)('<div>').appendTo(this.$element());
    var $container = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_CONTAINER_CLASS).appendTo($scrollView);
    this._scrollView = this._createComponent($scrollView, _scroll_view.default, {
      scrollByContent: true,
      scrollByThumb: true,
      showScrollbar: 'onScroll'
    });
    var $title = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_TITLE_CLASS).appendTo($container);
    (0, _renderer.default)('<div>').text(_message.default.format('dxFileManager-notificationProgressPanelTitle')).addClass(FILE_MANAGER_PROGRESS_PANEL_TITLE_TEXT_CLASS).appendTo($title);
    var $closeButton = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_CLOSE_BUTTON_CLASS).appendTo($title);
    this._createComponent($closeButton, _button.default, {
      icon: 'close',
      stylingMode: 'text',
      onClick: function onClick() {
        return _this._raisePanelClosed();
      }
    });
    this._$infosContainer = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_INFOS_CONTAINER_CLASS).appendTo($container);
    this._renderEmptyListText();
  };
  _proto._getDefaultOptions = function _getDefaultOptions() {
    return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
      onOperationClosed: null,
      onOperationCanceled: null,
      onOperationItemCanceled: null,
      onPanelClosed: null
    });
  };
  _proto._initActions = function _initActions() {
    this._actions = {
      onOperationClosed: this._createActionByOption('onOperationClosed'),
      onOperationCanceled: this._createActionByOption('onOperationCanceled'),
      onOperationItemCanceled: this._createActionByOption('onOperationItemCanceled'),
      onPanelClosed: this._createActionByOption('onPanelClosed')
    };
  };
  _proto._optionChanged = function _optionChanged(args) {
    var name = args.name;
    switch (name) {
      case 'test':
        break;
      case 'onOperationClosed':
      case 'onOperationCanceled':
      case 'onOperationItemCanceled':
        this._actions[name] = this._createActionByOption(name);
        break;
      default:
        _Widget.prototype._optionChanged.call(this, args);
    }
  };
  _proto.addOperation = function addOperation(commonText, showCloseButtonAlways, allowProgressAutoUpdate) {
    var _this2 = this;
    if (this._operationCount) {
      (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_SEPARATOR_CLASS).prependTo(this._$infosContainer);
    } else {
      this._$infosContainer.empty();
    }
    this._operationCount++;
    var info = {
      customCloseHandling: showCloseButtonAlways,
      allowProgressAutoUpdate: (0, _common.ensureDefined)(allowProgressAutoUpdate, true)
    };
    var $info = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_INFO_CLASS).prependTo(this._$infosContainer);
    info.$info = $info;
    var $common = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_COMMON_CLASS).appendTo($info);
    info.common = this._createProgressBox($common, {
      commonText,
      showCloseButton: true,
      showCloseButtonAlways,
      onCloseButtonClick: function onCloseButtonClick() {
        return _this2._closeOperation(info);
      }
    });
    return info;
  };
  _proto.addOperationDetails = function addOperationDetails(info, details, showCloseButton) {
    var _this3 = this;
    info.$info.addClass(FILE_MANAGER_PROGRESS_PANEL_INFO_WITH_DETAILS_CLASS);
    var $details = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_PANEL_DETAILS_CLASS).appendTo(info.$info);
    info.details = details.map(function (itemInfo, index) {
      itemInfo.info = info;
      return _this3._createDetailsItem($details, itemInfo, index, false, showCloseButton);
    });
  };
  _proto._createDetailsItem = function _createDetailsItem($container, item, itemIndex, skipProgressBox, showCloseButton) {
    var _this4 = this;
    var $detailsItem = (0, _renderer.default)('<div>').appendTo($container);
    if (itemIndex !== -1) {
      $detailsItem.addClass(DX_CARD_CLASS);
    }
    return this._createProgressBox($detailsItem, {
      commonText: item.commonText,
      imageUrl: item.imageUrl,
      skipProgressBox,
      showCloseButton,
      showCloseButtonAlways: showCloseButton,
      onCloseButtonClick: function onCloseButtonClick() {
        return _this4._cancelOperationItem(item, itemIndex);
      }
    });
  };
  _proto.completeOperationItem = function completeOperationItem(operationInfo, itemIndex, commonProgress) {
    if (operationInfo.allowProgressAutoUpdate) {
      this.updateOperationItemProgress(operationInfo, itemIndex, 100, commonProgress);
    }
    this._setCloseButtonVisible(operationInfo.details[itemIndex], false);
  };
  _proto.updateOperationItemProgress = function updateOperationItemProgress(operationInfo, itemIndex, itemProgress, commonProgress) {
    this.updateOperationCommonProgress(operationInfo, commonProgress);
    if (operationInfo.details) {
      var detailsItem = operationInfo.details[itemIndex];
      detailsItem.progressBar.option('value', itemProgress);
    }
  };
  _proto.updateOperationCommonProgress = function updateOperationCommonProgress(operationInfo, commonProgress) {
    var _operationInfo$common;
    (_operationInfo$common = operationInfo.common.progressBar) === null || _operationInfo$common === void 0 ? void 0 : _operationInfo$common.option('value', commonProgress);
  };
  _proto.completeOperation = function completeOperation(info, commonText, isError, statusText) {
    info.completed = true;
    info.common.$commonText.text(commonText);
    if (isError) {
      this._removeProgressBar(info.common);
    } else if (info.allowProgressAutoUpdate) {
      this.updateOperationCommonProgress(info, 100);
    }
    if (statusText) {
      this._setProgressBarText(info.common, statusText);
    }
    this._setCloseButtonVisible(info.common, true);
  };
  _proto.completeSingleOperationWithError = function completeSingleOperationWithError(info, errorText) {
    var _info$details;
    var detailsItem = (_info$details = info.details) === null || _info$details === void 0 ? void 0 : _info$details[0];
    info.completed = true;
    this._renderOperationError(detailsItem || info.common, errorText);
    this._setCloseButtonVisible(info.common, true);
    if (detailsItem) {
      this._setCloseButtonVisible(detailsItem, false);
    }
  };
  _proto.addOperationDetailsError = function addOperationDetailsError(info, index, errorText) {
    var detailsItem = info.details[index];
    this._renderOperationError(detailsItem, errorText);
    this._setCloseButtonVisible(detailsItem, false);
  };
  _proto._renderError = function _renderError($container, $target, errorText) {
    (0, _renderer.default)('<div>').text(errorText).addClass(FILE_MANAGER_PROGRESS_BOX_ERROR_CLASS).appendTo($container);
  };
  _proto._renderEmptyListText = function _renderEmptyListText() {
    this._$infosContainer.text(_message.default.format('dxFileManager-notificationProgressPanelEmptyListText'));
  };
  _proto._renderOperationError = function _renderOperationError(info, errorText) {
    this._removeProgressBar(info);
    this._renderError(info.$wrapper, info.$commonText, errorText);
  };
  _proto._removeProgressBar = function _removeProgressBar(progressBox) {
    if (progressBox.progressBar) {
      progressBox.progressBar.dispose();
      progressBox.progressBar.$element().remove();
      progressBox.progressBar = null;
    }
  };
  _proto._createProgressBox = function _createProgressBox($container, options) {
    var _this5 = this;
    $container.addClass(FILE_MANAGER_PROGRESS_BOX_CLASS);
    if (!options.showCloseButtonAlways) {
      $container.addClass(FILE_MANAGER_PROGRESS_BOX_WITHOUT_CLOSE_BUTTON_CLASS);
    }
    if (options.imageUrl) {
      (0, _icon.getImageContainer)(options.imageUrl).addClass(FILE_MANAGER_PROGRESS_BOX_IMAGE_CLASS).appendTo($container);
    }
    var $wrapper = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_BOX_WRAPPER_CLASS).appendTo($container);
    var $commonText = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_BOX_COMMON_CLASS).text(options.commonText).appendTo($wrapper);
    var progressBar = null;
    if (!options.skipProgressBox) {
      var $progressBar = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_BOX_PROGRESS_BAR_CLASS).appendTo($wrapper);
      progressBar = this._createComponent($progressBar, _progress_bar.default, {
        min: 0,
        max: 100,
        width: '100%',
        validationMessageMode: 'always',
        statusFormat: function statusFormat(ratio, value) {
          return _this5._getStatusString(ratio, value);
        }
      });
    }
    var closeButton = null;
    if (options.showCloseButton) {
      var $button = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_PROGRESS_BOX_CLOSE_BUTTON_CLASS).appendTo($container);
      closeButton = this._createComponent($button, _button.default, {
        icon: 'dx-filemanager-i dx-filemanager-i-cancel',
        stylingMode: 'text',
        visible: options.showCloseButtonAlways,
        onClick: options.onCloseButtonClick
      });
    }
    return {
      $commonText,
      progressBar,
      $element: $container,
      $wrapper,
      closeButton
    };
  };
  _proto._setCloseButtonVisible = function _setCloseButtonVisible(progressBox, visible) {
    if (progressBox.closeButton) {
      progressBox.$element.toggleClass(FILE_MANAGER_PROGRESS_BOX_WITHOUT_CLOSE_BUTTON_CLASS, !visible);
      progressBox.closeButton.option('visible', visible);
    }
  };
  _proto._setProgressBarText = function _setProgressBarText(progressBox, text) {
    progressBox.progressBar.option('statusFormat', function () {
      return text;
    });
  };
  _proto._closeOperation = function _closeOperation(info) {
    var _this6 = this;
    if (info.customCloseHandling && !info.completed) {
      this._raiseOperationCanceled(info);
      this._setCloseButtonVisible(info.common, false);
      info.details.forEach(function (item) {
        return _this6._displayClosedOperationItem(item);
      });
    } else {
      this._raiseOperationClosed(info);
      info.$info.next(".".concat(FILE_MANAGER_PROGRESS_PANEL_SEPARATOR_CLASS)).remove();
      info.$info.remove();
      this._operationCount--;
      if (!this._operationCount) {
        this._renderEmptyListText();
      }
    }
  };
  _proto._cancelOperationItem = function _cancelOperationItem(item, itemIndex) {
    this._raiseOperationItemCanceled(item, itemIndex);
    var itemInfo = item.info.details[itemIndex];
    this._displayClosedOperationItem(itemInfo);
  };
  _proto._displayClosedOperationItem = function _displayClosedOperationItem(itemInfo) {
    this._setProgressBarText(itemInfo, _message.default.format('dxFileManager-notificationProgressPanelOperationCanceled'));
    this._setCloseButtonVisible(itemInfo, false);
  };
  _proto._getStatusString = function _getStatusString(ratio, value) {
    return ratio === 1 ? _message.default.format('Done') : Math.round(ratio * 100) + '%';
  };
  _proto._raiseOperationClosed = function _raiseOperationClosed(info) {
    this._actions.onOperationClosed({
      info
    });
  };
  _proto._raiseOperationCanceled = function _raiseOperationCanceled(info) {
    this._actions.onOperationCanceled({
      info
    });
  };
  _proto._raiseOperationItemCanceled = function _raiseOperationItemCanceled(item, itemIndex) {
    this._actions.onOperationItemCanceled({
      item,
      itemIndex
    });
  };
  _proto._raisePanelClosed = function _raisePanelClosed() {
    this._actions.onPanelClosed();
  };
  return FileManagerProgressPanel;
}(_ui.default);
var _default = FileManagerProgressPanel;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;