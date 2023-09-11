/**
* DevExtreme (data/array_store.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Store, {
    Options as StoreOptions,
} from './abstract_store';
import { Query } from './query';
import { DxPromise } from '../core/utils/deferred';

/** @public */
export type Options<
    TItem = any,
    TKey = any,
> = ArrayStoreOptions<TItem, TKey>;

/**
 * @namespace DevExpress.data
 * @deprecated Use Options instead
 * @docid
 */
export interface ArrayStoreOptions<
    TItem = any,
    TKey = any,
> extends StoreOptions<TItem, TKey> {
    /**
     * @docid
     * @public
     */
    data?: Array<TItem>;
}
/**
 * @docid
 * @inherits Store
 * @public
 * @options ArrayStoreOptions
 */
export default class ArrayStore<
    TItem = any,
    TKey = any,
> extends Store<TItem, TKey> {
    constructor(options?: Options<TItem, TKey>);
    /**
     * @docid
     * @publicName byKey(key)
     * @param1 key:object|string|number
     * @return Promise<any>
     * @public
     */
    byKey(key: TKey): DxPromise<TItem>;
    /**
     * @docid
     * @publicName clear()
     * @public
     */
    clear(): void;
    /**
     * @docid
     * @publicName createQuery()
     * @return object
     * @public
     */
    createQuery(): Query;
}
