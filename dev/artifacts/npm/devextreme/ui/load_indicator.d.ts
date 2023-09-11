/**
* DevExtreme (ui/load_indicator.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../events/index';

import Widget, {
    WidgetOptions,
} from './widget/ui.widget';

/**
 * @docid _ui_load_indicator_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxLoadIndicator>;

/**
 * @docid _ui_load_indicator_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxLoadIndicator>;

/**
 * @docid _ui_load_indicator_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxLoadIndicator>;

/**
 * @docid _ui_load_indicator_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxLoadIndicator> & ChangedOptionInfo;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxLoadIndicatorOptions extends WidgetOptions<dxLoadIndicator> {
    /**
     * @docid
     * @default ""
     * @public
     */
    indicatorSrc?: string;
}
/**
 * @docid
 * @inherits Widget
 * @namespace DevExpress.ui
 * @public
 */
export default class dxLoadIndicator extends Widget<dxLoadIndicatorOptions> { }

/** @public */
export type Properties = dxLoadIndicatorOptions;

/** @deprecated use Properties instead */
export type Options = dxLoadIndicatorOptions;


