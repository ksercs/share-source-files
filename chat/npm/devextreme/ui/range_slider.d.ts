/**
* DevExtreme (ui/range_slider.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../common/core/events';

import {
    ValueChangedInfo,
} from './editor/editor';

import {
    dxSliderBaseOptions,
} from './slider';

import dxTrackBar from './track_bar';

/**
 * @docid _ui_range_slider_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxRangeSlider>;

/**
 * @docid _ui_range_slider_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxRangeSlider>;

/**
 * @docid _ui_range_slider_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxRangeSlider>;

/**
 * @docid _ui_range_slider_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxRangeSlider> & ChangedOptionInfo;

/**
 * @docid _ui_range_slider_ValueChangedEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ValueChangedInfo
 */
export type ValueChangedEvent = NativeEventInfo<dxRangeSlider, KeyboardEvent | MouseEvent | PointerEvent | TouchEvent | UIEvent | Event> & ValueChangedInfo & {
    /** @docid _ui_range_slider_ValueChangedEvent.start */
    readonly start?: number;
    /** @docid _ui_range_slider_ValueChangedEvent.end */
    readonly end?: number;
    /** @docid _ui_range_slider_ValueChangedEvent.value */
    readonly value?: Array<number>;
};

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxRangeSliderOptions extends dxSliderBaseOptions<dxRangeSlider> {
    /**
     * @docid
     * @default 60
     * @public
     */
    end?: number;
    /**
     * @docid
     * @default ""
     * @public
     */
    endName?: string;
    /**
     * @docid
     * @type_function_param1 e:{ui/range_slider:ValueChangedEvent}
     * @action
     * @default null
     * @public
     */
    onValueChanged?: ((e: ValueChangedEvent) => void);
    /**
     * @docid
     * @default 40
     * @public
     */
    start?: number;
    /**
     * @docid
     * @default ""
     * @public
     */
    startName?: string;
    /**
     * @docid
     * @default [40, 60]
     * @public
     */
    value?: Array<number>;
}
/**
 * @docid
 * @isEditor
 * @inherits dxSliderBase
 * @namespace DevExpress.ui
 * @public
 */
export default class dxRangeSlider extends dxTrackBar<dxRangeSliderOptions> {
    /**
     * @docid
     * @publicName reset(value)
     * @public
     */
    reset(value?: Array<number>): void;
 }

/** @public */
export type Properties = dxRangeSliderOptions;

/** @deprecated use Properties instead */
export type Options = dxRangeSliderOptions;


