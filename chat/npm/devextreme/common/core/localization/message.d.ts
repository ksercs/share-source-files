/**
* DevExtreme (common/core/localization/message.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
type messageLocalizationType = {
    getFormatter(name: string): () => string;
    format(name: string): string;
};
declare const messageLocalization: messageLocalizationType;
export default messageLocalization;
