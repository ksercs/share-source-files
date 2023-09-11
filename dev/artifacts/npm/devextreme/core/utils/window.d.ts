/**
* DevExtreme (core/utils/window.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export declare function getWindow(): Window;
export declare function hasWindow(): boolean;
export declare function setWindow(
  newWindowObject: Window | Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  hasWindow?: boolean
): void;
