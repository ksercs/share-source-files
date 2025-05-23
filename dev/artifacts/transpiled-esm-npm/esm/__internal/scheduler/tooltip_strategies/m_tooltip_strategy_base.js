import $ from '../../../core/renderer';
import { FunctionTemplate } from '../../../core/templates/function_template';
import Button from '../../../ui/button';
import List from '../../../ui/list/ui.list.edit';
var TOOLTIP_APPOINTMENT_ITEM = 'dx-tooltip-appointment-item';
var TOOLTIP_APPOINTMENT_ITEM_CONTENT = "".concat(TOOLTIP_APPOINTMENT_ITEM, "-content");
var TOOLTIP_APPOINTMENT_ITEM_CONTENT_SUBJECT = "".concat(TOOLTIP_APPOINTMENT_ITEM, "-content-subject");
var TOOLTIP_APPOINTMENT_ITEM_CONTENT_DATE = "".concat(TOOLTIP_APPOINTMENT_ITEM, "-content-date");
var TOOLTIP_APPOINTMENT_ITEM_MARKER = "".concat(TOOLTIP_APPOINTMENT_ITEM, "-marker");
var TOOLTIP_APPOINTMENT_ITEM_MARKER_BODY = "".concat(TOOLTIP_APPOINTMENT_ITEM, "-marker-body");
var TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON_CONTAINER = "".concat(TOOLTIP_APPOINTMENT_ITEM, "-delete-button-container");
var TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON = "".concat(TOOLTIP_APPOINTMENT_ITEM, "-delete-button");
export class TooltipStrategyBase {
  constructor(options) {
    this._tooltip = null;
    this._options = options;
    this._extraOptions = null;
  }
  show(target, dataList, extraOptions) {
    if (this._canShowTooltip(dataList)) {
      this.hide();
      this._extraOptions = extraOptions;
      this._showCore(target, dataList);
    }
  }
  _showCore(target, dataList) {
    if (!this._tooltip) {
      this._tooltip = this._createTooltip(target, dataList);
    } else {
      this._shouldUseTarget() && this._tooltip.option('target', target);
      this._list.option('dataSource', dataList);
    }
    this._prepareBeforeVisibleChanged(dataList);
    this._tooltip.option('visible', true);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _prepareBeforeVisibleChanged(dataList) {}
  _getContentTemplate(dataList) {
    return container => {
      var listElement = $('<div>');
      $(container).append(listElement);
      this._list = this._createList(listElement, dataList);
    };
  }
  isAlreadyShown(target) {
    if (this._tooltip && this._tooltip.option('visible')) {
      return this._tooltip.option('target')[0] === target[0];
    }
    return undefined;
  }
  _onShown() {
    this._list.option('focusStateEnabled', this._extraOptions.focusStateEnabled);
  }
  dispose() {}
  hide() {
    if (this._tooltip) {
      this._tooltip.option('visible', false);
    }
  }
  _shouldUseTarget() {
    return true;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _createTooltip(target, dataList) {}
  _canShowTooltip(dataList) {
    if (!dataList.length) {
      return false;
    }
    return true;
  }
  _createListOption(dataList) {
    return {
      dataSource: dataList,
      onContentReady: this._onListRender.bind(this),
      onItemClick: e => this._onListItemClick(e),
      onItemContextMenu: this._onListItemContextMenu.bind(this),
      itemTemplate: (item, index) => this._renderTemplate(item.appointment, item.targetedAppointment, index, item.color),
      _swipeEnabled: false,
      pageLoadMode: 'scrollBottom'
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onListRender(e) {}
  _createTooltipElement(wrapperClass) {
    return $('<div>').appendTo(this._options.container).addClass(wrapperClass);
  }
  _createList(listElement, dataList) {
    return this._options.createComponent(listElement, List, this._createListOption(dataList));
  }
  _renderTemplate(appointment, targetedAppointment, index, color) {
    var itemListContent = this._createItemListContent(appointment, targetedAppointment, color);
    this._options.addDefaultTemplates({
      // @ts-expect-error
      [this._getItemListTemplateName()]: new FunctionTemplate(options => {
        var $container = $(options.container);
        $container.append(itemListContent);
        return $container;
      })
    });
    var template = this._options.getAppointmentTemplate("".concat(this._getItemListTemplateName(), "Template"));
    return this._createFunctionTemplate(template, appointment, targetedAppointment, index);
  }
  _createFunctionTemplate(template, appointmentData, targetedAppointmentData, index) {
    var isButtonClicked = !!this._extraOptions.isButtonClick;
    var isEmptyDropDownAppointmentTemplate = this._isEmptyDropDownAppointmentTemplate();
    // @ts-expect-error
    return new FunctionTemplate(options => template.render({
      model: isEmptyDropDownAppointmentTemplate ? {
        appointmentData,
        targetedAppointmentData,
        isButtonClicked
      } : appointmentData,
      container: options.container,
      index
    }));
  }
  _getItemListTemplateName() {
    return this._isEmptyDropDownAppointmentTemplate() ? 'appointmentTooltip' : 'dropDownAppointment';
  }
  _isEmptyDropDownAppointmentTemplate() {
    return !this._extraOptions.dropDownAppointmentTemplate || this._extraOptions.dropDownAppointmentTemplate === 'dropDownAppointment';
  }
  _onListItemClick(e) {
    this.hide();
    this._extraOptions.clickEvent && this._extraOptions.clickEvent(e);
    this._options.showAppointmentPopup(e.itemData.appointment, false, e.itemData.targetedAppointment);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onListItemContextMenu(e) {}
  _createItemListContent(appointment, targetedAppointment, color) {
    var {
      editing
    } = this._extraOptions;
    var $itemElement = $('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM);
    $itemElement.append(this._createItemListMarker(color));
    $itemElement.append(this._createItemListInfo(this._options.createFormattedDateText(appointment, targetedAppointment)));
    var disabled = this._options.getAppointmentDisabled(appointment);
    if (!disabled && (editing && editing.allowDeleting === true || editing === true)) {
      $itemElement.append(this._createDeleteButton(appointment, targetedAppointment));
    }
    return $itemElement;
  }
  _createItemListMarker(color) {
    var $marker = $('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_MARKER);
    var $markerBody = $('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_MARKER_BODY);
    $marker.append($markerBody);
    color && color.done(value => $markerBody.css('background', value));
    return $marker;
  }
  _createItemListInfo(object) {
    var result = $('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_CONTENT);
    var $title = $('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_CONTENT_SUBJECT).text(object.text);
    var $date = $('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_CONTENT_DATE).text(object.formatDate);
    return result.append($title).append($date);
  }
  _createDeleteButton(appointment, targetedAppointment) {
    var $container = $('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON_CONTAINER);
    var $deleteButton = $('<div>').addClass(TOOLTIP_APPOINTMENT_ITEM_DELETE_BUTTON);
    $container.append($deleteButton);
    this._options.createComponent($deleteButton, Button, {
      icon: 'trash',
      stylingMode: 'text',
      onClick: e => {
        this.hide();
        e.event.stopPropagation();
        this._options.checkAndDeleteAppointment(appointment, targetedAppointment);
      }
    });
    return $container;
  }
}