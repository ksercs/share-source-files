/**
* DevExtreme (data/index.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import CustomStore, { Options as CustomStoreOptions } from './custom_store';
import ArrayStore, { Options as ArrayStoreOptions } from './array_store';
import LocalStore, { Options as LocalStoreOptions } from './local_store';
import ODataStore, { Options as ODataStoreOptions } from './odata/store';

/**
 * @public
 */
export type SearchOperation = '=' | '<>' | '>' | '>=' | '<' | '<=' | 'startswith' | 'endswith' | 'contains' | 'notcontains';

type KeySelector<T> = string | ((source: T) => string | number | Date | Object);

type SelectionDescriptor<T> = {
    selector: KeySelector<T>;
};

type OrderingDescriptor<T> = SelectionDescriptor<T> & {
    desc?: boolean;
};

/**
 * @public
 */
export type GroupingInterval = 'year' | 'quarter' | 'month' | 'day' | 'dayOfWeek' | 'hour' | 'minute' | 'second';

/**
 * @docid
 * @public
 * @type object
 * @skip
 */
export type GroupDescriptor<T> = KeySelector<T> | (OrderingDescriptor<T> & {
    groupInterval?: number | GroupingInterval;
    isExpanded?: boolean;
});

/**
 * @docid
 * @public
 * @type object
 * @skip
 */
export type SortDescriptor<T> = KeySelector<T> | OrderingDescriptor<T>;

/**
 * @docid
 * @public
 * @type object
 * @skip
 */
export type SelectDescriptor<T> = string | Array<string> | ((source: T) => any);
/**
 * @docid
 * @public
 */
export type FilterDescriptor = any;
/**
 * @docid
 * @public
 */
export type LangParams = {
  /**
   * @docid
   * @public
   */
  locale: string;
  /**
   * @docid
   * @public
   * @type object
   */
  collatorOptions?: Intl.CollatorOptions;
};
 /**
 * @docid
 * @public
 * @type object
 */
export type SummaryDescriptor<T> = KeySelector<T> | SelectionDescriptor<T> & {
    summaryType?: 'sum' | 'avg' | 'min' | 'max' | 'count';
};

/**
 * @public
 * @docid
 * @namespace DevExpress.data
 * @type object
 */
export interface LoadOptions<T = any> {
    /**
     * @docid
     * @public
     */
    customQueryParams?: any;
    /**
     * @docid
     * @public
     */
    startDate?: Date;
    /**
     * @docid
     * @public
     */
    endDate?: Date;
    /**
     * @docid
     * @public
     */
    expand?: Array<string>;
    /**
     * @docid
     * @public
     * @type object
     */
    filter?: FilterDescriptor | Array<FilterDescriptor>;
    /**
     * @docid
     * @public
     * @type object
     */
    group?: GroupDescriptor<T> | Array<GroupDescriptor<T>>;
    /**
     * @docid
     * @public
     * @type SummaryDescriptor | Array<SummaryDescriptor>
     */
    groupSummary?: SummaryDescriptor<T> | Array<SummaryDescriptor<T>>;
    /**
     * @docid
     * @public
     */
    parentIds?: Array<any>;
    /**
     * @docid
     * @public
     */
    requireGroupCount?: boolean;
    /**
     * @docid
     * @public
     */
    requireTotalCount?: boolean;
    /**
     * @docid
     * @type getter|Array<getter>
     * @public
     */
    searchExpr?: string | Function | Array<string | Function>;
    /**
     * @docid
     * @public
     */
    searchOperation?: SearchOperation;
    /**
     * @docid
     * @public
     */
    searchValue?: any;
    /**
     * @docid
     * @public
     * @type object
     */
    select?: SelectDescriptor<T>;
    /**
     * @docid
     * @public
     */
    skip?: number;
    /**
     * @docid
     * @public
     * @type object
     */
    sort?: SortDescriptor<T> | Array<SortDescriptor<T>>;
    /**
     * @docid
     * @public
     */
    take?: number;
    /**
     * @docid
     * @public
     * @type SummaryDescriptor | Array<SummaryDescriptor>
     */
    totalSummary?: SummaryDescriptor<T> | Array<SummaryDescriptor<T>>;
    /**
     * @docid
     * @public
     */
    userData?: any;
}

/**
 * @public
 * @namespace DevExpress.data.utils
 */
export type Store<TItem = any, TKey = any> =
    CustomStore<TItem, TKey> |
    ArrayStore<TItem, TKey> |
    LocalStore<TItem, TKey> |
    ODataStore<TItem, TKey>;

/**
 * @public
 * @namespace DevExpress.data.utils
 * @type object
 */
export type StoreOptions<TItem = any, TKey = any> =
    CustomStoreOptions<TItem, TKey> |
    ArrayStoreOptions<TItem, TKey> & { type: 'array' } |
    LocalStoreOptions<TItem, TKey> & { type: 'local' } |
    ODataStoreOptions<TItem, TKey> & { type: 'odata' };
