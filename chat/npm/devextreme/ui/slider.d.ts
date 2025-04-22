/**
* DevExtreme (ui/slider.d.ts)
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

import dxTrackBar, {
    dxTrackBarOptions,
} from './track_bar';

import {
    Format,
} from '../localization';

import {
    SliderValueChangeMode,
    TooltipShowMode,
    VerticalEdge,
} from '../common';

export {
    TooltipShowMode,
    VerticalEdge,
};

/**
 * @docid _ui_slider_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxSlider>;

/**
 * @docid _ui_slider_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxSlider>;

/**
 * @docid _ui_slider_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxSlider>;

/**
 * @docid _ui_slider_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxSlider> & ChangedOptionInfo;

/**
 * @docid _ui_slider_ValueChangedEvent
 * @public
 * @type object
 * @inherits NativeEventInfo,ValueChangedInfo
 */
export type ValueChangedEvent = NativeEventInfo<dxSlider, KeyboardEvent | MouseEvent | PointerEvent | TouchEvent | UIEvent | Event> & ValueChangedInfo;

/**
 * @deprecated Use /common/SliderValueChangeMode instead
 */
export type ValueChangeMode = SliderValueChangeMode;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxSliderOptions extends dxSliderBaseOptions<dxSlider> {
    /**
     * @docid
     * @default 50
     * @public
     */
    value?: number;
}
/**
 * @docid
 * @isEditor
 * @inherits dxSliderBase
 * @namespace DevExpress.ui
 * @public
 */
export default class dxSlider extends dxTrackBar<dxSliderOptions> {
    /**
     * @docid
     * @publicName reset(value)
     * @public
     */
    reset(value?: number): void;
}

/**
 * @docid
 * @hidden
 * @namespace DevExpress.ui
 */
export interface dxSliderBaseOptions<TComponent> extends dxTrackBarOptions<TComponent> {
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
     * @default 1
     * @public
     */
    keyStep?: number;
    /**
     * @docid
     * @public
     */
    label?: {
      /**
       * @docid
       * @default function(value) { return value }
       */
      format?: Format;
      /**
       * @docid
       * @default 'bottom'
       */
      position?: VerticalEdge;
      /**
       * @docid
       * @default false
       */
      visible?: boolean;
    };
    /**
     * @docid
     * @hidden false
     * @public
     */
    name?: string;
    /**
     * @docid
     * @default true
     * @public
     */
    showRange?: boolean;
    /**
     * @docid
     * @default 1
     * @public
     */
    step?: number;
    /**
     * @docid
     * @public
     */
    tooltip?: {
      /**
       * @docid
       * @default false
       */
      enabled?: boolean;
      /**
       * @docid
       * @default function(value) { return value }
       */
      format?: Format;
      /**
       * @docid
       * @default 'top'
       */
      position?: VerticalEdge;
      /**
       * @docid
       * @default 'onHover'
       */
      showMode?: TooltipShowMode;
    };
    /**
     * @docid
     * @default 'onHandleMove'
     * @public
     */
     valueChangeMode?: SliderValueChangeMode;
}

/**
 * @docid
 * @inherits dxTrackBar
 * @hidden
 * @namespace DevExpress.ui
 * @options dxSliderBaseOptions
 */

export interface dxSliderBase { }

/** @public */
export type Properties = dxSliderOptions;

/** @deprecated use Properties instead */
export type Options = dxSliderOptions;


