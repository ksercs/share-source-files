/**
* DevExtreme (ui/gallery.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { DataSourceLike } from '../data/data_source';
import {
    DxPromise,
} from '../core/utils/deferred';

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

type ItemLike = string | Item | any;

/**
 * @docid _ui_gallery_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxGallery<TItem, TKey>>;

/**
 * @docid _ui_gallery_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxGallery<TItem, TKey>>;

/**
 * @docid _ui_gallery_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent<TItem extends ItemLike = any, TKey = any> = InitializedEventInfo<dxGallery<TItem, TKey>>;

/**
 * @docid _ui_gallery_ItemClickEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemClickEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxGallery<TItem, TKey>, KeyboardEvent | MouseEvent | PointerEvent> & ItemInfo<TItem>;

/**
 * @docid _ui_gallery_ItemContextMenuEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemContextMenuEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxGallery<TItem, TKey>, MouseEvent | PointerEvent | TouchEvent> & ItemInfo<TItem>;

/**
 * @docid _ui_gallery_ItemHoldEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemHoldEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxGallery<TItem, TKey>, MouseEvent | PointerEvent | TouchEvent> & ItemInfo<TItem>;

/**
 * @docid _ui_gallery_ItemRenderedEvent
 * @public
 * @type object
 * @inherits EventInfo,ItemInfo
 */
export type ItemRenderedEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxGallery<TItem, TKey>> & ItemInfo<TItem>;

/**
 * @docid _ui_gallery_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxGallery<TItem, TKey>> & ChangedOptionInfo;

/**
 * @docid _ui_gallery_SelectionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,SelectionChangedInfo
 */
export type SelectionChangedEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxGallery<TItem, TKey>> & SelectionChangedInfo<TItem>;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @public
 * @docid
 */
export interface dxGalleryOptions<
    TItem extends ItemLike = any,
    TKey = any,
> extends CollectionWidgetOptions<dxGallery<TItem, TKey>, TItem, TKey> {
    /**
     * @docid
     * @default 400
     * @public
     */
    animationDuration?: number;
    /**
     * @docid
     * @default true
     * @public
     */
    animationEnabled?: boolean;
    /**
     * @docid
     * @type string | Array<string | dxGalleryItem | any> | Store | DataSource | DataSourceOptions | null
     * @default null
     * @public
     */
    dataSource?: DataSourceLike<TItem, TKey> | null;
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
    indicatorEnabled?: boolean;
    /**
     * @docid
     * @default undefined
     * @public
     */
    initialItemWidth?: number;
    /**
     * @docid
     * @type Array<string | dxGalleryItem | any>
     * @fires dxGalleryOptions.onOptionChanged
     * @public
     */
    items?: Array<TItem>;
    /**
     * @docid
     * @default false
     * @public
     */
    loop?: boolean;
    /**
     * @docid
     * @public
     */
    noDataText?: string;
    /**
     * @docid
     * @default 0
     * @public
     */
    selectedIndex?: number;
    /**
     * @docid
     * @default true
     * @public
     */
    showIndicator?: boolean;
    /**
     * @docid
     * @default false
     * @public
     */
    showNavButtons?: boolean;
    /**
     * @docid
     * @default 0
     * @public
     */
    slideshowDelay?: number;
    /**
     * @docid
     * @default false
     * @public
     */
    stretchImages?: boolean;
    /**
     * @docid
     * @default true
     * @public
     */
    swipeEnabled?: boolean;
    /**
     * @docid
     * @default false
     * @public
     */
    wrapAround?: boolean;
}
/**
 * @docid
 * @inherits CollectionWidget
 * @namespace DevExpress.ui
 * @public
 */
export default class dxGallery<
    TItem extends ItemLike = any,
    TKey = any,
> extends CollectionWidget<dxGalleryOptions<TItem, TKey>, TItem, TKey> {
    /**
     * @docid
     * @publicName goToItem(itemIndex, animation)
     * @param1 itemIndex:numeric
     * @return Promise<void>
     * @public
     */
    goToItem(itemIndex: number, animation: boolean): DxPromise<void>;
    /**
     * @docid
     * @publicName nextItem(animation)
     * @return Promise<void>
     * @public
     */
    nextItem(animation: boolean): DxPromise<void>;
    /**
     * @docid
     * @publicName prevItem(animation)
     * @return Promise<void>
     * @public
     */
    prevItem(animation: boolean): DxPromise<void>;
}

/**
 * @public
 * @namespace DevExpress.ui.dxGallery
 */
export type Item = dxGalleryItem;

/**
 * @deprecated Use Item instead
 * @namespace DevExpress.ui
 */
export interface dxGalleryItem extends CollectionWidgetItem {
    /**
     * @docid
     * @public
     */
    imageAlt?: string;
    /**
     * @docid
     * @public
     */
    imageSrc?: string;
}

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
> = dxGalleryOptions<TItem, TKey>;

/** @deprecated use Properties instead */
export type Options<
    TItem extends ItemLike = any,
    TKey = any,
> = Properties<TItem, TKey>;


