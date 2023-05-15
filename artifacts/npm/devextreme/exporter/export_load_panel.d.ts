/**
* DevExtreme (exporter/export_load_panel.d.ts)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid
 * @type object
 * @namespace DevExpress
 */
export interface ExportLoadPanel {
    /**
     * @docid
     * @default true
     */
    enabled?: boolean;
    /**
     * @docid
     * @default "Exporting..."
     */
    text?: string;
    /**
     * @docid
     * @default 200
     */
    width?: number;
    /**
     * @docid
     * @default 90
     */
    height?: number;
    /**
     * @docid
     * @default true
     */
    showIndicator?: boolean;
    /**
     * @docid
     * @default ""
     */
    indicatorSrc?: string;
    /**
     * @docid
     * @default true
     */
    showPane?: boolean;
    /**
     * @docid
     * @default false
     */
    shading?: boolean;
    /**
     * @docid
     * @default ''
     */
    shadingColor?: string;
}
