/**
* DevExtreme (localization/message.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
type messageLocalizationType = {
    getFormatter(name: string): () => string;
    format(name: string): string;
};
declare const messageLocalization: messageLocalizationType;
export default messageLocalization;
