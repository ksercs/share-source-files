/**
* DevExtreme (time_zone_utils.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid
 * @public
 */
export interface dxSchedulerTimeZone {
    /**
     * @docid
     */
    id: string;
    /**
     * @docid
     */
    offset: number;
    /**
     * @docid
     */
    title: string;
}

/**
 * @docid utils.getTimeZones
 * @publicName getTimeZones(date)
 * @param1 date:Date|undefined
 * @namespace DevExpress.utils
 * @static
 * @public
 */
export function getTimeZones(date?: Date): Array<dxSchedulerTimeZone>;
