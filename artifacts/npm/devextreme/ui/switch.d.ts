/**
* DevExtreme (ui/switch.d.ts)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../events/index';

import Editor, {
    ValueChangedInfo,
    EditorOptions,
} from './editor/editor';

/** @public */
export type ContentReadyEvent = EventInfo<dxSwitch>;

/** @public */
export type DisposingEvent = EventInfo<dxSwitch>;

/** @public */
export type InitializedEvent = InitializedEventInfo<dxSwitch>;

/** @public */
export type OptionChangedEvent = EventInfo<dxSwitch> & ChangedOptionInfo;

/** @public */
export type ValueChangedEvent = NativeEventInfo<dxSwitch, KeyboardEvent | MouseEvent | PointerEvent | TouchEvent | UIEvent | Event> & ValueChangedInfo;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 */
export interface dxSwitchOptions extends EditorOptions<dxSwitch> {
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
     * @hidden false
     * @public
     */
    name?: string;
    /**
     * @docid
     * @default "OFF"
     * @public
     */
    switchedOffText?: string;
    /**
     * @docid
     * @default "ON"
     * @public
     */
    switchedOnText?: string;
    /**
     * @docid
     * @default false
     * @public
     */
    value?: boolean;
}
/**
 * @docid
 * @isEditor
 * @inherits Editor
 * @namespace DevExpress.ui
 * @public
 */
export default class dxSwitch extends Editor<dxSwitchOptions> { }

/** @public */
export type Properties = dxSwitchOptions;

/** @deprecated use Properties instead */
export type Options = dxSwitchOptions;

type EventProps<T> = Extract<keyof T, `on${any}`>;
type CheckedEvents<TProps, TEvents extends { [K in EventProps<TProps>]: (e: any) => void } & Record<Exclude<keyof TEvents, keyof TProps>, never>> = TEvents;

type FilterOutHidden<T> = Omit<T, 'onFocusIn' | 'onFocusOut'>;

type EventsIntegrityCheckingHelper = CheckedEvents<FilterOutHidden<Properties>, Required<Events>>;

type Events = {
/**
 * @skip
 * @docid dxSwitchOptions.onContentReady
 * @type_function_param1 e:{ui/switch:ContentReadyEvent}
 */
onContentReady?: ((e: ContentReadyEvent) => void);
/**
 * @skip
 * @docid dxSwitchOptions.onDisposing
 * @type_function_param1 e:{ui/switch:DisposingEvent}
 */
onDisposing?: ((e: DisposingEvent) => void);
/**
 * @skip
 * @docid dxSwitchOptions.onInitialized
 * @type_function_param1 e:{ui/switch:InitializedEvent}
 */
onInitialized?: ((e: InitializedEvent) => void);
/**
 * @skip
 * @docid dxSwitchOptions.onOptionChanged
 * @type_function_param1 e:{ui/switch:OptionChangedEvent}
 */
onOptionChanged?: ((e: OptionChangedEvent) => void);
/**
 * @skip
 * @docid dxSwitchOptions.onValueChanged
 * @type_function_param1 e:{ui/switch:ValueChangedEvent}
 */
onValueChanged?: ((e: ValueChangedEvent) => void);
};
