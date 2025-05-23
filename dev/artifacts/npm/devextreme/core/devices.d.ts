/**
* DevExtreme (core/devices.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @public
 * @docid
 * @section commonObjectStructures
 * @namespace DevExpress
 */
export type Device = {
    /**
     * @docid
     * @public
     */
    android?: boolean;
    /**
     * @docid
     * @public
     */
    deviceType?: 'phone' | 'tablet' | 'desktop';
    /**
     * @docid
     * @public
     */
    generic?: boolean;
    /**
     * @docid
     * @public
     */
    grade?: 'A' | 'B' | 'C';
    /**
     * @docid
     * @public
     */
    ios?: boolean;
    /**
     * @docid
     * @public
     */
    phone?: boolean;
    /**
     * @docid
     * @public
     */
    platform?: 'android' | 'ios' | 'generic';
    /**
     * @docid
     * @public
     */
    tablet?: boolean;
    /**
     * @docid
     * @public
     */
    version?: Array<number>;
};

type EventName = 'orientationChanged';

/**
 * @docid
 * @publicName devices
 * @section Utils
 * @namespace DevExpress
 * @public
 */
declare class DevicesObject {
    constructor(options?: { window?: Window });
    /**
     * @docid
     * @publicName current()
     * @public
     */
    current(): Device;
    /**
     * @docid
     * @publicName current(deviceName)
     * @public
     */
    current(deviceName: string | Device): void;
    /**
     * @docid
     * @publicName off(eventName)
     * @param1 eventName:string
     * @return this
     * @public
     */
    off(eventName: EventName): this;
    /**
     * @docid
     * @publicName off(eventName, eventHandler)
     * @param1 eventName:string
     * @return this
     * @public
     */
    off(eventName: EventName, eventHandler: Function): this;
    /**
     * @docid
     * @publicName on(eventName, eventHandler)
     * @param1 eventName:string
     * @return this
     * @public
     */
    on(eventName: EventName, eventHandler: Function): this;
    /**
     * @docid
     * @publicName on(events)
     * @param1 events:object
     * @return this
     * @public
     */
    on(events: { [key in EventName]?: Function }): this;
    /**
     * @docid
     * @publicName orientation()
     * @return String
     * @public
     */
    orientation(): 'portrait' | 'landscape' | undefined;
    /**
     * @docid
     * @publicName real()
     * @public
     */
    real(): Device;
    isSimulator(): boolean;
}

/**
 * @const devices
 * @namespace DevExpress
 * @hidden
 * @public
 */

declare const devices: DevicesObject;
export default devices;
