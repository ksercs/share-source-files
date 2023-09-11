/**
* DevExtreme (ui/multi_view.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { DataSourceLike } from '../data/data_source';

import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
    ItemInfo,
} from '../events/index';

import CollectionWidget, {
    CollectionWidgetItem,
    CollectionWidgetOptions,
    SelectionChangedInfo,
} from './collection/ui.collection_widget.base';

export type ItemLike = string | Item | any;

/**
 * @docid _ui_multi_view_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxMultiView<TItem, TKey>>;

/**
 * @docid _ui_multi_view_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxMultiView<TItem, TKey>>;

/**
 * @docid _ui_multi_view_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent<TItem extends ItemLike = any, TKey = any> = InitializedEventInfo<dxMultiView<TItem, TKey>>;

/**
 * @docid _ui_multi_view_ItemClickEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemClickEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxMultiView<TItem, TKey>, KeyboardEvent | MouseEvent | PointerEvent> & ItemInfo<TItem>;

/**
 * @docid _ui_multi_view_ItemContextMenuEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemContextMenuEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxMultiView<TItem, TKey>, MouseEvent | PointerEvent | TouchEvent> & ItemInfo<TItem>;

/**
 * @docid _ui_multi_view_ItemHoldEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemHoldEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxMultiView<TItem, TKey>, MouseEvent | PointerEvent | TouchEvent> & ItemInfo<TItem>;

/**
 * @docid _ui_multi_view_ItemRenderedEvent
 * @public
 * @type object
 * @inherits EventInfo,ItemInfo
 */
export type ItemRenderedEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxMultiView<TItem, TKey>> & ItemInfo<TItem>;

/**
 * @docid _ui_multi_view_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxMultiView<TItem, TKey>> & ChangedOptionInfo;

/**
 * @docid _ui_multi_view_SelectionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,SelectionChangedInfo
 */
export type SelectionChangedEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxMultiView<TItem, TKey>> & SelectionChangedInfo<TItem>;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @public
 * @docid
 */
export interface dxMultiViewOptions<
    TItem extends ItemLike = any,
    TKey = any,
> extends dxMultiViewBaseOptions<dxMultiView<TItem, TKey>, TItem, TKey> {}

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid dxMultiViewOptions
 */
export interface dxMultiViewBaseOptions<
    TComponent extends dxMultiView<TItem, TKey> = dxMultiView<any, any>,
    TItem extends ItemLike = any,
    TKey = any,
> extends CollectionWidgetOptions<TComponent, TItem, TKey> {
    /**
     * @docid dxMultiViewOptions.animationEnabled
     * @default true
     * @public
     */
    animationEnabled?: boolean;
    /**
     * @docid dxMultiViewOptions.dataSource
     * @type string | Array<string | dxMultiViewItem | any> | Store | DataSource | DataSourceOptions | null
     * @default null
     * @public
     */
    dataSource?: DataSourceLike<TItem, TKey> | null;
    /**
     * @docid dxMultiViewOptions.deferRendering
     * @default true
     * @public
     */
    deferRendering?: boolean;
    /**
     * @docid dxMultiViewOptions.focusStateEnabled
     * @default true &for(desktop)
     * @public
     */
    focusStateEnabled?: boolean;
    /**
     * @docid dxMultiViewOptions.items
     * @type Array<string | dxMultiViewItem | any>
     * @fires dxMultiViewOptions.onOptionChanged
     * @public
     */
    items?: Array<TItem>;
    /**
     * @docid dxMultiViewOptions.loop
     * @default false
     * @public
     */
    loop?: boolean;
    /**
     * @docid dxMultiViewOptions.selectedIndex
     * @default 0
     * @public
     */
    selectedIndex?: number;
    /**
     * @docid dxMultiViewOptions.swipeEnabled
     * @default true
     * @public
     */
    swipeEnabled?: boolean;
}

/**
 * @docid
 * @inherits CollectionWidget
 * @namespace DevExpress.ui
 * @public
 */
export default class dxMultiView<
    TItem extends ItemLike = any,
    TKey = any,
> extends CollectionWidget<Properties<TItem, TKey>, TItem, TKey> { }

/**
 * @public
 * @namespace DevExpress.ui.dxMultiView
 */
export type Item = dxMultiViewItem;

 /**
  * @deprecated Use Item instead
  * @namespace DevExpress.ui
  */
export interface dxMultiViewItem extends CollectionWidgetItem {}

/** @public */
export type ExplicitTypes<
    TItem extends ItemLike,
    TKey,
> = {
    Properties: Properties<TItem, TKey>;
    ContentReadyEvent: ContentReadyEvent<TItem, TKey>;
    DisposingEvent: DisposingEvent<TItem, TKey>;
    InitializedEvent: InitializedEvent<TItem, TKey>;
    ItemClickEvent: ItemClickEvent<TItem, TKey>;
    ItemContextMenuEvent: ItemContextMenuEvent<TItem, TKey>;
    ItemHoldEvent: ItemHoldEvent<TItem, TKey>;
    ItemRenderedEvent: ItemRenderedEvent<TItem, TKey>;
    OptionChangedEvent: OptionChangedEvent<TItem, TKey>;
    SelectionChangedEvent: SelectionChangedEvent<TItem, TKey>;
};

/** @public */
export type Properties<
    TItem extends ItemLike = any,
    TKey = any,
> = dxMultiViewOptions<TItem, TKey>;

/** @deprecated use Properties instead */
export type Options<
    TItem extends ItemLike = any,
    TKey = any,
> = Properties<TItem, TKey>;


