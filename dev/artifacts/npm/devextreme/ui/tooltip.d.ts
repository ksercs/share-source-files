/**
* DevExtreme (ui/tooltip.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    Cancelable,
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../events/index';

import dxPopover, {
    dxPopoverOptions,
} from './popover';

/**
 * @docid _ui_tooltip_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxTooltip>;

/**
 * @docid _ui_tooltip_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxTooltip>;

/**
 * @docid _ui_tooltip_HidingEvent
 * @public
 * @type object
 * @inherits Cancelable,EventInfo
 */
export type HidingEvent = Cancelable & EventInfo<dxTooltip>;

/**
 * @docid _ui_tooltip_HiddenEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type HiddenEvent = EventInfo<dxTooltip>;

/**
 * @docid _ui_tooltip_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxTooltip>;

/**
 * @docid _ui_tooltip_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxTooltip> & ChangedOptionInfo;

/**
 * @docid _ui_tooltip_ShowingEvent
 * @public
 * @type object
 * @inherits Cancelable,EventInfo
 */
export type ShowingEvent = Cancelable & EventInfo<dxTooltip>;

/**
 * @docid _ui_tooltip_ShownEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ShownEvent = EventInfo<dxTooltip>;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxTooltipOptions extends dxPopoverOptions<dxTooltip> { }
/**
 * @docid
 * @inherits dxPopover
 * @hasTranscludedContent
 * @namespace DevExpress.ui
 * @public
 */
export default class dxTooltip extends dxPopover<dxTooltipOptions> { }

/** @public */
export type Properties = dxTooltipOptions;

/** @deprecated use Properties instead */
export type Options = dxTooltipOptions;


