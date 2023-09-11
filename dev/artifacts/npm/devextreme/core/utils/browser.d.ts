/**
* DevExtreme (core/utils/browser.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export type BrowserInfo = {
    webkit?: boolean;
    chrome?: boolean;
    mozilla?: boolean;
    safari?: boolean;
    unknown?: boolean;
    version?: string;
};

declare const browser: BrowserInfo;
export default browser;
