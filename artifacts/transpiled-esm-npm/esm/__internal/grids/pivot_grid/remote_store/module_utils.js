var forEachGroup = function forEachGroup(data, callback, level) {
  data = data || [];
  level = level || 0;
  for (var i = 0; i < data.length; i += 1) {
    var group = data[i];
    callback(group, level);
    if (group && group.items && group.items.length) {
      forEachGroup(group.items, callback, level + 1);
    }
  }
};
export default {
  forEachGroup
};
export { forEachGroup };