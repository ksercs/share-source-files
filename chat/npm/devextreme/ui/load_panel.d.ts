/**
* DevExtreme (ui/load_panel.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    UserDefinedElement,
} from '../core/element';

import {
    Cancelable,
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../common/core/events';

import {
    AnimationConfig,
    PositionConfig,
} from '../common/core/animation';

import dxOverlay, {
    dxOverlayAnimation,
    dxOverlayOptions,
} from './overlay';

import {
    PositionAlignment,
} from '../common';

/**
 * @docid _ui_load_panel_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxLoadPanel>;

/**
 * @docid _ui_load_panel_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxLoadPanel>;

/**
 * @docid _ui_load_panel_HidingEvent
 * @public
 * @type object
 * @inherits Cancelable,EventInfo
 */
export type HidingEvent = Cancelable & EventInfo<dxLoadPanel>;

/**
 * @docid _ui_load_panel_HiddenEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type HiddenEvent = EventInfo<dxLoadPanel>;

/**
 * @docid _ui_load_panel_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxLoadPanel>;

/**
 * @docid _ui_load_panel_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxLoadPanel> & ChangedOptionInfo;

/**
 * @docid _ui_load_panel_ShowingEvent
 * @public
 * @type object
 * @inherits Cancelable,EventInfo
 */
export type ShowingEvent = Cancelable & EventInfo<dxLoadPanel>;

/**
 * @docid _ui_load_panel_ShownEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ShownEvent = EventInfo<dxLoadPanel>;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxLoadPanelOptions extends dxOverlayOptions<dxLoadPanel> {
    /**
     * @docid
     * @default null
     * @public
     * @type object
     */
    animation?: dxLoadPanelAnimation;
    /**
     * @docid
     * @default undefined
     * @public
     */
    container?: string | UserDefinedElement | undefined;
    /**
     * @docid
     * @default 0
     * @public
     */
    delay?: number;
    /**
     * @docid
     * @default false
     * @public
     */
    focusStateEnabled?: boolean;
    /**
     * @docid
     * @default 90
     * @default 60 &for(Material)
     * @default 'auto' &for(Fluent)
     * @public
     */
    height?: number | string | (() => number | string);
    /**
     * @docid
     * @default ""
     * @public
     */
    indicatorSrc?: string;
    /**
     * @docid
     * @default 60 &for(Material)
     * @public
     */
    maxHeight?: number | string | (() => number | string);
    /**
     * @docid
     * @default 60 &for(Material)
     * @public
     */
    maxWidth?: number | string | (() => number | string);
    /**
     * @docid
     * @default "Loading ..."
     * @default "" &for(Material)
     * @public
     */
    message?: string;
    /**
     * @docid
     * @public
     */
    position?: PositionAlignment | PositionConfig | Function;
    /**
     * @docid
     * @default 'transparent'
     * @default '' &for(Android|iOS)
     * @public
     */
    shadingColor?: string;
    /**
     * @docid
     * @default true
     * @public
     */
    showIndicator?: boolean;
    /**
     * @docid
     * @default true
     * @public
     */
    showPane?: boolean;
    /**
     * @docid
     * @default 222
     * @default 60 &for(Material)
     * @default 'auto' &for(Fluent)
     * @public
     */
    width?: number | string | (() => number | string);
}
/**
 * @docid
 * @namespace DevExpress.ui
 */
export interface dxLoadPanelAnimation extends dxOverlayAnimation {
    /**
     * @docid dxLoadPanelOptions.animation.hide
     * @default null
     * @public
     */
    hide?: AnimationConfig;
    /**
     * @docid dxLoadPanelOptions.animation.show
     * @default null
     * @public
     */
    show?: AnimationConfig;
}
/**
 * @docid
 * @inherits dxOverlay
 * @namespace DevExpress.ui
 * @public
 */
export default class dxLoadPanel extends dxOverlay<dxLoadPanelOptions> { }

/** @public */
export type Properties = dxLoadPanelOptions;

/** @deprecated use Properties instead */
export type Options = dxLoadPanelOptions;


