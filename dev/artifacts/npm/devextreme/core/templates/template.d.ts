/**
* DevExtreme (core/templates/template.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    UserDefinedElement,
} from '../element';

/**
 * @docid
 * @type object
 */
export interface dxTemplateOptions {
    /**
     * @docid
     * @public
     */
    name?: string;
}
/**
 * @docid
 * @section uiWidgetMarkupComponents
 * @type object
 * @public
 * @options dxTemplateOptions
 */
export type dxTemplate = Template;

 // eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Template {
    constructor(options?: dxTemplateOptions);
}

/**
 * @docid
 * @section Common
 * @public
 */
export type template = string | Function | UserDefinedElement;
