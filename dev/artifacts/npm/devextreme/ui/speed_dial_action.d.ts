/**
* DevExtreme (ui/speed_dial_action.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    DxElement,
} from '../core/element';

import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../events/index';

import Widget, {
    WidgetOptions,
} from './widget/ui.widget';

/**
 * @docid _ui_speed_dial_action_ClickEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type ClickEvent = NativeEventInfo<dxSpeedDialAction, MouseEvent | PointerEvent> & {
    /** @docid _ui_speed_dial_action_ClickEvent.actionElement */
    actionElement?: DxElement;
};

/**
 * @docid _ui_speed_dial_action_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxSpeedDialAction> & {
    /** @docid _ui_speed_dial_action_ContentReadyEvent.actionElement */
    actionElement?: DxElement;
};

/**
 * @docid _ui_speed_dial_action_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxSpeedDialAction>;

/**
 * @docid _ui_speed_dial_action_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxSpeedDialAction>;

/**
 * @docid _ui_speed_dial_action_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxSpeedDialAction> & ChangedOptionInfo;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxSpeedDialActionOptions extends WidgetOptions<dxSpeedDialAction> {
    /**
     * @docid
     * @default ""
     * @public
     */
    icon?: string;
    /**
     * @docid
     * @default 0
     * @public
     */
    index?: number;
    /**
     * @docid
     * @default ""
     * @public
     */
    label?: string;
    /**
     * @docid
     * @type_function_param1 e:{ui/speed_dial_action:ClickEvent}
     * @action
     * @public
     */
    onClick?: ((e: ClickEvent) => void);
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/speed_dial_action:ContentReadyEvent}
     * @action
     * @public
     */
    onContentReady?: ((e: ContentReadyEvent) => void);
    /**
     * @docid
     * @public
     */
    visible?: boolean;
}
/**
 * @docid
 * @inherits Widget
 * @namespace DevExpress.ui
 * @public
 */
export default class dxSpeedDialAction extends Widget<dxSpeedDialActionOptions> { }

/** @public */
export type Properties = dxSpeedDialActionOptions;

/** @deprecated use Properties instead */
export type Options = dxSpeedDialActionOptions;


