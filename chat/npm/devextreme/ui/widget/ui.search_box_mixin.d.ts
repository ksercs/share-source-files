/**
* DevExtreme (ui/widget/ui.search_box_mixin.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    Properties as TextBoxProperties,
} from '../text_box';

import {
    SearchMode,
} from '../../common';

/**
 * @namespace DevExpress.ui
 * @docid
 * @hidden
 */
export interface SearchBoxMixinOptions {
    /**
     * @docid
     * @default {}
     * @public
     * @type dxTextBoxOptions
     */
    searchEditorOptions?: TextBoxProperties;
    /**
     * @docid
     * @default false
     * @public
     */
    searchEnabled?: boolean;
    /**
     * @docid
     * @type getter|Array<getter>
     * @default null
     * @public
     */
    searchExpr?: string | Function | Array<string | Function>;
    /**
     * @docid
     * @default 'contains'
     * @public
     */
    searchMode?: SearchMode;
    /**
     * @docid
     * @default undefined
     * @public
     */
    searchTimeout?: number | undefined;
    /**
     * @docid
     * @default ""
     * @public
     */
    searchValue?: string;
}
/**
 * @docid
 * @hidden
 * @options SearchBoxMixinOptions
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class SearchBoxMixin {
    constructor(options?: SearchBoxMixinOptions);
}
