/**
* DevExtreme (esm/__internal/grids/tree_list/m_core.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from '../../../core/utils/extend';
import modules from '../../grids/grid_core/m_modules';
export default extend({}, modules, {
  modules: [],
  foreachNodes(nodes, callBack, ignoreHasChildren) {
    for (let i = 0; i < nodes.length; i++) {
      if (callBack(nodes[i]) !== false && (ignoreHasChildren || nodes[i].hasChildren) && nodes[i].children.length) {
        this.foreachNodes(nodes[i].children, callBack, ignoreHasChildren);
      }
    }
  }
});
