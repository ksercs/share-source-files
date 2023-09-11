/**
* DevExtreme (viz/bullet.d.ts)
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

import {
    FileSavingEventInfo,
    ExportInfo,
    IncidentInfo,
} from './core/base_widget';

import BaseSparkline, {
    BaseSparklineOptions,
} from './sparklines/base_sparkline';

/**
 * @docid _viz_bullet_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxBullet>;

/**
 * @docid _viz_bullet_DrawnEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DrawnEvent = EventInfo<dxBullet>;

/**
 * @docid _viz_bullet_ExportedEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ExportedEvent = EventInfo<dxBullet>;

/**
 * @docid _viz_bullet_ExportingEvent
 * @public
 * @type object
 * @inherits EventInfo,ExportInfo
 */
export type ExportingEvent = EventInfo<dxBullet> & ExportInfo;

/**
 * @docid _viz_bullet_FileSavingEvent
 * @public
 * @type object
 * @inherits FileSavingEventInfo
 */
export type FileSavingEvent = FileSavingEventInfo<dxBullet>;

/**
 * @docid _viz_bullet_IncidentOccurredEvent
 * @public
 * @type object
 * @inherits EventInfo,IncidentInfo
 */
export type IncidentOccurredEvent = EventInfo<dxBullet> & IncidentInfo;

/**
 * @docid _viz_bullet_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxBullet>;

/**
 * @docid _viz_bullet_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxBullet> & ChangedOptionInfo;

/**
 * @docid _viz_bullet_TooltipHiddenEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type TooltipHiddenEvent = EventInfo<dxBullet>;

/**
 * @docid _viz_bullet_TooltipShownEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type TooltipShownEvent = EventInfo<dxBullet>;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.viz
 * @docid
 */
export interface dxBulletOptions extends BaseSparklineOptions<dxBullet> {
    /**
     * @docid
     * @default '#e8c267'
     * @public
     */
    color?: string;
    /**
     * @docid
     * @default undefined
     * @notUsedInTheme
     * @public
     */
    endScaleValue?: number;
    /**
     * @docid
     * @default true
     * @public
     */
    showTarget?: boolean;
    /**
     * @docid
     * @default true
     * @public
     */
    showZeroLevel?: boolean;
    /**
     * @docid
     * @default 0
     * @notUsedInTheme
     * @public
     */
    startScaleValue?: number;
    /**
     * @docid
     * @default 0
     * @notUsedInTheme
     * @public
     */
    target?: number;
    /**
     * @docid
     * @default '#666666'
     * @public
     */
    targetColor?: string;
    /**
     * @docid
     * @default 4
     * @public
     */
    targetWidth?: number;
    /**
     * @docid
     * @default 0
     * @notUsedInTheme
     * @public
     */
    value?: number;
}
/**
 * @docid
 * @inherits BaseSparkline
 * @namespace DevExpress.viz
 * @public
 */
export default class dxBullet extends BaseSparkline<dxBulletOptions> { }

/** @public */
export type Properties = dxBulletOptions;

/** @deprecated use Properties instead */
export type Options = dxBulletOptions;


