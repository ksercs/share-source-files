/**
* DevExtreme (ui/button.d.ts)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    UserDefinedElement,
    DxElement,
} from '../core/element';

import {
    template,
} from '../core/templates/template';

import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../events/index';

import Widget, {
    WidgetOptions,
} from './widget/ui.widget';

import {
    ButtonType,
    ButtonStyle,
} from '../common';

export {
    ButtonType,
    ButtonStyle,
};

/**
 * @docid _ui_button_ClickEvent
 * @public
 * @type object
 * @inherits NativeEventInfo
 */
export type ClickEvent = NativeEventInfo<dxButton, KeyboardEvent | MouseEvent | PointerEvent> & {
    /**
     * @docid _ui_button_ClickEvent.validationGroup
     * @type object
     */
    validationGroup?: any;
};

/**
 * @docid _ui_button_ContentReadyEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type ContentReadyEvent = EventInfo<dxButton>;

/**
 * @docid _ui_button_DisposingEvent
 * @public
 * @type object
 * @inherits EventInfo
 */
export type DisposingEvent = EventInfo<dxButton>;

/**
 * @docid _ui_button_InitializedEvent
 * @public
 * @type object
 * @inherits InitializedEventInfo
 */
export type InitializedEvent = InitializedEventInfo<dxButton>;

/**
 * @docid _ui_button_OptionChangedEvent
 * @public
 * @type object
 * @inherits EventInfo,ChangedOptionInfo
 */
export type OptionChangedEvent = EventInfo<dxButton> & ChangedOptionInfo;

/** @public */
export type TemplateData = {
    readonly text?: string;
    readonly icon?: string;
};

/**
 * @deprecated use Properties instead
 * @namespace DevExpress.ui
 * @docid
 */
export interface dxButtonOptions extends WidgetOptions<dxButton> {
    /**
     * @docid
     * @default true
     * @public
     */
    activeStateEnabled?: boolean;
    /**
     * @docid
     * @default true &for(desktop)
     * @public
     */
    focusStateEnabled?: boolean;
    /**
     * @docid
     * @default true
     * @public
     */
    hoverStateEnabled?: boolean;
    /**
     * @docid
     * @default ""
     * @public
     */
    icon?: string;
    /**
     * @docid
     * @default null
     * @type_function_param1 e:{ui/button:ClickEvent}
     * @action
     * @public
     */
    onClick?: ((e: ClickEvent) => void);
    /**
     * @docid
     * @default 'contained'
     * @public
     */
    stylingMode?: ButtonStyle;
    /**
     * @docid
     * @default "content"
     * @type_function_param1 buttonData:object
     * @type_function_return string|Element|jQuery
     * @public
     */
    template?: template | ((data: TemplateData, contentElement: DxElement) => string | UserDefinedElement);
    /**
     * @docid
     * @default ""
     * @public
     */
    text?: string;
    /**
     * @docid
     * @default 'normal'
     * @public
     */
    type?: ButtonType;
    /**
     * @docid
     * @default false
     * @public
     */
    useSubmitBehavior?: boolean;
    /**
     * @docid
     * @default undefined
     * @public
     */
    validationGroup?: string;
}
/**
 * @docid
 * @inherits Widget
 * @hasTranscludedContent
 * @namespace DevExpress.ui
 * @public
 */
export default class dxButton extends Widget<dxButtonOptions> { }

/** @public */
export type Properties = dxButtonOptions;

/** @deprecated use Properties instead */
export type Options = dxButtonOptions;


