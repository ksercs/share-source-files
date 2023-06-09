/**
* DevExtreme (esm/__internal/grids/data_grid/module_editing.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import './module_not_extended/editor_factory';
// @ts-expect-error
import { editingModule } from '../../../ui/grid_core/ui.grid_core.editing';
import { extend } from '../../../core/utils/extend';
import gridCore from './module_core';
gridCore.registerModule('editing', extend(true, {}, editingModule, {
    extenders: {
        controllers: {
            data: {
                _changeRowExpandCore(key) {
                    const editingController = this._editingController;
                    if (Array.isArray(key)) {
                        editingController && editingController.refresh();
                    }
                    return this.callBase.apply(this, arguments);
                },
            },
        },
    },
}));
