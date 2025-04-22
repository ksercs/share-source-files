"use strict";

var _click = require("../../../common/core/events/click");
var _events_engine = _interopRequireDefault(require("../../../common/core/events/core/events_engine"));
var _index = require("../../../common/core/events/utils/index");
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _deferred = require("../../../core/utils/deferred");
var _extend = require("../../../core/utils/extend");
var _check_box = _interopRequireDefault(require("../../../ui/check_box"));
var _radio_button = _interopRequireDefault(require("../../../ui/radio_group/radio_button"));
var _ui = _interopRequireDefault(require("../../../ui/widget/ui.errors"));
var _m_listEdit = _interopRequireDefault(require("./m_list.edit.decorator"));
var _m_listEdit2 = require("./m_list.edit.decorator_registry");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SELECT_DECORATOR_ENABLED_CLASS = 'dx-list-select-decorator-enabled';
const SELECT_DECORATOR_SELECT_ALL_CLASS = 'dx-list-select-all';
const SELECT_DECORATOR_SELECT_ALL_CHECKBOX_CLASS = 'dx-list-select-all-checkbox';
const SELECT_DECORATOR_SELECT_ALL_LABEL_CLASS = 'dx-list-select-all-label';
const SELECT_CHECKBOX_CONTAINER_CLASS = 'dx-list-select-checkbox-container';
const SELECT_CHECKBOX_CLASS = 'dx-list-select-checkbox';
const SELECT_RADIO_BUTTON_CONTAINER_CLASS = 'dx-list-select-radiobutton-container';
const SELECT_RADIO_BUTTON_CLASS = 'dx-list-select-radiobutton';
const FOCUSED_STATE_CLASS = 'dx-state-focused';
const CLICK_EVENT_NAME = (0, _index.addNamespace)(_click.name, 'dxListEditDecorator');
class EditDecoratorSelection extends _m_listEdit.default {
  _init() {
    // @ts-expect-error ts-error
    super._init.apply(this, arguments);
    const selectionMode = this._list.option('selectionMode');
    this._singleStrategy = selectionMode === 'single';
    this._containerClass = this._singleStrategy ? SELECT_RADIO_BUTTON_CONTAINER_CLASS : SELECT_CHECKBOX_CONTAINER_CLASS;
    this._controlClass = this._singleStrategy ? SELECT_RADIO_BUTTON_CLASS : SELECT_CHECKBOX_CLASS;
    this._controlWidget = this._singleStrategy ? _radio_button.default : _check_box.default;
    this._list.$element().addClass(SELECT_DECORATOR_ENABLED_CLASS);
  }
  beforeBag(config) {
    const {
      $itemElement
    } = config;
    const $container = config.$container.addClass(this._containerClass);
    const $control = (0, _renderer.default)('<div>').addClass(this._controlClass).appendTo($container);
    // eslint-disable-next-line no-new
    new this._controlWidget($control, (0, _extend.extend)(this._commonOptions(), {
      value: this._isSelected($itemElement),
      elementAttr: {
        'aria-label': _message.default.format('CheckState')
      },
      focusStateEnabled: false,
      hoverStateEnabled: false,
      onValueChanged: _ref => {
        let {
          value,
          component,
          event
        } = _ref;
        const isUiClick = !!event;
        if (isUiClick) {
          component._valueChangeEventInstance = undefined;
          component.option('value', !value);
        }
      }
    }));
  }
  modifyElement(config) {
    // @ts-expect-error ts-error
    super.modifyElement.apply(this, arguments);
    const {
      $itemElement
    } = config;
    const control = this._controlWidget.getInstance($itemElement.find(`.${this._controlClass}`));
    _events_engine.default.on($itemElement, 'stateChanged', (e, state) => {
      control.option('value', state);
    });
  }
  _updateSelectAllState() {
    if (!this._$selectAll) {
      return;
    }
    this._selectAllCheckBox.option('value', this._list.isSelectAll());
  }
  afterRender() {
    if (this._list.option('selectionMode') !== 'all') {
      return;
    }
    if (!this._$selectAll) {
      this._renderSelectAll();
    } else {
      this._updateSelectAllState();
    }
  }
  handleKeyboardEvents(currentFocusedIndex, moveFocusUp) {
    const moveFocusDown = !moveFocusUp;
    const list = this._list;
    const $selectAll = this._$selectAll;
    const lastItemIndex = list._getLastItemIndex();
    const isFocusOutOfList = moveFocusUp && currentFocusedIndex === 0 || moveFocusDown && currentFocusedIndex === lastItemIndex;
    const hasSelectAllItem = !!$selectAll;
    if (hasSelectAllItem && isFocusOutOfList) {
      list.option('focusedElement', $selectAll);
      list.scrollToItem(list.option('focusedElement'));
      return true;
    }
    return false;
  }
  // @ts-expect-error
  handleEnterPressing(e) {
    var _this$_$selectAll;
    if ((_this$_$selectAll = this._$selectAll) !== null && _this$_$selectAll !== void 0 && _this$_$selectAll.hasClass(FOCUSED_STATE_CLASS)) {
      e.target = this._$selectAll.get(0);
      this._selectAllHandler(e);
      return true;
    }
  }
  _renderSelectAll() {
    this._$selectAll = (0, _renderer.default)('<div>').addClass(SELECT_DECORATOR_SELECT_ALL_CLASS);
    const downArrowHandler = this._list._supportedKeys().downArrow.bind(this._list);
    const selectAllCheckBoxElement = (0, _renderer.default)('<div>').addClass(SELECT_DECORATOR_SELECT_ALL_CHECKBOX_CLASS).appendTo(this._$selectAll);
    this._selectAllCheckBox = this._list._createComponent(selectAllCheckBoxElement, _check_box.default, {
      elementAttr: {
        'aria-label': _message.default.format('dxList-selectAll')
      },
      focusStateEnabled: false,
      hoverStateEnabled: false
    });
    this._selectAllCheckBox.registerKeyHandler('downArrow', downArrowHandler);
    (0, _renderer.default)('<div>').addClass(SELECT_DECORATOR_SELECT_ALL_LABEL_CLASS).text(this._list.option('selectAllText')).appendTo(this._$selectAll);
    this._list.itemsContainer().prepend(this._$selectAll);
    this._updateSelectAllState();
    this._updateSelectAllAriaLabel();
    this._attachSelectAllHandler();
  }
  _attachSelectAllHandler() {
    this._selectAllCheckBox.option('onValueChanged', _ref2 => {
      let {
        value,
        event,
        component
      } = _ref2;
      const isUiClick = !!event;
      if (isUiClick) {
        component._setOptionWithoutOptionChange('value', !value);
        return;
      }
      this._updateSelectAllAriaLabel();
      this._list._createActionByOption('onSelectAllValueChanged')({
        value
      });
    });
    _events_engine.default.off(this._$selectAll, CLICK_EVENT_NAME);
    _events_engine.default.on(this._$selectAll, CLICK_EVENT_NAME, this._selectAllHandler.bind(this));
  }
  _updateSelectAllAriaLabel() {
    if (!this._$selectAll) {
      return;
    }
    const {
      value
    } = this._selectAllCheckBox.option();
    const indeterminate = value === undefined;
    const stateVariableName = indeterminate ? 'indeterminate' : value ? 'checked' : 'notChecked';
    const label = `${_message.default.format('dxList-selectAll')}, ${_message.default.format(`dxList-selectAll-${stateVariableName}`)}`;
    // @ts-expect-error ts-error
    this._$selectAll.attr({
      'aria-label': label
    });
  }
  _selectAllHandler(event) {
    var _this$_$selectAll2;
    event.stopPropagation();
    this._list._saveSelectionChangeEvent(event);
    const {
      value
    } = this._selectAllCheckBox.option();
    let selectionDeferred;
    if (value !== true) {
      selectionDeferred = this._selectAllItems();
    } else {
      selectionDeferred = this._unselectAllItems();
    }
    this._list.option('focusedElement', (_this$_$selectAll2 = this._$selectAll) === null || _this$_$selectAll2 === void 0 ? void 0 : _this$_$selectAll2.get(0));
    return selectionDeferred;
  }
  _checkSelectAllCapability() {
    const list = this._list;
    const dataController = list._dataController;
    if (list.option('selectAllMode') === 'allPages' && list.option('grouped') && !dataController.group()) {
      _ui.default.log('W1010');
      return false;
    }
    return true;
  }
  _selectAllItems() {
    if (!this._checkSelectAllCapability()) return (0, _deferred.Deferred)().resolve();
    return this._list._selection.selectAll(this._list.option('selectAllMode') === 'page');
  }
  _unselectAllItems() {
    if (!this._checkSelectAllCapability()) return (0, _deferred.Deferred)().resolve();
    return this._list._selection.deselectAll(this._list.option('selectAllMode') === 'page');
  }
  _isSelected($itemElement) {
    return this._list.isItemSelected($itemElement);
  }
  dispose() {
    this._disposeSelectAll();
    this._list.$element().removeClass(SELECT_DECORATOR_ENABLED_CLASS);
    // @ts-expect-error ts-error
    super.dispose.apply(this, arguments);
  }
  _disposeSelectAll() {
    if (this._$selectAll) {
      this._$selectAll.remove();
      this._$selectAll = null;
    }
  }
}
(0, _m_listEdit2.register)('selection', 'default', EditDecoratorSelection);