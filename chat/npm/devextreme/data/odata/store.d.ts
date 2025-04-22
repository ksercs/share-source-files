/**
* DevExtreme (data/odata/store.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { ODataStoreOptions, ODataStore } from '../../common/data';

/**
 * @public
 * @namespace DevExpress.data.ODataStore
 */
export type Options<
    TItem = any,
    TKey = any,
> = ODataStoreOptions<TItem, TKey>;

export {
    ODataStoreOptions,
};

export default ODataStore;
