"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateNavigator = exports.ITEMS_NAME = exports.DEFAULT_ITEMS = exports.CLASS = void 0;
var _message = _interopRequireDefault(require("../../../common/core/localization/message"));
var _date = _interopRequireDefault(require("../../../core/utils/date"));
var _themes = require("../../../ui/themes");
var _date2 = require("../../core/utils/date");
var _m_extend = require("../../core/utils/m_extend");
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CLASS = exports.CLASS = {
  container: 'dx-scheduler-navigator',
  previousButton: 'dx-scheduler-navigator-previous',
  calendarButton: 'dx-scheduler-navigator-caption',
  nextButton: 'dx-scheduler-navigator-next'
};
const ITEMS_NAME = exports.ITEMS_NAME = {
  previousButton: 'prev',
  nextButton: 'next',
  calendarButton: 'dateInterval'
};
const DEFAULT_ITEMS = exports.DEFAULT_ITEMS = [ITEMS_NAME.previousButton, ITEMS_NAME.nextButton, ITEMS_NAME.calendarButton];
const {
  trimTime
} = _date.default;
const isPreviousButtonDisabled = header => {
  const minOption = header.option('min');
  if (!_date2.dateUtilsTs.isValidDate(minOption)) return false;
  let min = new Date(minOption);
  const caption = header._getCaption();
  min = trimTime(min);
  const previousDate = header._getNextDate(_constants.Direction.Left, caption.endDate);
  return previousDate < min;
};
const isNextButtonDisabled = header => {
  const maxOption = header.option('max');
  if (!_date2.dateUtilsTs.isValidDate(maxOption)) return false;
  const max = new Date(maxOption);
  const caption = header._getCaption();
  max.setHours(23, 59, 59);
  const nextDate = header._getNextDate(_constants.Direction.Right, caption.startDate);
  return nextDate > max;
};
const getPreviousButtonOptions = header => {
  const ariaMessage = _message.default.format('dxScheduler-navigationPrevious');
  return {
    key: ITEMS_NAME.previousButton,
    icon: 'chevronprev',
    elementAttr: {
      class: CLASS.previousButton,
      'aria-label': ariaMessage
    },
    clickHandler: () => header._updateDateByDirection(_constants.Direction.Left),
    onContentReady: event => {
      const previousButton = event.component;
      previousButton.option('disabled', isPreviousButtonDisabled(header));
      header._addEvent('min', () => {
        previousButton.option('disabled', isPreviousButtonDisabled(header));
      });
      header._addEvent('currentDate', () => {
        previousButton.option('disabled', isPreviousButtonDisabled(header));
      });
      header._addEvent('startViewDate', () => {
        previousButton.option('disabled', isPreviousButtonDisabled(header));
      });
    }
  };
};
const getCalendarButtonOptions = header => ({
  key: ITEMS_NAME.calendarButton,
  text: header.captionText,
  elementAttr: {
    class: CLASS.calendarButton
  },
  clickHandler: event => header._showCalendar(event),
  onContentReady: event => {
    const calendarButton = event.component;
    header._addEvent('currentView', () => {
      calendarButton.option('text', header.captionText);
    });
    header._addEvent('currentDate', () => {
      calendarButton.option('text', header.captionText);
    });
    header._addEvent('startViewDate', () => {
      calendarButton.option('text', header.captionText);
    });
    header._addEvent('views', () => {
      calendarButton.option('text', header.captionText);
    });
    header._addEvent('firstDayOfWeek', () => {
      calendarButton.option('text', header.captionText);
    });
  }
});
const getNextButtonOptions = header => {
  const ariaMessage = _message.default.format('dxScheduler-navigationNext');
  return {
    key: ITEMS_NAME.nextButton,
    icon: 'chevronnext',
    elementAttr: {
      class: CLASS.nextButton,
      'aria-label': ariaMessage
    },
    clickHandler: () => header._updateDateByDirection(_constants.Direction.Right),
    onContentReady: event => {
      const nextButton = event.component;
      nextButton.option('disabled', isNextButtonDisabled(header));
      header._addEvent('min', () => {
        nextButton.option('disabled', isNextButtonDisabled(header));
      });
      header._addEvent('currentDate', () => {
        nextButton.option('disabled', isNextButtonDisabled(header));
      });
      header._addEvent('startViewDate', () => {
        nextButton.option('disabled', isNextButtonDisabled(header));
      });
    }
  };
};
const getDateNavigator = (header, item) => {
  // @ts-expect-error current theme used
  const stylingMode = (0, _themes.isMaterialBased)() ? 'text' : 'contained';
  const config = (0, _m_extend.extend)(true, {}, {
    location: 'before',
    name: 'dateNavigator',
    widget: 'dxButtonGroup',
    cssClass: CLASS.container,
    options: {
      stylingMode,
      selectionMode: 'none'
    }
  }, item);
  const options = config.options;
  const {
    onItemClick
  } = options;
  options.items = (options.items ?? DEFAULT_ITEMS).map(groupItem => {
    switch (groupItem) {
      case ITEMS_NAME.previousButton:
        return getPreviousButtonOptions(header);
      case ITEMS_NAME.nextButton:
        return getNextButtonOptions(header);
      case ITEMS_NAME.calendarButton:
        return getCalendarButtonOptions(header);
      default:
        return groupItem;
    }
  });
  options.onItemClick = event => {
    var _event$itemData$click, _event$itemData;
    (_event$itemData$click = (_event$itemData = event.itemData).clickHandler) === null || _event$itemData$click === void 0 || _event$itemData$click.call(_event$itemData, event);
    onItemClick === null || onItemClick === void 0 || onItemClick(event);
  };
  return config;
};
exports.getDateNavigator = getDateNavigator;