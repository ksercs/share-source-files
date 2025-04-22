/**
* DevExtreme (data/custom_store.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { CustomStore, CustomStoreOptions } from '../common/data';

export {
  GroupItem,
  ResolvedData,
  CustomStoreOptions,
} from '../common/data';

/**
 * @public
 * @deprecated Use CustomStoreOptions from /common/data instead
 * @namespace DevExpress.data.CustomStore
 */
export type Options<
    TItem = any,
    TKey = any,
> = CustomStoreOptions<TItem, TKey>;

export default CustomStore;
