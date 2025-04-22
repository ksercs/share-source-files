/**
* DevExtreme (viz/sparkline.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DataSource, { DataSourceLike } from '../data/data_source';

import {
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../common/core/events';

import {
    FileSavingEventInfo,
    ExportInfo,
    IncidentInfo,
} from './core/base_widget';

import BaseSparkline, {
    BaseSparklineOptions,
} from './sparklines/base_sparkline';

import {
    PointSymbol,
} from '../common/charts';

export {
    PointSymbol,
};

/** @public */
export type SparklineType = 'area' | 'bar' | 'line' | 'spline' | 'splinearea' | 'steparea' | 'stepline' | 'winloss';

/**
 * @docid _viz_sparkline_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxSparkline>;

/**
 * @docid _viz_sparkline_DrawnEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DrawnEvent = EventInfo<dxSparkline>;

/**
 * @docid _viz_sparkline_ExportedEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ExportedEvent = EventInfo<dxSparkline>;

/**
 * @docid _viz_sparkline_ExportingEvent
 * @public
 * @type object
 * @inherits EventInfo,ExportInfo
 */
export type ExportingEvent = EventInfo<dxSparkline> & ExportInfo;

/**
 * @docid _viz_sparkline_FileSavingEvent
 * @public
 * @type object
 * @inherits FileSavingEventInfo
 */
export type FileSavingEvent = FileSavingEventInfo<dxSparkline>;

/**
 * @docid _viz_sparkline_IncidentOccurredEvent
 * @public
 * @type object
 * @inherits EventInfo,IncidentInfo
 */
export type IncidentOccurredEvent = EventInfo<dxSparkline> & IncidentInfo;

/**
 * @docid _viz_sparkline_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxSparkline>;

/**
 * @docid _viz_sparkline_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxSparkline> & ChangedOptionInfo;

/**
 * @docid _viz_sparkline_TooltipHiddenEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type TooltipHiddenEvent = EventInfo<dxSparkline>;

/**
 * @docid _viz_sparkline_TooltipShownEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type TooltipShownEvent = EventInfo<dxSparkline>;

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.viz
 * @docid
 */
export interface dxSparklineOptions extends BaseSparklineOptions<dxSparkline> {
    /**
     * @docid
     * @default 'arg'
     * @public
     */
    argumentField?: string;
    /**
     * @docid
     * @default '#d7d7d7'
     * @public
     */
    barNegativeColor?: string;
    /**
     * @docid
     * @default '#a9a9a9'
     * @public
     */
    barPositiveColor?: string;
    /**
     * @docid
     * @notUsedInTheme
     * @public
     * @type Store|DataSource|DataSourceOptions|string|Array<any>|null
     */
    dataSource?: DataSourceLike<any> | null;
    /**
     * @docid
     * @default '#666666'
     * @public
     */
    firstLastColor?: string;
    /**
     * @docid
     * @default false
     * @public
     */
    ignoreEmptyPoints?: boolean;
    /**
     * @docid
     * @default '#666666'
     * @public
     */
    lineColor?: string;
    /**
     * @docid
     * @default 2
     * @public
     */
    lineWidth?: number;
    /**
     * @docid
     * @default '#d7d7d7'
     * @public
     */
    lossColor?: string;
    /**
     * @docid
     * @default '#e55253'
     * @public
     */
    maxColor?: string;
    /**
     * @docid
     * @default undefined
     * @public
     */
    maxValue?: number | undefined;
    /**
     * @docid
     * @default '#e8c267'
     * @public
     */
    minColor?: string;
    /**
     * @docid
     * @default undefined
     * @public
     */
    minValue?: number | undefined;
    /**
     * @docid
     * @default '#ffffff'
     * @public
     */
    pointColor?: string;
    /**
     * @docid
     * @default 4
     * @public
     */
    pointSize?: number;
    /**
     * @docid
     * @default 'circle'
     * @public
     */
    pointSymbol?: PointSymbol;
    /**
     * @docid
     * @default true
     * @public
     */
    showFirstLast?: boolean;
    /**
     * @docid
     * @default false
     * @public
     */
    showMinMax?: boolean;
    /**
     * @docid
     * @default 'line'
     * @public
     */
    type?: SparklineType;
    /**
     * @docid
     * @default 'val'
     * @public
     */
    valueField?: string;
    /**
     * @docid
     * @default '#a9a9a9'
     * @public
     */
    winColor?: string;
    /**
     * @docid
     * @default 0
     * @public
     */
    winlossThreshold?: number;
}
/**
 * @docid
 * @inherits BaseSparkline, DataHelperMixin
 * @namespace DevExpress.viz
 * @public
 */
export default class dxSparkline extends BaseSparkline<dxSparklineOptions> {
    getDataSource(): DataSource;
}

/** @public */
export type Properties = dxSparklineOptions;

/** @deprecated use Properties instead */
export type Options = dxSparklineOptions;


