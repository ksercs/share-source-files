/**
* DevExtreme (ui/stepper.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
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
  SelectionChangeInfo,
  SelectionChangingEventBase,
} from './collection/ui.collection_widget.base';

import {
  Orientation,
} from '../common';

type ItemLike = string | Item | any;

/**
 * @docid _ui_stepper_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxStepper<TItem, TKey>>;

/**
 * @docid _ui_stepper_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent<TItem extends ItemLike = any, TKey = any> = InitializedEventInfo<dxStepper<TItem, TKey>>;

/**
 * @docid _ui_stepper_ItemClickEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemClickEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxStepper<TItem, TKey>, MouseEvent | PointerEvent> & ItemInfo<TItem>;

/**
 * @docid _ui_stepper_ItemContextMenuEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ItemInfo
 */
export type ItemContextMenuEvent<TItem extends ItemLike = any, TKey = any> = NativeEventInfo<dxStepper<TItem, TKey>, MouseEvent | PointerEvent | TouchEvent> & ItemInfo<TItem>;

/**
 * @docid _ui_stepper_ItemRenderedEvent
 * @public
 * @type object
 * @inherits EventInfo,ItemInfo
 */
export type ItemRenderedEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxStepper<TItem, TKey>> & ItemInfo<TItem>;

/**
 * @docid _ui_stepper_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxStepper<TItem, TKey>> & ChangedOptionInfo;

/**
 * @docid _ui_stepper_SelectionChangingEvent
 * @public
 * @type object
 * @inherits AsyncCancelable,EventInfo,SelectionChangeInfo
 */
export type SelectionChangingEvent<TItem extends ItemLike = any, TKey = any> = SelectionChangingEventBase<dxStepper<TItem, TKey>>;

/**
 * @docid _ui_stepper_SelectionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,SelectionChangeInfo
 */
export type SelectionChangedEvent<TItem extends ItemLike = any, TKey = any> = EventInfo<dxStepper<TItem, TKey>> & SelectionChangeInfo<TItem>;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @public
 * @docid
 */
export interface dxStepperOptions<
  TItem extends ItemLike = any,
  TKey = any,
> extends CollectionWidgetOptions<dxStepper<TItem, TKey>, TItem, TKey> {
  /**
   * @docid
   * @default true
   * @public
   */
  activeStateEnabled?: boolean;
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
   * @default true
   * @public
   */
  selectOnFocus?: boolean;
  /**
   * @docid
   * @type string | Array<dxStepperItem> | Store | DataSource | DataSourceOptions | null
   * @default null
   * @public
   */
  dataSource?: DataSourceLike<TItem, TKey> | null;
  /**
   * @docid
   * @default 'horizontal'
   * @public
   */
  orientation?: Orientation;
  /**
   * @docid
   * @default true
   * @public
   */
  linear?: boolean;
  /**
   * @docid
   * @type Array<dxStepperItem>
   * @fires dxStepperOptions.onOptionChanged
   * @public
   */
  items?: Array<TItem>;
}

/**
 * @docid
 * @inherits CollectionWidget
 * @namespace DevExpress.ui
 * @public
 */
export default class dxStepper<
  TItem extends ItemLike = any,
  TKey = any,
> extends CollectionWidget<Properties<TItem, TKey>, TItem, TKey> { }

/**
 * @public
 * @namespace DevExpress.ui.dxStepper
 */
export type Item = dxStepperItem;

/**
 * @deprecated Use Item instead
 * @namespace DevExpress.ui
 */
export interface dxStepperItem extends CollectionWidgetItem {
  /**
   * @docid
   * @public
   */
  icon?: string;
  /**
   * @docid
   * @public
   */
  label?: string;
  /**
   * @docid
   * @public
   */
  hint?: string;
  /**
   * @docid
   * @public
   */
  optional?: boolean;
  /**
   * @docid
   * @public
   */
  isValid?: boolean;
}

/** @public */
export type ExplicitTypes<
  TItem extends ItemLike,
  TKey,
> = {
  Properties: Properties<TItem, TKey>;
  DisposingEvent: DisposingEvent<TItem, TKey>;
  InitializedEvent: InitializedEvent<TItem, TKey>;
  ItemClickEvent: ItemClickEvent<TItem, TKey>;
  ItemContextMenuEvent: ItemContextMenuEvent<TItem, TKey>;
  ItemRenderedEvent: ItemRenderedEvent<TItem, TKey>;
  OptionChangedEvent: OptionChangedEvent<TItem, TKey>;
  SelectionChangedEvent: SelectionChangedEvent<TItem, TKey>;
  SelectionChangingEvent: SelectionChangingEvent<TItem, TKey>;
};

/** @public */
export type Properties<
  TItem extends ItemLike = any,
  TKey = any,
> = dxStepperOptions<TItem, TKey>;


