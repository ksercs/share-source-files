/**
* DevExtreme (ui/defer_rendering.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    AnimationConfig,
} from '../common/core/animation';

import {
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../common/core/events';

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
    animation?: AnimationConfig | undefined;
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/defer_rendering:RenderedEvent}
     * @action
     * @public
     */
    onRendered?: ((e: RenderedEvent) => void);
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/defer_rendering:ShownEvent}
     * @action
     * @public
     */
    onShown?: ((e: ShownEvent) => void);
    /**
     * @docid
     * @type DxPromise|bool|undefined
     * @default undefined
     * @public
     */
    renderWhen?: PromiseLike<void> | boolean | undefined;
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
    staggerItemSelector?: string | undefined;
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


