/**
* DevExtreme (ui/hierarchical_collection/ui.hierarchical_collection_widget.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import CollectionWidget, {
    CollectionWidgetOptions,
    ItemLike,
} from '../collection/ui.collection_widget.base';

/**
 * @namespace DevExpress.ui
 * @docid
 * @type object
 * @hidden
 */
export interface HierarchicalCollectionWidgetOptions<
    TComponent extends HierarchicalCollectionWidget<any, TItem, TKey>,
    TItem extends ItemLike = any,
    TKey = any,
> extends CollectionWidgetOptions<TComponent, TItem, TKey> {
    /**
     * @docid
     * @default 'disabled'
     * @public
     */
    disabledExpr?: string | Function;
    /**
     * @docid
     * @default 'text'
     * @type_function_param1 item:object
     * @public
     */
    displayExpr?: string | ((item: TItem) => string);
    /**
     * @docid
     * @default true &for(desktop)
     * @public
     */
    focusStateEnabled?: boolean;
    /**
     * @docid
     * @default true
     * @public
     */
    hoverStateEnabled?: boolean;
    /**
     * @docid
     * @default 'items'
     * @public
     */
    itemsExpr?: string | Function;
    /**
     * @docid
     * @default 'id'
     * @public
     */
    keyExpr?: string | Function;
    /**
     * @docid
     * @default 'selected'
     * @public
     */
    selectedExpr?: string | Function;
}
/**
 * @docid
 * @inherits CollectionWidget
 * @hidden
 * @namespace DevExpress.ui
 * @options HierarchicalCollectionWidgetOptions
 */
export default class HierarchicalCollectionWidget<
    TProperties extends HierarchicalCollectionWidgetOptions<any, TItem, TKey>,
    TItem extends ItemLike = any,
    TKey = any,
> extends CollectionWidget<TProperties, TItem, TKey> { }
