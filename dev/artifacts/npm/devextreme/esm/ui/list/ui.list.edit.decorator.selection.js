/**
* DevExtreme (esm/ui/list/ui.list.edit.decorator.selection.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import eventsEngine from '../../events/core/events_engine';
import { name as clickEventName } from '../../events/click';
import { extend } from '../../core/utils/extend';
import errors from '../widget/ui.errors';
import CheckBox from '../check_box';
import RadioButton from '../radio_group/radio_button';
import { addNamespace } from '../../events/utils/index';
import { register as registerDecorator } from './ui.list.edit.decorator_registry';
import EditDecorator from './ui.list.edit.decorator';
var SELECT_DECORATOR_ENABLED_CLASS = 'dx-list-select-decorator-enabled';
var SELECT_DECORATOR_SELECT_ALL_CLASS = 'dx-list-select-all';
var SELECT_DECORATOR_SELECT_ALL_CHECKBOX_CLASS = 'dx-list-select-all-checkbox';
var SELECT_DECORATOR_SELECT_ALL_LABEL_CLASS = 'dx-list-select-all-label';
var SELECT_CHECKBOX_CONTAINER_CLASS = 'dx-list-select-checkbox-container';
var SELECT_CHECKBOX_CLASS = 'dx-list-select-checkbox';
var SELECT_RADIO_BUTTON_CONTAINER_CLASS = 'dx-list-select-radiobutton-container';
var SELECT_RADIO_BUTTON_CLASS = 'dx-list-select-radiobutton';
var FOCUSED_STATE_CLASS = 'dx-state-focused';
var CLICK_EVENT_NAME = addNamespace(clickEventName, 'dxListEditDecorator');
registerDecorator('selection', 'default', EditDecorator.inherit({
  _init: function _init() {
    this.callBase.apply(this, arguments);
    var selectionMode = this._list.option('selectionMode');
    this._singleStrategy = selectionMode === 'single';
    this._containerClass = this._singleStrategy ? SELECT_RADIO_BUTTON_CONTAINER_CLASS : SELECT_CHECKBOX_CONTAINER_CLASS;
    this._controlClass = this._singleStrategy ? SELECT_RADIO_BUTTON_CLASS : SELECT_CHECKBOX_CLASS;
    this._controlWidget = this._singleStrategy ? RadioButton : CheckBox;
    this._list.$element().addClass(SELECT_DECORATOR_ENABLED_CLASS);
  },
  beforeBag: function beforeBag(config) {
    var $itemElement = config.$itemElement;
    var $container = config.$container.addClass(this._containerClass);
    var $control = $('<div>').addClass(this._controlClass).appendTo($container);
    new this._controlWidget($control, extend(this._commonOptions(), {
      value: this._isSelected($itemElement),
      elementAttr: {
        'aria-label': 'Check State'
      },
      focusStateEnabled: false,
      hoverStateEnabled: false,
      onValueChanged: function (e) {
        e.event && this._list._saveSelectionChangeEvent(e.event);
        this._processCheckedState($itemElement, e.value);
        e.event && e.event.stopPropagation();
      }.bind(this)
    }));
  },
  modifyElement: function modifyElement(config) {
    this.callBase.apply(this, arguments);
    var $itemElement = config.$itemElement;
    var control = this._controlWidget.getInstance($itemElement.find('.' + this._controlClass));
    eventsEngine.on($itemElement, 'stateChanged', function (e, state) {
      control.option('value', state);
    }.bind(this));
  },
  _updateSelectAllState: function _updateSelectAllState() {
    if (!this._$selectAll) {
      return;
    }
    this._selectAllCheckBox.option('value', this._list.isSelectAll());
  },
  afterRender: function afterRender() {
    if (this._list.option('selectionMode') !== 'all') {
      return;
    }
    if (!this._$selectAll) {
      this._renderSelectAll();
    } else {
      this._updateSelectAllState();
    }
  },
  handleKeyboardEvents: function handleKeyboardEvents(currentFocusedIndex, moveFocusUp) {
    var moveFocusDown = !moveFocusUp;
    var list = this._list;
    var $selectAll = this._$selectAll;
    var lastItemIndex = list._getLastItemIndex();
    var isFocusOutOfList = moveFocusUp && currentFocusedIndex === 0 || moveFocusDown && currentFocusedIndex === lastItemIndex;
    var hasSelectAllItem = !!$selectAll;
    if (hasSelectAllItem && isFocusOutOfList) {
      list.option('focusedElement', $selectAll);
      list.scrollToItem(list.option('focusedElement'));
      return true;
    }
    return false;
  },
  handleEnterPressing: function handleEnterPressing(e) {
    if (this._$selectAll && this._$selectAll.hasClass(FOCUSED_STATE_CLASS)) {
      e.target = this._$selectAll.get(0);
      this._list._saveSelectionChangeEvent(e);
      this._selectAllCheckBox.option('value', !this._selectAllCheckBox.option('value'));
      return true;
    }
  },
  _renderSelectAll: function _renderSelectAll() {
    var $selectAll = this._$selectAll = $('<div>').addClass(SELECT_DECORATOR_SELECT_ALL_CLASS);
    var list = this._list;
    var downArrowHandler = list._supportedKeys().downArrow.bind(list);
    this._selectAllCheckBox = list._createComponent($('<div>').addClass(SELECT_DECORATOR_SELECT_ALL_CHECKBOX_CLASS).appendTo($selectAll), CheckBox, {
      elementAttr: {
        'aria-label': 'Select All'
      },
      focusStateEnabled: false,
      hoverStateEnabled: false
    });
    this._selectAllCheckBox.registerKeyHandler('downArrow', downArrowHandler);
    $('<div>').addClass(SELECT_DECORATOR_SELECT_ALL_LABEL_CLASS).text(this._list.option('selectAllText')).appendTo($selectAll);
    this._list.itemsContainer().prepend($selectAll);
    this._updateSelectAllState();
    this._attachSelectAllHandler();
  },
  _attachSelectAllHandler: function _attachSelectAllHandler() {
    this._selectAllCheckBox.option('onValueChanged', this._selectAllHandler.bind(this));
    eventsEngine.off(this._$selectAll, CLICK_EVENT_NAME);
    eventsEngine.on(this._$selectAll, CLICK_EVENT_NAME, this._selectAllClickHandler.bind(this));
  },
  _selectAllHandler: function _selectAllHandler(e) {
    e.event && e.event.stopPropagation();
    var isSelectedAll = this._selectAllCheckBox.option('value');
    e.event && this._list._saveSelectionChangeEvent(e.event);
    if (isSelectedAll === true) {
      this._selectAllItems();
    } else if (isSelectedAll === false) {
      this._unselectAllItems();
    }
    this._list._createActionByOption('onSelectAllValueChanged')({
      value: isSelectedAll
    });
  },
  _checkSelectAllCapability: function _checkSelectAllCapability() {
    var list = this._list;
    var dataController = list._dataController;
    if (list.option('selectAllMode') === 'allPages' && list.option('grouped') && !dataController.group()) {
      errors.log('W1010');
      return false;
    }
    return true;
  },
  _selectAllItems: function _selectAllItems() {
    if (!this._checkSelectAllCapability()) return;
    this._list._selection.selectAll(this._list.option('selectAllMode') === 'page');
  },
  _unselectAllItems: function _unselectAllItems() {
    if (!this._checkSelectAllCapability()) return;
    this._list._selection.deselectAll(this._list.option('selectAllMode') === 'page');
  },
  _selectAllClickHandler: function _selectAllClickHandler(e) {
    this._list._saveSelectionChangeEvent(e);
    this._selectAllCheckBox.option('value', !this._selectAllCheckBox.option('value'));
  },
  _isSelected: function _isSelected($itemElement) {
    return this._list.isItemSelected($itemElement);
  },
  _processCheckedState: function _processCheckedState($itemElement, checked) {
    if (checked) {
      this._list.selectItem($itemElement);
    } else {
      this._list.unselectItem($itemElement);
    }
  },
  dispose: function dispose() {
    this._disposeSelectAll();
    this._list.$element().removeClass(SELECT_DECORATOR_ENABLED_CLASS);
    this.callBase.apply(this, arguments);
  },
  _disposeSelectAll: function _disposeSelectAll() {
    if (this._$selectAll) {
      this._$selectAll.remove();
      this._$selectAll = null;
    }
  }
}));
