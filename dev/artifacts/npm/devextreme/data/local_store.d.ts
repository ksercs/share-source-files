/**
* DevExtreme (data/local_store.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import ArrayStore, {
    ArrayStoreOptions,
} from './array_store';

/** @public */
export type Options<
    TItem = any,
    TKey = any,
> = LocalStoreOptions<TItem, TKey>;

/**
 * @namespace DevExpress.data
 * @deprecated Use Options instead
 * @docid
 */
export interface LocalStoreOptions<
    TItem = any,
    TKey = any,
> extends ArrayStoreOptions<TItem, TKey> {
    /**
     * @docid
     * @default 10000
     * @public
     */
    flushInterval?: number;
    /**
     * @docid
     * @default false
     * @public
     */
    immediate?: boolean;
    /**
     * @docid
     * @public
     */
    name?: string;
}
/**
 * @docid
 * @inherits ArrayStore
 * @public
 * @options LocalStoreOptions
 */
export default class LocalStore<
    TItem = any,
    TKey = any,
> extends ArrayStore<TItem, TKey> {
    constructor(options?: Options<TItem, TKey>);
    /**
     * @docid
     * @publicName clear()
     * @public
     */
    clear(): void;
}
