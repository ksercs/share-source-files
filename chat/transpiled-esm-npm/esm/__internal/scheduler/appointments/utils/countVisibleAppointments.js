import { isDefined } from '../../../core/utils/m_type';
const countVisibleRepeats = settings => {
  let isPreviousPart = false;
  return settings.reduce((total, settingsItem) => {
    const result = isPreviousPart ? total : total + 1;
    const {
      partIndex,
      partTotalCount
    } = settingsItem;
    isPreviousPart = isDefined(partTotalCount) && partIndex !== partTotalCount - 1;
    return result;
  }, 0);
};
export const countVisibleAppointments = items => items.filter(_ref => {
  let {
    needRemove
  } = _ref;
  return !needRemove;
}).reduce((total, item) => total + countVisibleRepeats(item.settings), 0);