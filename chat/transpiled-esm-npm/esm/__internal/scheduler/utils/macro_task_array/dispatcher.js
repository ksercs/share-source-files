// eslint-disable-next-line no-restricted-globals
export const macroTaskIdSet = new Set();
const schedule = async (callback, macroTaskTimeoutMs) => new Promise(resolve => {
  // NOTE: Used setTimeout here because this method is used in heavy calculations,
  // and we wouldn't like to freeze the event loop by them
  // eslint-disable-next-line no-restricted-globals
  const taskId = setTimeout(() => {
    callback();
    macroTaskIdSet.delete(taskId);
    resolve();
  }, macroTaskTimeoutMs);
  macroTaskIdSet.add(taskId);
});
const dispose = () => {
  Array.from(macroTaskIdSet).forEach(id => {
    clearTimeout(id);
    macroTaskIdSet.delete(id);
  });
};
export default {
  schedule,
  dispose
};