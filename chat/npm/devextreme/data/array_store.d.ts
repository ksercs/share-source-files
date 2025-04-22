/**
* DevExtreme (data/array_store.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { ArrayStore, ArrayStoreOptions } from '../common/data';

export {
    ArrayStoreOptions,
} from '../common/data';

/**
 * @public
 * @deprecated Use ArrayStoreOptions from /common/data instead
 * @namespace DevExpress.data.ArrayStore
 */
export type Options<
    TItem = any,
    TKey = any,
> = ArrayStoreOptions<TItem, TKey>;

export default ArrayStore;
