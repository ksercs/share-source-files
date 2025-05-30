import { locate, move } from '../../animation/translator';
import $ from '../../core/renderer';
import { FunctionTemplate } from '../../core/templates/function_template';
import { when } from '../../core/utils/deferred';
import { getBoundingRect } from '../../core/utils/position';
import messageLocalization from '../../localization/message';
import { getOverflowIndicatorColor } from '../../renovation/ui/scheduler/appointment/overflow_indicator/utils';
import Button from '../../ui/button';
import { createAppointmentAdapter } from './m_appointment_adapter';
import { LIST_ITEM_CLASS, LIST_ITEM_DATA_KEY } from './m_constants';
import { AppointmentTooltipInfo } from './m_data_structures';
var APPOINTMENT_COLLECTOR_CLASS = 'dx-scheduler-appointment-collector';
var COMPACT_APPOINTMENT_COLLECTOR_CLASS = "".concat(APPOINTMENT_COLLECTOR_CLASS, "-compact");
var APPOINTMENT_COLLECTOR_CONTENT_CLASS = "".concat(APPOINTMENT_COLLECTOR_CLASS, "-content");
var WEEK_VIEW_COLLECTOR_OFFSET = 5;
var COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET = 1;
export class CompactAppointmentsHelper {
  constructor(instance) {
    this.instance = instance;
    this.elements = [];
  }
  render(options) {
    var {
      isCompact,
      items,
      buttonColor
    } = options;
    var template = this._createTemplate(items.data.length, isCompact);
    var button = this._createCompactButton(template, options);
    var $button = button.$element();
    this._makeBackgroundColor($button, items.colors, buttonColor);
    this._makeBackgroundDarker($button);
    this.elements.push($button);
    $button.data('items', this._createTooltipInfos(items));
    return $button;
  }
  clear() {
    this.elements.forEach(button => {
      button.detach();
      button.remove();
    });
    this.elements = [];
  }
  _createTooltipInfos(items) {
    return items.data.map((appointment, index) => {
      var _a;
      var targetedAdapter = createAppointmentAdapter(appointment, this.instance._dataAccessors, this.instance.timeZoneCalculator).clone();
      if (((_a = items.settings) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        var {
          info
        } = items.settings[index];
        targetedAdapter.startDate = info.sourceAppointment.startDate;
        targetedAdapter.endDate = info.sourceAppointment.endDate;
      }
      return new AppointmentTooltipInfo(appointment, targetedAdapter.source(), items.colors[index], items.settings[index]);
    });
  }
  _onButtonClick(e, options) {
    var $button = $(e.element);
    this.instance.showAppointmentTooltipCore($button, $button.data('items'), this._getExtraOptionsForTooltip(options, $button));
  }
  _getExtraOptionsForTooltip(options, $appointmentCollector) {
    return {
      clickEvent: this._clickEvent(options.onAppointmentClick).bind(this),
      dragBehavior: options.allowDrag && this._createTooltipDragBehavior($appointmentCollector).bind(this),
      dropDownAppointmentTemplate: this.instance.option().dropDownAppointmentTemplate,
      isButtonClick: true
    };
  }
  _clickEvent(onAppointmentClick) {
    return e => {
      var clickEventArgs = this.instance._createEventArgs(e);
      onAppointmentClick(clickEventArgs);
    };
  }
  _createTooltipDragBehavior($appointmentCollector) {
    return e => {
      var $element = $(e.element);
      var $schedulerElement = $(this.instance.element());
      var workSpace = this.instance.getWorkSpace();
      var getItemData = itemElement => {
        var _a;
        return (_a = $(itemElement).data(LIST_ITEM_DATA_KEY)) === null || _a === void 0 ? void 0 : _a.appointment;
      };
      var getItemSettings = (_, event) => event.itemSettings;
      var initialPosition = locate($appointmentCollector);
      var options = {
        filter: ".".concat(LIST_ITEM_CLASS),
        isSetCursorOffset: true,
        initialPosition,
        getItemData,
        getItemSettings
      };
      workSpace._createDragBehaviorBase($element, $schedulerElement, options);
    };
  }
  _getCollectorOffset(width, cellWidth) {
    return cellWidth - width - this._getCollectorRightOffset();
  }
  _getCollectorRightOffset() {
    return this.instance.getRenderingStrategyInstance()._isCompactTheme() ? COMPACT_THEME_WEEK_VIEW_COLLECTOR_OFFSET : WEEK_VIEW_COLLECTOR_OFFSET;
  }
  _makeBackgroundDarker(button) {
    button.css('boxShadow', "inset ".concat(getBoundingRect(button.get(0)).width, "px 0 0 0 rgba(0, 0, 0, 0.3)"));
  }
  _makeBackgroundColor($button, colors, color) {
    when.apply(null, colors).done(function () {
      this._makeBackgroundColorCore($button, color, [...arguments]);
    }.bind(this));
  }
  _makeBackgroundColorCore($button, color, itemColors) {
    color && color.done(color => {
      var backgroundColor = getOverflowIndicatorColor(color, itemColors);
      if (backgroundColor) {
        $button.css('backgroundColor', backgroundColor);
      }
    });
  }
  _setPosition(element, position) {
    move(element, {
      top: position.top,
      left: position.left
    });
  }
  _createCompactButton(template, options) {
    var $button = this._createCompactButtonElement(options);
    return this.instance._createComponent($button, Button, {
      type: 'default',
      width: options.width,
      height: options.height,
      onClick: e => this._onButtonClick(e, options),
      template: this._renderTemplate(template, options.items, options.isCompact)
    });
  }
  _createCompactButtonElement(_ref) {
    var {
      isCompact,
      $container,
      coordinates
    } = _ref;
    var result = $('<div>').addClass(APPOINTMENT_COLLECTOR_CLASS).toggleClass(COMPACT_APPOINTMENT_COLLECTOR_CLASS, isCompact).appendTo($container);
    this._setPosition(result, coordinates);
    return result;
  }
  _renderTemplate(template, items, isCompact) {
    return new FunctionTemplate(options => template.render({
      model: {
        appointmentCount: items.data.length,
        isCompact
      },
      container: options.container
    }));
  }
  _createTemplate(count, isCompact) {
    this._initButtonTemplate(count, isCompact);
    return this.instance._getAppointmentTemplate('appointmentCollectorTemplate');
  }
  _initButtonTemplate(count, isCompact) {
    this.instance._templateManager.addDefaultTemplates({
      appointmentCollector: new FunctionTemplate(options => this._createButtonTemplate(count, $(options.container), isCompact))
    });
  }
  _createButtonTemplate(appointmentCount, element, isCompact) {
    var text = isCompact ? appointmentCount : messageLocalization.getFormatter('dxScheduler-moreAppointments')(appointmentCount);
    return element.append($('<span>').text(text)).addClass(APPOINTMENT_COLLECTOR_CONTENT_CLASS);
  }
}