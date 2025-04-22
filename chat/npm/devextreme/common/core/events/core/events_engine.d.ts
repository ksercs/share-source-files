/**
* DevExtreme (common/core/events/core/events_engine.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
type EventsEngineType = {
    on(element: any, eventName: any, handler: any, options?: any): void;
    off(element: any, eventName?: any, handler?: any): void;
    one(element: any, eventName: any, handler: any, options?: any): void;
    set(eventEngine: any): void;
    triggerHandler(element: any, opts: Record<string, unknown>): void;
};

declare const eventsEngine: EventsEngineType;
export function set(eventEngine: any): void;
export default eventsEngine;
