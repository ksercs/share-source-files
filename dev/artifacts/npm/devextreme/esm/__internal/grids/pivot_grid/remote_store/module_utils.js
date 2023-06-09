/**
* DevExtreme (esm/__internal/grids/pivot_grid/remote_store/module_utils.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const forEachGroup = function (data, callback, level) {
    data = data || [];
    level = level || 0;
    for (let i = 0; i < data.length; i += 1) {
        const group = data[i];
        callback(group, level);
        if (group && group.items && group.items.length) {
            forEachGroup(group.items, callback, level + 1);
        }
    }
};
export default { forEachGroup };
export { forEachGroup };
