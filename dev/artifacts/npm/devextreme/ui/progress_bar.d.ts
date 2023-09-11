/**
* DevExtreme (ui/progress_bar.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
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

import {
    ValueChangedInfo,
} from './editor/editor';

import dxTrackBar, {
    dxTrackBarOptions,
} from './track_bar';

/**
 * @docid _ui_progress_bar_CompleteEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type CompleteEvent = NativeEventInfo<dxProgressBar>;

/**
 * @docid _ui_progress_bar_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxProgressBar>;

/**
 * @docid _ui_progress_bar_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxProgressBar>;

/**
 * @docid _ui_progress_bar_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxProgressBar>;

/**
 * @docid _ui_progress_bar_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxProgressBar> & ChangedOptionInfo;

/**
 * @docid _ui_progress_bar_ValueChangedEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ValueChangedInfo
 */
export type ValueChangedEvent = NativeEventInfo<dxProgressBar> & ValueChangedInfo;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxProgressBarOptions extends dxTrackBarOptions<dxProgressBar> {
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/progress_bar:CompleteEvent}
     * @action
     * @public
     */
    onComplete?: ((e: CompleteEvent) => void);
    /**
     * @docid
     * @default true
     * @public
     */
    showStatus?: boolean;
    /**
     * @docid
     * @default function(ratio, value) { return "Progress: " + Math.round(ratio * 100) + "%" }
     * @public
     */
    statusFormat?: string | ((ratio: number, value: number) => string);
    /**
     * @docid
     * @default 0
     * @public
     */
    value?: number | false;
}
/**
 * @docid
 * @inherits dxTrackBar
 * @namespace DevExpress.ui
 * @public
 */
export default class dxProgressBar extends dxTrackBar<dxProgressBarOptions> { }

/** @public */
export type Properties = dxProgressBarOptions;

/** @deprecated use Properties instead */
export type Options = dxProgressBarOptions;


