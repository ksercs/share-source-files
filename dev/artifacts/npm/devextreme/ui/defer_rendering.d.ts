/**
* DevExtreme (ui/defer_rendering.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    AnimationConfig,
} from '../animation/fx';

import {
    DxElement,
} from '../core/element';

import {
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../events/index';

import Widget, {
    WidgetOptions,
} from './widget/ui.widget';

/**
 * @docid _ui_defer_rendering_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxDeferRendering>;

/**
 * @docid _ui_defer_rendering_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxDeferRendering>;

/**
 * @docid _ui_defer_rendering_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxDeferRendering>;

/**
 * @docid _ui_defer_rendering_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxDeferRendering> & ChangedOptionInfo;

/**
 * @docid _ui_defer_rendering_RenderedEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type RenderedEvent = EventInfo<dxDeferRendering>;

/**
 * @docid _ui_defer_rendering_ShownEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ShownEvent = EventInfo<dxDeferRendering>;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxDeferRenderingOptions extends WidgetOptions<dxDeferRendering> {
    /**
     * @docid
     * @default undefined
     * @public
     */
    animation?: AnimationConfig;
    /**
     * @docid
     * @default null
     * @action
     * @public
     */
    onRendered?: ((e: { component?: dxDeferRendering; element?: DxElement; model?: any }) => void);
    /**
     * @docid
     * @default null
     * @action
     * @public
     */
    onShown?: ((e: { component?: dxDeferRendering; element?: DxElement; model?: any }) => void);
    /**
     * @docid
     * @type DxPromise|bool
     * @default undefined
     * @public
     */
    renderWhen?: PromiseLike<void> | boolean;
    /**
     * @docid
     * @default false
     * @public
     */
    showLoadIndicator?: boolean;
    /**
     * @docid
     * @default undefined
     * @public
     */
    staggerItemSelector?: string;
}
/**
 * @docid
 * @inherits Widget
 * @namespace DevExpress.ui
 * @public
 */
export default class dxDeferRendering extends Widget<dxDeferRenderingOptions> { }

/** @public */
export type Properties = dxDeferRenderingOptions;

/** @deprecated use Properties instead */
export type Options = dxDeferRenderingOptions;


