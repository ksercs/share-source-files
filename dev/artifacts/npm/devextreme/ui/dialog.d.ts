/**
* DevExtreme (ui/dialog.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    DxPromise,
} from '../core/utils/deferred';

import {
    dxButtonOptions,
} from './button';

/**
 * @public
 */
export interface CustomDialogOptions {
    title?: string;
    messageHtml?: string;
    buttons?: Array<dxButtonOptions>;
    showTitle?: boolean;
    message?: string;
    dragEnabled?: boolean;
}
/**
 * @docid ui.dialog.alert
 * @publicName alert(messageHtml,title)
 * @return Promise<void>
 * @static
 * @namespace DevExpress.ui.dialog
 * @public
 */
export function alert(messageHtml: string, title: string): DxPromise<void>;

/**
 * @docid ui.dialog.confirm
 * @publicName confirm(messageHtml,title)
 * @return Promise<boolean>
 * @static
 * @namespace DevExpress.ui.dialog
 * @public
 */
export function confirm(messageHtml: string, title: string): DxPromise<boolean>;

/**
 * @docid ui.dialog.custom
 * @publicName custom(options)
 * @return Object
 * @param1 options:object
 * @param1_field buttons:Array<dxButtonOptions>
 * @param1_field message:String:deprecated(messageHtml)
 * @static
 * @namespace DevExpress.ui.dialog
 * @public
 */
export function custom(options: CustomDialogOptions): any;
