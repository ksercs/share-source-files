/**
* DevExtreme (cjs/ui/action_sheet.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _window = require("../core/utils/window");
var _common = require("../core/utils/common");
var _message = _interopRequireDefault(require("../localization/message"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _extend = require("../core/utils/extend");
var _button = _interopRequireDefault(require("./button"));
var _uiCollection_widget = _interopRequireDefault(require("./collection/ui.collection_widget.edit"));
var _ui = _interopRequireDefault(require("./popup/ui.popup"));
var _ui2 = _interopRequireDefault(require("./popover/ui.popover"));
var _bindable_template = require("../core/templates/bindable_template");
var _deferred = require("../core/utils/deferred");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var window = (0, _window.getWindow)();
// STYLE actionSheet

var ACTION_SHEET_CLASS = 'dx-actionsheet';
var ACTION_SHEET_CONTAINER_CLASS = 'dx-actionsheet-container';
var ACTION_SHEET_POPUP_WRAPPER_CLASS = 'dx-actionsheet-popup-wrapper';
var ACTION_SHEET_POPOVER_WRAPPER_CLASS = 'dx-actionsheet-popover-wrapper';
var ACTION_SHEET_CANCEL_BUTTON_CLASS = 'dx-actionsheet-cancel';
var ACTION_SHEET_ITEM_CLASS = 'dx-actionsheet-item';
var ACTION_SHEET_ITEM_DATA_KEY = 'dxActionSheetItemData';
var ACTION_SHEET_WITHOUT_TITLE_CLASS = 'dx-actionsheet-without-title';
var ACTION_SHEET_BUTTON_DEFAULT_STYLING_MODE = 'outlined';
var ActionSheet = _uiCollection_widget.default.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      usePopover: false,
      target: null,
      title: '',
      showTitle: true,
      showCancelButton: true,
      cancelText: _message.default.format('Cancel'),
      onCancelClick: null,
      visible: false,
      /**
      * @name dxActionSheetOptions.noDataText
      * @hidden
      */
      noDataText: '',
      /**
      * @name dxActionSheetOptions.activeStateEnabled
      * @hidden
      */

      /**
      * @name dxActionSheetOptions.selectedIndex
      * @hidden
      */

      /**
      * @name dxActionSheetOptions.selectedItem
      * @hidden
      */

      /**
      * @name dxActionSheetOptions.onSelectionChanged
      * @action
      * @hidden
      */

      /**
      * @name dxActionSheetOptions.selectedItems
      * @hidden
      */

      /**
      * @name dxActionSheetOptions.selectedItemKeys
      * @hidden
      */

      /**
      * @name dxActionSheetOptions.keyExpr
      * @hidden
      */

      /**
      * @name dxActionSheetOptions.accessKey
      * @hidden
      */

      /**
      * @name dxActionSheetOptions.tabIndex
      * @hidden
      */

      /**
       * @name dxActionSheetOptions.focusStateEnabled
       * @type boolean
       * @default false
       * @hidden
       */
      focusStateEnabled: false,
      selectByClick: false
    });
  },
  _defaultOptionsRules: function _defaultOptionsRules() {
    return this.callBase().concat([{
      device: {
        platform: 'ios',
        tablet: true
      },
      options: {
        usePopover: true
      }
    }]);
  },
  _initTemplates: function _initTemplates() {
    this.callBase();
    /**
    * @name dxActionSheetItem.visible
    * @type boolean
    * @default true
    * @hidden
    */
    /**
    * @name dxActionSheetItem.html
    * @type String
    * @hidden
    */
    this._templateManager.addDefaultTemplates({
      item: new _bindable_template.BindableTemplate(function ($container, data) {
        var button = new _button.default((0, _renderer.default)('<div>'), (0, _extend.extend)({
          onClick: data && data.click,
          stylingMode: data && data.stylingMode || ACTION_SHEET_BUTTON_DEFAULT_STYLING_MODE
        }, data));
        $container.append(button.$element());
      }, ['disabled', 'icon', 'text', 'type', 'onClick', 'click', 'stylingMode'], this.option('integrationOptions.watchMethod'))
    });
  },
  _itemContainer: function _itemContainer() {
    return this._$itemContainer;
  },
  _itemClass: function _itemClass() {
    return ACTION_SHEET_ITEM_CLASS;
  },
  _itemDataKey: function _itemDataKey() {
    return ACTION_SHEET_ITEM_DATA_KEY;
  },
  _toggleVisibility: _common.noop,
  _renderDimensions: _common.noop,
  _initMarkup: function _initMarkup() {
    this.callBase();
    this.$element().addClass(ACTION_SHEET_CLASS);
    this._createItemContainer();
  },
  _render: function _render() {
    this._renderPopup();
  },
  _createItemContainer: function _createItemContainer() {
    this._$itemContainer = (0, _renderer.default)('<div>').addClass(ACTION_SHEET_CONTAINER_CLASS);
    this._renderDisabled();
  },
  _renderDisabled: function _renderDisabled() {
    this._$itemContainer.toggleClass('dx-state-disabled', this.option('disabled'));
  },
  _renderPopup: function _renderPopup() {
    this._$popup = (0, _renderer.default)('<div>').appendTo(this.$element());
    this._isPopoverMode() ? this._createPopover() : this._createPopup();
    this._renderPopupTitle();
    this._mapPopupOption('visible');
  },
  _mapPopupOption: function _mapPopupOption(optionName) {
    this._popup && this._popup.option(optionName, this.option(optionName));
  },
  _isPopoverMode: function _isPopoverMode() {
    return this.option('usePopover') && this.option('target');
  },
  _renderPopupTitle: function _renderPopupTitle() {
    this._mapPopupOption('showTitle');
    this._popup && this._popup.$wrapper().toggleClass(ACTION_SHEET_WITHOUT_TITLE_CLASS, !this.option('showTitle'));
  },
  _clean: function _clean() {
    if (this._$popup) {
      this._$popup.remove();
    }
    this.callBase();
  },
  _overlayConfig: function _overlayConfig() {
    return {
      onInitialized: function (args) {
        this._popup = args.component;
      }.bind(this),
      disabled: false,
      showTitle: true,
      title: this.option('title'),
      deferRendering: !window.angular,
      onContentReady: this._popupContentReadyAction.bind(this),
      onHidden: this.hide.bind(this)
    };
  },
  _createPopover: function _createPopover() {
    this._createComponent(this._$popup, _ui2.default, (0, _extend.extend)(this._overlayConfig(), {
      width: this.option('width') || 200,
      height: this.option('height') || 'auto',
      target: this.option('target')
    }));
    this._popup.$overlayContent().attr('role', 'dialog');
    this._popup.$wrapper().addClass(ACTION_SHEET_POPOVER_WRAPPER_CLASS);
  },
  _createPopup: function _createPopup() {
    this._createComponent(this._$popup, _ui.default, (0, _extend.extend)(this._overlayConfig(), {
      dragEnabled: false,
      width: this.option('width') || '100%',
      height: this.option('height') || 'auto',
      showCloseButton: false,
      position: {
        my: 'bottom',
        at: 'bottom',
        of: window
      },
      animation: {
        show: {
          type: 'slide',
          duration: 400,
          from: {
            position: {
              my: 'top',
              at: 'bottom',
              of: window
            }
          },
          to: {
            position: {
              my: 'bottom',
              at: 'bottom',
              of: window
            }
          }
        },
        hide: {
          type: 'slide',
          duration: 400,
          from: {
            position: {
              my: 'bottom',
              at: 'bottom',
              of: window
            }
          },
          to: {
            position: {
              my: 'top',
              at: 'bottom',
              of: window
            }
          }
        }
      }
    }));
    this._popup.$wrapper().addClass(ACTION_SHEET_POPUP_WRAPPER_CLASS);
  },
  _popupContentReadyAction: function _popupContentReadyAction() {
    this._popup.$content().append(this._$itemContainer);
    this._attachClickEvent();
    this._attachHoldEvent();
    this._prepareContent();
    this._renderContent();
    this._renderCancelButton();
  },
  _renderCancelButton: function _renderCancelButton() {
    if (this._isPopoverMode()) {
      return;
    }
    if (this._$cancelButton) {
      this._$cancelButton.remove();
    }
    if (this.option('showCancelButton')) {
      var cancelClickAction = this._createActionByOption('onCancelClick') || _common.noop;
      var that = this;
      this._$cancelButton = (0, _renderer.default)('<div>').addClass(ACTION_SHEET_CANCEL_BUTTON_CLASS).appendTo(this._popup && this._popup.$content());
      this._createComponent(this._$cancelButton, _button.default, {
        disabled: false,
        stylingMode: ACTION_SHEET_BUTTON_DEFAULT_STYLING_MODE,
        text: this.option('cancelText'),
        onClick: function onClick(e) {
          var hidingArgs = {
            event: e,
            cancel: false
          };
          cancelClickAction(hidingArgs);
          if (!hidingArgs.cancel) {
            that.hide();
          }
        },
        integrationOptions: {}
      });
    }
  },
  _attachItemClickEvent: _common.noop,
  _itemClickHandler: function _itemClickHandler(e) {
    this.callBase(e);
    if (!(0, _renderer.default)(e.target).is('.dx-state-disabled, .dx-state-disabled *')) {
      this.hide();
    }
  },
  _itemHoldHandler: function _itemHoldHandler(e) {
    this.callBase(e);
    if (!(0, _renderer.default)(e.target).is('.dx-state-disabled, .dx-state-disabled *')) {
      this.hide();
    }
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'width':
      case 'height':
      case 'visible':
      case 'title':
        this._mapPopupOption(args.name);
        break;
      case 'disabled':
        this._renderDisabled();
        break;
      case 'showTitle':
        this._renderPopupTitle();
        break;
      case 'showCancelButton':
      case 'onCancelClick':
      case 'cancelText':
        this._renderCancelButton();
        break;
      case 'target':
      case 'usePopover':
      case 'items':
        this._invalidate();
        break;
      default:
        this.callBase(args);
    }
  },
  toggle: function toggle(showing) {
    var that = this;
    var d = new _deferred.Deferred();
    that._popup.toggle(showing).done(function () {
      that.option('visible', showing);
      d.resolveWith(that);
    });
    return d.promise();
  },
  show: function show() {
    return this.toggle(true);
  },
  hide: function hide() {
    return this.toggle(false);
  }

  /**
  * @name dxActionSheet.registerKeyHandler
  * @publicName registerKeyHandler(key, handler)
  * @hidden
  */

  /**
  * @name dxActionSheet.focus
  * @publicName focus()
  * @hidden
  */
});

(0, _component_registrator.default)('dxActionSheet', ActionSheet);
var _default = ActionSheet;
/**
 * @name dxActionSheetItem
 * @inherits CollectionWidgetItem
 * @type object
 */
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
