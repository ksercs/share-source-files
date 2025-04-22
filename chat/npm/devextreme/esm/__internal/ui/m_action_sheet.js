/**
* DevExtreme (esm/__internal/ui/m_action_sheet.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import messageLocalization from '../../common/core/localization/message';
import registerComponent from '../../core/component_registrator';
import $ from '../../core/renderer';
import { BindableTemplate } from '../../core/templates/bindable_template';
import { noop } from '../../core/utils/common';
import { Deferred } from '../../core/utils/deferred';
import { extend } from '../../core/utils/extend';
import { getWindow } from '../../core/utils/window';
import Button from '../../ui/button';
import CollectionWidget from '../ui/collection/m_collection_widget.edit';
import Popover from '../ui/popover/m_popover';
import Popup from '../ui/popup/m_popup';
// STYLE actionSheet
const window = getWindow();
const ACTION_SHEET_CLASS = 'dx-actionsheet';
const ACTION_SHEET_CONTAINER_CLASS = 'dx-actionsheet-container';
const ACTION_SHEET_POPUP_WRAPPER_CLASS = 'dx-actionsheet-popup-wrapper';
const ACTION_SHEET_POPOVER_WRAPPER_CLASS = 'dx-actionsheet-popover-wrapper';
const ACTION_SHEET_CANCEL_BUTTON_CLASS = 'dx-actionsheet-cancel';
const ACTION_SHEET_ITEM_CLASS = 'dx-actionsheet-item';
const ACTION_SHEET_ITEM_DATA_KEY = 'dxActionSheetItemData';
const ACTION_SHEET_WITHOUT_TITLE_CLASS = 'dx-actionsheet-without-title';
const ACTION_SHEET_BUTTON_DEFAULT_STYLING_MODE = 'outlined';
class ActionSheet extends CollectionWidget {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      usePopover: false,
      // @ts-expect-error ts-error
      target: null,
      title: '',
      showTitle: true,
      showCancelButton: true,
      cancelText: messageLocalization.format('Cancel'),
      // @ts-expect-error ts-error
      onCancelClick: null,
      visible: false,
      noDataText: '',
      focusStateEnabled: false,
      selectByClick: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: {
        platform: 'ios',
        tablet: true
      },
      options: {
        usePopover: true
      }
    }]);
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      item: new BindableTemplate(($container, data) => {
        // @ts-expect-error ts-error
        const button = new Button($('<div>'), extend({
          onClick: data === null || data === void 0 ? void 0 : data.click,
          stylingMode: (data === null || data === void 0 ? void 0 : data.stylingMode) || ACTION_SHEET_BUTTON_DEFAULT_STYLING_MODE
        }, data));
        $container.append(button.$element());
      }, ['disabled', 'icon', 'text', 'type', 'onClick', 'click', 'stylingMode'], this.option('integrationOptions.watchMethod'))
    });
  }
  _itemContainer() {
    return this._$itemContainer;
  }
  _itemClass() {
    return ACTION_SHEET_ITEM_CLASS;
  }
  _itemDataKey() {
    return ACTION_SHEET_ITEM_DATA_KEY;
  }
  _toggleVisibility() {}
  _renderDimensions() {}
  _initMarkup() {
    super._initMarkup();
    this.$element().addClass(ACTION_SHEET_CLASS);
    this._createItemContainer();
  }
  _render() {
    this._renderPopup();
  }
  _createItemContainer() {
    this._$itemContainer = $('<div>').addClass(ACTION_SHEET_CONTAINER_CLASS);
    this._renderDisabled();
  }
  _renderDisabled() {
    const {
      disabled
    } = this.option();
    this._$itemContainer.toggleClass('dx-state-disabled', disabled);
  }
  _renderPopup() {
    this._$popup = $('<div>').appendTo(this.$element());
    this._isPopoverMode() ? this._createPopover() : this._createPopup();
    this._renderPopupTitle();
    this._mapPopupOption('visible');
  }
  _mapPopupOption(optionName) {
    var _this$_popup;
    (_this$_popup = this._popup) === null || _this$_popup === void 0 || _this$_popup.option(optionName, this.option(optionName));
  }
  _isPopoverMode() {
    const {
      usePopover,
      target
    } = this.option();
    // @ts-expect-error ts-error
    return usePopover && target;
  }
  _renderPopupTitle() {
    var _this$_popup2;
    this._mapPopupOption('showTitle');
    (_this$_popup2 = this._popup) === null || _this$_popup2 === void 0 || _this$_popup2.$wrapper().toggleClass(ACTION_SHEET_WITHOUT_TITLE_CLASS, !this.option('showTitle'));
  }
  _clean() {
    if (this._$popup) {
      this._$popup.remove();
    }
    super._clean();
  }
  _overlayConfig() {
    return {
      onInitialized: function (args) {
        this._popup = args.component;
      }.bind(this),
      disabled: false,
      showTitle: true,
      title: this.option('title'),
      deferRendering: true,
      onContentReady: this._popupContentReadyAction.bind(this),
      onHidden: this.hide.bind(this)
    };
  }
  _createPopover() {
    this._createComponent(this._$popup, Popover, extend(this._overlayConfig(), {
      width: this.option('width') || 200,
      height: this.option('height') || 'auto',
      target: this.option('target')
    }));
    this._popup.$overlayContent().attr('role', 'dialog');
    this._popup.$wrapper().addClass(ACTION_SHEET_POPOVER_WRAPPER_CLASS);
  }
  _createPopup() {
    this._createComponent(this._$popup, Popup, extend(this._overlayConfig(), {
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
  }
  _popupContentReadyAction() {
    this._popup.$content().append(this._$itemContainer);
    this._attachClickEvent();
    this._attachHoldEvent();
    this._prepareContent();
    this._renderContent();
    this._renderCancelButton();
  }
  _renderCancelButton() {
    if (this._isPopoverMode()) {
      return;
    }
    if (this._$cancelButton) {
      this._$cancelButton.remove();
    }
    if (this.option('showCancelButton')) {
      var _this$_popup3;
      const cancelClickAction = this._createActionByOption('onCancelClick') || noop;
      const that = this;
      this._$cancelButton = $('<div>').addClass(ACTION_SHEET_CANCEL_BUTTON_CLASS).appendTo((_this$_popup3 = this._popup) === null || _this$_popup3 === void 0 ? void 0 : _this$_popup3.$content());
      this._createComponent(this._$cancelButton, Button, {
        disabled: false,
        stylingMode: ACTION_SHEET_BUTTON_DEFAULT_STYLING_MODE,
        text: this.option('cancelText'),
        onClick(e) {
          const hidingArgs = {
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
  }
  _attachItemClickEvent() {}
  _itemClickHandler(e) {
    super._itemClickHandler(e);
    if (!$(e.target).is('.dx-state-disabled, .dx-state-disabled *')) {
      this.hide();
    }
  }
  _itemHoldHandler(e) {
    super._itemHoldHandler(e);
    if (!$(e.target).is('.dx-state-disabled, .dx-state-disabled *')) {
      this.hide();
    }
  }
  _optionChanged(args) {
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
        super._optionChanged(args);
    }
  }
  toggle(showing) {
    const that = this;
    const d = Deferred();
    // @ts-expect-error ts-error
    that._popup.toggle(showing).done(() => {
      that.option('visible', showing);
      // @ts-expect-error ts-error
      d.resolveWith(that);
    });
    return d.promise();
  }
  show() {
    return this.toggle(true);
  }
  hide() {
    return this.toggle(false);
  }
}
registerComponent('dxActionSheet', ActionSheet);
export default ActionSheet;
