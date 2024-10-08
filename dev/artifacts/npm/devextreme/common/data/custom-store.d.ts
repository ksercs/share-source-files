/**
* DevExtreme (common/data/custom-store.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid
 * @public
 */
export type GroupItem<
    TItem = any,
> = {
  /** @docid */
  key: any | string | number;
  /**
   * @docid
   * @type Array<any>|Array<GroupItem>|null
   */
  items: Array<TItem> | Array<GroupItem<TItem>> | null;
  /** @docid */
  count?: number;
  /** @docid */
  summary?: Array<any>;
};

type LoadResultArray<TItem = any> = Array<TItem> | Array<GroupItem<TItem>>;

/**
 * @docid
 * @public
 */
export type LoadResultObject<TItem = any> = {
    /**
     * @docid
     * @type Array<any>|Array<GroupItem>
    */
    data: Array<TItem> | Array<GroupItem<TItem>>;
    /** @docid */
    totalCount?: number;
    /** @docid */
    summary?: Array<any>;
    /** @docid */
    groupCount?: number;
  };

/**
 * @docid
 * @public
 * @type object
 */
export type LoadResult<
    TItem = any,
> =
  | Object
  | LoadResultArray<TItem>
  | LoadResultObject<TItem>;

/**
 * @docid
 * @public
 */
export function isLoadResultObject<TItem>(res: LoadResult<TItem>): res is LoadResultObject<TItem>;

/**
 * @docid
 * @public
 */
export function isGroupItemsArray<TItem>(res: LoadResult<TItem>): res is Array<GroupItem<TItem>>;

/**
 * @docid
 * @public
 */
export function isItemsArray<TItem>(res: LoadResult<TItem>): res is Array<TItem>;
